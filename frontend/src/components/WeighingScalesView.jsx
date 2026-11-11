import React, { useState } from 'react';
import {
  Scale,
  Search,
  Filter,
  Plus,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Building,
  ArrowUpRight,
} from 'lucide-react';

export default function WeighingScalesView({ onNavigateToJobOrder }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  const scalesList = [
    {
      machineId: 'WM-1009',
      customer: 'Anand Pharma Ltd',
      make: 'Shimadzu',
      model: 'ATX224 Analytical Balance',
      class: 'Class I',
      capacity: '220 g (d=0.1 mg)',
      serial: 'SH-2022-8812',
      lastVerified: '25-Dec-2025',
      expiry: '25-Dec-2026',
      status: 'Expiring Soon',
      statusBadge: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      machineId: 'SL-402',
      customer: 'Precision Weigh Tech',
      make: 'Mettler Toledo',
      model: 'ME204 Precision Scale',
      class: 'Class II',
      capacity: '2000 g (d=0.01 g)',
      serial: 'MT-2023-4419',
      lastVerified: '10-Dec-2025',
      expiry: '10-Dec-2026',
      status: 'Expiring Soon',
      statusBadge: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      machineId: 'LAK-550',
      customer: 'Sri Lakshmi Steels',
      make: 'Avery India',
      model: 'E1205 Pitless Weighbridge',
      class: 'Class III',
      capacity: '60,000 kg (60T)',
      serial: 'WB-2023-8991',
      lastVerified: '15-Jan-2026',
      expiry: '15-Jan-2027',
      status: 'Valid',
      statusBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      machineId: 'APX-88',
      customer: 'Apex Mills & Ginning Factory',
      make: 'Avery Weigh-Tronix',
      model: 'Pitless Road Weighbridge',
      class: 'Class III',
      capacity: '50,000 kg (50T)',
      serial: 'AWT-2021-0021',
      lastVerified: '28-Oct-2025',
      expiry: '28-Oct-2026',
      status: 'Expired',
      statusBadge: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      machineId: 'KAV-310',
      customer: 'Kaveri Agro Commodities',
      make: 'Essae',
      model: 'DS-215 Platform Scale',
      class: 'Class III',
      capacity: '500 kg (d=100 g)',
      serial: 'ES-2024-1184',
      lastVerified: '18-Feb-2026',
      expiry: '18-Feb-2027',
      status: 'Valid',
      statusBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ];

  const filtered = scalesList.filter((s) => {
    const match =
      s.machineId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.model.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedClass === 'all') return match;
    return match && s.class.toLowerCase() === selectedClass.toLowerCase();
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1550px] mx-auto w-full space-y-6">
      {/* 4 Summary Stat Blocks (similar to Customer page) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Total Scales</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">62</div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">↑ 4 added this quarter</span>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Valid & Certified</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0062ff] mt-1">47</div>
          <span className="text-[11px] text-gray-400 font-medium mt-1 inline-block">Active calibration</span>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Expiring in 45 Days</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">9</div>
          <span className="text-[11px] text-amber-600 font-medium mt-1 inline-block">Re-verification due</span>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Expired Scales</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 mt-1">6</div>
          <span className="text-[11px] text-rose-600 font-medium mt-1 inline-block">Stamping expired</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search machine ID, customer, model..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0062ff]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['all', 'class i', 'class ii', 'class iii'].map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase whitespace-nowrap transition-colors cursor-pointer ${
                selectedClass === cls
                  ? 'bg-[#0062ff] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200/70'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      {/* Scales Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Machine ID</th>
                <th className="py-3.5 px-4 font-semibold">Customer</th>
                <th className="py-3.5 px-4 font-semibold">Make & Model</th>
                <th className="py-3.5 px-4 font-semibold">Accuracy Class</th>
                <th className="py-3.5 px-4 font-semibold">Capacity</th>
                <th className="py-3.5 px-4 font-semibold">Expiry Date</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((scale) => (
                <tr key={scale.machineId} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-[#0062ff] bg-blue-50 px-2 py-1 rounded-md text-xs">
                      {scale.machineId}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-900">{scale.customer}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-gray-800">{scale.make}</div>
                    <div className="text-[11px] text-gray-500">{scale.model}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                      {scale.class}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-700 text-xs font-medium">{scale.capacity}</td>
                  <td className="py-3.5 px-4 text-gray-700 text-xs">{scale.expiry}</td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${scale.statusBadge}`}>
                      {scale.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={onNavigateToJobOrder}
                      className="text-xs font-semibold text-[#0062ff] hover:text-[#0055df] hover:underline cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>Re-verify</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
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
