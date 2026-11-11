# LicenScale - Weighing Scale Verification & Job Order Management

An enterprise Legal Metrology verification and scale compliance management platform. Built with a high-performance **React + Tailwind CSS** frontend and a **Python Deep Learning (EasyOCR / PyTorch)** backend for extracting details from scanned Verification Certificates (VC).

---

## 📁 Repository Structure

```
LicenseScale/
├── frontend/                  # React + Vite + Tailwind CSS Application
│   ├── src/
│   │   ├── components/        # View components (JobOrderWizard, Dashboard, Customers, etc.)
│   │   ├── utils/             # Frontend OCR API connector & formatters
│   │   ├── App.jsx            # Main app shell & sidebar navigation
│   │   └── main.jsx           # React DOM root entry
│   ├── public/                # Static icons and assets
│   ├── package.json           # Frontend dependencies
│   └── vite.config.js         # Vite configuration
│
├── backend/                   # Python FastAPI Deep Learning OCR Server
│   ├── main.py                # FastAPI web server with CORS & file upload endpoint
│   ├── ocr_engine.py          # Deep Learning OCR pipeline (EasyOCR / PyTorch / OpenCV)
│   └── requirements.txt       # Python dependencies (FastAPI, uvicorn, easyocr, etc.)
│
├── .gitignore                 # Configured to ignore node_modules, dist, __pycache__, etc.
└── README.md                  # Project documentation
```

---

## 🚀 Getting Started

### 1. Start the Backend OCR Server (Port 8000)

```bash
cd backend
python -m uvicorn main:app --port 8000 --reload
```
* Or directly:
```bash
python backend/main.py
```
The OCR API will be live at `http://localhost:8000` with Swagger docs available at `http://localhost:8000/docs`.

#### Endpoints:
- `GET /api/health` - Health check endpoint.
- `POST /api/extract-vc` - Accepts `multipart/form-data` image file (`file`) and returns structured Legal Metrology fields:
  - Certificate / CV Number (e.g., `TNI/438/002571`)
  - Verification & Next Due Dates
  - Trader Number & Application Number
  - Customer Firm Name & Premises Address
  - Machine Make, Model & Serial Number
  - Capacity & Accuracy Class
  - Stamping Officer, Jurisdiction & Repairer Details

---

### 2. Start the Frontend Application (Port 5173)

Open another terminal and run:

```bash
cd frontend
npm install     # If running for the first time
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🎯 Verification Certificate (VC) OCR Workflow

1. Open **Job Orders** from the left navigation menu.
2. In **Step 1 (Card B: Upload VC Certificate)**, drag and drop or browse a scanned Legal Metrology certificate image.
3. The frontend streams the image to `http://localhost:8000/api/extract-vc`.
4. EasyOCR detects and recognizes the dot-matrix and stamped text, bypassing watermarks and borders.
5. The extracted data automatically fills:
   - Certificate preview on Step 1.
   - All customer, machine, and legal metrology fields in **Step 2 (Customer & Machine Verification)**.
   - Stamping fee and fee schedule in **Step 3 (Fee Schedule & Quotation)**.
   - Clean printable Job Order Card in **Step 4 (Summary & Print)**.
