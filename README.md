# BuyWise - Smart Picks. Better Buying.

A production-ready, independent **Amazon Affiliate product discovery and recommendation website** built with React, Vite, Tailwind CSS, and React Router.

## 🚀 Features

- **Editorial Commerce Architecture**: Tech recommendation platform designed for reader trust, high conversion rates, and SEO discoverability.
- **Centralized Affiliate Link Engine**: All Amazon links are routed through `src/utils/affiliate.js` with `createAffiliateUrl()`, automatic tracking tag injection, and campaign placement tags.
- **Amazon Compliance**:
  - Full FTC & Amazon Associates Operating Agreement disclosure at `/affiliate-disclosure`.
  - Non-intrusive top banner and inline editorial disclosure notices.
  - Outbound links formatted with `rel="nofollow sponsored noopener noreferrer"`.
  - Clearly identified as an independent publication with zero misleading branding.
- **Dynamic SEO Engine**:
  - Semantic HTML with proper H1/H2/H3 hierarchy.
  - Automatic page title & meta description updates via `src/utils/seo.js`.
  - Schema.org JSON-LD generation for `Product`, `Article`, and `BreadcrumbList`.
- **Complete Route Architecture**:
  - `/` — Homepage with Hero, Category grid, Trending picks, Editorial guides, Trust section, and Newsletter.
  - `/category/:slug` — Reusable category pages with live filtering, sorting, comparison tables, and FAQs.
  - `/review/:slug` — Deep-dive product reviews with Verdict, Pros/Cons, Who should buy/skip, full spec tables, and Amazon CTAs.
  - `/guides/:slug` — Editorial buying guides with comparison matrices, key considerations, and structured advice.
  - `/deals` — Handpicked Amazon deals with discount percentage badges and category filtering.
  - `/search?q=...` — Real-time search across products, categories, guides, and reviews.
  - `/about` — Editorial mission and research methodology.
  - `/contact` — Interactive contact form with input validation and feedback states.
  - `/affiliate-disclosure` — Dedicated Amazon Associates disclosure page.
  - `/privacy-policy` & `/terms` — Comprehensive legal terms and privacy statements.
  - `/404` — Clean not found page with quick recovery links.

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM (v7)
- **Icons**: Lucide React
- **Typography**: Google Fonts (Plus Jakarta Sans & Inter)

## 📁 Directory Structure

```
buywise/
├── public/
│   └── favicon.svg               # Brand SVG icon
├── src/
│   ├── components/               # Modular reusable UI components
│   │   ├── Header.jsx            # Desktop & mobile drawer navigation
│   │   ├── Footer.jsx            # Columns, Amazon legal disclaimer
│   │   ├── ProductCard.jsx       # Vertical & horizontal product cards
│   │   ├── ComparisonTable.jsx   # Responsive head-to-head comparison
│   │   ├── Breadcrumbs.jsx       # Semantic breadcrumb trail
│   │   ├── TrustSection.jsx      # "Why Trust Us?" editorial promise
│   │   ├── NewsletterSection.jsx # Validated subscription box
│   │   └── AffiliateDisclosureNotice.jsx # Top banner and inline notices
│   ├── data/                     # Structured Master Datasets (API/CMS ready)
│   │   ├── products.js           # Full specs, ASINs, pros/cons, pricing
│   │   ├── categories.js         # 12 categories with tips and FAQs
│   │   ├── guides.js             # In-depth buying guide articles
│   │   └── deals.js              # Active verified deal offers
│   ├── layouts/
│   │   └── MainLayout.jsx        # App wrapper with scroll-to-top & header
│   ├── pages/                    # 11 distinct page templates
│   ├── hooks/
│   │   └── useScrollToTop.js     # Route transition scroll reset
│   ├── utils/
│   │   ├── affiliate.js          # Centralized affiliate link generator
│   │   └── seo.js                # Meta updater & JSON-LD schema builder
│   ├── App.jsx                   # React Router routing configuration
│   ├── index.css                 # Tailwind CSS v4 styling rules
│   └── main.jsx
├── .env.example
├── package.json
└── vite.config.js
```

## ⚙️ Configuration & Environment Variables

Copy `.env.example` to `.env` and set your Amazon Associates tracking tag:

```bash
VITE_AMAZON_AFFILIATE_TAG=yourtag-21
VITE_AMAZON_BASE_URL=https://www.amazon.in
```

## 💻 Running Locally

```bash
# Navigate to project folder
cd /Users/apple/.gemini/antigravity-ide/scratch/buywise

# Install dependencies (already installed)
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
