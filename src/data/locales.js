/**
 * Internationalization & Currency Configuration
 * Modular architecture for language and currency selectors.
 * Supports adding future languages and currencies without breaking existing functionality.
 */

export const supportedLanguages = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    icon: '🌐',
    isDefault: true,
    available: true,
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    icon: '🇮🇳',
    isDefault: false,
    available: false, // Architecture ready for future localization
    badge: 'Coming Soon',
  },
];

export const supportedCurrencies = [
  {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    display: '₹ INR',
    isDefault: true,
    available: true,
  },
  {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    display: '$ USD',
    isDefault: false,
    available: false, // Architecture ready for future live conversion
    badge: 'Amazon.in Default: ₹',
  },
];
