import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExitIntentPopup from '../components/ExitIntentPopup';
import useScrollToTop from '../hooks/useScrollToTop';
import useExitIntent from '../hooks/useExitIntent';

export default function MainLayout() {
  useScrollToTop();

  // Exit-Intent Deals Subscription Hook
  const { isOpen, closePopup, markSubscribed } = useExitIntent();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Main Sticky Header with Language & Currency Selectors */}
      <Header />

      {/* Page Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Outlet />
      </main>

      {/* Full Editorial Footer */}
      <Footer />

      {/* Exit-Intent Deals Subscription Popup */}
      <ExitIntentPopup
        isOpen={isOpen}
        onClose={closePopup}
        onSubscribed={(data) => {
          markSubscribed(data);
        }}
      />
    </div>
  );
}
