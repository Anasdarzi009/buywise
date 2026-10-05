/**
 * SEO & Structured Data (JSON-LD) Utility
 * Automatically injects/updates page meta tags and schemas for Google Rich Results.
 */

export function updateSEO({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = '/favicon.svg',
  schema = null,
}) {
  const fullTitle = title 
    ? `${title} | BuyWise` 
    : 'BuyWise - Smart Picks. Better Buying. | Tech & Gadget Reviews';

  document.title = fullTitle;

  // Meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = description || 'Independent product research, in-depth buying guides, and hands-on spec comparisons to help you buy the right laptops, smartphones, audio, and tech accessories.';

  // Open Graph Title
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = fullTitle;

  // Open Graph Description
  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = metaDesc.content;

  // Open Graph Type
  let ogTypeEl = document.querySelector('meta[property="og:type"]');
  if (ogTypeEl) ogTypeEl.content = ogType;

  // Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (canonicalUrl) {
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.rel = 'canonical';
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = canonicalUrl;
  } else if (canonicalEl) {
    canonicalEl.remove();
  }

  // Structured Data (JSON-LD)
  let scriptSchema = document.getElementById('buywise-json-ld');
  if (schema) {
    if (!scriptSchema) {
      scriptSchema = document.createElement('script');
      scriptSchema.id = 'buywise-json-ld';
      scriptSchema.type = 'application/ld+json';
      document.head.appendChild(scriptSchema);
    }
    scriptSchema.textContent = JSON.stringify(schema);
  } else if (scriptSchema) {
    scriptSchema.remove();
  }
}

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://buywise.reviews';

function getCanonicalBase() {
  if (typeof window === 'undefined') return SITE_URL;
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') {
    return SITE_URL;
  }
  return window.location.origin;
}

/**
 * Creates Schema.org BreadcrumbList JSON-LD object
 */
export function generateBreadcrumbSchema(items) {
  const base = getCanonicalBase();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `${base}${item.path.startsWith('/') ? item.path : '/' + item.path}`,
    })),
  };
}

/**
 * Creates Schema.org Product JSON-LD object for reviews
 */
export function generateProductSchema(product) {
  if (!product) return null;
  const base = getCanonicalBase();
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'image': product.image,
    'description': product.description,
    'brand': {
      '@type': 'Brand',
      'name': product.brand,
    },
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'INR',
      'price': product.price ? String(product.price).replace(/[^0-9]/g, '') : '0',
      'availability': 'https://schema.org/InStock',
      'url': `${base}/review/${product.slug}`,
    },
    ...(product.rating ? {
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': product.rating,
        'reviewCount': product.reviewsCount || 10,
      }
    } : {}),
  };
}

/**
 * Creates Schema.org Article JSON-LD object for guides
 */
export function generateArticleSchema(guide) {
  if (!guide) return null;
  const base = getCanonicalBase();
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': guide.title,
    'description': guide.excerpt,
    'image': guide.image,
    'author': {
      '@type': 'Organization',
      'name': 'BuyWise Editorial Team',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'BuyWise',
      'logo': {
        '@type': 'ImageObject',
        'url': `${base}/favicon.svg`,
      },
    },
    'datePublished': guide.publishedDate || '2025-01-15',
    'dateModified': guide.updatedDate || '2025-02-10',
  };
}
