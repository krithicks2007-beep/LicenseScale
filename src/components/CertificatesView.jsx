import React, { useState } from 'react';
import {
  FileCheck2,
  Search,
  Download,
  Eye,
  Calendar,
  CheckCircle2,
  Clock,
  Printer,
  FileBadge,
} from 'lucide-react';

export default function CertificatesView() {
  const [searchTerm, setSearchTerm] = useState('');

  const certificates = [
    {
      certNo: 'VC-TN-2026-9041',
      machineId: 'WM-1009',
      customer: 'Anand Pharma Ltd',
      inspector: 'S. Rajagopalan (Insp. Legal Metrology)',
      issuedDate: '26-Dec-2025',
      validUntil: '25-Dec-2026',
      stampingFee: '₹ 1,500',
      status: 'Valid',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      certNo: 'VC-TN-2026-7812',
      machineId: 'SL-402',
      customer: 'Precision Weigh Tech',
      inspector: 'M. Karunakaran (Senior Inspector)',
      issuedDate: '11-Dec-2025',
      validUntil: '10-Dec-2026',
      stampingFee: '₹ 1,200',
      status: 'Valid',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      certNo: 'VC-TN-2026-6610',
      machineId: 'LAK-550',
      customer: 'Sri Lakshmi Steels',
      inspector: 'V. Sundaram (Deputy Controller)',
      issuedDate: '16-Jan-2026',
      validUntil: '15-Jan-2027',
      stampingFee: '₹ 3,500',
      status: 'Valid',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      certNo: 'VC-TN-2025-4402',
      machineId: 'APX-88',
      customer: 'Apex Mills & Ginning Factory',
      inspector: 'K. Balakrishnan (Inspector)',
      issuedDate: '29-Oct-2024',
      validUntil: '28-Oct-2025',
      stampingFee: '₹ 3,000',
      status: 'Expired',
      statusColor: 'bg-rose-50 text-rose-700 border-rose-200',
    },
  ];

  const filtered = certificates.filter(
    (c) =>
      c.certNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.machineId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1550px] mx-auto w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Verification Certificates (VC)
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Government stamping certificates, test memos, and digital verification seals.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search certificate no, customer, machine..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0062ff]"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Certificate No</th>
                <th className="py-3.5 px-4 font-semibold">Machine ID</th>
                <th className="py-3.5 px-4 font-semibold">Customer Name</th>
                <th className="py-3.5 px-4 font-semibold">Issuing Officer</th>
                <th className="py-3.5 px-4 font-semibold">Validity</th>
                <th className="py-3.5 px-4 font-semibold">Stamping Fee</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((cert) => (
                <tr key={cert.certNo} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900 flex items-center gap-1.5">
                      <FileBadge className="w-4 h-4 text-[#0062ff]" />
                      <span>{cert.certNo}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-800">{cert.machineId}</td>
                  <td className="py-3.5 px-4 text-gray-900 font-medium">{cert.customer}</td>
                  <td className="py-3.5 px-4 text-gray-600 text-xs">{cert.inspector}</td>
                  <td className="py-3.5 px-4 text-gray-700 text-xs">
                    <div>Until: {cert.validUntil}</div>
                    <div className="text-[11px] text-gray-400">Issued: {cert.issuedDate}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-800">{cert.stampingFee}</td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${cert.statusColor}`}>
                      {cert.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => alert(`Downloading Certificate ${cert.certNo}`)}
                      className="text-xs font-semibold text-[#0062ff] hover:bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-200 cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

