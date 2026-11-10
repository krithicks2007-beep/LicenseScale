import React from 'react';
import { navItems } from './Sidebar';
import { ArrowRight } from 'lucide-react';

export default function PlaceholderView({ navId, onGoToJobOrders }) {
  const item = navItems.find((i) => i.id === navId) || {
    label: 'Page',
    icon: null,
  };
  const Icon = item.icon;

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-[1400px] mx-auto w-full">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200/90 p-12 flex flex-col items-center justify-center text-center min-h-[500px]">
        {Icon && (
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0062ff] mb-4">
            <Icon className="w-8 h-8 stroke-[2]" />
          </div>
        )}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {item.label} Page
        </h2>
        <p className="text-gray-500 max-w-md text-sm sm:text-base mb-6">
          This is the separate page view for <strong>{item.label}</strong>. You can provide the image design for this page next to have it recreated!
        </p>
        <button
          onClick={onGoToJobOrders}
          className="bg-[#0062ff] hover:bg-[#0055df] text-white font-semibold text-sm px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-sm cursor-pointer"
        >
          <span>View Job Orders Page</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

