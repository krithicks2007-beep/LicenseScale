export const BACKEND_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');
export const IS_LOCAL = BACKEND_URL.includes('localhost') || BACKEND_URL.includes('127.0.0.1');

export function toInputDateFormat(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split(/[-/.]/);
  if (parts.length === 3) {
    if (parts[2].length === 4) {
      // DD-MM-YYYY -> YYYY-MM-DD
      const day = parts[0].padStart(2, '0');
      const month = parts[1].padStart(2, '0');
      const year = parts[2];
      return `${year}-${month}-${day}`;
    }
    if (parts[0].length === 4) {
      // Already YYYY-MM-DD
      return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
    }
  }
  return dateStr;
}

/**
 * Checks if the Python FastAPI Deep Learning OCR backend is alive
 * Uses 15s timeout for cloud servers (Render free tier cold start) and retries
 */
export async function checkBackendHealth() {
  const timeoutMs = IS_LOCAL ? 4000 : 15000;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/health`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (res.ok) return true;
    } catch {
      if (attempt === 0 && !IS_LOCAL) {
        // Wait 2 seconds before retry if waking up from sleep
        await new Promise((r) => setTimeout(r, 2000));
      }
    }
  }
  return false;
}

/**
 * Executes Deep Learning OCR by sending image file to the Python FastAPI backend
 */
export async function extractDetailsFromImage(file, onProgress) {
  if (onProgress) onProgress(20);

  const formData = new FormData();
  formData.append('file', file);

  try {
    if (onProgress) onProgress(45);

    // Allow 60s timeout for deep learning OCR processing over the network
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 60000);

    const res = await fetch(`${BACKEND_URL}/api/extract-vc`, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (onProgress) onProgress(80);

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || `Server returned error status ${res.status}`);
    }

    const json = await res.json();
    if (onProgress) onProgress(100);

    return {
      success: true,
      data: json.data || {},
      rawLines: json.rawLines || [],
      rawText: (json.rawLines || []).join('\n'),
    };
  } catch (err) {
    console.error('OCR Backend request failed:', err);
    const hint = IS_LOCAL
      ? 'Make sure local backend is running (cd backend; python main.py).'
      : 'Render free tier may be waking up from sleep (~30s). Please wait a moment and try again.';
    throw new Error(
      `OCR request failed: ${err.message}. ${hint}`
    );
  }
}
