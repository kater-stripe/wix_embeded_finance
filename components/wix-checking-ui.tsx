'use client'

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Check, Menu, MessageSquare, Bell, Video, User } from 'lucide-react';

interface WixCheckingUIProps {
  onNavigateToCapital?: () => void;
}

export default function WixCheckingUI({ onNavigateToCapital }: WixCheckingUIProps) {
  const [expandedMenus, setExpandedMenus] = useState({
    bookingCalendar: false,
    contacts: false,
    marketing: false,
    analytics: false,
    finances: true
  });

  const toggleMenu = (menu: keyof typeof expandedMenus) => {
    setExpandedMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-60 bg-slate-900 text-white flex flex-col">
        {/* Logo */}
        <div className="h-14 flex items-center px-6 border-b border-slate-800">
          <span className="text-xl font-bold">WIX</span>
          <div className="ml-4 flex items-center text-sm">
            <span>Supreme Inc.</span>
            <ChevronDown className="w-4 h-4 ml-1" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <NavItem label="Dashboard" />
          <NavItem label="Booking Services" />
          <NavItem
            label="Booking Calendar"
            expandable
            expanded={expandedMenus.bookingCalendar}
            onToggle={() => toggleMenu('bookingCalendar')}
          />
          <NavItem label="Inbox" badge="1" />
          <NavItem
            label="Contacts"
            expandable
            expanded={expandedMenus.contacts}
            onToggle={() => toggleMenu('contacts')}
          />
          <NavItem
            label="Marketing & SEO"
            expandable
            expanded={expandedMenus.marketing}
            onToggle={() => toggleMenu('marketing')}
          />
          <NavItem
            label="Analytics & Reports"
            expandable
            expanded={expandedMenus.analytics}
            onToggle={() => toggleMenu('analytics')}
          />
          <NavItem
            label="Finances"
            expandable
            expanded={expandedMenus.finances}
            onToggle={() => toggleMenu('finances')}
          />

          {expandedMenus.finances && (
            <div className="ml-4">
              <SubNavItem label="Overview" />
              <SubNavItem label="Business Checking" active badge="NEW" />
              <SubNavItem
                label="Stripe Capital"
                onClick={onNavigateToCapital}
              />
              <SubNavItem label="Payments" />
              <SubNavItem label="Price Quotes" />
              <SubNavItem label="Invoices" />
              <SubNavItem label="Recurring Invoices" />
              <SubNavItem label="Financial Integrations" />
              <SubNavItem label="Payouts History" />
              <SubNavItem label="Documents & Reports" />
            </div>
          )}

          <NavItem label="Settings" />
        </nav>

        {/* Quick Actions */}
        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center text-sm hover:text-blue-400">
            <span className="mr-2">⚡</span>
            Quick Actions
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center space-x-6">
            <button className="text-gray-600 hover:text-gray-900">Explore</button>
            <button className="text-gray-600 hover:text-gray-900">Help</button>
            <button className="text-gray-600 hover:text-gray-900">Hire a Professional</button>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-1.5 bg-gray-100 rounded-md w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MessageSquare className="w-5 h-5 text-gray-600 cursor-pointer" />
            <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
            <Video className="w-5 h-5 text-gray-600 cursor-pointer" />
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-orange-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium">James Jebbia</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8">
            <div className="grid grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="col-span-2">
                <div className="text-sm text-gray-600 mb-6">Wix Checking</div>

                <h1 className="text-4xl font-bold mb-8 leading-tight">
                  A bank account built into<br />your business
                </h1>

                <div className="space-y-4 mb-8">
                  <Feature text="Access your Wix Payments earnings the moment you make a sale" />
                  <Feature text="Have a clear view of your business cash flow with earnings and spending in one place" />
                  <Feature text="Securely spend anywhere with your Wix Visa business debit card" />
                  <Feature text="No monthly fees. No transfer fees. No minimum balance. FDIC insured" />
                  <Feature text="Seamlessly connect your account to QuickBooks" />
                </div>

                <div className="flex space-x-4">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                    Open Account
                  </button>
                  <button className="px-6 py-3 text-blue-600 font-medium hover:bg-blue-50 rounded-lg">
                    Explore Advantages
                  </button>
                </div>

                <div className="mt-8 text-xs text-gray-500 leading-relaxed max-w-xl">
                  Wix is not a bank. Banking products and services are provided by Lincoln Savings Bank, Member FDIC. The Wix Debit Card is issued by Lincoln Savings Bank pursuant to a license from Visa U.S.A. Inc. and may be used everywhere Visa debit cards are accepted. Wix is not FDIC insured. FDIC insurance only covers the failure of a covered bank.
                </div>
              </div>

              {/* Right Column - Balance & Transactions */}
              <div className="space-y-4">
                {/* Balance Card */}
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-3xl font-bold">${'1,234'}<span className="text-2xl">.50</span></div>
                    </div>
                  </div>

                  {/* Wix Card Visual */}
                  <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-xl p-6 mb-4 relative overflow-hidden h-48">
                    <div className="absolute top-4 right-4 text-white text-sm font-bold">WIX</div>
                    <div className="absolute bottom-16 left-6">
                      <div className="w-12 h-8 bg-yellow-400 rounded opacity-70"></div>
                    </div>
                    <div className="absolute bottom-6 left-6 text-white text-xs">VISA</div>
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500 rounded-full blur-2xl"></div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 text-sm text-blue-600 py-2 hover:bg-blue-50 rounded">
                      Add Money
                    </button>
                    <button className="flex-1 text-sm text-blue-600 py-2 hover:bg-blue-50 rounded">
                      Transfer Out
                    </button>
                  </div>
                </div>

                {/* Transactions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <Transaction
                    icon="💳"
                    title="Withdrawal at Hometown Bank"
                    subtitle="ATM"
                    amount="-$300.00"
                  />
                  <Transaction
                    icon={<div className="w-10 h-10 bg-white rounded flex items-center justify-center text-xs">WIX</div>}
                    title="Order #00123"
                    subtitle="Dec 14 · Deposit"
                    amount="$348.50"
                  />
                  <Transaction
                    icon={<div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center text-2xl">🍋</div>}
                    title="Lemon Tax Software"
                    subtitle="Dec 14 · Debit Card"
                    amount="-$163.75"
                  />
                  <Transaction
                    icon={<div className="w-10 h-10 bg-white rounded flex items-center justify-center text-xl">🏛️</div>}
                    title="10 Mint Contractors"
                    subtitle="Dec 12 · Bank transfer"
                    amount="-$450.00"
                  />
                </div>

                {/* Filter Buttons */}
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-slate-900 text-white text-xs rounded-full">
                    Bank account
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 text-xs rounded-full hover:bg-gray-300">
                    Debit card
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 text-xs rounded-full hover:bg-gray-300">
                    Instant deposits
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

interface NavItemProps {
  label: string;
  badge?: string;
  expandable?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
  active?: boolean;
}

function NavItem({ label, badge, expandable, expanded, onToggle, active }: NavItemProps) {
  return (
    <div
      className={`px-6 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-800 ${active ? 'bg-slate-800' : ''}`}
      onClick={expandable ? onToggle : undefined}
    >
      <span className="text-sm">{label}</span>
      <div className="flex items-center space-x-2">
        {badge && (
          <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
        {expandable && (
          expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
        )}
      </div>
    </div>
  );
}

interface SubNavItemProps {
  label: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
}

function SubNavItem({ label, active, badge, onClick }: SubNavItemProps) {
  return (
    <div
      className={`px-6 py-2 flex items-center justify-between cursor-pointer hover:bg-slate-800 ${active ? 'bg-slate-800 border-l-2 border-blue-500' : ''}`}
      onClick={onClick}
    >
      <span className="text-sm">{label}</span>
      {badge && (
        <span className="bg-yellow-500 text-slate-900 text-xs px-2 py-0.5 rounded font-bold">
          {badge}
        </span>
      )}
    </div>
  );
}

interface FeatureProps {
  text: string;
}

function Feature({ text }: FeatureProps) {
  return (
    <div className="flex items-start space-x-3">
      <Check className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
      <span className="text-gray-700">{text}</span>
    </div>
  );
}

interface TransactionProps {
  icon: React.ReactNode | string;
  title: string;
  subtitle: string;
  amount: string;
}

function Transaction({ icon, title, subtitle, amount }: TransactionProps) {
  const isNegative = amount.startsWith('-');
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          {typeof icon === 'string' ? (
            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-xl">
              {icon}
            </div>
          ) : icon}
        </div>
        <div>
          <div className="font-medium text-sm">{title}</div>
          <div className="text-xs text-gray-500">{subtitle}</div>
        </div>
      </div>
      <div className={`font-semibold ${isNegative ? 'text-gray-900' : 'text-gray-900'}`}>
        {amount}
      </div>
    </div>
  );
}
