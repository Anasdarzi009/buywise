import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { AFFILIATE_DISCLOSURE_FULL } from '../utils/affiliate';
import { categories } from '../data/categories';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black text-xl shadow-lg">
                BW
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-tight leading-none">
                  Buy<span className="text-orange-500">Wise</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5">
                  Smart Picks. Better Buying.
                </span>
              </div>
            </Link>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              BuyWise is an independent technology and consumer electronics recommendation publication. 
              We help shoppers make smarter purchasing decisions through rigorous spec analysis, transparent comparisons, and honest buying guides.
            </p>

            <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 rounded-xl px-3 py-2 text-[11px] text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Independent Editorial Standards & Verified Amazon Affiliate Partner</span>
            </div>
          </div>

          {/* Explore Col */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explore Picks
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/deals" className="hover:text-orange-400 transition-colors">
                  Today's Amazon Deals
                </Link>
              </li>
              <li>
                <Link to="/guides/best-laptops-for-college-students" className="hover:text-orange-400 transition-colors">
                  Best College Laptops
                </Link>
              </li>
              <li>
                <Link to="/guides/best-wireless-earbuds-under-2000" className="hover:text-orange-400 transition-colors">
                  Earbuds Under ₹2,000
                </Link>
              </li>
              <li>
                <Link to="/guides/best-monitors-for-programming" className="hover:text-orange-400 transition-colors">
                  Monitors for Coding
                </Link>
              </li>
              <li>
                <Link to="/guides/best-power-banks-for-travel" className="hover:text-orange-400 transition-colors">
                  Travel Power Banks
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-orange-400 transition-colors">
                  Browse All Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Col */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Top Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.slug}`} className="hover:text-orange-400 transition-colors">
                    Best {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/about" className="hover:text-orange-400 transition-colors">
                  About BuyWise
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-400 transition-colors">
                  Contact Editorial Desk
                </Link>
              </li>
              <li>
                <Link to="/affiliate-disclosure" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                  Amazon Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-orange-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-orange-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Affiliate Disclosure Compliance Box */}
        <div className="py-8 border-b border-slate-800 text-xs text-slate-400 leading-relaxed">
          <p className="font-semibold text-slate-300 mb-1">
            Amazon Associates Program Disclaimer:
          </p>
          <p>
            {AFFILIATE_DISCLOSURE_FULL}
          </p>
          <p className="mt-2 text-[11px] text-slate-400">
            Product prices and availability are accurate as of the date/time indicated and are subject to change. Any price and availability information displayed on Amazon.in at the time of purchase will apply to the purchase of this product. BuyWise does not sell products directly or handle order fulfilment.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Back-to-top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} BuyWise. All rights reserved. Independent product recommendations.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer py-1 px-3 rounded-lg hover:bg-slate-800"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
