const BACKEND_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');

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
 */
export async function checkBackendHealth() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/health`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(3000),
    });
    return res.ok;
  } catch {
    return false;
  }
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

    const res = await fetch(`${BACKEND_URL}/api/extract-vc`, {
      method: 'POST',
      body: formData,
    });

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
    throw new Error(
      `Deep Learning OCR backend unreachable or failed: ${err.message}. Make sure backend is running on port 8000 (cd backend; python main.py).`
    );
  }
}
