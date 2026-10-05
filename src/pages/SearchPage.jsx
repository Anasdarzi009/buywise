import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Package, 
  BookOpen, 
  Star, 
  ExternalLink, 
  ArrowRight, 
  Layers,
  Sparkles,
  Inbox,
  X
} from 'lucide-react';
import { products } from '../data/products';
import { buyingGuides } from '../data/guides';
import { categories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import Breadcrumbs from '../components/Breadcrumbs';
import { searchCatalog } from '../utils/searchHelper';
import { updateSEO } from '../utils/seo';

const POPULAR_SEARCH_KEYWORDS = [
  'laptop',
  'earbuds',
  'gaming mouse',
  'monitor',
  'power bank',
  'keyboard',
  'smartphone',
  'smartwatch',
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const typeParam = searchParams.get('type') || 'all'; // 'all' | 'products' | 'guides' | 'reviews'

  const [inputVal, setInputVal] = useState(queryParam);
  const [activeTab, setActiveTab] = useState(typeParam);

  useEffect(() => {
    setInputVal(queryParam);
    setActiveTab(typeParam);
  }, [queryParam, typeParam]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: inputVal.trim(), type: activeTab });
  };

  const handleClear = () => {
    setInputVal('');
    setSearchParams({ q: '', type: activeTab });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ q: inputVal.trim(), type: tab });
  };

  const handleKeywordClick = (keyword) => {
    setInputVal(keyword);
    setSearchParams({ q: keyword, type: activeTab });
  };

  // Perform intelligent search using searchCatalog helper
  const searchResults = useMemo(() => {
    return searchCatalog(queryParam, { products, guides: buyingGuides, categories });
  }, [queryParam]);

  const { products: matchedProducts, guides: matchedGuides, categories: matchedCategories, totalCount } = searchResults;

  useEffect(() => {
    updateSEO({
      title: queryParam ? `Search: "${queryParam}" | BuyWise` : 'Search Product Reviews & Guides | BuyWise',
      description: `Explore search results for "${queryParam}" on BuyWise. Discover top tech picks, specs comparisons, and buying guides.`,
    });
  }, [queryParam]);

  const breadcrumbs = [
    { name: 'Search', path: '/search' },
    ...(queryParam ? [{ name: queryParam, path: `/search?q=${encodeURIComponent(queryParam)}` }] : []),
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbs} />

      {/* Search Header and Input */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
          Search Products & Buying Guides
        </h1>

        <form onSubmit={handleSearchSubmit} className="relative max-w-2xl">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Search by product name, brand, category, or problem (e.g., laptop under 50000)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-32 py-3.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white shadow-inner transition-all"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {inputVal && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Search
            </button>
          </div>
        </form>

        {queryParam ? (
          <p className="mt-3 text-xs sm:text-sm text-slate-500">
            Showing results for <span className="font-bold text-slate-900">"{queryParam}"</span> ({totalCount} results found)
          </p>
        ) : (
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Popular searches:</span>
            {POPULAR_SEARCH_KEYWORDS.map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => handleKeywordClick(kw)}
                className="bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-600 px-2.5 py-1 rounded-lg transition-colors cursor-pointer capitalize"
              >
                {kw}
              </button>
            ))}
          </div>
        )}

        {/* Tab Filters */}
        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-100">
          <button
            onClick={() => handleTabChange('all')}
            className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            All Results ({totalCount})
          </button>

          <button
            onClick={() => handleTabChange('products')}
            className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'products'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Products ({matchedProducts.length})</span>
          </button>

          <button
            onClick={() => handleTabChange('guides')}
            className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'guides'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Buying Guides ({matchedGuides.length})</span>
          </button>

          <button
            onClick={() => handleTabChange('reviews')}
            className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>In-Depth Reviews ({matchedProducts.length})</span>
          </button>
        </div>
      </div>

      {/* QUICK MATCHED CATEGORIES PILLS (if user searches category name or related term) */}
      {matchedCategories.length > 0 && (
        <div className="bg-orange-50/70 border border-orange-200/80 rounded-2xl p-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-orange-900 uppercase tracking-wider mr-2 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-orange-600" />
            <span>Matching Categories:</span>
          </span>
          {matchedCategories.map((c) => (
            <Link
              key={c.id}
              to={`/category/${c.slug}`}
              className="text-xs font-semibold bg-white text-orange-950 px-3 py-1 rounded-full border border-orange-200 hover:border-orange-400 transition-colors"
            >
              {c.name} Hub →
            </Link>
          ))}
        </div>
      )}

      {/* NO RESULTS STATE */}
      {totalCount === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">
            {queryParam ? `No results found for "${queryParam}"` : 'No results found'}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try another product, category, or keyword. Check your spelling or browse our popular categories below.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {POPULAR_SEARCH_KEYWORDS.map((kw) => (
              <button
                key={kw}
                onClick={() => handleKeywordClick(kw)}
                className="text-xs font-semibold bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 transition-colors cursor-pointer capitalize"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCT RESULTS */}
      {(activeTab === 'all' || activeTab === 'products' || activeTab === 'reviews') && matchedProducts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              Product Recommendations ({matchedProducts.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedProducts.map((p) => (
              <ProductCard key={p.id} product={p} placement="search_results" />
            ))}
          </div>
        </div>
      )}

      {/* GUIDE RESULTS */}
      {(activeTab === 'all' || activeTab === 'guides') && matchedGuides.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            Buying Guides & Editorial Articles ({matchedGuides.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matchedGuides.map((guide) => (
              <div
                key={guide.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row gap-4 items-center shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-full sm:w-40 h-32 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                  <img src={guide.image} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                    <span className="font-bold text-orange-600 uppercase">{guide.categoryName}</span>
                    <span>•</span>
                    <span>{guide.readingTime}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-orange-600 transition-colors leading-snug">
                    <Link to={`/guides/${guide.slug}`}>{guide.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{guide.excerpt}</p>
                  <Link
                    to={`/guides/${guide.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 mt-3"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
