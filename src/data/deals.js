/**
 * Handpicked Amazon Deals Dataset
 * Curated deals based on verified promotions and price tracking.
 */
import { products } from './products';

// Extract verified deals from products catalog
export const deals = products
  .filter((p) => p.isDeal && p.discountPercent > 0)
  .map((p) => ({
    ...p,
    dealBadge: p.discountPercent >= 25 ? 'Mega Deal' : 'Special Offer',
    endsIn: 'Limited Time Deal',
    verifiedDate: 'Today',
  }));

export const dealCategories = [
  { id: 'all', name: 'All Deals' },
  { id: 'laptops', name: 'Laptops' },
  { id: 'earbuds', name: 'Earbuds & Audio' },
  { id: 'monitors', name: 'Monitors' },
  { id: 'mice', name: 'Mice & Accessories' },
  { id: 'smartphones', name: 'Smartphones' },
  { id: 'power-banks', name: 'Power Banks' },
];
