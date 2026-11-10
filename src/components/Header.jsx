import React from 'react';
import {
  User,
  ChevronDown,
  ClipboardCheck,
  LayoutDashboard,
  Search,
  Bell,
} from 'lucide-react';

export default function Header({ title = 'New Job Order', activeNav = 'job-orders' }) {
  const isDashboard = activeNav === 'dashboard';

  return (
    <header className="h-18 bg-white border-b border-gray-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20 gap-4">
      {/* Page Title & Icon */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="text-[#0062ff] flex items-center justify-center">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#0062ff]">
            {isDashboard ? (
              <LayoutDashboard className="w-5 h-5 text-[#0062ff] stroke-[2.2]" />
            ) : (
              <ClipboardCheck className="w-5 h-5 text-[#0062ff] stroke-[2.2]" />
            )}
          </div>
        </div>
        <h1 className="text-xl sm:text-[22px] font-bold text-gray-900 tracking-tight">
          {title}
        </h1>
      </div>

      {/* Middle Search Bar (Dashboard feature from uploaded image) */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search machines, customers, licenses..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-gray-200/90 rounded-xl text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0062ff] transition-all"
          />
        </div>
      </div>

      {/* Right Controls: Notifications & User Profile */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        {/* Notification Bell with Badge */}
        <button
          title="Notifications"
          className="relative p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="h-6 w-[1px] bg-gray-200 hidden sm:block" />

        {/* User Profile */}
        <div className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-opacity py-1.5 px-2 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-[#091838] flex items-center justify-center text-white font-semibold text-xs">
            <User className="w-4 h-4 text-white" strokeWidth={2.2} />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-sm font-semibold text-gray-800 leading-tight">
              Senthilkumar P
            </span>
            <span className="text-[11px] text-gray-400 font-medium">
              Administrator
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500 stroke-[2.2] hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
