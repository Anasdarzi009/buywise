import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Home, Search, Flame } from 'lucide-react';
import { updateSEO } from '../utils/seo';

export default function NotFoundPage() {
  useEffect(() => {
    updateSEO({
      title: 'Page Not Found (404) | BuyWise',
      description: 'The page you are looking for does not exist or has been moved.',
    });
  }, []);

  return (
    <div className="py-16 sm:py-24 text-center max-w-lg mx-auto space-y-6">
      <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
        <HelpCircle className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-orange-600">Error 404</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          The page or product recommendation you requested could not be located. It may have been moved, renamed, or temporarily archived.
        </p>
      </div>

      <div className="pt-4 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <Link
          to="/deals"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-sm"
        >
          <Flame className="w-4 h-4" />
          <span>Browse Deals</span>
        </Link>

        <Link
          to="/search"
          className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border border-slate-200 transition-all shadow-sm"
        >
          <Search className="w-4 h-4" />
          <span>Search Site</span>
        </Link>
      </div>
    </div>
  );
}
