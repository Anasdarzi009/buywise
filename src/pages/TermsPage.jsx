import React, { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { updateSEO } from '../utils/seo';

export default function TermsPage() {
  useEffect(() => {
    updateSEO({
      title: 'Terms of Service | BuyWise',
      description: 'Terms of service and editorial conditions of use for BuyWise.',
    });
  }, []);

  const breadcrumbs = [
    { name: 'Terms of Service', path: '/terms' },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Breadcrumbs items={breadcrumbs} />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400">Effective Date: February 2025</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6 text-sm text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing and using BuyWise, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="space-y-2 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-bold text-slate-900">2. Informational & Editorial Purpose</h2>
          <p>
            All content published on BuyWise—including product guides, specs summaries, price comparisons, and editorial verdicts—is provided strictly for educational and informational purposes. While we strive for accuracy, hardware specifications and prices change. You should always confirm exact details directly on Amazon or the manufacturer's website prior to purchasing.
          </p>
        </section>

        <section className="space-y-2 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-bold text-slate-900">3. No Warranties & Limitation of Liability</h2>
          <p>
            BuyWise does not sell products, handle customer payments, warehouse inventory, or fulfill orders. In no event shall BuyWise or its contributors be held liable for product defects, shipping delays, warranty disputes, or price fluctuations occurring on third-party retail platforms.
          </p>
        </section>

        <section className="space-y-2 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-bold text-slate-900">4. Intellectual Property</h2>
          <p>
            All original text, curation, editorial formatting, and code on BuyWise are the property of BuyWise. Product names, logos, trademarks, and registered trademarks mentioned are the property of their respective owners.
          </p>
        </section>
      </div>
    </div>
  );
}
