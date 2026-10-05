import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { 
  SlidersHorizontal, 
  HelpCircle, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Check, 
  ArrowRight,
  PackageX,
  X
} from 'lucide-react';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { buyingGuides } from '../data/guides';
import ProductCard from '../components/ProductCard';
import ComparisonTable from '../components/ComparisonTable';
import Breadcrumbs from '../components/Breadcrumbs';
import { updateSEO, generateBreadcrumbSchema } from '../utils/seo';

export default function CategoryPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial states from URL query parameters
  const brandParam = searchParams.get('brand') || 'all';
  const priceParam = searchParams.get('price') || '';
  const sortParam = searchParams.get('sort') || 'recommended';

  const [sortBy, setSortBy] = useState(sortParam);
  const [selectedBrand, setSelectedBrand] = useState(brandParam);
  const [maxPrice, setMaxPrice] = useState(priceParam);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Sync state if URL searchParams change
  useEffect(() => {
    setSelectedBrand(searchParams.get('brand') || 'all');
    setMaxPrice(searchParams.get('price') || '');
    setSortBy(searchParams.get('sort') || 'recommended');
  }, [searchParams]);

  // Update URL helper
  const updateQueryState = (newBrand, newPrice, newSort) => {
    const params = new URLSearchParams();
    if (newBrand && newBrand !== 'all') params.set('brand', newBrand);
    if (newPrice) params.set('price', newPrice);
    if (newSort && newSort !== 'recommended') params.set('sort', newSort);
    setSearchParams(params, { replace: true });
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    updateQueryState(brand, maxPrice, sortBy);
  };

  const handlePriceChange = (price) => {
    setMaxPrice(price);
    updateQueryState(selectedBrand, price, sortBy);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    updateQueryState(selectedBrand, maxPrice, sort);
  };

  const handleClearFilters = () => {
    setSelectedBrand('all');
    setMaxPrice('');
    setSortBy('recommended');
    setSearchParams({}, { replace: true });
  };

  // Find category details
  const currentCategory = useMemo(() => {
    return categories.find((c) => c.slug === slug) || {
      id: slug,
      name: slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Category',
      slug: slug,
      tagline: 'Carefully vetted product recommendations',
      description: 'Discover the best products vetted through research and verified user sentiment.',
      buyingTips: [],
      faqs: [],
    };
  }, [slug]);

  // Products belonging to this category
  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.categorySlug === slug || p.category === slug);
  }, [slug]);

  // Unique brands in this category for filtering
  const availableBrands = useMemo(() => {
    const brands = new Set(categoryProducts.map((p) => p.brand).filter(Boolean));
    return Array.from(brands);
  }, [categoryProducts]);

  // Related buying guides
  const relatedGuides = useMemo(() => {
    return buyingGuides.filter((g) => g.category === slug || g.categoryName.toLowerCase().includes(slug?.toLowerCase() || ''));
  }, [slug]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];

    if (selectedBrand !== 'all') {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    if (maxPrice && !isNaN(maxPrice)) {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [categoryProducts, selectedBrand, maxPrice, sortBy]);

  // Update SEO
  useEffect(() => {
    updateSEO({
      title: currentCategory.seoTitle || `Best ${currentCategory.name} (2025) - Ranked & Reviewed`,
      description: currentCategory.seoDescription || currentCategory.description,
      schema: generateBreadcrumbSchema([
        { name: 'Categories', path: '/search' },
        { name: currentCategory.name, path: `/category/${currentCategory.slug}` },
      ]),
    });
  }, [currentCategory]);

  const breadcrumbs = [
    { name: 'Categories', path: '/search' },
    { name: currentCategory.name, path: `/category/${currentCategory.slug}` },
  ];

  return (
    <div className="space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Category Hero / Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Category Guide</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Best {currentCategory.name}
          </h1>

          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            {currentCategory.description}
          </p>

          {/* Quick Buying Tips */}
          {currentCategory.buyingTips && currentCategory.buyingTips.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                Quick Buying Advice:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {currentCategory.buyingTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* FILTER & SORT CONTROLS */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider w-full md:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-slate-700" />
            <span>Filter & Sort ({filteredProducts.length} picks)</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Brand Filter */}
            {availableBrands.length > 1 && (
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400">Brand:</span>
                <select
                  value={selectedBrand}
                  onChange={(e) => handleBrandChange(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:border-orange-500 cursor-pointer"
                >
                  <option value="all">All Brands</option>
                  {availableBrands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Max Price Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400">Max ₹:</span>
              <input
                type="number"
                placeholder="e.g. 50000"
                value={maxPrice}
                onChange={(e) => handlePriceChange(e.target.value)}
                className="w-28 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="recommended">BuyWise Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Bar */}
        {(selectedBrand !== 'all' || maxPrice || sortBy !== 'recommended') && (
          <div className="pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Active Filters:</span>
            {selectedBrand !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-md font-semibold">
                Brand: {selectedBrand}
                <button
                  type="button"
                  onClick={() => handleBrandChange('all')}
                  className="hover:text-orange-950 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {maxPrice && (
              <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-md font-semibold">
                Max ₹{Number(maxPrice).toLocaleString()}
                <button
                  type="button"
                  onClick={() => handlePriceChange('')}
                  className="hover:text-orange-950 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {sortBy !== 'recommended' && (
              <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md font-medium">
                Sorted: {sortBy === 'price-asc' ? 'Price Low to High' : sortBy === 'price-desc' ? 'Price High to Low' : 'Top Rated'}
                <button
                  type="button"
                  onClick={() => handleSortChange('recommended')}
                  className="hover:text-slate-900 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs font-bold text-orange-600 hover:underline ml-1 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* FEATURED PRODUCTS GRID */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} placement={`category_${slug}`} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <PackageX className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No products match your filters</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your maximum budget or selecting 'All Brands' to view all available recommendations in this category.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="mt-4 text-xs font-bold text-orange-600 hover:text-orange-700 underline cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* PRODUCT COMPARISON SECTION */}
      {categoryProducts.length >= 2 && (
        <ComparisonTable
          products={categoryProducts}
          title={`Side-by-Side Comparison: Top ${currentCategory.name}`}
        />
      )}

      {/* RELATED BUYING GUIDES */}
      {relatedGuides.length > 0 && (
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90">
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Editorial Research</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
            In-Depth Buying Guides for {currentCategory.name}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedGuides.map((guide) => (
              <div
                key={guide.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row gap-4 items-center"
              >
                <div className="w-full sm:w-36 h-28 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                  <img src={guide.image} alt={guide.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-semibold text-slate-400">{guide.readingTime}</span>
                  <h4 className="font-bold text-slate-900 text-sm hover:text-orange-600 transition-colors mt-0.5">
                    <Link to={`/guides/${guide.slug}`}>{guide.title}</Link>
                  </h4>
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

      {/* CATEGORY FAQ SECTION */}
      {currentCategory.faqs && currentCategory.faqs.length > 0 && (
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            Everything You Need to Know Before Buying
          </h3>

          <div className="space-y-3">
            {currentCategory.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4.5 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-orange-600 transition-colors"
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

    </div>
  );
}
