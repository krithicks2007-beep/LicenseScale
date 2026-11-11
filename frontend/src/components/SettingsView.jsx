import React, { useState } from 'react';
import {
  Settings,
  Building,
  Bell,
  Shield,
  Save,
  CheckCircle2,
  Mail,
  Smartphone,
  Lock,
} from 'lucide-react';

export default function SettingsView() {
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    firmName: 'LicenScale Systems & Weighbridge Services',
    regNo: 'LM/TN/CHN/2022/8819',
    gstin: '33AAACL1234F1Z5',
    email: 'info@licensescale.com',
    phone: '+91 98421 99000',
    address: 'No. 18, Mount Road, Guindy, Chennai - 600032',
    leadTime1: 90,
    leadTime2: 45,
    leadTime3: 30,
    enableWhatsApp: true,
    enableSMS: true,
    enableEmail: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto w-full space-y-6">
      {saved && (
        <div className="flex items-center gap-2 bg-green-50 text-emerald-700 px-4 py-3 rounded-2xl border border-green-200 text-xs font-semibold animate-fadeIn shadow-xs">
          <CheckCircle2 className="w-4 h-4" />
          <span>Settings Saved Successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Organization Profile */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-base">
              <Building className="w-5 h-5 text-[#0062ff]" />
              <span>Agency Information</span>
            </div>
            <button
              type="submit"
              className="bg-[#0062ff] hover:bg-[#0055df] text-white font-semibold text-xs px-5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Firm / Agency Name</label>
              <input
                type="text"
                value={profile.firmName}
                onChange={(e) => setProfile({ ...profile, firmName: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-[#0062ff]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Legal Metrology License No</label>
              <input
                type="text"
                value={profile.regNo}
                onChange={(e) => setProfile({ ...profile, regNo: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-[#0062ff]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">GSTIN</label>
              <input
                type="text"
                value={profile.gstin}
                onChange={(e) => setProfile({ ...profile, gstin: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-[#0062ff]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Official Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-[#0062ff]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Registered Office Address</label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 focus:bg-white focus:ring-2 focus:ring-[#0062ff]"
              />
            </div>
          </div>
        </div>

        {/* Reminder Thresholds */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-gray-100 text-gray-900 font-bold text-base">
            <Bell className="w-5 h-5 text-[#0062ff]" />
            <span>Automated Reminder Intervals (Days Prior to Expiry)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Stage 1 Notice (Days)</label>
              <input
                type="number"
                value={profile.leadTime1}
                onChange={(e) => setProfile({ ...profile, leadTime1: Number(e.target.value) || 0 })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Stage 2 Follow-Up (Days)</label>
              <input
                type="number"
                value={profile.leadTime2}
                onChange={(e) => setProfile({ ...profile, leadTime2: Number(e.target.value) || 0 })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Stage 3 Urgent Call (Days)</label>
              <input
                type="number"
                value={profile.leadTime3}
                onChange={(e) => setProfile({ ...profile, leadTime3: Number(e.target.value) || 0 })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 font-bold"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
