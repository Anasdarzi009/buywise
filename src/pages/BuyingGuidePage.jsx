import React, { useMemo, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  ExternalLink, 
  ArrowRight, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Share2,
  Bookmark,
  Sparkles
} from 'lucide-react';
import { buyingGuides } from '../data/guides';
import { products } from '../data/products';
import Breadcrumbs from '../components/Breadcrumbs';
import ComparisonTable from '../components/ComparisonTable';
import ProductCard from '../components/ProductCard';
import { createAffiliateUrl, AFFILIATE_REL, formatPrice } from '../utils/affiliate';
import { updateSEO, generateArticleSchema, generateBreadcrumbSchema } from '../utils/seo';

export default function BuyingGuidePage() {
  const { slug } = useParams();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const guide = useMemo(() => {
    return buyingGuides.find((g) => g.slug === slug);
  }, [slug]);

  // Featured products mentioned in guide
  const guideProducts = useMemo(() => {
    if (!guide) return [];
    return guide.featuredProductIds
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean);
  }, [guide]);

  // Related guides
  const relatedGuides = useMemo(() => {
    if (!guide || !guide.relatedGuideSlugs) return [];
    return guide.relatedGuideSlugs
      .map((s) => buyingGuides.find((g) => g.slug === s))
      .filter(Boolean);
  }, [guide]);

  useEffect(() => {
    if (guide) {
      updateSEO({
        title: guide.title,
        description: guide.excerpt,
        ogImage: guide.image,
        schema: generateArticleSchema(guide),
      });
    }
  }, [guide]);

  if (!guide) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Guide Not Found</h2>
        <p className="text-slate-500 mt-2 text-sm">The buying guide you requested does not exist or has been archived.</p>
        <Link to="/" className="mt-4 inline-block font-bold text-orange-600 hover:underline text-sm">
          Browse All Guides →
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Guides', path: '/search' },
    { name: guide.categoryName, path: `/category/${guide.category}` },
    { name: guide.title, path: `/guides/${guide.slug}` },
  ];

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Guide Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Link
            to={`/category/${guide.category}`}
            className="font-bold uppercase tracking-wider text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1 rounded-full transition-colors"
          >
            {guide.categoryName}
          </Link>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{guide.readingTime}</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Updated {guide.updatedDate}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {guide.title}
        </h1>

        {guide.subtitle && (
          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            {guide.subtitle}
          </p>
        )}

        <div className="flex items-center gap-3 pt-2 text-xs text-slate-500">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
            BW
          </div>
          <div>
            <span className="font-semibold text-slate-800">{guide.author}</span>
            <span className="block text-[11px] text-slate-400">Independent Tech Research Desk</span>
          </div>
        </div>
      </header>

      {/* Featured Hero Banner Image */}
      <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-200 aspect-video max-h-96 w-full">
        <img
          src={guide.image}
          alt={guide.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Introduction */}
      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base space-y-4">
        {guide.intro.split('\n\n').map((para, i) => (
          <p key={i}>{para.trim()}</p>
        ))}
      </div>

      {/* QUICK RECOMMENDATIONS BOX */}
      {guide.quickSummary && (
        <section className="bg-amber-50/60 rounded-3xl border border-amber-200/80 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>At a Glance</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-amber-950 mb-4">
            Quick Recommendations: Which Should You Buy?
          </h2>

          <div className="space-y-4">
            {guide.quickSummary.map((item, index) => {
              const matchedProd = products.find((p) => p.id === item.productId);
              const affUrl = matchedProd ? createAffiliateUrl(matchedProd, 'guide_quick_summary') : '#';
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-amber-200/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="flex-1">
                    <span className="inline-block text-[11px] font-bold text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full mb-1">
                      {item.badge}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">
                      {matchedProd ? (
                        <Link to={`/review/${matchedProd.slug}`} className="hover:text-orange-600 transition-colors">
                          {item.productName}
                        </Link>
                      ) : (
                        item.productName
                      )}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.whyWeRecommend}
                    </p>
                  </div>

                  {matchedProd && (
                    <div className="shrink-0 flex items-center gap-2">
                      <a
                        href={affUrl}
                        target="_blank"
                        rel={AFFILIATE_REL}
                        className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-2 px-3.5 rounded-xl transition-all shadow-sm"
                      >
                        <span>Check Price</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* COMPARISON TABLE */}
      {guideProducts.length > 0 && (
        <ComparisonTable
          products={guideProducts}
          title="Compare Featured Models Side-by-Side"
        />
      )}

      {/* DETAILED PRODUCT SECTIONS */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Detailed Product Breakdown
        </h2>

        <div className="space-y-6">
          {guideProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              layout="horizontal"
              placement={`guide_${guide.slug}`}
            />
          ))}
        </div>
      </section>

      {/* BUYING CONSIDERATIONS */}
      {guide.buyingConsiderations && (
        <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Key Buying Considerations to Keep in Mind
          </h2>
          <div className="space-y-6">
            {guide.buyingConsiderations.map((consideration, idx) => (
              <div key={idx} className="border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
                <h3 className="font-bold text-slate-900 text-base mb-1.5">
                  {consideration.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {consideration.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FREQUENTLY ASKED QUESTIONS */}
      {guide.faqs && guide.faqs.length > 0 && (
        <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {guide.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-orange-600 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* CONCLUSION */}
      {guide.conclusion && (
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-md space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">The BuyWise Bottom Line</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {guide.conclusion}
          </p>
        </div>
      )}

      {/* RELATED GUIDES */}
      {relatedGuides.length > 0 && (
        <div className="pt-6 border-t border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Related Product Guides
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedGuides.map((rel) => (
              <Link
                key={rel.id}
                to={`/guides/${rel.slug}`}
                className="bg-white rounded-2xl border border-slate-200 p-4 hover:border-orange-500/80 hover:shadow-sm transition-all group flex items-center gap-3.5"
              >
                <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                  <img src={rel.image} alt={rel.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-orange-600">{rel.categoryName}</span>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-orange-600 transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
