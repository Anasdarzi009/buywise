import React from 'react';
import { ShieldCheck, Search, Scale, FileText, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TrustSection() {
  const trustPoints = [
    {
      icon: Search,
      title: 'Research-Driven Methodology',
      description: 'We rigorously evaluate spec sheets, user feedback patterns, engineering teardowns, and verified benchmarks to cut through marketing hype.',
    },
    {
      icon: Scale,
      title: 'Head-to-Head Comparisons',
      description: 'We directly compare alternatives on real-world factors: battery longevity, ergonomics, upgradeability, and value per rupee spent.',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Fake Reviews or Ratings',
      description: 'We do not invent 5-star ratings or fabricate testing claims. If a product has shortcomings or build flaws, we clearly list them in our Cons section.',
    },
    {
      icon: FileText,
      title: 'Transparent Affiliate Model',
      description: 'We earn commissions from Amazon when you choose to buy through our links. We explicitly disclose this so you can make informed decisions.',
    },
  ];

  return (
    <section className="my-16 bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      
      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider mb-4">
          <HeartHandshake className="w-3.5 h-3.5 text-orange-600" />
          <span>Our Editorial Promise</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Why You Can Trust BuyWise Recommendations
        </h2>
        <p className="mt-3 text-slate-600 text-base leading-relaxed">
          The consumer technology market is flooded with deceptive reviews, sponsored promotions masquerading as advice, and overwhelming choices. BuyWise exists to give you clarity and confidence before you spend your hard-earned money.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {trustPoints.map((point, index) => {
          const Icon = point.icon;
          return (
            <div
              key={index}
              className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 hover:border-orange-200 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">{point.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{point.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 relative z-10">
        <span>Independent editorial standards since launch.</span>
        <div className="flex gap-4 font-semibold text-orange-600">
          <Link to="/about" className="hover:underline">Read Our Editorial Methodology</Link>
          <Link to="/affiliate-disclosure" className="hover:underline">Affiliate Disclosure</Link>
        </div>
      </div>
    </section>
  );
}
