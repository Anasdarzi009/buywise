import React, { useEffect } from 'react';
import { ShieldCheck, Info, CheckCircle, ExternalLink } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { AFFILIATE_DISCLOSURE_FULL, DEFAULT_AFFILIATE_TAG } from '../utils/affiliate';
import { updateSEO } from '../utils/seo';

export default function AffiliateDisclosurePage() {
  useEffect(() => {
    updateSEO({
      title: 'Amazon Affiliate Program Disclosure | BuyWise',
      description: 'Official Amazon Associates affiliate disclosure statement and editorial integrity commitment for BuyWise.',
    });
  }, []);

  const breadcrumbs = [
    { name: 'Affiliate Disclosure', path: '/affiliate-disclosure' },
  ];

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
          <span>Transparency & Compliance</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Amazon Affiliate Disclosure
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          In compliance with the Federal Trade Commission (FTC) guidelines and the Amazon Associates Operating Agreement, this page explains how BuyWise earns income through affiliate partnerships.
        </p>
      </div>

      {/* Primary Formal Statement Box */}
      <div className="bg-amber-50/80 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 text-amber-950 space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-amber-900">
          <Info className="w-5 h-5 text-amber-600" />
          <span>Mandatory Amazon Associates Disclaimer</span>
        </h2>
        <p className="text-sm sm:text-base leading-relaxed font-medium">
          "{AFFILIATE_DISCLOSURE_FULL}"
        </p>
        <p className="text-xs text-amber-800">
          Tracking Identifier: All outbound Amazon product links utilize our registered associate tracking parameters (such as <code className="bg-amber-100 px-1.5 py-0.5 rounded text-amber-900 font-mono font-semibold">{DEFAULT_AFFILIATE_TAG}</code>) to credit qualifying transactions.
        </p>
      </div>

      {/* Detailed Q&A on How It Works */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-8">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">What Does This Mean for You as a Visitor?</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            When you click on links labeled "Check Price on Amazon", "View on Amazon", or similar buttons across our buying guides and product reviews, you will be taken directly to the official product page on Amazon.in (or international Amazon stores). 
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mt-2">
            If you decide to make a purchase, Amazon pays us a small percentage referral commission. <strong>This does not increase the price you pay by even one paisa.</strong> You pay the exact same price as any other Amazon customer, and you remain eligible for all standard Amazon discounts, Prime benefits, and warranties.
          </p>
        </div>

        <div className="border-t border-slate-100 pt-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Does Affiliate Revenue Influence Our Ratings?</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            <strong>No, absolutely not.</strong> Our editorial reputation and reader trust are our most critical assets. If we recommend poor products just because they carry higher price tags or commission rates, readers will return the products and lose faith in our guidance.
          </p>
          <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>We highlight flaws, trade-offs, and reasons to skip in every single review.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>We recommend low-cost and budget alternatives when they offer better value than expensive flagships.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>We never accept paid sponsorships to place products as "Our Pick" or "#1 Choice".</span>
            </li>
          </ul>
        </div>

        <div className="border-t border-slate-100 pt-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Pricing and Stock Accuracy</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            While we periodically update our databases with verified Amazon list prices and promotions, prices on Amazon fluctuate constantly based on merchant promotions, lightning deals, and inventory levels. The price and availability displayed on Amazon at the precise time of checkout will always govern your purchase.
          </p>
        </div>

        <div className="border-t border-slate-100 pt-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Trademark Notice</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Amazon, the Amazon logo, AmazonSupply, and the AmazonSupply logo are trademarks of Amazon.com, Inc. or its affiliates. BuyWise is an independent publication and has no operational, corporate, or ownership relationship with Amazon.com, Inc.
          </p>
        </div>
      </div>
    </div>
  );
}
