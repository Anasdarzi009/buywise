import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { supportedLanguages, supportedCurrencies } from '../data/locales';

export default function LanguageCurrencySelectors({ variant = 'desktop' }) {
  const [selectedLanguage, setSelectedLanguage] = useState(supportedLanguages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(supportedCurrencies[0]);
  
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const langRef = useRef(null);
  const currencyRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setCurrencyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (lang) => {
    if (lang.available) {
      setSelectedLanguage(lang);
      setLangDropdownOpen(false);
    }
  };

  const handleCurrencySelect = (curr) => {
    if (curr.available) {
      setSelectedCurrency(curr);
      setCurrencyDropdownOpen(false);
    }
  };

  if (variant === 'mobile') {
    return (
      <div className="space-y-3">
        {/* Language Selector (Mobile) */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Language
          </label>
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
              aria-expanded={langDropdownOpen}
            >
              <span className="flex items-center gap-2">
                <span>{selectedLanguage.icon}</span>
                <span>{selectedLanguage.name}</span>
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {langDropdownOpen && (
              <div className="mt-1 bg-white rounded-xl border border-slate-200 shadow-lg p-1.5 space-y-1 z-20">
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang)}
                    disabled={!lang.available}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      lang.code === selectedLanguage.code
                        ? 'bg-orange-50 text-orange-600 font-bold'
                        : lang.available
                        ? 'hover:bg-slate-50 text-slate-700'
                        : 'opacity-50 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.icon}</span>
                      <span>{lang.name}</span>
                      {lang.badge && (
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                          {lang.badge}
                        </span>
                      )}
                    </span>
                    {lang.code === selectedLanguage.code && <Check className="w-3.5 h-3.5 text-orange-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Currency Selector (Mobile) */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Currency
          </label>
          <div className="relative" ref={currencyRef}>
            <button
              type="button"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
              aria-expanded={currencyDropdownOpen}
            >
              <span className="flex items-center gap-2 font-bold text-slate-900">
                <span>{selectedCurrency.display}</span>
                <span className="font-normal text-slate-500 text-[11px]">({selectedCurrency.name})</span>
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${currencyDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {currencyDropdownOpen && (
              <div className="mt-1 bg-white rounded-xl border border-slate-200 shadow-lg p-1.5 space-y-1 z-20">
                {supportedCurrencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => handleCurrencySelect(curr)}
                    disabled={!curr.available}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      curr.code === selectedCurrency.code
                        ? 'bg-orange-50 text-orange-600 font-bold'
                        : curr.available
                        ? 'hover:bg-slate-50 text-slate-700'
                        : 'opacity-50 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-bold">{curr.display}</span>
                      <span className="text-slate-500 text-[11px]">({curr.name})</span>
                    </span>
                    {curr.code === selectedCurrency.code && <Check className="w-3.5 h-3.5 text-orange-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Desktop Variant
  return (
    <div className="flex items-center gap-2">
      {/* Language Selector */}
      <div className="relative" ref={langRef}>
        <button
          type="button"
          onClick={() => {
            setLangDropdownOpen(!langDropdownOpen);
            setCurrencyDropdownOpen(false);
          }}
          className="h-9 px-3 rounded-xl border border-slate-200/90 bg-slate-50/80 hover:bg-slate-100/90 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs hover:border-slate-300 cursor-pointer"
          aria-label="Select website language"
          aria-expanded={langDropdownOpen}
        >
          <span className="text-sm">🌐</span>
          <span>{selectedLanguage.name}</span>
          <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-150 ${langDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {langDropdownOpen && (
          <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-2xl border border-slate-200 shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
              Select Language
            </div>
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang)}
                disabled={!lang.available}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                  lang.code === selectedLanguage.code
                    ? 'bg-orange-50 text-orange-600 font-bold'
                    : lang.available
                    ? 'hover:bg-slate-50 text-slate-700'
                    : 'opacity-50 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{lang.icon}</span>
                  <span>{lang.name}</span>
                </span>
                {lang.code === selectedLanguage.code ? (
                  <Check className="w-3.5 h-3.5 text-orange-600" />
                ) : lang.badge ? (
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-normal">
                    {lang.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Currency Selector */}
      <div className="relative" ref={currencyRef}>
        <button
          type="button"
          onClick={() => {
            setCurrencyDropdownOpen(!currencyDropdownOpen);
            setLangDropdownOpen(false);
          }}
          className="h-9 px-3 rounded-xl border border-slate-200/90 bg-slate-50/80 hover:bg-slate-100/90 text-slate-800 text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-2xs hover:border-slate-300 cursor-pointer"
          aria-label="Select display currency"
          aria-expanded={currencyDropdownOpen}
        >
          <span>{selectedCurrency.display}</span>
          <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-150 ${currencyDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {currencyDropdownOpen && (
          <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-2xl border border-slate-200 shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
              Select Currency
            </div>
            {supportedCurrencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => handleCurrencySelect(curr)}
                disabled={!curr.available}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                  curr.code === selectedCurrency.code
                    ? 'bg-orange-50 text-orange-600 font-bold'
                    : curr.available
                    ? 'hover:bg-slate-50 text-slate-700'
                    : 'opacity-50 text-slate-400 cursor-not-allowed'
                }`}
              >
                <div className="flex flex-col text-left">
                  <span className="font-bold text-slate-900">{curr.display}</span>
                  <span className="text-[10px] text-slate-400">{curr.name}</span>
                </div>
                {curr.code === selectedCurrency.code ? (
                  <Check className="w-3.5 h-3.5 text-orange-600" />
                ) : curr.badge ? (
                  <span className="text-[9px] bg-slate-100 text-slate-500 px-1 py-0.5 rounded">
                    Default
                  </span>
                ) : null}
              </button>
            ))}
            <div className="px-2.5 py-1.5 text-[10px] text-slate-400 border-t border-slate-100 mt-1">
              Official Amazon.in pricing is calculated in ₹ INR.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
