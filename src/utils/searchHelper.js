/**
 * Intelligent Catalog Search & Autocomplete Helper
 * Features token matching, synonym normalization (e.g., mice <-> mouse, laptops <-> laptop),
 * and relevance scoring for instant suggestions and search results.
 */

// Common tech synonyms and stems for seamless search matching
const SYNONYMS = {
  mouse: ['mice', 'pointer', 'gaming mouse'],
  mice: ['mouse', 'pointer'],
  laptop: ['laptops', 'notebook', 'ultrabook', 'macbook'],
  laptops: ['laptop', 'notebook', 'ultrabook', 'macbook'],
  earbud: ['earbuds', 'tws', 'airpods', 'earphone', 'earphones', 'buds'],
  earbuds: ['earbud', 'tws', 'airpods', 'earphone', 'earphones', 'buds'],
  phone: ['phones', 'smartphone', 'smartphones', 'mobile'],
  phones: ['phone', 'smartphone', 'smartphones', 'mobile'],
  smartphone: ['phone', 'phones', 'smartphones', 'mobile', 'android'],
  smartphones: ['phone', 'phones', 'smartphone', 'mobile', 'android'],
  monitor: ['monitors', 'display', 'screen', '4k'],
  monitors: ['monitor', 'display', 'screen', '4k'],
  keyboard: ['keyboards', 'mechanical', 'typing'],
  keyboards: ['keyboard', 'mechanical', 'typing'],
  powerbank: ['power bank', 'charger', 'battery'],
  'power bank': ['powerbank', 'charger', 'portable charger', 'battery'],
  watch: ['smartwatch', 'smartwatches', 'fitness tracker'],
  smartwatch: ['watch', 'smartwatches', 'fitness tracker'],
};

function normalizeTokens(query) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const expanded = new Set(words);

  words.forEach((w) => {
    if (SYNONYMS[w]) {
      SYNONYMS[w].forEach((syn) => expanded.add(syn));
    }
  });

  return Array.from(expanded);
}

/**
 * Searches products, buying guides, and categories based on search query.
 */
export function searchCatalog(query, { products = [], guides = [], categories = [] }) {
  const cleanQ = (query || '').toLowerCase().trim();
  if (!cleanQ) {
    return {
      products: products,
      guides: guides,
      categories: categories,
      totalCount: products.length + guides.length,
    };
  }

  const tokens = cleanQ.split(/\s+/).filter(Boolean);
  const normalizedWords = normalizeTokens(cleanQ);

  // Search Products
  const matchedProducts = products
    .map((product) => {
      const searchTarget = [
        product.name,
        product.brand,
        product.category,
        product.categorySlug,
        product.description,
        product.bestFor || '',
        product.badge || '',
        ...(product.features || []),
        Object.values(product.specifications || {}).join(' '),
      ]
        .join(' ')
        .toLowerCase();

      // Check exact query match
      let score = 0;
      if (product.name.toLowerCase().includes(cleanQ)) score += 50;
      if (product.brand.toLowerCase() === cleanQ) score += 40;
      if (product.category.toLowerCase() === cleanQ || product.categorySlug === cleanQ) score += 30;

      // Check tokens
      const matchesAllTokens = tokens.every(
        (t) => searchTarget.includes(t) || (SYNONYMS[t] && SYNONYMS[t].some((s) => searchTarget.includes(s)))
      );

      if (matchesAllTokens) score += 20;

      // Check normalized words
      const matchedNormalizedCount = normalizedWords.filter((w) => searchTarget.includes(w)).length;
      score += matchedNormalizedCount * 5;

      return { product, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);

  // Search Guides
  const matchedGuides = guides
    .map((guide) => {
      const searchTarget = [
        guide.title,
        guide.subtitle || '',
        guide.categoryName,
        guide.category,
        guide.excerpt,
        guide.intro,
      ]
        .join(' ')
        .toLowerCase();

      let score = 0;
      if (guide.title.toLowerCase().includes(cleanQ)) score += 50;
      if (guide.categoryName.toLowerCase() === cleanQ) score += 30;

      const matchesAllTokens = tokens.every(
        (t) => searchTarget.includes(t) || (SYNONYMS[t] && SYNONYMS[t].some((s) => searchTarget.includes(s)))
      );
      if (matchesAllTokens) score += 20;

      const matchedNormalizedCount = normalizedWords.filter((w) => searchTarget.includes(w)).length;
      score += matchedNormalizedCount * 5;

      return { guide, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.guide);

  // Search Categories
  const matchedCategories = categories.filter((cat) => {
    const target = `${cat.name} ${cat.slug} ${cat.tagline || ''} ${cat.description || ''}`.toLowerCase();
    return (
      target.includes(cleanQ) ||
      tokens.some((t) => target.includes(t) || (SYNONYMS[t] && SYNONYMS[t].some((s) => target.includes(s))))
    );
  });

  return {
    products: matchedProducts,
    guides: matchedGuides,
    categories: matchedCategories,
    totalCount: matchedProducts.length + matchedGuides.length,
  };
}

/**
 * Returns instant lightweight search suggestions for headers.
 */
export function getSearchSuggestions(query, { products = [], guides = [], categories = [] }, maxItems = 6) {
  const cleanQ = (query || '').toLowerCase().trim();
  if (!cleanQ || cleanQ.length < 2) return [];

  const { products: matchedProducts, guides: matchedGuides, categories: matchedCategories } = searchCatalog(
    cleanQ,
    { products, guides, categories }
  );

  const suggestions = [];

  // Top Category matches
  matchedCategories.slice(0, 2).forEach((cat) => {
    suggestions.push({
      type: 'category',
      title: `${cat.name} Category Hub`,
      subtitle: `${cat.featuredCount}+ top picks`,
      path: `/category/${cat.slug}`,
      icon: 'Layers',
    });
  });

  // Top Product matches
  matchedProducts.slice(0, 3).forEach((prod) => {
    suggestions.push({
      type: 'product',
      title: prod.name,
      subtitle: `${prod.brand} • ${prod.badge || 'Verified Pick'}`,
      price: prod.price,
      image: prod.image,
      path: `/review/${prod.slug}`,
      icon: 'Package',
    });
  });

  // Top Guide matches
  matchedGuides.slice(0, 2).forEach((guide) => {
    suggestions.push({
      type: 'guide',
      title: guide.title,
      subtitle: `Buying Guide • ${guide.readingTime}`,
      image: guide.image,
      path: `/guides/${guide.slug}`,
      icon: 'BookOpen',
    });
  });

  return suggestions.slice(0, maxItems);
}
