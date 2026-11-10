import React, { useState } from 'react';
import Sidebar, { navItems } from './components/Sidebar';
import Header from './components/Header';
import JobOrderWizard from './components/JobOrderWizard';
import DashboardView from './components/DashboardView';
import CustomersView from './components/CustomersView';
import WeighingScalesView from './components/WeighingScalesView';
import CertificatesView from './components/CertificatesView';
import RemindersView from './components/RemindersView';
import ReportsView from './components/ReportsView';
import SettingsView from './components/SettingsView';
import PlaceholderView from './components/PlaceholderView';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentItem = navItems.find((i) => i.id === activeNav);
  const headerTitle =
    activeNav === 'job-orders'
      ? 'New Job Order'
      : currentItem?.label || 'Dashboard';

  return (
    <div className="flex h-screen w-screen bg-[#f4f6fa] overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      </div>

      {/* Mobile Drawer Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-64 bg-[#091838]">
            <div className="absolute top-4 right-3">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar
              activeNav={activeNav}
              setActiveNav={(id) => {
                setActiveNav(id);
                setIsMobileMenuOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <div className="relative flex items-center bg-white">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-4 text-gray-700 hover:text-gray-900 cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1">
            <Header
              title={headerTitle}
              activeNav={activeNav}
              onNavigateToJobOrder={() => setActiveNav('job-orders')}
            />
          </div>
        </div>

        {/* Dynamic Page Views */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {activeNav === 'dashboard' ? (
            <DashboardView
              onNavigateToJobOrder={() => setActiveNav('job-orders')}
            />
          ) : activeNav === 'job-orders' ? (
            <JobOrderWizard />
          ) : activeNav === 'customers' ? (
            <CustomersView
              onNavigateToJobOrder={() => setActiveNav('job-orders')}
            />
          ) : activeNav === 'weighing-scales' ? (
            <WeighingScalesView
              onNavigateToJobOrder={() => setActiveNav('job-orders')}
            />
          ) : activeNav === 'certificates' ? (
            <CertificatesView />
          ) : activeNav === 'reminders' ? (
            <RemindersView />
          ) : activeNav === 'reports' ? (
            <ReportsView />
          ) : activeNav === 'settings' ? (
            <SettingsView />
          ) : (
            <PlaceholderView
              navId={activeNav}
              onGoToJobOrders={() => setActiveNav('job-orders')}
            />
          )}
        </main>
      </div>
    </div>
  );
}
