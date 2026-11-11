import React, { useState } from 'react';
import {
  Bell,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Layers,
  UserCheck,
  Send,
  RotateCw,
  Eye,
  Truck,
  ArrowUpRight,
  TrendingUp,
  Edit3,
  X,
  RotateCcw,
  Save,
} from 'lucide-react';

export default function DashboardView({ onNavigateToJobOrder }) {
  const [hoveredTrend, setHoveredTrend] = useState(null);
  const [hoveredSlice, setHoveredSlice] = useState(null);
  const [isEditingNumbers, setIsEditingNumbers] = useState(false);

  // Dynamic Dashboard Stats State
  const [stats, setStats] = useState({
    reminder1: 14,
    reminder2: 9,
    reminder3: 5,
    expired: 6,
    renewed: 28,
    total: 62,

    registered: 7,
    submitted: 5,
    inProcess: 8,
    completed: 6,
    inspected: 12,
    dispatched: 10,

    trendJun: 3,
    trendJul: 5,
    trendAug: 4,
    trendSep: 7,
    trendOct: 9,
    trendNov: 12,
  });

  // Temp editing state
  const [editForm, setEditForm] = useState({ ...stats });

  const handleSaveStats = (e) => {
    e.preventDefault();
    setStats({ ...editForm });
    setIsEditingNumbers(false);
  };

  const handleResetDefaults = () => {
    const defaults = {
      reminder1: 14,
      reminder2: 9,
      reminder3: 5,
      expired: 6,
      renewed: 28,
      total: 62,
      registered: 7,
      submitted: 5,
      inProcess: 8,
      completed: 6,
      inspected: 12,
      dispatched: 10,
      trendJun: 3,
      trendJul: 5,
      trendAug: 4,
      trendSep: 7,
      trendOct: 9,
      trendNov: 12,
    };
    setEditForm(defaults);
    setStats(defaults);
  };

  // Reminders metrics data
  const reminderCards = [
    {
      title: 'Reminder 1',
      count: stats.reminder1,
      badge: '90 days left',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: Bell,
      iconBg: 'bg-blue-100/70 text-[#0062ff]',
      borderColor: 'hover:border-blue-300',
    },
    {
      title: 'Reminder 2',
      count: stats.reminder2,
      badge: '45 days left',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: Clock,
      iconBg: 'bg-amber-100/70 text-amber-600',
      borderColor: 'hover:border-amber-300',
    },
    {
      title: 'Reminder 3',
      count: stats.reminder3,
      badge: '30 days left',
      badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
      icon: AlertTriangle,
      iconBg: 'bg-orange-100/70 text-orange-600',
      borderColor: 'hover:border-orange-300',
    },
    {
      title: 'Expired',
      count: stats.expired,
      badge: 'Licenses',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: AlertTriangle,
      iconBg: 'bg-rose-100/70 text-rose-600',
      borderColor: 'hover:border-rose-300',
    },
    {
      title: 'Renewed',
      count: stats.renewed,
      badge: 'This Year',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: Calendar,
      iconBg: 'bg-indigo-100/70 text-indigo-600',
      borderColor: 'hover:border-indigo-300',
    },
    {
      title: 'Total',
      count: stats.total,
      badge: 'Licenses',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-200',
      icon: Layers,
      iconBg: 'bg-slate-100 text-slate-600',
      borderColor: 'hover:border-slate-300',
    },
  ];

  // Renewal progress workflow stages
  const progressCards = [
    {
      title: 'Registered',
      count: stats.registered,
      icon: UserCheck,
      color: 'text-blue-600',
      bg: 'bg-blue-50/60 border-blue-200/80',
    },
    {
      title: 'Submitted',
      count: stats.submitted,
      icon: Send,
      color: 'text-amber-600',
      bg: 'bg-amber-50/60 border-amber-200/80',
    },
    {
      title: 'In Process',
      count: stats.inProcess,
      icon: RotateCw,
      color: 'text-rose-600',
      bg: 'bg-rose-50/60 border-rose-200/80',
    },
    {
      title: 'Completed',
      count: stats.completed,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50/60 border-emerald-200/80',
    },
    {
      title: 'Inspected',
      count: stats.inspected,
      icon: Eye,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50/60 border-indigo-200/80',
    },
    {
      title: 'Dispatched',
      count: stats.dispatched,
      icon: Truck,
      color: 'text-teal-600',
      bg: 'bg-teal-50/60 border-teal-200/80',
    },
  ];

  // License Trends Bar Chart Data
  const trendsData = [
    { month: 'Jun', count: stats.trendJun, isHighlight: false },
    { month: 'Jul', count: stats.trendJul, isHighlight: false },
    { month: 'Aug', count: stats.trendAug, isHighlight: false },
    { month: 'Sep', count: stats.trendSep, isHighlight: false },
    { month: 'Oct', count: stats.trendOct, isHighlight: false },
    { month: 'Nov', count: stats.trendNov, isHighlight: true },
  ];
  const maxTrend = Math.max(...trendsData.map((d) => d.count), 10);

  // License Status Donut Segments dynamically calculated based on Total
  const totalCount = stats.total || 62;
  const pendingCount = Math.max(
    0,
    totalCount - (stats.renewed + stats.completed + stats.inProcess + stats.expired)
  );

  const statusSlices = [
    {
      label: 'Renewed',
      count: stats.renewed,
      pct: `${((stats.renewed / totalCount) * 100).toFixed(1)}%`,
      color: '#1d4ed8',
    },
    {
      label: 'Completed',
      count: stats.completed,
      pct: `${((stats.completed / totalCount) * 100).toFixed(1)}%`,
      color: '#16a34a',
    },
    {
      label: 'In Process',
      count: stats.inProcess,
      pct: `${((stats.inProcess / totalCount) * 100).toFixed(1)}%`,
      color: '#f59e0b',
    },
    {
      label: 'Expired',
      count: stats.expired,
      pct: `${((stats.expired / totalCount) * 100).toFixed(1)}%`,
      color: '#dc2626',
    },
    {
      label: 'Pending / Others',
      count: pendingCount,
      pct: `${((pendingCount / totalCount) * 100).toFixed(1)}%`,
      color: '#93c5fd',
    },
  ];

  // Donut SVG arcs calculation
  let accumulatedAngle = 0;
  const donutArcs = statusSlices.map((slice) => {
    const angle = (slice.count / totalCount) * 360;
    const startAngle = accumulatedAngle;
    const endAngle = accumulatedAngle + angle;
    accumulatedAngle = endAngle;

    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);

    const rOuter = 78;
    const rInner = 52;
    const cx = 95;
    const cy = 95;

    const x1 = cx + rOuter * Math.cos(startRad);
    const y1 = cy + rOuter * Math.sin(startRad);
    const x2 = cx + rOuter * Math.cos(endRad);
    const y2 = cy + rOuter * Math.sin(endRad);

    const x3 = cx + rInner * Math.cos(endRad);
    const y3 = cy + rInner * Math.sin(endRad);
    const x4 = cx + rInner * Math.cos(startRad);
    const y4 = cy + rInner * Math.sin(startRad);

    const largeArc = angle > 180 ? 1 : 0;
    const pathData = `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4} ${y4} Z`;

    return {
      ...slice,
      pathData,
    };
  });

  // Upcoming renewals table data
  const upcomingRenewals = [
    {
      machine: 'WM-1009',
      customer: 'Anand Pharma Ltd',
      model: 'Shimadzu ATX224',
      expiry: '25-Dec-2026',
      daysLeft: 45,
      daysBadge: 'bg-amber-50 text-amber-700 border-amber-200',
      nextReminder: '10-Nov-2026',
    },
    {
      machine: 'SL-402',
      customer: 'Precision Weigh Tech',
      model: 'Mettler Toledo ME204',
      expiry: '10-Dec-2026',
      daysLeft: 30,
      daysBadge: 'bg-orange-50 text-orange-700 border-orange-200',
      nextReminder: '15-Nov-2026',
    },
    {
      machine: 'APX-88',
      customer: 'Apex Mills & Ginning',
      model: 'Avery Weigh-Tronix 50T',
      expiry: '28-Nov-2026',
      daysLeft: 18,
      daysBadge: 'bg-rose-50 text-rose-700 border-rose-200',
      nextReminder: '12-Nov-2026',
    },
    {
      machine: 'LAK-550',
      customer: 'Sri Lakshmi Steels',
      model: 'E1205 Pitless 60T',
      expiry: '15-Jan-2027',
      daysLeft: 66,
      daysBadge: 'bg-blue-50 text-blue-700 border-blue-200',
      nextReminder: '01-Dec-2026',
    },
  ];

  // Recent activity data
  const activities = [
    {
      id: 1,
      dotColor: 'bg-rose-500',
      title: '45-day reminder sent to Anand Pharma (WM-1009)',
      time: 'Today, 11:30 AM',
    },
    {
      id: 2,
      dotColor: 'bg-blue-500',
      title: 'License renewed for Precision Weigh Tech (SL-402)',
      time: 'Yesterday, 04:15 PM',
    },
    {
      id: 3,
      dotColor: 'bg-emerald-500',
      title: 'New machine registered: Apex Mills (APX-88)',
      time: '2 days ago',
    },
    {
      id: 4,
      dotColor: 'bg-indigo-500',
      title: 'Verification scheduled for Sri Lakshmi Steels',
      time: '3 days ago',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1550px] mx-auto w-full space-y-7 relative">

      {/* EDIT NUMBERS MODAL */}
      {isEditingNumbers && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-2xl w-full p-6 sm:p-7 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Change Dashboard Numbers</h3>
                <p className="text-xs text-gray-500">Edit any stat below to see charts and cards update in real time.</p>
              </div>
              <button
                onClick={() => setIsEditingNumbers(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStats} className="space-y-6 pt-5">
              {/* Reminders section */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Licenses Remainder Numbers
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Reminder 1 (90d)</label>
                    <input
                      type="number"
                      value={editForm.reminder1}
                      onChange={(e) => setEditForm({ ...editForm, reminder1: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Reminder 2 (45d)</label>
                    <input
                      type="number"
                      value={editForm.reminder2}
                      onChange={(e) => setEditForm({ ...editForm, reminder2: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Reminder 3 (30d)</label>
                    <input
                      type="number"
                      value={editForm.reminder3}
                      onChange={(e) => setEditForm({ ...editForm, reminder3: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Expired</label>
                    <input
                      type="number"
                      value={editForm.expired}
                      onChange={(e) => setEditForm({ ...editForm, expired: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-semibold text-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Renewed</label>
                    <input
                      type="number"
                      value={editForm.renewed}
                      onChange={(e) => setEditForm({ ...editForm, renewed: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-semibold text-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Total</label>
                    <input
                      type="number"
                      value={editForm.total}
                      onChange={(e) => setEditForm({ ...editForm, total: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-bold text-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* Progress section */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Renewal Progress Pipeline Numbers
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Registered</label>
                    <input
                      type="number"
                      value={editForm.registered}
                      onChange={(e) => setEditForm({ ...editForm, registered: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Submitted</label>
                    <input
                      type="number"
                      value={editForm.submitted}
                      onChange={(e) => setEditForm({ ...editForm, submitted: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">In Process</label>
                    <input
                      type="number"
                      value={editForm.inProcess}
                      onChange={(e) => setEditForm({ ...editForm, inProcess: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Completed</label>
                    <input
                      type="number"
                      value={editForm.completed}
                      onChange={(e) => setEditForm({ ...editForm, completed: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Inspected</label>
                    <input
                      type="number"
                      value={editForm.inspected}
                      onChange={(e) => setEditForm({ ...editForm, inspected: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Dispatched</label>
                    <input
                      type="number"
                      value={editForm.dispatched}
                      onChange={(e) => setEditForm({ ...editForm, dispatched: Number(e.target.value) || 0 })}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Monthly Trend numbers */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Monthly Trend Bar Counts (Jun - Nov)
                </h4>
                <div className="grid grid-cols-6 gap-2">
                  {['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'].map((m) => {
                    const key = `trend${m}`;
                    return (
                      <div key={m}>
                        <label className="block text-[11px] font-semibold text-gray-500 mb-1 text-center">{m}</label>
                        <input
                          type="number"
                          value={editForm[key]}
                          onChange={(e) => setEditForm({ ...editForm, [key]: Number(e.target.value) || 0 })}
                          className="w-full px-2 py-1.5 text-center border border-gray-300 rounded-lg text-xs font-bold"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingNumbers(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0062ff] hover:bg-[#0055df] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Apply Numbers</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SECTION 1: Licenses Remainder */}
      <div>
        <div className="flex items-center justify-between mb-3.5 px-0.5">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Licenses Remainder</span>
          </h3>
          <span className="text-xs font-medium text-gray-400">Total {stats.total} records tracked</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {reminderCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between text-center transition-all duration-150 hover:shadow-sm ${card.borderColor}`}
              >
                <div className="flex items-center gap-2 text-gray-700 text-xs sm:text-sm font-semibold mb-2">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${card.iconBg}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span>{card.title}</span>
                </div>

                <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 my-1 tracking-tight">
                  {card.count}
                </div>

                <span
                  className={`mt-2 text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full border ${card.badgeColor}`}
                >
                  {card.badge}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Renewal Progress */}
      <div>
        <div className="flex items-center justify-between mb-3.5 px-0.5">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <span>Renewal Progress</span>
          </h3>
          <span className="text-xs font-medium text-gray-400">Active verification pipeline</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {progressCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`border rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between text-center transition-all duration-150 hover:shadow-sm bg-white ${card.bg}`}
              >
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold mb-2 text-gray-800">
                  <Icon className={`w-4 h-4 ${card.color}`} />
                  <span>{card.title}</span>
                </div>

                <div className={`text-3xl sm:text-4xl font-extrabold my-1 tracking-tight ${card.color}`}>
                  {card.count}
                </div>

                <div className="flex items-center gap-1 mt-2">
                  <span className={`w-2 h-2 rounded-full ${card.color.replace('text-', 'bg-')}`} />
                  <span className="text-[11px] text-gray-500 font-medium">Stage {idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: License Trends */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                License Trends (last 6 months)
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">Monthly license verification volume</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#0062ff]" />
                <span>Regular</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#dc2626]" />
                <span>Current Month</span>
              </div>
            </div>
          </div>

          <div className="h-56 w-full flex items-end justify-between px-4 sm:px-8 pt-6 pb-2 border-b border-gray-100">
            {trendsData.map((item, index) => {
              const heightPercent = (item.count / maxTrend) * 100;
              const isHovered = hoveredTrend === index;

              return (
                <div
                  key={item.month}
                  onMouseEnter={() => setHoveredTrend(index)}
                  onMouseLeave={() => setHoveredTrend(null)}
                  className="flex flex-col items-center flex-1 group cursor-pointer h-full justify-end"
                >
                  <span
                    className={`text-xs font-bold mb-2 transition-transform duration-150 ${
                      item.isHighlight ? 'text-[#dc2626]' : 'text-gray-800'
                    } ${isHovered ? '-translate-y-1 scale-110' : ''}`}
                  >
                    {item.count}
                  </span>

                  <div className="w-9 sm:w-12 bg-gray-100 rounded-t-lg relative flex items-end overflow-hidden h-40">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-lg transition-all duration-300 ${
                        item.isHighlight
                          ? 'bg-[#dc2626] hover:bg-[#b91c1c]'
                          : 'bg-[#002b80] hover:bg-[#0062ff]'
                      }`}
                    />
                  </div>

                  <span
                    className={`text-xs font-semibold mt-3 ${
                      item.isHighlight ? 'text-[#dc2626] font-bold' : 'text-gray-600'
                    }`}
                  >
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: License Status Donut Chart */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0062ff]" />
                <span>License Status</span>
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">Overall distribution of {totalCount} licenses</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-auto py-2">
            <div className="relative w-48 h-48 shrink-0">
              <svg viewBox="0 0 190 190" className="w-full h-full transform -rotate-90">
                {donutArcs.map((slice, i) => (
                  <path
                    key={i}
                    d={slice.pathData}
                    fill={slice.color}
                    className="transition-all duration-200 hover:opacity-85 cursor-pointer"
                    onMouseEnter={() => setHoveredSlice(i)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  />
                ))}
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-extrabold text-gray-900 tracking-tight">{totalCount}</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</span>
              </div>
            </div>

            <div className="space-y-2 w-full sm:w-auto">
              {statusSlices.map((slice, i) => (
                <div
                  key={slice.label}
                  className={`flex items-center justify-between gap-4 text-xs transition-opacity ${
                    hoveredSlice !== null && hoveredSlice !== i ? 'opacity-40' : 'opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-sm shrink-0"
                      style={{ backgroundColor: slice.color }}
                    />
                    <span className="font-medium text-gray-700">{slice.label}</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {slice.count} <span className="text-gray-400 font-normal">({slice.pct})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: Upcoming Renewals & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
              Upcoming renewals
            </h3>
            <button className="text-xs font-semibold text-[#0062ff] hover:underline flex items-center gap-1 cursor-pointer">
              <span>View all</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Machine</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Model</th>
                  <th className="pb-3 font-semibold">Expiry</th>
                  <th className="pb-3 font-semibold">Days left</th>
                  <th className="pb-3 font-semibold text-right">Next reminder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {upcomingRenewals.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 font-bold text-gray-900 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0062ff]" />
                      {row.machine}
                    </td>
                    <td className="py-3 font-medium text-gray-800">{row.customer}</td>
                    <td className="py-3 text-gray-500 text-xs">{row.model}</td>
                    <td className="py-3 text-gray-600">{row.expiry}</td>
                    <td className="py-3">
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${row.daysBadge}`}
                      >
                        {row.daysLeft} days left
                      </span>
                    </td>
                    <td className="py-3 text-right font-medium text-gray-700">{row.nextReminder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
              Recent activity
            </h3>
            <span className="text-[11px] font-medium text-gray-400">Live feed</span>
          </div>

          <div className="space-y-4 my-auto">
            {activities.map((act) => (
              <div key={act.id} className="flex items-start gap-3 text-xs sm:text-sm">
                <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${act.dotColor}`} />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 leading-snug">{act.title}</p>
                  <span className="text-[11px] text-gray-400 font-medium block mt-0.5">
                    {act.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 mt-4">
            <button className="w-full text-center text-xs font-semibold text-[#0062ff] hover:underline cursor-pointer">
              View Activity Audit Log →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
