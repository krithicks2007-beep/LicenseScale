import React, { useState, useRef } from 'react';
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
} from 'lucide-react';

export default function JobOrderWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Form state for subsequent steps
  const [formData, setFormData] = useState({
    customerName: 'Sri Lakshmi Steels & Weighbridges',
    contactPerson: 'K. Rajasekaran',
    phone: '+91 98421 55678',
    email: 'lakshmisteels@example.com',
    address: '42/1, Industrial Estate, SIDCO, Coimbatore - 641021',
    scaleMake: 'Avery India',
    scaleModel: 'E1205 Pitless Weighbridge',
    serialNo: 'WB-2023-8991',
    capacity: '60,000 kg (60 Tonnes)',
    division: '10 kg',
    lastVerificationDate: '2025-11-14',
    nextDueDate: '2026-11-14',
    govtStampingFee: '2500',
    serviceCharge: '1200',
    calibrationFee: '800',
    gstPercent: '18',
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
    setSearchResults([
      {
        id: 'CERT-2024-8841',
        customerName: 'Sri Lakshmi Steels & Weighbridges',
        mobile: '+91 98421 55678',
        scaleType: 'Electronic Weighbridge 60T',
        expiry: '15-Dec-2024',
      },
    ]);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
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
      setUploadedFile(e.dataTransfer.files[0]);
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

        {/* STEP 1: Search / Upload (EXACT IMAGE RECREATION) */}
        {currentStep === 1 && (
          <>
            <div className="text-center my-4 sm:my-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Step 1 : Find Existing Record or Upload Certificate
              </h2>
            </div>

            <div className="my-auto py-4">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-stretch gap-6 lg:gap-4 relative">
                {/* Card A: Search Existing Record */}
                <div className="bg-[#f0f6ff] border border-blue-100 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-between transition-all hover:shadow-sm">
                  <div className="flex flex-col items-center w-full">
                    {/* Search Icon Circle */}
                    <div className="w-16 h-16 rounded-full bg-[#dbeafe] flex items-center justify-center mb-4">
                      <Search className="w-8 h-8 text-[#0062ff] stroke-[2.5]" />
                    </div>

                    {/* Subheading */}
                    <h3 className="text-lg sm:text-[19px] font-bold text-gray-900 mb-6 text-center">
                      A. Search Existing Record
                    </h3>

                    {/* Search Input Box */}
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

                      {/* Search Button */}
                      <div className="flex justify-center mt-6">
                        <button
                          type="submit"
                          className="bg-[#0062ff] hover:bg-[#0055df] active:scale-[0.98] text-white font-semibold text-sm px-10 py-2.5 rounded-lg transition-all shadow-sm cursor-pointer"
                        >
                          Search
                        </button>
                      </div>
                    </form>

                    {/* Search Result Feedback */}
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
                        <div className="text-gray-500">Cert: {searchResults[0].id} | {searchResults[0].mobile}</div>
                        <button
                          onClick={() => setCurrentStep(2)}
                          className="mt-2 text-xs font-semibold text-[#0062ff] hover:underline flex items-center gap-1"
                        >
                          <span>Use this record</span>
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

                {/* Card B: Upload VC Certificate */}
                <div className="bg-[#f2fcf5] border border-green-100 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-between transition-all hover:shadow-sm">
                  <div className="flex flex-col items-center w-full">
                    <div className="w-16 h-16 rounded-full bg-[#dcfce7] flex items-center justify-center mb-4">
                      <CloudUpload className="w-8 h-8 text-[#16a34a] stroke-[2.3]" />
                    </div>

                    <h3 className="text-lg sm:text-[19px] font-bold text-gray-900 mb-5 text-center">
                      B. Upload VC Certificate
                    </h3>

                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`w-full max-w-md border-2 border-dashed rounded-xl py-6 px-4 flex flex-col items-center justify-center transition-all ${
                        isDragging
                          ? 'border-[#16a34a] bg-green-50/80 scale-[1.01]'
                          : 'border-[#86efac] bg-emerald-50/20 hover:bg-emerald-50/40'
                      }`}
                    >
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
                        accept=".pdf,.png,.jpg,.jpeg"
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

                      {uploadedFile && (
                        <div className="mt-3 flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-green-300 text-xs text-gray-800 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                          <span className="truncate max-w-[200px]">{uploadedFile.name}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setUploadedFile(null);
                            }}
                            className="text-gray-400 hover:text-red-500 ml-1 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* STEP 2: Verify & Edit */}
        {currentStep === 2 && (
          <div className="py-4 my-auto">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Step 2 : Verify & Edit Customer & Scale Details
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Please verify the extracted details and correct any discrepancies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Customer Section */}
              <div className="border border-gray-200 rounded-xl p-5 bg-slate-50/50">
                <div className="flex items-center gap-2 mb-4 text-[#0062ff] font-semibold text-sm">
                  <Building className="w-4 h-4" />
                  <span>Customer Information</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Customer / Firm Name</label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#0062ff]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Contact Person</label>
                      <input
                        type="text"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#0062ff]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Mobile No.</label>
                      <input
                        type="text"
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
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#0062ff]"
                    />
                  </div>
                </div>
              </div>

              {/* Weighing Scale Section */}
              <div className="border border-gray-200 rounded-xl p-5 bg-slate-50/50">
                <div className="flex items-center gap-2 mb-4 text-[#0062ff] font-semibold text-sm">
                  <Scale className="w-4 h-4" />
                  <span>Weighing Scale Specifications</span>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Make / Brand</label>
                      <input
                        type="text"
                        value={formData.scaleMake}
                        onChange={(e) => handleInputChange('scaleMake', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#0062ff]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Model</label>
                      <input
                        type="text"
                        value={formData.scaleModel}
                        onChange={(e) => handleInputChange('scaleModel', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#0062ff]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Serial Number</label>
                      <input
                        type="text"
                        value={formData.serialNo}
                        onChange={(e) => handleInputChange('serialNo', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#0062ff]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Capacity</label>
                      <input
                        type="text"
                        value={formData.capacity}
                        onChange={(e) => handleInputChange('capacity', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#0062ff]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Last Verification</label>
                      <input
                        type="date"
                        value={formData.lastVerificationDate}
                        onChange={(e) => handleInputChange('lastVerificationDate', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#0062ff]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Next Expiry Date</label>
                      <input
                        type="date"
                        value={formData.nextDueDate}
                        onChange={(e) => handleInputChange('nextDueDate', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#0062ff]"
                      />
                    </div>
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
                Calculate official government stamping fees, calibration charges, and service tax.
              </p>
            </div>

            <div className="max-w-2xl mx-auto bg-slate-50/60 border border-gray-200 rounded-2xl p-6 sm:p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-sm font-semibold text-gray-800">Govt. Stamping / Re-verification Fee</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-500">₹</span>
                    <input
                      type="number"
                      value={formData.govtStampingFee}
                      onChange={(e) => handleInputChange('govtStampingFee', e.target.value)}
                      className="w-32 px-3 py-1.5 text-right bg-white border border-gray-300 rounded-lg text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-sm font-semibold text-gray-800">Calibration & Testing Fee</span>
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
                  <span className="text-sm font-semibold text-gray-800">Service & Documentation Charges</span>
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
                  <div className="font-bold text-gray-900 text-base">{formData.customerName}</div>
                  <div className="text-sm text-gray-600">{formData.contactPerson} • {formData.phone}</div>
                  <div className="text-xs text-gray-500 mt-1">{formData.address}</div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Weighing Scale</h4>
                  <div className="font-bold text-gray-900 text-base">{formData.scaleMake} - {formData.scaleModel}</div>
                  <div className="text-sm text-gray-600">S/N: {formData.serialNo} • Cap: {formData.capacity}</div>
                  <div className="text-xs text-gray-500 mt-1">Due Date: {formData.nextDueDate}</div>
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
              Official Job Order <span className="font-bold text-gray-900">#JO-2026-0042</span> has been registered and assigned for verification.
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
          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => {
              setCurrentStep(1);
              setSearchQuery('');
              setSearchResults(null);
              setUploadedFile(null);
            }}
            className="border border-gray-800 hover:bg-gray-50 text-gray-900 font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Previous Button */}
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

            {/* Next / Submit Button */}
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
