import React from 'react';
import {
  LayoutDashboard,
  Users,
  Scale,
  ClipboardList,
  FileCheck2,
  Bell,
  BarChart2,
  Settings,
} from 'lucide-react';

export const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'weighing-scales', label: 'Weighing Scales', icon: Scale },
  { id: 'job-orders', label: 'Job Orders', icon: ClipboardList },
  { id: 'certificates', label: 'Certificates', icon: FileCheck2 },
  { id: 'reminders', label: 'Reminders', icon: Bell },
  { id: 'reports', label: 'Reports', icon: BarChart2 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeNav, setActiveNav }) {
  return (
    <aside className="w-64 bg-[#091838] text-white flex flex-col shrink-0 select-none min-h-screen">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 gap-3 border-b border-[#14264e]/50">
        <div className="text-white flex items-center justify-center">
          <Scale className="w-7 h-7 text-white stroke-[2.2]" />
        </div>
        <div className="flex items-center text-xl font-bold tracking-tight text-white">
          <span>LicenScale</span>
          <span className="text-[10px] ml-0.5 -mt-2 font-normal">®</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-6 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-150 text-left ${
                isActive
                  ? 'bg-[#0062ff] text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/8'
              }`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 ${
                  isActive ? 'text-white' : 'text-slate-300'
                }`}
                strokeWidth={2}
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

