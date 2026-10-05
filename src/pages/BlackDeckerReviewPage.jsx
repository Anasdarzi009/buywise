import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Coffee, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  Check, 
  X, 
  ChevronDown, 
  Calendar, 
  User, 
  Sparkles, 
  Droplets, 
  Timer, 
  Zap, 
  ListOrdered, 
  HelpCircle,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  Info
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { AFFILIATE_REL } from '../utils/affiliate';
import { updateSEO } from '../utils/seo';

// Amazon affiliate URL specified for this review
const AMAZON_AFFILIATE_URL = 'https://www.amazon.com/dp/B01GJOMWVA?tag=buywisehub07-20';

const faqItems = [
  {
    question: 'How many ounces is a "cup" on this coffee maker?',
    answer: 'One cup is about 5 ounces, so a full 12-cup pot yields roughly 60 ounces of brewed coffee, though the exact amount can vary slightly depending on your coffee grounds and brewing technique.'
  },
  {
    question: 'Can I set it to brew automatically?',
    answer: 'Yes. The machine features 24-hour QuickTouch programming. You can set the timer the night before using the PROG, HOUR, and MIN buttons to wake up to a fresh pot, or schedule it for any time within 24 hours.'
  },
  {
    question: 'Does it shut off automatically?',
    answer: 'Yes. The machine automatically turns itself off after two hours on the warming plate, which provides safety and peace of mind if you leave the house in a rush.'
  },
  {
    question: 'Can I pour a cup before the brew finishes?',
    answer: 'Yes. The built-in Sneak-A-Cup feature temporarily halts the flow of coffee when you pull the glass carafe out, allowing you to pour a cup early mid-brew without making a mess on the hot plate.'
  },
  {
    question: 'What kind of filter does it use?',
    answer: 'The CM1160B requires standard 8 to 12 cup basket-style paper filters, which are placed directly inside the removable brew basket (paper filters must be purchased separately).'
  }
];

const tableOfContents = [
  { id: 'quick-verdict', title: 'Quick Verdict' },
  { id: 'what-is-cm1160b', title: 'What is the BLACK+DECKER CM1160B?' },
  { id: 'key-features', title: 'Key Features' },
  { id: 'pros-and-cons', title: 'Pros and Cons' },
  { id: 'who-should-buy', title: 'Who Should Buy It?' },
  { id: 'brewing-tips', title: 'How to Get the Best Coffee' },
  { id: 'faqs', title: 'Frequently Asked Questions' },
  { id: 'final-verdict', title: 'Final Verdict' },
];

export default function BlackDeckerReviewPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://buywise.reviews';
    const canonicalUrl = `${siteUrl}/reviews/black-decker-cm1160b-review`;
    const imageUrl = `${siteUrl}/images/black-decker-cm1160b.jpg`;

    // Multi-entity JSON-LD schema (Article, Product, Breadcrumbs, FAQPage)
    const combinedSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${canonicalUrl}#article`,
          'headline': 'BLACK+DECKER 12-Cup Programmable Coffee Maker (CM1160B) Review: Is It Worth Buying?',
          'description': 'Looking for a simple programmable coffee maker? Read our BLACK+DECKER CM1160B review covering its 12-cup carafe, programming, Sneak-A-Cup feature, pros, cons and who should buy it.',
          'image': imageUrl,
          'author': {
            '@type': 'Organization',
            'name': 'BuyWise Editorial Desk'
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'BuyWise Hub',
            'logo': {
              '@type': 'ImageObject',
              'url': `${siteUrl}/favicon.svg`
            }
          },
          'datePublished': '2025-02-15',
          'dateModified': '2026-10-05',
          'mainEntityOfPage': canonicalUrl
        },
        {
          '@type': 'Product',
          '@id': `${canonicalUrl}#product`,
          'name': 'BLACK+DECKER 12-Cup Programmable Coffee Maker (CM1160B)',
          'image': imageUrl,
          'description': 'Drip coffee maker with 12-cup DuraLife glass carafe, digital display, 24-hour QuickTouch programming, Sneak-A-Cup pause-and-pour feature, and 2-hour auto shutoff.',
          'brand': {
            '@type': 'Brand',
            'name': 'BLACK+DECKER'
          },
          'offers': {
            '@type': 'Offer',
            'priceCurrency': 'USD',
            'availability': 'https://schema.org/InStock',
            'url': AMAZON_AFFILIATE_URL
          }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonicalUrl}#breadcrumbs`,
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': `${siteUrl}/`
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Reviews',
              'item': `${siteUrl}/search?q=reviews`
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': 'BLACK+DECKER CM1160B',
              'item': canonicalUrl
            }
          ]
        },
        {
          '@type': 'FAQPage',
          '@id': `${canonicalUrl}#faq`,
          'mainEntity': faqItems.map((item) => ({
            '@type': 'Question',
            'name': item.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': item.answer
            }
          }))
        }
      ]
    };

    updateSEO({
      title: 'BLACK+DECKER CM1160B Review: Is This 12-Cup Coffee Maker Worth It?',
      description: 'Looking for a simple programmable coffee maker? Read our BLACK+DECKER CM1160B review covering its 12-cup carafe, programming, Sneak-A-Cup feature, pros, cons and who should buy it.',
      canonicalUrl: canonicalUrl,
      ogType: 'article',
      ogImage: imageUrl,
      schema: combinedSchema
    });
  }, []);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const breadcrumbs = [
    { name: 'Reviews', path: '/search?q=reviews' },
    { name: 'BLACK+DECKER CM1160B', path: '/reviews/black-decker-cm1160b-review' },
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto px-4 sm:px-6">
      {/* 1. Breadcrumbs Navigation */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Section */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Link 
            to="/category/home-kitchen" 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-wider hover:bg-orange-100 transition-colors"
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Coffee Makers</span>
          </Link>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            <span>BuyWise Editorial Desk</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Updated October 2026</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          BLACK+DECKER 12-Cup Programmable Coffee Maker (CM1160B) Review: Is It Worth Buying?
        </h1>

        {/* 4. Affiliate Disclosure */}
        <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Disclosure:</strong> This article contains affiliate links. If you buy through them, we may earn a small commission at no extra cost to you.
          </p>
        </div>

        {/* Product Visual Card with Image & Quick Verdict Box */}
        <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center">
            
            {/* Product Image Column */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center p-2">
                <img 
                  src="/images/black-decker-cm1160b.jpg" 
                  alt="BLACK+DECKER CM1160B 12-Cup Programmable Coffee Maker" 
                  className="w-full h-full object-cover rounded-xl"
                  loading="eager"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                  12-Cup Capacity
                </span>
              </div>
            </div>

            {/* Quick Verdict & Primary CTA */}
            <div className="lg:col-span-7 space-y-5" id="quick-verdict">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Quick verdict</span>
              </div>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                If you want a simple, no-fuss coffee maker that has coffee ready when you wake up, the <strong className="text-slate-900">BLACK+DECKER CM1160B</strong> is a solid pick. It covers what most people use daily: a 24-hour timer, a pause-and-pour function, and auto shutoff, without a complicated setup.
              </p>

              {/* Feature Badges */}
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <span className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-md">
                  DuraLife Glass Carafe
                </span>
                <span className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-md">
                  Sneak-A-Cup Feature
                </span>
                <span className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-md">
                  24-Hour Timer
                </span>
                <span className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-md">
                  2-Hour Auto Shutoff
                </span>
              </div>

              {/* CTA 1 */}
              <div className="pt-2">
                <a
                  href={AMAZON_AFFILIATE_URL}
                  target="_blank"
                  rel={AFFILIATE_REL}
                  className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-98"
                >
                  <span>Check the current price on Amazon</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Main Content + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Main Article Body (8 Cols on Desktop) */}
        <article className="lg:col-span-8 space-y-12 text-slate-800 leading-relaxed">
          
          {/* Section: What is the BLACK+DECKER CM1160B? */}
          <section id="what-is-cm1160b" className="space-y-4 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              What is the BLACK+DECKER CM1160B?
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              It is a drip coffee maker with a 12-cup glass carafe, a digital display, and programmable brewing. It suits households, students, and office desks that want fresh coffee without learning a complicated machine.
            </p>
          </section>

          {/* Section: Key features */}
          <section id="key-features" className="space-y-6 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Key features
            </h2>

            <div className="grid grid-cols-1 gap-5">
              
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-2">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-orange-500 shrink-0" />
                  <span>12-cup DuraLife glass carafe</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  The carafe has measurement markings for accurate filling and an easy-grip handle for comfortable pouring. One cup is about 5 ounces, so a full pot is roughly 60 ounces, though it varies with your brewing technique.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-2">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-sky-500 shrink-0" />
                  <span>Sneak-A-Cup feature</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Ever grabbed a cup mid-brew and ended up with coffee on the hot plate? Sneak-A-Cup temporarily stops the flow when you pull the carafe out, so you can pour early without a mess.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-2">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>Easy-view water window</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  The front window shows exactly how much water you've added, from 2 to 12 cups, so you brew only what you need.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-2">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500 shrink-0" />
                  <span>Digital controls with rubberized buttons</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Large buttons labeled PROG, AUTO, HOUR, MIN, and ON/OFF control everything. The screen shows the clock, brew time, and programming options and is easy to read at a glance.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-2">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Timer className="w-5 h-5 text-indigo-500 shrink-0" />
                  <span>QuickTouch programming</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Set the timer the night before and wake up to a fresh pot, or schedule it for any time within 24 hours.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-2">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>2-hour auto shutoff</span>
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  The machine turns itself off after two hours, which is reassuring if you leave in a rush.
                </p>
              </div>

            </div>
          </section>

          {/* Section: Pros and cons */}
          <section id="pros-and-cons" className="space-y-6 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Pros and cons
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Pros Card */}
              <div className="bg-emerald-50/60 border border-emerald-200/90 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg border-b border-emerald-200 pb-3">
                  <ThumbsUp className="w-5 h-5 text-emerald-600" />
                  <span>Pros</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                    <span>Large 12-cup capacity</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                    <span>Programmable up to 24 hours ahead</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                    <span>Sneak-A-Cup prevents drips</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                    <span>Clear water window and carafe markings</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                    <span>Easy-to-read display, large buttons</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                    <span>2-hour auto shutoff</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                    <span>Compact design</span>
                  </li>
                </ul>
              </div>

              {/* Cons Card */}
              <div className="bg-rose-50/60 border border-rose-200/90 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-lg border-b border-rose-200 pb-3">
                  <ThumbsDown className="w-5 h-5 text-rose-600" />
                  <span>Cons</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700">
                    <X className="w-4 h-4 text-rose-600 mt-1 shrink-0" />
                    <span>Needs standard paper filters (buy separately)</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700">
                    <X className="w-4 h-4 text-rose-600 mt-1 shrink-0" />
                    <span>Basic drip machine: no grinder or single-serve</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700">
                    <X className="w-4 h-4 text-rose-600 mt-1 shrink-0" />
                    <span>Glass carafe needs careful handling</span>
                  </li>
                </ul>
              </div>

            </div>
          </section>

          {/* Section: Who should buy it? */}
          <section id="who-should-buy" className="space-y-5 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Who should buy it?
            </h2>

            <div className="space-y-4">
              <div className="bg-white border-l-4 border-emerald-500 rounded-r-2xl border-y border-r border-slate-200 p-5 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Best For</span>
                <p className="text-base text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">A great fit if</strong> you drink coffee every morning, brew for a family or small office, want an affordable easy machine, or hate messy drips.
                </p>
              </div>

              <div className="bg-white border-l-4 border-rose-400 rounded-r-2xl border-y border-r border-slate-200 p-5 space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Consider Alternatives</span>
                <p className="text-base text-slate-700 leading-relaxed">
                  <strong className="text-slate-900">Skip it if</strong> you want a single-serve pod machine, brew strength control, or a thermal carafe.
                </p>
              </div>
            </div>
          </section>

          {/* Section: How to get the best coffee from your CM1160B */}
          <section id="brewing-tips" className="space-y-5 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              How to get the best coffee from your CM1160B
            </h2>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
              <ol className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div className="text-slate-700 text-base leading-relaxed">
                    Use fresh, cold water and fill to the marking in the water window.
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div className="text-slate-700 text-base leading-relaxed">
                    Use a standard paper filter, which the brew basket requires.
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div className="text-slate-700 text-base leading-relaxed">
                    Start with 1 to 2 tablespoons of ground coffee per cup and adjust to taste.
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <div className="text-slate-700 text-base leading-relaxed">
                    Set the timer the night before with PROG, then HOUR and MIN.
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                    5
                  </span>
                  <div className="text-slate-700 text-base leading-relaxed">
                    Clean the carafe and brew basket regularly.
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* Section: Frequently asked questions */}
          <section id="faqs" className="space-y-5 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-orange-500" />
              <span>Frequently asked questions</span>
            </h2>

            <div className="space-y-3">
              {faqItems.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={index}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-slate-900 hover:text-orange-600 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-base sm:text-lg">{item.question}</span>
                      <ChevronDown 
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-orange-600' : ''}`} 
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section: Final verdict */}
          <section id="final-verdict" className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 space-y-6 scroll-mt-24">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                The Bottom Line
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Final verdict
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              The CM1160B isn't trying to be fancy. It brews a big pot, runs on a timer, and prevents drips and safety worries. For dependable everyday coffee at a sensible price, it's an easy recommendation.
            </p>

            {/* CTA 2 */}
            <div className="pt-2">
              <a
                href={AMAZON_AFFILIATE_URL}
                target="_blank"
                rel={AFFILIATE_REL}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base transition-all shadow-lg hover:shadow-orange-500/25 active:scale-98"
              >
                <span>See today's price and reviews on Amazon</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </section>

        </article>

        {/* Sticky Editorial Sidebar (4 Cols on Desktop) */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          {/* Quick Verdict Sidebar Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                At a Glance
              </span>
              <span className="inline-block px-2.5 py-0.5 text-xs font-bold bg-emerald-50 text-emerald-700 rounded-md">
                Recommended
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                BLACK+DECKER CM1160B
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                12-Cup Programmable Drip Coffee Maker
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Dependable everyday coffee maker with a 24-hour timer, pause-and-pour function, and auto shutoff.
            </p>

            <a
              href={AMAZON_AFFILIATE_URL}
              target="_blank"
              rel={AFFILIATE_REL}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold transition-all shadow-sm"
            >
              <span>Check Price on Amazon</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Table of Contents */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ListOrdered className="w-4 h-4 text-orange-500" />
              <span>Table of contents</span>
            </h3>
            <nav className="space-y-1.5 text-xs sm:text-sm">
              {tableOfContents.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-slate-600 hover:text-orange-600 hover:translate-x-1 transition-all py-1"
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Key Specifications Card */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              Quick Specifications
            </h3>
            <dl className="text-xs space-y-2 text-slate-600 divide-y divide-slate-200/60">
              <div className="flex justify-between pt-2">
                <dt className="text-slate-500">Capacity</dt>
                <dd className="font-semibold text-slate-800">12 Cups (~60 oz)</dd>
              </div>
              <div className="flex justify-between pt-2">
                <dt className="text-slate-500">Timer</dt>
                <dd className="font-semibold text-slate-800">24-Hour Digital</dd>
              </div>
              <div className="flex justify-between pt-2">
                <dt className="text-slate-500">Auto Shutoff</dt>
                <dd className="font-semibold text-slate-800">2 Hours</dd>
              </div>
              <div className="flex justify-between pt-2">
                <dt className="text-slate-500">Pause Feature</dt>
                <dd className="font-semibold text-slate-800">Sneak-A-Cup</dd>
              </div>
              <div className="flex justify-between pt-2">
                <dt className="text-slate-500">Carafe</dt>
                <dd className="font-semibold text-slate-800">DuraLife Glass</dd>
              </div>
            </dl>
          </div>

        </aside>

      </div>
    </div>
  );
}
