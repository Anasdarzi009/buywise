import React, { useMemo, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Check, 
  X, 
  Star, 
  ExternalLink, 
  ShieldCheck, 
  ThumbsUp, 
  ThumbsDown, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  ArrowLeft,
  Layers,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { products } from '../data/products';
import { buyingGuides } from '../data/guides';
import Breadcrumbs from '../components/Breadcrumbs';
import ComparisonTable from '../components/ComparisonTable';
import { createAffiliateUrl, AFFILIATE_REL, formatPrice } from '../utils/affiliate';
import { updateSEO, generateProductSchema, generateBreadcrumbSchema } from '../utils/seo';

export default function ProductReviewPage() {
  const { slug } = useParams();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const product = useMemo(() => {
    return products.find((p) => p.slug === slug);
  }, [slug]);

  // Alternatives from same category
  const alternatives = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => (p.categorySlug === product.categorySlug || p.category === product.category) && p.id !== product.id)
      .slice(0, 3);
  }, [product]);

  // Related buying guides for this category
  const relatedGuides = useMemo(() => {
    if (!product) return [];
    const cat = product.categorySlug || product.category;
    return buyingGuides.filter((g) => g.category === cat || g.categoryName.toLowerCase().includes(cat.toLowerCase())).slice(0, 2);
  }, [product]);

  useEffect(() => {
    if (product) {
      updateSEO({
        title: `${product.name} Review: Specs, Pros & Verdict (2025)`,
        description: `In-depth analysis of ${product.name}. Check key specifications, honest pros & cons, who should buy it, and current Amazon pricing.`,
        ogImage: product.image,
        schema: generateProductSchema(product),
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Product Review Not Found</h2>
        <p className="text-slate-500 mt-2 text-sm">The product you are looking for may have been updated or moved.</p>
        <Link to="/" className="mt-4 inline-block font-bold text-orange-600 hover:underline text-sm">
          Return to Home →
        </Link>
      </div>
    );
  }

  const affiliateUrl = createAffiliateUrl(product, 'review_hero');

  const breadcrumbItems = [
    { name: 'Categories', path: '/search' },
    { name: product.brand, path: `/search?q=${encodeURIComponent(product.brand)}` },
    { name: product.name, path: `/review/${product.slug}` },
  ];

  return (
    <div className="space-y-12">
      {/* Breadcrumbs and Back Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Breadcrumbs items={breadcrumbItems} />
        <Link
          to={`/category/${product.categorySlug || product.category}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-orange-600 transition-colors py-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to {product.categorySlug ? product.categorySlug.charAt(0).toUpperCase() + product.categorySlug.slice(1) : 'Category'}</span>
        </Link>
      </div>

      {/* Hero Review Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Product Image & Badges */}
          <div className="lg:col-span-5">
            <div className="relative bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-100 flex items-center justify-center h-80 sm:h-96">
              {product.badge && (
                <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-orange-600 text-white shadow-sm">
                  {product.badge}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">
                  {product.discountPercent}% OFF
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>

            {/* Verification note */}
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Independent editorial analysis based on published engineering specifications and user consensus.</span>
            </div>
          </div>

          {/* Right Column: Title, Ratings, Pricing, Quick Verdict & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                  {product.brand}
                </span>
                {product.rating && (
                  <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating} / 5.0</span>
                    <span className="text-slate-400 text-[11px]">({product.reviewsCount?.toLocaleString()} reviews)</span>
                  </div>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Price Block */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {formatPrice(product.price)}
                </span>
                {product.previousPrice && (
                  <span className="text-base text-slate-400 line-through">
                    {formatPrice(product.previousPrice)}
                  </span>
                )}
                <span className="text-xs text-slate-400 font-medium">on Amazon.in</span>
              </div>

              {/* Best For Tagline */}
              {product.bestFor && (
                <div className="mt-4 p-3.5 bg-orange-50/70 border border-orange-200/80 rounded-2xl text-xs sm:text-sm text-orange-950 font-medium leading-relaxed">
                  <span className="font-bold text-orange-900">Best for: </span>
                  {product.bestFor}
                </div>
              )}

              {/* Quick Verdict */}
              {product.verdict && (
                <div className="mt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Quick Verdict:
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    {product.verdict}
                  </p>
                </div>
              )}
            </div>

            {/* Primary Amazon CTA */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <a
                href={affiliateUrl}
                target="_blank"
                rel={AFFILIATE_REL}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 via-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-base py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all group cursor-pointer"
              >
                <span>Check Latest Price on Amazon</span>
                <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <p className="text-[11px] text-center text-slate-400">
                You will be redirected to Amazon.in. As an Amazon Associate, BuyWise may earn from qualifying purchases.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* PROS & CONS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pros */}
        <div className="bg-emerald-50/40 rounded-3xl border border-emerald-200/60 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-base mb-4">
            <ThumbsUp className="w-5 h-5 text-emerald-600" />
            <span>The Good (Pros)</span>
          </div>
          <ul className="space-y-3">
            {product.pros?.map((pro, index) => (
              <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-950">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="bg-rose-50/40 rounded-3xl border border-rose-200/60 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-base mb-4">
            <ThumbsDown className="w-5 h-5 text-rose-600" />
            <span>The Trade-Offs (Cons)</span>
          </div>
          <ul className="space-y-3">
            {product.cons?.map((con, index) => (
              <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-rose-950">
                <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* WHO SHOULD BUY / WHO SHOULD SKIP */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-6">
          Is This the Right Product for You?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
              Who Should Buy It:
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {product.whoShouldBuy || 'Shoppers seeking strong everyday performance and long-term hardware reliability.'}
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
              Who Should Skip It:
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {product.whoShouldSkip || 'Users with specialized requirements exceeding standard consumer hardware specifications.'}
            </p>
          </div>
        </div>
      </div>

      {/* DETAILED SPECIFICATIONS & ANALYSIS */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-4">
          Detailed Specifications & Breakdown
        </h3>
        
        {product.detailedAnalysis && (
          <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
            {product.detailedAnalysis}
          </p>
        )}

        {product.specifications && (
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <tbody className="divide-y divide-slate-100">
                {Object.entries(product.specifications).map(([key, value], idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                    <td className="p-3.5 sm:p-4 font-semibold text-slate-700 w-1/3 sm:w-1/4">
                      {key}
                    </td>
                    <td className="p-3.5 sm:p-4 text-slate-900 font-medium">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ALTERNATIVES & COMPARISON */}
      {alternatives.length > 0 && (
        <div>
          <ComparisonTable
            products={[product, ...alternatives]}
            title={`Compare ${product.name} with Closest Alternatives`}
          />
        </div>
      )}

      {/* RELATED BUYING GUIDES */}
      {relatedGuides.length > 0 && (
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Related Research</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Buying Guides Featuring This Product
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.id}
                to={`/guides/${guide.slug}`}
                className="bg-white rounded-2xl border border-slate-200 p-4 hover:border-orange-500/80 hover:shadow-sm transition-all group flex items-center gap-3.5"
              >
                <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                  <img src={guide.image} alt={guide.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-orange-600">{guide.categoryName}</span>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-orange-600 transition-colors line-clamp-2">
                    {guide.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* BOTTOM AFFILIATE CTA */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-lg text-center max-w-3xl mx-auto space-y-4">
        <h3 className="text-2xl font-bold">Ready to check current offers?</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          Stock and promotions fluctuate frequently. Check the official Amazon product listing for active coupon discounts and estimated delivery times.
        </p>
        <a
          href={affiliateUrl}
          target="_blank"
          rel={AFFILIATE_REL}
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm py-3 px-8 rounded-xl transition-all shadow-md"
        >
          <span>View {product.name} on Amazon</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
}
