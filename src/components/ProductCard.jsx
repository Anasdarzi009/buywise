import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Star, Check, ArrowRight } from 'lucide-react';
import { createAffiliateUrl, AFFILIATE_REL, formatPrice } from '../utils/affiliate';

export default function ProductCard({
  product,
  placement = 'card',
  showReviewLink = true,
  layout = 'vertical', // 'vertical' | 'horizontal'
}) {
  if (!product) return null;

  const affiliateUrl = createAffiliateUrl(product, placement);

  const badgeColors = {
    'Our Pick': 'bg-orange-600 text-white shadow-sm',
    'Best Value': 'bg-emerald-600 text-white shadow-sm',
    'Budget Pick': 'bg-blue-600 text-white shadow-sm',
    'Editor\'s Choice': 'bg-indigo-600 text-white shadow-sm',
    'Mega Deal': 'bg-rose-600 text-white shadow-sm',
    'Special Offer': 'bg-amber-600 text-white shadow-sm',
  };

  const badgeClass = product.badge
    ? badgeColors[product.badge] || 'bg-slate-800 text-white'
    : 'bg-slate-800 text-white';

  if (layout === 'horizontal') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6 items-center">
        {/* Image & Badge */}
        <div className="relative w-full md:w-56 h-48 bg-slate-50 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-3 border border-slate-100">
          {product.badge && (
            <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${badgeClass}`}>
              {product.badge}
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80';
            }}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <Link
              to={`/category/${product.categorySlug || product.category}`}
              className="text-xs font-semibold text-slate-500 hover:text-orange-600 transition-colors uppercase tracking-wider"
            >
              {product.brand}
            </Link>
            {product.rating && (
              <div className="flex items-center gap-1 text-xs text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400">({product.reviewsCount?.toLocaleString()})</span>
              </div>
            )}
          </div>

          <h3 className="text-lg font-bold text-slate-900 leading-snug">
            <Link to={`/review/${product.slug}`} className="hover:text-orange-600 transition-colors">
              {product.name}
            </Link>
          </h3>

          <p className="text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Key Specs Preview */}
          {product.features && product.features.length > 0 && (
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
              {product.features.slice(0, 4).map((feat, idx) => (
                <li key={idx} className="flex items-center gap-1.5 truncate">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="truncate">{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pricing & CTA */}
        <div className="w-full md:w-56 shrink-0 pt-4 md:pt-0 md:border-l md:border-slate-100 md:pl-6 flex flex-col justify-center">
          <div className="mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {formatPrice(product.price)}
              </span>
              {product.previousPrice && (
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(product.previousPrice)}
                </span>
              )}
            </div>
            {product.discountPercent > 0 && (
              <span className="inline-block mt-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Save {product.discountPercent}%
              </span>
            )}
            <p className="text-[11px] text-slate-400 mt-1">Price verified on Amazon</p>
          </div>

          <div className="space-y-2">
            <a
              href={affiliateUrl}
              target="_blank"
              rel={AFFILIATE_REL}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all group"
            >
              <span>Check on Amazon</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {showReviewLink && (
              <Link
                to={`/review/${product.slug}`}
                className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 py-2 rounded-lg transition-colors"
              >
                <span>Read Full Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Vertical Layout (Default Grid Card)
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Card Header & Image */}
      <div className="relative h-56 bg-slate-50/70 p-6 flex items-center justify-center border-b border-slate-100 overflow-hidden">
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider z-10 ${badgeClass}`}>
            {product.badge}
          </span>
        )}

        {product.discountPercent > 0 && (
          <span className="absolute top-3 right-3 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 z-10">
            {product.discountPercent}% OFF
          </span>
        )}

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80';
          }}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <Link
              to={`/category/${product.categorySlug || product.category}`}
              className="text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-orange-600 transition-colors"
            >
              {product.brand}
            </Link>

            {product.rating && (
              <div className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400 text-[10px]">({product.reviewsCount?.toLocaleString()})</span>
              </div>
            )}
          </div>

          <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
            <Link to={`/review/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Quick specs pill */}
          {product.features && product.features.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1">
              {product.features.slice(0, 2).map((feat, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600 truncate">
                  <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pricing and Action */}
        <div className="mt-5 pt-3.5 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                {formatPrice(product.price)}
              </span>
              {product.previousPrice && (
                <span className="ml-2 text-xs text-slate-400 line-through">
                  {formatPrice(product.previousPrice)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-400 font-medium">on Amazon</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <a
              href={affiliateUrl}
              target="_blank"
              rel={AFFILIATE_REL}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition-all group/btn"
            >
              <span>View on Amazon</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </a>

            {showReviewLink && (
              <Link
                to={`/review/${product.slug}`}
                className="w-full text-center text-xs font-semibold text-slate-600 hover:text-slate-900 py-1.5 transition-colors"
              >
                In-Depth Review & Specs
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
