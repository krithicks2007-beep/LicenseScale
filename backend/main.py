import os
import logging
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

try:
    from .ocr_engine import extract_certificate_from_image
except ImportError:
    from ocr_engine import extract_certificate_from_image

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("licenscale-ocr")

app = FastAPI(
    title="LicenScale OCR Backend",
    description="Gemini Flash AI Vision Service for Legal Metrology Verification Certificates",
    version="2.0.0"
)

# Enable CORS for frontend Vite dev server, Vercel, and local ports
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
@app.head("/")
def read_root():
    return {
        "service": "LicenScale OCR Backend",
        "engine": "Gemini Flash AI Vision",
        "status": "online",
        "version": "2.0.0",
        "endpoints": {
            "extract_vc": "POST /api/extract-vc",
            "health": "GET /api/health"
        }
    }

@app.get("/api/health")
@app.head("/api/health")
def health_check():
    return {"status": "healthy"}

@app.post("/api/extract-vc")
async def extract_vc_endpoint(file: UploadFile = File(...)):
    """
    Receives a scanned Legal Metrology Verification Certificate image (JPG, PNG, WebP),
    processes it through the Gemini Flash AI Vision pipeline,
    and returns parsed, structured certificate fields.
    """
    if not file.content_type.startswith("image/"):
        ext = file.filename.split(".")[-1].lower() if "." in file.filename else ""
        if ext not in ["jpg", "jpeg", "png", "webp", "bmp", "tiff"]:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type '{file.content_type}'. Please upload an image file (JPG, PNG, WebP)."
            )

    try:
        logger.info(f"Received file: {file.filename} ({file.content_type})")
        image_bytes = await file.read()
        
        if len(image_bytes) == 0:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")

        # Process through Gemini Flash AI Vision
        result = extract_certificate_from_image(image_bytes)
        result["filename"] = file.filename
        
        logger.info(f"Successfully processed {file.filename}. CV: {result['data'].get('cvNumber')}")
        return JSONResponse(content=result)

    except HTTPException:
        raise
    except Exception as e:
        logger.exception(f"Error during OCR processing: {e}")
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": str(e),
                "data": {},
                "rawLines": []
            }
        )

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=port)
