import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Check, Star, ArrowRight } from 'lucide-react';
import { createAffiliateUrl, AFFILIATE_REL, formatPrice } from '../utils/affiliate';

export default function ComparisonTable({ products = [], title = 'Head-to-Head Comparison' }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="my-8">
      {title && (
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500">Quick side-by-side comparison of specifications, price, and our verdict.</p>
        </div>
      )}

      {/* Desktop & Tablet Table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
              <th scope="col" className="p-4 w-1/4">Product</th>
              <th scope="col" className="p-4 w-1/4">Best For</th>
              <th scope="col" className="p-4 w-1/4">Key Features</th>
              <th scope="col" className="p-4 w-28">Price</th>
              <th scope="col" className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((item) => {
              const affUrl = createAffiliateUrl(item, 'comparison_table');
              return (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Product Column */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-slate-50 rounded-xl p-1.5 shrink-0 border border-slate-100 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div>
                        {item.badge && (
                          <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full mb-1">
                            {item.badge}
                          </span>
                        )}
                        <h4 className="font-bold text-slate-900 hover:text-orange-600 leading-snug">
                          <Link to={`/review/${item.slug}`}>{item.name}</Link>
                        </h4>
                        <span className="text-xs text-slate-400">{item.brand}</span>
                      </div>
                    </div>
                  </td>

                  {/* Best For */}
                  <td className="p-4 text-xs text-slate-600 leading-relaxed">
                    {item.bestFor || item.description}
                  </td>

                  {/* Key Features */}
                  <td className="p-4 text-xs text-slate-600">
                    <ul className="space-y-1">
                      {item.features?.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* Price */}
                  <td className="p-4">
                    <div className="font-extrabold text-slate-900 text-base">
                      {formatPrice(item.price)}
                    </div>
                    {item.discountPercent > 0 && (
                      <span className="text-[11px] font-bold text-emerald-600">
                        {item.discountPercent}% Off
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="p-4 text-right">
                    <div className="flex flex-col items-end gap-1.5">
                      <a
                        href={affUrl}
                        target="_blank"
                        rel={AFFILIATE_REL}
                        className="inline-flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm"
                      >
                        <span>On Amazon</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <Link
                        to={`/review/${item.slug}`}
                        className="text-[11px] font-semibold text-slate-500 hover:text-slate-800"
                      >
                        Review
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Responsive Cards */}
      <div className="md:hidden space-y-4">
        {products.map((item) => {
          const affUrl = createAffiliateUrl(item, 'comparison_mobile_card');
          return (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <div className="flex gap-3 items-center mb-3">
                <div className="w-16 h-16 bg-slate-50 rounded-xl p-1.5 shrink-0 border border-slate-100 flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div>
                  {item.badge && (
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full mb-1">
                      {item.badge}
                    </span>
                  )}
                  <h4 className="font-bold text-slate-900 text-sm">
                    <Link to={`/review/${item.slug}`}>{item.name}</Link>
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-extrabold text-slate-900 text-sm">{formatPrice(item.price)}</span>
                    {item.discountPercent > 0 && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                        {item.discountPercent}% Off
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {item.bestFor && (
                <div className="text-xs text-slate-600 bg-slate-50 rounded-lg p-2.5 mb-3">
                  <span className="font-bold text-slate-800">Best for: </span>
                  {item.bestFor}
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <Link
                  to={`/review/${item.slug}`}
                  className="flex items-center justify-center gap-1 text-xs font-semibold py-2 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  <span>Read Review</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <a
                  href={affUrl}
                  target="_blank"
                  rel={AFFILIATE_REL}
                  className="flex items-center justify-center gap-1.5 text-xs font-bold py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm"
                >
                  <span>Amazon</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
