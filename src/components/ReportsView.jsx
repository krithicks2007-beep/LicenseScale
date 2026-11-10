import React, { useState } from 'react';
import {
  BarChart2,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Printer,
  Scale,
} from 'lucide-react';

export default function ReportsView() {
  const [selectedPeriod, setSelectedPeriod] = useState('2026');

  const monthlyCollections = [
    { month: 'Jun', stamping: 18500, service: 12000, total: 30500 },
    { month: 'Jul', stamping: 22000, service: 14500, total: 36500 },
    { month: 'Aug', stamping: 19800, service: 13200, total: 33000 },
    { month: 'Sep', stamping: 26400, service: 17000, total: 43400 },
    { month: 'Oct', stamping: 31200, service: 20500, total: 51700 },
    { month: 'Nov', stamping: 38500, service: 24800, total: 63300 },
  ];

  const maxTotal = Math.max(...monthlyCollections.map((m) => m.total));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1550px] mx-auto w-full space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Financial & Stamping Reports
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Audit logs, government fee reconciliation, and annual calibration revenue analytics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Exporting Report as CSV...')}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => window.print()}
            className="bg-[#0062ff] hover:bg-[#0055df] text-white font-semibold text-sm px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
            <span>Total Fees Collected</span>
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-gray-900 mt-2">₹ 2,58,400</div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">↑ 18.4% vs last period</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
            <span>Government Stamping Share</span>
            <span className="p-2 rounded-lg bg-blue-50 text-[#0062ff]">
              <Scale className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-[#0062ff] mt-2">₹ 1,56,400</div>
          <span className="text-xs text-gray-500 font-medium mt-1 inline-block">Remitted to Legal Metrology Dept</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
            <span>License Compliance Rate</span>
            <span className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-extrabold text-indigo-600 mt-2">94.8%</div>
          <span className="text-xs text-gray-500 font-medium mt-1 inline-block">42 of 45 machines verified</span>
        </div>
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              Monthly Revenue & Stamping Breakdown (₹)
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Government fee vs service and calibration charges</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#0062ff]" />
              <span className="text-gray-700">Govt Fee</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#16a34a]" />
              <span className="text-gray-700">Service Fee</span>
            </div>
          </div>
        </div>

        {/* Visual Stacked Bars */}
        <div className="h-64 flex items-end justify-between px-4 sm:px-8 pt-6 pb-2 border-b border-gray-100">
          {monthlyCollections.map((m) => {
            const stampingHeight = (m.stamping / maxTotal) * 100;
            const serviceHeight = (m.service / maxTotal) * 100;

            return (
              <div key={m.month} className="flex flex-col items-center flex-1 h-full justify-end group">
                <span className="text-[11px] font-bold text-gray-800 mb-2">
                  ₹{(m.total / 1000).toFixed(1)}k
                </span>
                <div className="w-10 sm:w-14 flex flex-col justify-end rounded-t-lg overflow-hidden h-44 bg-slate-100">
                  <div
                    style={{ height: `${serviceHeight}%` }}
                    className="w-full bg-[#16a34a] hover:bg-emerald-600 transition-all"
                  />
                  <div
                    style={{ height: `${stampingHeight}%` }}
                    className="w-full bg-[#0062ff] hover:bg-blue-700 transition-all"
                  />
                </div>
                <span className="text-xs font-semibold text-gray-600 mt-2">{m.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

