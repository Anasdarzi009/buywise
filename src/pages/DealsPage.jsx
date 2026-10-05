import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  Tag, 
  ExternalLink, 
  Clock, 
  CheckCircle, 
  Filter, 
  SlidersHorizontal,
  ShieldCheck,
  ArrowRight,
  Bell
} from 'lucide-react';

import { deals, dealCategories } from '../data/deals';
import Breadcrumbs from '../components/Breadcrumbs';
import { createAffiliateUrl, AFFILIATE_REL, formatPrice } from '../utils/affiliate';
import { updateSEO } from '../utils/seo';

export default function DealsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minDiscount, setMinDiscount] = useState(0);

  useEffect(() => {
    updateSEO({
      title: 'Best Amazon Deals & Price Drops Today (2025)',
      description: 'Handpicked, verified discounts on laptops, earbuds, smartphones, and computer monitors on Amazon. No fake discounts or expired coupons.',
    });
  }, []);

  const filteredDeals = useMemo(() => {
    return deals.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory || item.categorySlug === selectedCategory;
      const matchDiscount = item.discountPercent >= minDiscount;
      return matchCat && matchDiscount;
    });
  }, [selectedCategory, minDiscount]);

  const breadcrumbs = [
    { name: 'Amazon Deals', path: '/deals' },
  ];

  return (
    <div className="space-y-10">
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-rose-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>Curated & Price Checked</span>
            </div>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('buywise:open_deals_popup'))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer border border-white/15"
            >
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span>Get Deal Alerts</span>
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Today's Best Amazon Deals
          </h1>

          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            We track price histories and verify Amazon promotions to bring you genuine price cuts on top-performing tech gear. No fake list prices, no artificial discounts.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400 border-t border-slate-800 pt-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-rose-400" />
              <span>Prices verified against published Amazon listings</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct official Amazon retail links</span>
            </span>
          </div>
        </div>
      </div>

      {/* FILTER BUTTONS & DISCOUNT FILTER */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <Filter className="w-4 h-4 text-slate-700" />
            <span>Filter Deals ({filteredDeals.length} active offers)</span>
          </div>

          {/* Discount threshold */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Min Discount:</span>
            <select
              value={minDiscount}
              onChange={(e) => setMinDiscount(Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700 focus:outline-none focus:border-orange-500"
            >
              <option value={0}>All Discounts</option>
              <option value={15}>15% Off or More</option>
              <option value={20}>20% Off or More</option>
              <option value={30}>30% Off or More</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {dealCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* DEALS GRID */}
      {filteredDeals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => {
            const affUrl = createAffiliateUrl(deal, 'deals_page');
            return (
              <div
                key={deal.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* Image and Badges */}
                <div className="relative h-56 bg-slate-50/70 p-6 flex items-center justify-center border-b border-slate-100">
                  <span className="absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-rose-600 text-white shadow-sm flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{deal.dealBadge}</span>
                  </span>

                  <span className="absolute top-3 right-3 text-xs font-extrabold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
                    {deal.discountPercent}% OFF
                  </span>

                  <img
                    src={deal.image}
                    alt={deal.name}
                    loading="lazy"
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Deal Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {deal.brand}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-orange-600 transition-colors mt-1 line-clamp-2 leading-snug">
                      <Link to={`/review/${deal.slug}`}>{deal.name}</Link>
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {deal.bestFor || deal.description}
                    </p>
                  </div>

                  {/* Pricing and Buttons */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-2xl font-black text-slate-900 tracking-tight">
                          {formatPrice(deal.price)}
                        </span>
                        {deal.previousPrice && (
                          <span className="ml-2 text-xs text-slate-400 line-through">
                            {formatPrice(deal.previousPrice)}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                        {deal.endsIn}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      <a
                        href={affUrl}
                        target="_blank"
                        rel={AFFILIATE_REL}
                        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition-all group/btn"
                      >
                        <span>Claim Deal on Amazon</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>

                      <Link
                        to={`/review/${deal.slug}`}
                        className="w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-800 py-1.5 transition-colors"
                      >
                        Read Full Review & Specs
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <Tag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No deals found in this filter</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your discount filter or switching categories to see other current promotions.
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setMinDiscount(0); }}
            className="mt-4 text-xs font-bold text-orange-600 hover:underline"
          >
            Show All Deals
          </button>
        </div>
      )}

      {/* Transparency Note */}
      <div className="bg-slate-100 rounded-2xl p-4 text-center text-xs text-slate-500">
        <p>Prices on Amazon change continuously based on merchant inventories. If you see a discrepancy, the price on Amazon.in at the time of purchase is always authoritative.</p>
      </div>

    </div>
  );
}
