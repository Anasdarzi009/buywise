import React, { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { updateSEO } from '../utils/seo';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    updateSEO({
      title: 'Privacy Policy | BuyWise',
      description: 'BuyWise privacy policy explaining data protection, analytics, cookie usage, and Amazon affiliate tracking.',
    });
  }, []);

  const breadcrumbs = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Breadcrumbs items={breadcrumbs} />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">Last Updated: February 2025</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6 text-sm text-slate-600 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            BuyWise respects your personal privacy. When you visit our website, we do not require you to register an account or provide sensitive personal information. 
            If you choose to subscribe to our newsletter or submit an inquiry via our contact form, we collect only your provided name and email address.
          </p>
        </section>

        <section className="space-y-2 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-bold text-slate-900">2. Cookies and Affiliate Tracking</h2>
          <p>
            When you click outbound links pointing to Amazon or other merchant partners, an affiliate tracking cookie may be stored in your browser by the destination retailer (Amazon.in / Amazon.com) to attribute qualifying purchases. These cookies do not store personally identifiable data and operate under Amazon's own privacy policies.
          </p>
        </section>

        <section className="space-y-2 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-bold text-slate-900">3. Analytics and Log Data</h2>
          <p>
            Like standard web publishers, we may collect non-identifiable statistical usage data such as browser type, operating system, referring pages, and timestamp of visits to optimize page speed, search performance, and readability.
          </p>
        </section>

        <section className="space-y-2 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-bold text-slate-900">4. Third-Party Links</h2>
          <p>
            Our website contains links to external retail websites. We do not have control over the privacy practices, content, or terms of third-party platforms once you navigate away from BuyWise.
          </p>
        </section>

        <section className="space-y-2 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-bold text-slate-900">5. Contact Information</h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to request data deletion for your newsletter subscription, please email us at <span className="font-semibold text-slate-800">privacy@buywise-reviews.org</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
