import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  MapPin,
  Scale,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowUpRight,
} from 'lucide-react';

export default function CustomersView({ onNavigateToJobOrder }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const customers = [
    {
      id: 'CUST-001',
      name: 'Anand Pharma Ltd',
      contactPerson: 'S. Anandhan',
      phone: '+91 98421 11200',
      email: 'compliance@anandpharma.in',
      location: 'Ambattur Industrial Estate, Chennai',
      scalesCount: 4,
      status: 'Expiring Soon',
      statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
      lastRenewal: '10-Nov-2025',
    },
    {
      id: 'CUST-002',
      name: 'Sri Lakshmi Steels & Weighbridges',
      contactPerson: 'K. Rajasekaran',
      phone: '+91 98421 55678',
      email: 'lakshmisteels@example.com',
      location: 'SIDCO Industrial Estate, Coimbatore',
      scalesCount: 6,
      status: 'Active',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      lastRenewal: '15-Dec-2025',
    },
    {
      id: 'CUST-003',
      name: 'Precision Weigh Tech',
      contactPerson: 'M. Vignesh',
      phone: '+91 94432 99810',
      email: 'vignesh@precisionweigh.com',
      location: 'Thuvakudi, Trichy',
      scalesCount: 2,
      status: 'Active',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      lastRenewal: '04-Jan-2026',
    },
    {
      id: 'CUST-004',
      name: 'Apex Mills & Ginning Factory',
      contactPerson: 'R. Periyasamy',
      phone: '+91 97890 44321',
      email: 'contact@apexmills.org',
      location: 'Palladam Road, Tirupur',
      scalesCount: 5,
      status: 'Expired',
      statusColor: 'bg-rose-50 text-rose-700 border-rose-200',
      lastRenewal: '28-Oct-2025',
    },
    {
      id: 'CUST-005',
      name: 'Kaveri Agro Commodities',
      contactPerson: 'G. Suresh Kumar',
      phone: '+91 99440 22319',
      email: 'kaveriagro@yahoo.com',
      location: 'Market Committee Road, Erode',
      scalesCount: 3,
      status: 'Active',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      lastRenewal: '18-Feb-2026',
    },
  ];

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm);
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && c.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1550px] mx-auto w-full space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Customer Directory
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage client profiles, contact information, and connected weighing machines.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToJobOrder}
            className="bg-[#0062ff] hover:bg-[#0055df] text-white font-semibold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create Job Order</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Total Customers</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">24</div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">↑ 3 new this month</span>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Active Licenses</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0062ff] mt-1">42</div>
          <span className="text-[11px] text-gray-400 font-medium mt-1 inline-block">Across all clients</span>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Expiring in 45 Days</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">8</div>
          <span className="text-[11px] text-amber-600 font-medium mt-1 inline-block">Reminders scheduled</span>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Expired Licenses</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 mt-1">3</div>
          <span className="text-[11px] text-rose-600 font-medium mt-1 inline-block">Urgent action needed</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by customer name, mobile..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0062ff]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['all', 'active', 'expiring soon', 'expired'].map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === filter
                  ? 'bg-[#0062ff] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200/70'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Customer / Firm</th>
                <th className="py-3.5 px-4 font-semibold">Contact Info</th>
                <th className="py-3.5 px-4 font-semibold">Location</th>
                <th className="py-3.5 px-4 font-semibold text-center">Scales Tracked</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-gray-900">{cust.name}</div>
                    <div className="text-[11px] text-gray-400 font-medium">{cust.id}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-gray-800 font-medium flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <span>{cust.phone}</span>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                      <Mail className="w-3 h-3 text-gray-400" />
                      <span>{cust.email}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 text-xs">
                    <div className="flex items-center gap-1.5 max-w-xs truncate">
                      <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                      <span className="truncate">{cust.location}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-800 bg-gray-100 px-2.5 py-1 rounded-md">
                      <Scale className="w-3.5 h-3.5 text-[#0062ff]" />
                      <span>{cust.scalesCount}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${cust.statusColor}`}>
                      {cust.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={onNavigateToJobOrder}
                      className="text-xs font-semibold text-[#0062ff] hover:text-[#0055df] hover:underline cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>New Job</span>
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

