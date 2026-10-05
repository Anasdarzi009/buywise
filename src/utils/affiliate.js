/**
 * Amazon Affiliate Architecture & Utility System
 * Centralized generation of Amazon Associates tracking links and compliance helpers.
 */

// Default affiliate tag can be overridden via VITE_AMAZON_AFFILIATE_TAG environment variable
export const DEFAULT_AFFILIATE_TAG = import.meta.env.VITE_AMAZON_AFFILIATE_TAG || 'buywise-21';

// Base Amazon marketplace URL
export const AMAZON_BASE_URL = 'https://www.amazon.in';

/**
 * Creates a compliant Amazon Associates affiliate link for a given product.
 * @param {Object|string} product - Product object with amazonAsin / amazonUrl or direct ASIN string
 * @param {string} [placement='cta'] - Optional placement tag for analytics (e.g. 'hero_pick', 'comparison_table')
 * @returns {string} Fully qualified Amazon affiliate URL
 */
export function createAffiliateUrl(product, placement = 'cta') {
  if (!product) return AMAZON_BASE_URL;

  const tag = DEFAULT_AFFILIATE_TAG;
  const asin = typeof product === 'string' ? product : product.amazonAsin;
  const customUrl = typeof product === 'object' ? product.amazonUrl : null;

  let url;

  if (customUrl && customUrl.startsWith('http')) {
    try {
      const parsed = new URL(customUrl);
      parsed.searchParams.set('tag', tag);
      parsed.searchParams.set('linkCode', 'll1');
      parsed.searchParams.set('ref_', `buywise_${placement}`);
      return parsed.toString();
    } catch {
      url = customUrl;
    }
  } else if (asin) {
    url = `${AMAZON_BASE_URL}/dp/${asin}?tag=${tag}&linkCode=ll1&ref_=buywise_${placement}`;
  } else if (typeof product === 'object' && product.name) {
    const encoded = encodeURIComponent(product.name);
    url = `${AMAZON_BASE_URL}/s?k=${encoded}&tag=${tag}&ref_=buywise_${placement}`;
  } else {
    url = `${AMAZON_BASE_URL}?tag=${tag}`;
  }

  return url;
}

/**
 * Standard required rel attributes for outbound affiliate links
 */
export const AFFILIATE_REL = 'nofollow sponsored noopener noreferrer';

/**
 * Standard Amazon Associates Disclosure text
 */
export const AFFILIATE_DISCLOSURE_SHORT = 
  "BuyWise is reader-supported. When you buy through links on our site, we may earn an affiliate commission at no extra cost to you.";

export const AFFILIATE_DISCLOSURE_FULL = 
  "BuyWise is an independent product discovery publication and a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in and affiliated sites. Prices and availability are subject to change. As an Amazon Associate, we earn from qualifying purchases.";

/**
 * Currency formatter for Indian Rupee
 */
export function formatPrice(amount) {
  if (amount === undefined || amount === null) return 'Check Amazon';
  if (typeof amount === 'string') return amount;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
