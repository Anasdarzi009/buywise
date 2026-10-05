import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  CheckCircle, 
  Layers, 
  ShieldCheck, 
  ExternalLink,
  Laptop,
  Smartphone,
  Headphones,
  Monitor,
  Keyboard,
  Mouse,
  Watch,
  BatteryCharging,
  Gamepad2,
  Coffee,
  GraduationCap,
  Speaker
} from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { buyingGuides } from '../data/guides';
import ProductCard from '../components/ProductCard';
import TrustSection from '../components/TrustSection';
import NewsletterSection from '../components/NewsletterSection';
import { updateSEO } from '../utils/seo';

// Category icon mapper
const iconMap = {
  Laptop: Laptop,
  Smartphone: Smartphone,
  Headphones: Headphones,
  Speaker: Speaker,
  Monitor: Monitor,
  Keyboard: Keyboard,
  Mouse: Mouse,
  Watch: Watch,
  BatteryCharging: BatteryCharging,
  Gamepad2: Gamepad2,
  Coffee: Coffee,
  GraduationCap: GraduationCap,
};

export default function HomePage() {
  useEffect(() => {
    updateSEO({
      title: 'Smart Picks. Better Buying. | Independent Tech & Product Guides',
      description: 'Expert product guides, specs comparisons and recommendations to help you make smarter buying decisions on laptops, smartphones, earbuds, monitors and tech gear.',
    });
  }, []);

  const trendingPicks = products.slice(0, 6);
  const featuredGuides = buyingGuides.slice(0, 5);

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 pb-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 text-orange-900 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Independent & Research-Backed Tech Editorial</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Find Better Products. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-amber-500">
                Buy With Confidence.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Expert product guides, comparisons and recommendations to help you make smarter buying decisions. No fake reviews, no sponsored bias—just verified specs and honest analysis.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#trending-picks"
                className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-orange-500/20 transition-all inline-flex items-center gap-2 group"
              >
                <span>Explore Best Picks</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#popular-categories"
                className="bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm px-6 py-3.5 rounded-xl border border-slate-200/90 shadow-sm transition-all inline-flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-slate-500" />
                <span>Browse Categories</span>
              </a>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 border-t border-slate-200/60">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Verified Spec Checks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Transparent Amazon Affiliate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Zero Fabricated Ratings</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Product Collage / Spotlight */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-200/40 to-amber-200/40 rounded-3xl blur-2xl -z-10" />

            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Editor's Spotlight of the Week
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                  #1 Recommended
                </span>
              </div>

              {/* Spotlight Featured Item */}
              <div className="pt-4">
                <div className="h-52 bg-slate-50 rounded-2xl p-4 flex items-center justify-center border border-slate-100 mb-4">
                  <img
                    src={products[0].image}
                    alt={products[0].name}
                    className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{products[0].brand}</span>
                    <span className="text-xs font-extrabold text-slate-900">₹{products[0].price.toLocaleString()}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg leading-snug">
                    <Link to={`/review/${products[0].slug}`} className="hover:text-orange-600 transition-colors">
                      {products[0].name}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {products[0].bestFor}
                  </p>

                  <div className="pt-3 flex gap-2">
                    <Link
                      to={`/review/${products[0].slug}`}
                      className="flex-1 text-center py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                    >
                      Read Analysis
                    </Link>
                    <a
                      href={`https://www.amazon.in/dp/${products[0].amazonAsin}?tag=buywise-21`}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors shadow-sm"
                    >
                      <span>Check Amazon</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section id="popular-categories" className="scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>Browse by Category</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Product Categories
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Carefully vetted buying recommendations organized by device type.
            </p>
          </div>

          <Link
            to="/search"
            className="text-xs font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1 shrink-0"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Laptop;
            return (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 hover:border-orange-500/80 hover:shadow-md hover:-translate-y-0.5 transition-all group flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-orange-600 transition-colors">
                  {category.name}
                </h3>
                <span className="text-[11px] text-slate-400 mt-1 font-medium">
                  {category.featuredCount}+ Picks
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* TRENDING PICKS */}
      <section id="trending-picks" className="scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Tested & Recommended</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Trending Top Picks
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Products that continually score high on durability, battery life, and overall user satisfaction.
            </p>
          </div>

          <Link
            to="/deals"
            className="text-xs font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1 shrink-0"
          >
            <span>See Amazon Deals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingPicks.map((product) => (
            <ProductCard key={product.id} product={product} placement="homepage_trending" />
          ))}
        </div>
      </section>

      {/* FEATURED BUYING GUIDES */}
      <section className="bg-slate-100/60 rounded-3xl p-6 sm:p-10 border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Comprehensive Guides</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Buying Guides
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              In-depth research breaking down exactly what matters before making a purchase.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGuides.map((guide) => (
            <article
              key={guide.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={guide.image}
                  alt={guide.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900/90 text-white backdrop-blur-sm">
                  {guide.categoryName}
                </span>
                <span className="absolute bottom-3 right-3 text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/90 text-slate-800 backdrop-blur-sm">
                  {guide.readingTime}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                    <Link to={`/guides/${guide.slug}`}>{guide.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {guide.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Updated {guide.updatedDate}</span>
                  <Link
                    to={`/guides/${guide.slug}`}
                    className="font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* WHY TRUST US */}
      <TrustSection />

      {/* NEWSLETTER */}
      <NewsletterSection />

    </div>
  );
}
