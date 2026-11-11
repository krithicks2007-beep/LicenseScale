import React, { useState, useRef, useEffect } from 'react';
import Stepper from './Stepper';
import {
  Search,
  CloudUpload,
  Upload,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  X,
  Building,
  Scale,
  Calendar,
  DollarSign,
  FileText,
  Printer,
  RotateCcw,
  Sparkles,
  Loader2,
  Eye,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Cpu,
} from 'lucide-react';
import {
  extractDetailsFromImage,
  toInputDateFormat,
  checkBackendHealth,
  IS_LOCAL,
} from '../utils/ocrParser';

export default function JobOrderWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Backend connection status
  const [backendOnline, setBackendOnline] = useState(null); // null = checking, true = up, false = down

  // OCR state
  const [ocrStatus, setOcrStatus] = useState('idle'); // 'idle' | 'processing' | 'done' | 'error'
  const [ocrProgress, setOcrProgress] = useState(0);
  const [ocrErrorMsg, setOcrErrorMsg] = useState('');
  const [extractedData, setExtractedData] = useState(null);
  const [showRawText, setShowRawText] = useState(false);

  useEffect(() => {
    let isMounted = true;
    checkBackendHealth().then((isUp) => {
      if (isMounted) setBackendOnline(isUp);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Clean dynamic form state - ZERO hardcoded fallbacks
  const [formData, setFormData] = useState({
    cvNumber: '',
    traderNo: '',
    applicationNo: '',
    customerName: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    scaleMake: '',
    scaleModel: '',
    serialNo: '',
    capacity: '',
    accuracyClass: '',
    division: '',
    lastVerificationDate: '',
    nextDueDate: '',
    govtStampingFee: '',
    serviceCharge: '350',
    calibrationFee: '250',
    gstPercent: '18',
    officerName: '',
    repairer: '',
    repairerLicence: '',
    receiptNo: '',
  });

  const handleInputChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }
    const q = searchQuery.trim();
    setSearchResults([
      {
        id: q.toUpperCase(),
        customerName: `Found Record for: ${q}`,
        mobile: '+91 98421 55678',
        scaleType: 'Electronic Weighing Scale',
        expiry: '15-Dec-2026',
      },
    ]);
  };

  // OCR Processing logic - extracts strictly what is in the uploaded file
  const processFileForOCR = async (file) => {
    if (!file) return;
    setUploadedFile(file);

    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }

    setOcrStatus('processing');
    setOcrProgress(10);
    setOcrErrorMsg('');

    try {
      const result = await extractDetailsFromImage(file, (p) => {
        setOcrProgress(p);
      });

      const data = result.data || {};
      setExtractedData({
        ...data,
        rawText: result.rawText,
        rawLines: result.rawLines,
      });
      setOcrStatus('done');
      setBackendOnline(true);

      // Set ONLY the actual values extracted from THIS uploaded file
      setFormData((prev) => ({
        ...prev,
        cvNumber: data.cvNumber || '',
        traderNo: data.traderNo || '',
        applicationNo: data.applicationNo || '',
        customerName: data.customerName || '',
        address: data.customerAddress || '',
        scaleMake: data.scaleMake || '',
        scaleModel: data.scaleModel || '',
        serialNo: data.serialNo || '',
        capacity: data.capacity || '',
        accuracyClass: data.accuracyClass || '',
        lastVerificationDate: toInputDateFormat(data.verificationDate) || '',
        nextDueDate: toInputDateFormat(data.nextDueDate) || '',
        govtStampingFee: data.stampingFee ? String(parseInt(data.stampingFee, 10) || data.stampingFee) : '',
        officerName: data.officerName ? `${data.officerName}${data.stampingOffice ? `, ${data.stampingOffice}` : ''}` : '',
        repairer: data.repairer || '',
        repairerLicence: data.repairerLicence || '',
        receiptNo: data.receiptNo || '',
      }));
    } catch (err) {
      console.error(err);
      setOcrStatus('error');
      setOcrErrorMsg(err.message || 'Error communicating with OCR server.');
      setBackendOnline(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFileForOCR(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFileForOCR(e.dataTransfer.files[0]);
    }
  };

  const calculateSubtotal = () => {
    const govt = Number(formData.govtStampingFee) || 0;
    const serv = Number(formData.serviceCharge) || 0;
    const cal = Number(formData.calibrationFee) || 0;
    return govt + serv + cal;
  };

  const calculateTax = () => {
    const sub = calculateSubtotal();
    const gst = Number(formData.gstPercent) || 0;
    return (sub * gst) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
      {/* Main Container Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200/90 p-6 sm:p-8 lg:p-10 flex flex-col min-h-[640px]">
        {/* Stepper Wizard Navigation */}
        <div className="mb-6">
          <Stepper currentStep={currentStep} onStepClick={setCurrentStep} />
        </div>

        {/* STEP 1: Search / Upload */}
        {currentStep === 1 && (
          <>
            <div className="text-center my-4 sm:my-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Step 1 : Find Existing Record or Upload Certificate
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Upload a scanned Verification Certificate (VC) to automatically extract all customer, scale & fee details via OCR.
              </p>
            </div>

            <div className="my-auto py-4">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-stretch gap-6 lg:gap-4 relative">
                {/* Card A: Search Existing Record */}
                <div className="bg-[#f0f6ff] border border-blue-100 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-between transition-all hover:shadow-sm">
                  <div className="flex flex-col items-center w-full">
                    <div className="w-16 h-16 rounded-full bg-[#dbeafe] flex items-center justify-center mb-4">
                      <Search className="w-8 h-8 text-[#0062ff] stroke-[2.5]" />
                    </div>

                    <h3 className="text-lg sm:text-[19px] font-bold text-gray-900 mb-6 text-center">
                      A. Search Existing Record
                    </h3>

                    <form onSubmit={handleSearch} className="w-full max-w-md">
                      <div className="relative flex items-center">
                        <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Enter Certificate No. / Mobile No. / Customer Name"
                          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0062ff] focus:border-transparent transition-all shadow-2xs"
                        />
                      </div>

                      <div className="flex justify-center mt-6">
                        <button
                          type="submit"
                          className="bg-[#0062ff] hover:bg-[#0055df] active:scale-[0.98] text-white font-semibold text-sm px-10 py-2.5 rounded-lg transition-all shadow-sm cursor-pointer"
                        >
                          Search
                        </button>
                      </div>
                    </form>

                    {searchResults && (
                      <div className="w-full max-w-md mt-4 p-3.5 bg-white rounded-lg border border-blue-200 text-left text-xs text-gray-700 shadow-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-[#0062ff]">Record Found:</span>
                          <button
                            onClick={() => setSearchResults(null)}
                            className="text-gray-400 hover:text-gray-600 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="font-semibold text-gray-900">{searchResults[0].customerName}</div>
                        <div className="text-gray-500">Ref: {searchResults[0].id} | {searchResults[0].mobile}</div>
                        <button
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              customerName: searchResults[0].customerName,
                              cvNumber: searchResults[0].id,
                            }));
                            setCurrentStep(2);
                          }}
                          className="mt-2 text-xs font-semibold text-[#0062ff] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Use this record & proceed</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* OR Divider */}
                <div className="flex lg:flex-col items-center justify-center my-2 lg:my-0 relative">
                  <div className="hidden lg:block w-[1.5px] h-full bg-gray-200" />
                  <div className="block lg:hidden h-[1.5px] w-full bg-gray-200" />

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-[#93c5fd] rounded-full w-10 h-10 flex items-center justify-center shadow-xs">
                    <span className="text-xs font-bold text-[#0062ff] tracking-wide">
                      OR
                    </span>
                  </div>
                </div>

                {/* Card B: Upload VC Certificate (PURE DYNAMIC OCR) */}
                <div className="bg-[#f2fcf5] border border-green-100 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-between transition-all hover:shadow-sm">
                  <div className="flex flex-col items-center w-full">
                    <div className="w-16 h-16 rounded-full bg-[#dcfce7] flex items-center justify-center mb-4">
                      <CloudUpload className="w-8 h-8 text-[#16a34a] stroke-[2.3]" />
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                      <h3 className="text-lg sm:text-[19px] font-bold text-gray-900 text-center">
                        B. Upload VC Certificate
                      </h3>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>EasyOCR AI</span>
                      </span>
                    </div>

                    {backendOnline === null && (
                      <div className="w-full max-w-md mb-3 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-[11px] flex items-center gap-2">
                        <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin shrink-0" />
                        <span>Connecting to OCR engine...</span>
                      </div>
                    )}

                    {backendOnline === false && (
                      <div className="w-full max-w-md mb-3 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-[11px] flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-medium">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>
                            {IS_LOCAL ? 'Local OCR Backend offline' : 'Cloud OCR Server waking up...'}
                          </span>
                        </span>
                        {IS_LOCAL ? (
                          <code className="text-[10px] bg-amber-100 px-1.5 py-0.5 rounded text-amber-900 font-mono">
                            cd backend; python main.py
                          </code>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setBackendOnline(null);
                              checkBackendHealth().then((up) => setBackendOnline(up));
                            }}
                            className="text-[10px] bg-amber-100 hover:bg-amber-200 active:scale-95 text-amber-900 px-2 py-0.5 rounded font-semibold transition-all cursor-pointer"
                          >
                            Retry Connection
                          </button>
                        )}
                      </div>
                    )}

                    {backendOnline === true && (
                      <div className="w-full max-w-md mb-3 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-[11px] flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>OCR Engine Active</span>
                        </span>
                        <span className="text-[10px] bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-900 font-medium">
                          {IS_LOCAL ? 'Local Host' : 'Render Cloud'}
                        </span>
                      </div>
                    )}

                    {/* Drag and Drop Zone */}
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`w-full max-w-md border-2 border-dashed rounded-xl py-6 px-4 flex flex-col items-center justify-center transition-all relative ${
                        isDragging
                          ? 'border-[#16a34a] bg-green-50/80 scale-[1.01]'
                          : 'border-[#86efac] bg-emerald-50/20 hover:bg-emerald-50/40'
                      }`}
                    >
                      {ocrStatus === 'processing' ? (
                        <div className="py-6 flex flex-col items-center justify-center space-y-3 w-full">
                          <Loader2 className="w-10 h-10 text-[#0062ff] animate-spin" />
                          <div className="text-center">
                            <span className="text-sm font-bold text-gray-900 block">
                              Scanning Certificate with OCR...
                            </span>
                            <span className="text-xs text-gray-500 font-medium">
                              Reading actual text from image ({ocrProgress}%)
                            </span>
                          </div>
                          <div className="w-3/4 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-[#0062ff] h-2 transition-all duration-300 rounded-full"
                              style={{ width: `${Math.max(10, ocrProgress)}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 flex items-center justify-center mb-2">
                            <CloudUpload className="w-10 h-10 text-[#0062ff] stroke-[2]" />
                          </div>

                          <p className="text-sm font-semibold text-gray-800 text-center mb-1">
                            Drag & drop certificate here
                          </p>
                          <span className="text-xs text-gray-500 mb-3 font-medium">or</span>

                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*,.pdf"
                            className="hidden"
                          />

                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-[#008744] hover:bg-[#00733a] active:scale-[0.98] text-white font-semibold text-sm px-6 py-2 rounded-lg flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                          >
                            <Upload className="w-4 h-4 stroke-[2.5]" />
                            <span>Upload File</span>
                          </button>
                        </>
                      )}
                    </div>

                    {/* OCR Error Display */}
                    {ocrStatus === 'error' && (
                      <div className="w-full max-w-md mt-4 p-3.5 bg-red-50 rounded-xl border border-red-200 text-left animate-fadeIn">
                        <div className="flex items-start gap-2.5">
                          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                          <div className="flex-1">
                            <p className="text-xs font-bold text-red-800">Extraction Error</p>
                            <p className="text-[11px] text-red-700 mt-0.5 break-words">{ocrErrorMsg}</p>
                            <div className="mt-2 pt-2 border-t border-red-100 text-[11px] text-gray-600">
                              <span>To run OCR backend: </span>
                              <code className="bg-red-100 px-1 py-0.5 rounded text-red-900 font-mono text-[10px]">
                                cd backend; python -m uvicorn main:app --port 8000
                              </code>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* OCR EXTRACTED DETAILS PREVIEW */}
                    {ocrStatus === 'done' && extractedData && (
                      <div className="w-full max-w-md mt-4 p-4 bg-white rounded-xl border border-emerald-300 shadow-xs animate-fadeIn text-left">
                        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                          <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs sm:text-sm">
                            <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                            <span>OCR Extracted from Uploaded File</span>
                          </div>
                          {extractedData.cvNumber && (
                            <span className="text-[11px] font-bold bg-blue-50 text-[#0062ff] px-2 py-0.5 rounded-md border border-blue-200">
                              CV: {extractedData.cvNumber}
                            </span>
                          )}
                        </div>

                        {/* Extracted Fields Grid */}
                        <div className="grid grid-cols-2 gap-2 text-xs my-3 text-gray-700">
                          <div>
                            <span className="text-[10px] font-bold text-gray-400 block uppercase">Customer / Firm</span>
                            <span className="font-semibold text-gray-900 truncate block">
                              {extractedData.customerName || <span className="text-gray-400 font-normal italic">Not detected</span>}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-gray-400 block uppercase">Make & Model</span>
                            <span className="font-semibold text-gray-900 truncate block">
                              {(extractedData.scaleMake || extractedData.scaleModel) ? `${extractedData.scaleMake} ${extractedData.scaleModel}`.trim() : <span className="text-gray-400 font-normal italic">Not detected</span>}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-gray-400 block uppercase">Machine / Serial No</span>
                            <span className="font-semibold text-gray-900">
                              {extractedData.serialNo || <span className="text-gray-400 font-normal italic">Not detected</span>}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-gray-400 block uppercase">Capacity</span>
                            <span className="font-semibold text-gray-900">
                              {extractedData.capacity || <span className="text-gray-400 font-normal italic">Not detected</span>}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-gray-400 block uppercase">Stamping Fee</span>
                            <span className="font-bold text-emerald-600">
                              {extractedData.stampingFee ? `₹ ${extractedData.stampingFee}` : <span className="text-gray-400 font-normal italic">Not detected</span>}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-gray-400 block uppercase">Next Due Date</span>
                            <span className="font-semibold text-amber-600">
                              {extractedData.nextDueDate || <span className="text-gray-400 font-normal italic">Not detected</span>}
                            </span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <button
                            type="button"
                            onClick={() => setShowRawText(!showRawText)}
                            className="text-[11px] font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3 h-3" />
                            <span>{showRawText ? 'Hide Raw Text' : 'View Raw OCR Text'}</span>
                            {showRawText ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>

                          <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            className="bg-[#0062ff] hover:bg-[#0055df] text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1 shadow-xs cursor-pointer"
                          >
                            <span>Verify in Step 2</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Raw Extracted Text Viewer */}
                        {showRawText && (
                          <div className="mt-3 p-2 bg-slate-50 border border-gray-200 rounded-lg max-h-36 overflow-y-auto text-[10px] font-mono text-gray-600 whitespace-pre-wrap">
                            {extractedData.rawText || 'No raw text recognized.'}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* STEP 2: Verify & Edit (ONLY REAL EXTRACTED VALUES) */}
        {currentStep === 2 && (
          <div className="py-4 my-auto">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Step 2 : Verify & Edit Customer & Scale Details
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Details extracted from your uploaded certificate appear below. Please review or adjust if needed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Customer Section */}
              <div className="border border-gray-200 rounded-xl p-5 bg-slate-50/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-[#0062ff] font-semibold text-sm">
                    <Building className="w-4 h-4" />
                    <span>Customer Information</span>
                  </div>
                  {formData.cvNumber && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      CV: {formData.cvNumber}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Customer / Firm Name</label>
                    <input
                      type="text"
                      placeholder="Enter customer / firm name"
                      value={formData.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#0062ff]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Contact Person</label>
                      <input
                        type="text"
                        placeholder="Contact person name"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#0062ff]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Mobile No.</label>
                      <input
                        type="text"
                        placeholder="+91 Mobile number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#0062ff]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Premises Address</label>
                    <textarea
                      rows={2}
                      placeholder="Full premises address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#0062ff]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Stamping Officer / Inspector</label>
                    <input
                      type="text"
                      placeholder="Inspector name & office"
                      value={formData.officerName}
                      onChange={(e) => handleInputChange('officerName', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-700 focus:ring-2 focus:ring-[#0062ff]"
                    />
                  </div>
                </div>
              </div>

              {/* Weighing Scale Section */}
              <div className="border border-gray-200 rounded-xl p-5 bg-slate-50/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-[#0062ff] font-semibold text-sm">
                    <Scale className="w-4 h-4" />
                    <span>Weighing Scale Specifications</span>
                  </div>
                  {formData.accuracyClass && (
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {formData.accuracyClass}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Make / Brand</label>
                      <input
                        type="text"
                        placeholder="e.g. MODERN, AVERY"
                        value={formData.scaleMake}
                        onChange={(e) => handleInputChange('scaleMake', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-900 focus:ring-2 focus:ring-[#0062ff]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Model</label>
                      <input
                        type="text"
                        placeholder="e.g. MSP 300"
                        value={formData.scaleModel}
                        onChange={(e) => handleInputChange('scaleModel', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#0062ff]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Serial / Machine No</label>
                      <input
                        type="text"
                        placeholder="e.g. 67772"
                        value={formData.serialNo}
                        onChange={(e) => handleInputChange('serialNo', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold text-[#0062ff] focus:ring-2 focus:ring-[#0062ff]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Capacity</label>
                      <input
                        type="text"
                        placeholder="e.g. 300 kg"
                        value={formData.capacity}
                        onChange={(e) => handleInputChange('capacity', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#0062ff]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Stamping Date</label>
                      <input
                        type="date"
                        value={formData.lastVerificationDate}
                        onChange={(e) => handleInputChange('lastVerificationDate', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#0062ff]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Next Expiry Due Date</label>
                      <input
                        type="date"
                        value={formData.nextDueDate}
                        onChange={(e) => handleInputChange('nextDueDate', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-amber-700 focus:ring-2 focus:ring-[#0062ff]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Repairer Agency</label>
                    <input
                      type="text"
                      placeholder="Repairer agency name"
                      value={formData.repairer}
                      onChange={(e) => handleInputChange('repairer', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-700 focus:ring-2 focus:ring-[#0062ff]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Charges */}
        {currentStep === 3 && (
          <div className="py-4 my-auto">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Step 3 : Verification & Stamping Charges
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Govt Stamping Fee extracted from certificate:{' '}
                <span className="font-bold text-emerald-600">
                  {formData.govtStampingFee ? `₹ ${formData.govtStampingFee}` : 'Enter fee below'}
                </span>
              </p>
            </div>

            <div className="max-w-2xl mx-auto bg-slate-50/60 border border-gray-200 rounded-2xl p-6 sm:p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <div>
                    <span className="text-sm font-semibold text-gray-800 block">Govt. Stamping Fee</span>
                    <span className="text-xs text-gray-400">Official fee from certificate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-500">₹</span>
                    <input
                      type="number"
                      placeholder="0"
                      value={formData.govtStampingFee}
                      onChange={(e) => handleInputChange('govtStampingFee', e.target.value)}
                      className="w-32 px-3 py-1.5 text-right bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-900"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <div>
                    <span className="text-sm font-semibold text-gray-800 block">Calibration & Testing Fee</span>
                    <span className="text-xs text-gray-400">Technical inspection fee</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-500">₹</span>
                    <input
                      type="number"
                      value={formData.calibrationFee}
                      onChange={(e) => handleInputChange('calibrationFee', e.target.value)}
                      className="w-32 px-3 py-1.5 text-right bg-white border border-gray-300 rounded-lg text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <div>
                    <span className="text-sm font-semibold text-gray-800 block">Service & Documentation Charges</span>
                    <span className="text-xs text-gray-400">Portal submission & handling</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-500">₹</span>
                    <input
                      type="number"
                      value={formData.serviceCharge}
                      onChange={(e) => handleInputChange('serviceCharge', e.target.value)}
                      className="w-32 px-3 py-1.5 text-right bg-white border border-gray-300 rounded-lg text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-200 text-gray-600 text-sm">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹ {calculateSubtotal().toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-200 text-gray-600 text-sm">
                  <span>GST ({formData.gstPercent}%)</span>
                  <span className="font-semibold text-gray-900">₹ {calculateTax().toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between pt-2 text-base font-bold text-gray-900">
                  <span>Total Amount Payable</span>
                  <span className="text-xl font-bold text-[#0062ff]">₹ {calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Review */}
        {currentStep === 4 && (
          <div className="py-4 my-auto">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Step 4 : Review & Confirm Job Order
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Please double check all information before creating the official job order.
              </p>
            </div>

            <div className="max-w-3xl mx-auto border border-gray-200 rounded-2xl p-6 sm:p-8 bg-white shadow-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-100">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Customer</h4>
                  <div className="font-bold text-gray-900 text-base">
                    {formData.customerName || 'Customer Not Specified'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formData.contactPerson || 'No contact'} • {formData.phone || 'No phone'}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{formData.address || 'No address'}</div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Weighing Scale</h4>
                  <div className="font-bold text-gray-900 text-base">
                    {formData.scaleMake || 'Make'} {formData.scaleModel ? `- ${formData.scaleModel}` : ''}
                  </div>
                  <div className="text-sm text-gray-600">
                    S/N: {formData.serialNo || 'N/A'} • Cap: {formData.capacity || 'N/A'}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Next Due: {formData.nextDueDate || 'N/A'}</div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Payable Fee</span>
                  <span className="text-2xl font-bold text-[#0062ff]">₹ {calculateTotal().toLocaleString()}</span>
                </div>
                <div className="text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded-full font-semibold border border-green-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Ready for Submission</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Complete */}
        {currentStep === 5 && (
          <div className="py-8 my-auto text-center flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-green-100 text-[#16a34a] flex items-center justify-center mb-5 animate-bounce">
              <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
              Job Order Created Successfully!
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-md mb-6">
              Official Job Order <span className="font-bold text-gray-900">#JO-2026-0042</span> has been registered for{' '}
              <span className="font-bold text-gray-800">{formData.customerName || 'Customer'}</span>.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold text-sm px-6 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer transition-all shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Print Job Card</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentStep(1);
                  setSearchQuery('');
                  setSearchResults(null);
                  setUploadedFile(null);
                  setOcrStatus('idle');
                  setExtractedData(null);
                }}
                className="bg-[#0062ff] hover:bg-[#0055df] text-white font-semibold text-sm px-6 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer transition-all shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Create Another Job Order</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Navigation Buttons Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setCurrentStep(1);
              setSearchQuery('');
              setSearchResults(null);
              setUploadedFile(null);
              setOcrStatus('idle');
              setExtractedData(null);
            }}
            className="border border-gray-800 hover:bg-gray-50 text-gray-900 font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              className={`font-medium text-sm px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed select-none'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep < 5 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
                className="bg-[#0062ff] hover:bg-[#0055df] text-white font-semibold text-sm px-7 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <span>{currentStep === 4 ? 'Submit Order' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
