import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Target, 
  Eye, 
  Search, 
  Scale, 
  HeartHandshake, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { updateSEO } from '../utils/seo';

export default function AboutPage() {
  useEffect(() => {
    updateSEO({
      title: 'About BuyWise | Our Editorial Mission & Methodology',
      description: 'Learn how BuyWise conducts product research, evaluates consumer electronics specifications, and maintains independent editorial standards.',
    });
  }, []);

  const breadcrumbs = [
    { name: 'About BuyWise', path: '/about' },
  ];

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          <span>Our Editorial Mission</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Smart Picks. Better Buying.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          BuyWise was founded on a simple realization: shopping for tech online has become exhausting. Between sponsored influencers, algorithmically generated content, and deceptive fake reviews, finding honest, well-researched advice is harder than ever.
        </p>
      </div>

      {/* Core Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-2">Deep Spec Analysis</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We pore over engineering documentation, tear-down reports, real-world battery drain tests, and verified owner consensus so you don't have to.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-2">No Sponsored Influence</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Brands do not pay to be ranked #1 on our lists. Our editorial recommendations are chosen purely based on hardware value and user satisfaction.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-2">Total Transparency</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We clearly label our Amazon affiliate links and disclose how we earn revenue. You pay the exact same price whether you use our links or not.
          </p>
        </div>
      </div>

      {/* Editorial Methodology */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          How We Evaluate Products
        </h2>
        
        <p className="text-sm text-slate-600 leading-relaxed">
          We believe in honest, grounded language. We do not pretend to run a certified industrial hardware testing laboratory when we do not. Instead, our methodology relies on comprehensive multi-source product intelligence:
        </p>

        <div className="space-y-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm mb-1">1. Technical Specification Verification</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We verify processor architectures, memory speeds (DDR4 vs LPDDR5), display color spaces (sRGB vs NTSC), and charging protocols directly against manufacturer data sheets.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm mb-1">2. Aggregate Long-Term User Sentiment</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              A product can work great in week one but fail in month six. We analyze thousands of verified owner reviews and forum discussions to identify chronic issues like hinge fragility, battery degradation, and driver bugs.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm mb-1">3. Value-Per-Rupee Calculation</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We look beyond brand prestige to calculate tangible return on investment. If a ₹3,000 pair of earbuds delivers 90% of the acoustic clarity of an ₹8,000 pair, we highlight the smart value option.
            </p>
          </div>
        </div>
      </section>

      {/* Independence Statement */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-md">
        <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">
          <HeartHandshake className="w-4 h-4" />
          <span>Our Commitment to You</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold mb-3">
          Independent Editorial Autonomy
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          BuyWise is not owned by Amazon, any consumer electronics manufacturer, or retail conglomerate. We are an independent team of technology enthusiasts dedicated to making tech purchases simpler, smarter, and regret-free.
        </p>

        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap gap-4 text-xs font-semibold">
          <Link to="/contact" className="text-orange-400 hover:text-orange-300 inline-flex items-center gap-1">
            <span>Have feedback or questions? Contact us</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link to="/affiliate-disclosure" className="text-slate-400 hover:text-white">
            Read our Affiliate Disclosure
          </Link>
        </div>
      </section>

    </div>
  );
}
