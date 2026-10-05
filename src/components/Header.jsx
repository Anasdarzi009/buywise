import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  Flame, 
  BookOpen, 
  Star, 
  Layers, 
  Info, 
  ChevronDown, 
  ExternalLink,
  Laptop,
  Smartphone,
  Headphones,
  Monitor,
  Keyboard
} from 'lucide-react';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { buyingGuides } from '../data/guides';
import { getSearchSuggestions } from '../utils/searchHelper';
import LanguageCurrencySelectors from './LanguageCurrencySelectors';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpenMobile, setSearchOpenMobile] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
    setSearchOpenMobile(false);
    setShowSuggestions(false);
  }, [location.pathname]);

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscape = (e) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  // Handle outside click for search suggestions
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const suggestions = useMemo(() => {
    return getSearchSuggestions(searchQuery, { products, guides: buyingGuides, categories });
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpenMobile(false);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (path) => {
    setShowSuggestions(false);
    setSearchOpenMobile(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 xl:gap-4">
          
          {/* Logo & Subtitle */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md group-hover:bg-orange-600 transition-colors">
              <span className="font-extrabold text-xl tracking-tighter">BW</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none group-hover:text-orange-600 transition-colors">
                Buy<span className="text-orange-500">Wise</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5 hidden sm:inline-block">
                Smart Picks. Better Buying.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-sm font-semibold text-slate-700">
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                onBlur={() => setTimeout(() => setCategoriesDropdownOpen(false), 200)}
                className="flex items-center gap-1 px-2.5 xl:px-3 py-2 rounded-lg hover:text-orange-600 hover:bg-slate-50 transition-colors"
                aria-expanded={categoriesDropdownOpen}
              >
                <Layers className="w-4 h-4 text-slate-500" />
                <span>Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${categoriesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {categoriesDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 grid grid-cols-1 gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {categories.slice(0, 8).map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-slate-400">View picks</span>
                    </Link>
                  ))}
                  <div className="pt-2 border-t border-slate-100">
                    <Link
                      to="/search"
                      className="block text-center text-xs font-bold text-orange-600 hover:text-orange-700 py-1.5"
                    >
                      Browse All Categories →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/deals"
              className="flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-lg hover:text-orange-600 hover:bg-slate-50 transition-colors group"
            >
              <Flame className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
              <span>Best Deals</span>
              <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full">
                Active
              </span>
            </Link>

            <Link
              to="/guides/best-laptops-for-college-students"
              className="flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-lg hover:text-orange-600 hover:bg-slate-50 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>Buying Guides</span>
            </Link>

            <Link
              to="/search?type=reviews"
              className="flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-lg hover:text-orange-600 hover:bg-slate-50 transition-colors"
            >
              <Star className="w-4 h-4 text-slate-500" />
              <span>Reviews</span>
            </Link>

            <Link
              to="/about"
              className="flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-lg hover:text-orange-600 hover:bg-slate-50 transition-colors"
            >
              <Info className="w-4 h-4 text-slate-500" />
              <span>About</span>
            </Link>
          </nav>

          {/* Desktop Right Section: Search Bar + Language & Currency Selectors */}
          <div className="hidden md:flex items-center gap-2 xl:gap-3 flex-1 justify-end max-w-lg">
            {/* Search Bar with Autocomplete Dropdown */}
            <div className="relative w-full max-w-[200px] lg:max-w-[240px] xl:max-w-[280px]" ref={searchContainerRef}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search products..."
                  className="w-full bg-slate-100/90 border border-slate-200/80 rounded-xl pl-8 pr-7 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all shadow-2xs"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setShowSuggestions(false);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </form>

              {/* Suggestions Dropdown (Desktop) */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="p-1.5 divide-y divide-slate-100">
                    {suggestions.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectSuggestion(item.path)}
                        className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-orange-50/80 transition-colors text-left cursor-pointer group"
                      >
                        {item.image ? (
                          <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 p-0.5 shrink-0 flex items-center justify-center overflow-hidden">
                            <img src={item.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-orange-100/80 text-orange-600 shrink-0 flex items-center justify-center text-xs font-bold">
                            {item.type === 'category' ? <Layers className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors truncate">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="bg-slate-50 px-3 py-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Press Enter to view all</span>
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="font-bold text-orange-600 hover:underline cursor-pointer"
                    >
                      All results →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Language & Currency Selectors (Desktop) */}
            <div className="hidden lg:flex items-center shrink-0">
              <LanguageCurrencySelectors variant="desktop" />
            </div>
          </div>

          {/* Mobile Right Controls: Search button + Hamburger */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={() => setSearchOpenMobile(!searchOpenMobile)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown Bar */}
        {searchOpenMobile && (
          <div className="md:hidden py-3 border-t border-slate-100">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, guides, reviews..."
                className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-8 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 p-1"
                  aria-label="Clear mobile search input"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Mobile Instant Suggestions */}
            {suggestions.length > 0 && searchQuery.length >= 2 && (
              <div className="mt-2 bg-white rounded-2xl border border-slate-200 shadow-lg p-1.5 space-y-1">
                {suggestions.slice(0, 4).map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSuggestion(item.path)}
                    className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-orange-50 text-left"
                  >
                    {item.image ? (
                      <img src={item.image} alt="" className="w-7 h-7 object-contain mix-blend-multiply" />
                    ) : (
                      <span className="text-xs">🔍</span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-800 truncate">{item.title}</p>
                      <p className="text-[10px] text-slate-400 truncate">{item.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    BW
                  </div>
                  <span className="font-extrabold text-lg text-slate-900">BuyWise</span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation List */}
              <nav className="mt-6 space-y-1 text-sm font-semibold text-slate-700">
                <Link
                  to="/"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 hover:text-orange-600"
                >
                  <span>Home</span>
                </Link>
                <Link
                  to="/deals"
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-rose-50/60 text-rose-700 font-bold"
                >
                  <span className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-rose-500" />
                    <span>Best Amazon Deals</span>
                  </span>
                  <span className="text-[10px] bg-rose-200 text-rose-800 px-2 py-0.5 rounded-full">Hot</span>
                </Link>
                <Link
                  to="/guides/best-laptops-for-college-students"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 hover:text-orange-600"
                >
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span>Buying Guides</span>
                </Link>
                <Link
                  to="/search?type=reviews"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 hover:text-orange-600"
                >
                  <Star className="w-4 h-4 text-slate-400" />
                  <span>Product Reviews</span>
                </Link>
                <Link
                  to="/about"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 hover:text-orange-600"
                >
                  <Info className="w-4 h-4 text-slate-400" />
                  <span>About Us</span>
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 hover:text-orange-600"
                >
                  <span>Contact Editorial Desk</span>
                </Link>
              </nav>

              {/* Language & Currency Selectors (Mobile Drawer) */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <LanguageCurrencySelectors variant="mobile" />
              </div>

              {/* Categories Section in Mobile Menu */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                  Top Categories
                </span>
                <div className="mt-2 grid grid-cols-1 gap-1 text-xs">
                  {categories.slice(0, 6).map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      className="px-2 py-1.5 rounded-lg text-slate-600 hover:bg-orange-50 hover:text-orange-600 font-medium"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Drawer Footer */}
            <div className="pt-6 border-t border-slate-100 text-xs text-slate-400 space-y-2">
              <p>Independent Amazon Affiliate publication.</p>
              <div className="flex gap-3">
                <Link to="/affiliate-disclosure" className="underline hover:text-slate-600">Disclosure</Link>
                <Link to="/privacy-policy" className="underline hover:text-slate-600">Privacy</Link>
                <Link to="/terms" className="underline hover:text-slate-600">Terms</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
