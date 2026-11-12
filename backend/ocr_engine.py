import os
import json
import base64
import urllib.request
import ssl
import logging
from pathlib import Path

logger = logging.getLogger("licenscale-ocr")

def load_local_env():
    """Load key from backend/.env if running locally without extra packages"""
    env_file = Path(__file__).resolve().parent / ".env"
    if env_file.exists():
        try:
            with open(env_file, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        k, v = line.split("=", 1)
                        if k.strip() not in os.environ:
                            os.environ[k.strip()] = v.strip().strip("'\"")
        except Exception:
            pass

load_local_env()

def get_api_key():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError(
            "GEMINI_API_KEY is not set. Please add GEMINI_API_KEY in your Render Dashboard under 'Environment'."
        )
    return api_key

def extract_certificate_from_image(image_bytes: bytes) -> dict:
    """
    Extracts Legal Metrology Verification Certificate fields using Google Gemini Vision API.
    Uses ~30MB RAM and runs in ~1.5s, preventing any cloud container memory crashes.
    """
    api_key = get_api_key()
    img_b64 = base64.b64encode(image_bytes).decode('utf-8')

    prompt = """
You are an expert Legal Metrology Verification Certificate (VC) parser.
Carefully read this Legal Metrology Certificate of Verification image.
Extract all details into this exact JSON structure:
{
  "cvNumber": "Certificate or CV number (e.g. TNI/438/002571)",
  "verificationDate": "Date of verification in DD-MM-YYYY format",
  "nextDueDate": "Next verification due date in DD-MM-YYYY format",
  "traderNo": "Trader Number (e.g. LABUID/TNLM/...)",
  "applicationNo": "Application Number (e.g. 255065)",
  "customerName": "Full firm / business name belonging to",
  "customerAddress": "Full premises address with pincode",
  "scaleMake": "Make e.g. MODERN, AVERY, METTLER, ESSAE",
  "scaleModel": "Model e.g. MSP 300, E1205",
  "serialNo": "Machine No or Serial No",
  "capacity": "Capacity e.g. 300 kg",
  "accuracyClass": "Accuracy class e.g. Class III",
  "stampingFee": "Total stamping fee in numbers only e.g. 400",
  "receiptNo": "Receipt number e.g. LABOUR/2022/238410",
  "officerName": "Name and designation of Legal Metrology Officer",
  "repairer": "Name of Repairer",
  "repairerLicence": "Repairer licence number"
}

Return ONLY valid JSON matching this exact structure. If any field is not visible, use an empty string "".
"""

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt},
                    {
                        "inline_data": {
                            "mime_type": "image/jpeg",
                            "data": img_b64
                        }
                    }
                ]
            }
        ],
        "generationConfig": {
            "response_mime_type": "application/json"
        }
    }

    models_to_try = [
        "gemini-3.5-flash",
        "gemini-flash-latest",
        "gemini-3.8-flash",
        "gemini-3.1-flash-lite",
        "gemini-pro-latest"
    ]

    ctx = ssl.create_default_context()
    last_error = None

    for model in models_to_try:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST"
        )
        try:
            logger.info(f"Calling Gemini Vision model '{model}'...")
            with urllib.request.urlopen(req, timeout=30, context=ctx) as res:
                result = json.loads(res.read().decode("utf-8"))
                text_answer = result["candidates"][0]["content"]["parts"][0]["text"]
                data = json.loads(text_answer)
                logger.info(f"Successfully extracted certificate data with {model}. CV: {data.get('cvNumber')}")
                return {
                    "success": True,
                    "data": data,
                    "rawLines": [f"{k}: {v}" for k, v in data.items() if v],
                }
        except urllib.error.HTTPError as e:
            err_body = e.read().decode("utf-8", errors="ignore")
            logger.warning(f"Model {model} returned HTTP {e.code}: {err_body[:200]}")
            last_error = err_body
            # Try next model if 503 (high demand) or 404
            if e.code in [503, 404, 429]:
                continue
            raise RuntimeError(f"Gemini API Error ({e.code}): {err_body}")
        except Exception as e:
            logger.warning(f"Error with {model}: {e}")
            last_error = str(e)
            continue

    raise RuntimeError(f"Failed to process certificate with Gemini Vision. Last error: {last_error}")

def get_reader():
    """No-op reader for compatibility"""
    return True
