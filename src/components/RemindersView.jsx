import React, { useState } from 'react';
import {
  Bell,
  Search,
  Filter,
  Send,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MessageSquare,
  Mail,
  Smartphone,
  CheckCheck,
  RefreshCw,
} from 'lucide-react';

export default function RemindersView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [sentReminders, setSentReminders] = useState({});

  const remindersData = [
    {
      id: 'REM-101',
      customer: 'Anand Pharma Ltd',
      contact: '+91 98421 11200',
      machineId: 'WM-1009',
      model: 'Shimadzu ATX224',
      expiryDate: '25-Dec-2026',
      daysLeft: 45,
      stage: '45-Day',
      stageBadge: 'bg-amber-50 text-amber-700 border-amber-200',
      preferredChannel: 'WhatsApp',
      lastSent: 'Today, 11:30 AM',
      status: 'Sent',
    },
    {
      id: 'REM-102',
      customer: 'Precision Weigh Tech',
      contact: '+91 94432 99810',
      machineId: 'SL-402',
      model: 'Mettler Toledo ME204',
      expiryDate: '10-Dec-2026',
      daysLeft: 30,
      stage: '30-Day',
      stageBadge: 'bg-orange-50 text-orange-700 border-orange-200',
      preferredChannel: 'SMS & WhatsApp',
      lastSent: 'Yesterday',
      status: 'Pending',
    },
    {
      id: 'REM-103',
      customer: 'Apex Mills & Ginning Factory',
      contact: '+91 97890 44321',
      machineId: 'APX-88',
      model: 'Avery Weigh-Tronix 50T',
      expiryDate: '28-Nov-2026',
      daysLeft: 18,
      stage: 'Critical',
      stageBadge: 'bg-rose-50 text-rose-700 border-rose-200',
      preferredChannel: 'Phone & WhatsApp',
      lastSent: '3 days ago',
      status: 'Pending',
    },
    {
      id: 'REM-104',
      customer: 'Sri Lakshmi Steels',
      contact: '+91 98421 55678',
      machineId: 'LAK-550',
      model: 'E1205 Pitless 60T',
      expiryDate: '15-Jan-2027',
      daysLeft: 66,
      stage: '90-Day',
      stageBadge: 'bg-blue-50 text-blue-700 border-blue-200',
      preferredChannel: 'Email',
      lastSent: '01-Nov-2026',
      status: 'Sent',
    },
    {
      id: 'REM-105',
      customer: 'Kaveri Agro Commodities',
      contact: '+91 99440 22319',
      machineId: 'KAV-310',
      model: 'Essae DS-215',
      expiryDate: '18-Feb-2027',
      daysLeft: 100,
      stage: '90-Day',
      stageBadge: 'bg-blue-50 text-blue-700 border-blue-200',
      preferredChannel: 'WhatsApp',
      lastSent: 'Not sent yet',
      status: 'Pending',
    },
  ];

  const handleSendReminder = (id) => {
    setSentReminders((prev) => ({ ...prev, [id]: true }));
  };

  const filtered = remindersData.filter((r) => {
    const match =
      r.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.machineId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.contact.includes(searchTerm);
    if (selectedStage === 'all') return match;
    return match && r.stage.toLowerCase() === selectedStage.toLowerCase();
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1550px] mx-auto w-full space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            License Renewal Reminders
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Automate and track 90-day, 45-day, and 30-day verification expiry alerts to customers.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const allSent = {};
              remindersData.forEach((r) => (allSent[r.id] = true));
              setSentReminders(allSent);
            }}
            className="bg-[#0062ff] hover:bg-[#0055df] text-white font-semibold text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Send className="w-4 h-4 stroke-[2.5]" />
            <span>Send All Due Reminders</span>
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
            <span>90-Day Bucket</span>
            <span className="w-2 h-2 rounded-full bg-blue-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 mt-1">14</div>
          <span className="text-[11px] text-gray-400">Scheduled early alerts</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
            <span>45-Day Bucket</span>
            <span className="w-2 h-2 rounded-full bg-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">9</div>
          <span className="text-[11px] text-gray-400">Follow-up notifications</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
            <span>30-Day Critical</span>
            <span className="w-2 h-2 rounded-full bg-orange-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-orange-600 mt-1">5</div>
          <span className="text-[11px] text-gray-400">Urgent legal stamping</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
            <span>Reminders Sent (Nov)</span>
            <CheckCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">38</div>
          <span className="text-[11px] text-emerald-600 font-semibold">98.2% delivered</span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customer, machine, mobile..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0062ff]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['all', '90-day', '45-day', '30-day', 'critical'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStage(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors cursor-pointer ${
                selectedStage === st
                  ? 'bg-[#0062ff] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200/70'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Reminders Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Customer & Contact</th>
                <th className="py-3.5 px-4 font-semibold">Machine / Scale</th>
                <th className="py-3.5 px-4 font-semibold">Expiry Date</th>
                <th className="py-3.5 px-4 font-semibold">Reminder Stage</th>
                <th className="py-3.5 px-4 font-semibold">Channel</th>
                <th className="py-3.5 px-4 font-semibold">Status / Last Sent</th>
                <th className="py-3.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((rem) => {
                const isSent = sentReminders[rem.id] || rem.status === 'Sent';

                return (
                  <tr key={rem.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-gray-900">{rem.customer}</div>
                      <div className="text-[11px] text-gray-500 font-medium">{rem.contact}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#0062ff]">{rem.machineId}</div>
                      <div className="text-[11px] text-gray-500">{rem.model}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-gray-900">{rem.expiryDate}</div>
                      <div className="text-[11px] text-amber-600 font-medium">{rem.daysLeft} days remaining</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${rem.stageBadge}`}>
                        {rem.stage}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-700 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                        <MessageSquare className="w-3 h-3 text-emerald-600" />
                        <span>{rem.preferredChannel}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {isSent ? (
                        <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-xs">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Sent Just Now</span>
                        </div>
                      ) : (
                        <div className="text-gray-500 text-xs">
                          <span className="font-medium text-gray-700">{rem.status}</span>
                          <div className="text-[11px] text-gray-400">{rem.lastSent}</div>
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleSendReminder(rem.id)}
                        disabled={isSent}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all inline-flex items-center gap-1.5 ${
                          isSent
                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                            : 'bg-[#0062ff] text-white border-transparent hover:bg-[#0055df] shadow-2xs cursor-pointer'
                        }`}
                      >
                        <Send className="w-3 h-3" />
                        <span>{isSent ? 'Sent' : 'Send Alert'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

