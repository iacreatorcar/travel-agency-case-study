'use client';

import { createPortal } from 'react-dom';

type Lang = 'en' | 'ar' | 'it' | 'ru' | 'de';
type Currency = 'USD' | 'EUR';

const langLabels: { [key in Lang]: string } = {
  en: 'English',
  ar: 'العربية',
  it: 'Italiano',
  ru: 'Русский',
  de: 'Deutsch'
};

const langCountries: { [key in Lang]: string } = {
  en: 'United States',
  ar: 'Egypt',
  it: 'Italia',
  ru: 'Russia',
  de: 'Germany'
};

const currencyLabels: { [key in Currency]: { name: string; symbol: string } } = {
  USD: { name: 'US Dollar', symbol: '$' },
  EUR: { name: 'Euro', symbol: '€' }
};

interface Props {
  language: Lang;
  currency: Currency;
  onLanguageChange: (lang: Lang) => void;
  onCurrencyChange: (cur: Currency) => void;
  onClose: () => void;
}

export default function LangCurrencyModal({ language, currency, onLanguageChange, onCurrencyChange, onClose }: Props) {
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white flex justify-between items-center px-6 pt-6 pb-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Language and Currency</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 shrink-0"
          >
            ✕
          </button>
        </div>

        <div className="px-6 pt-4 pb-6">
          <p className="text-sm font-semibold text-gray-400 mb-3">Currency</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {(['USD', 'EUR'] as Currency[]).map((cur) => (
              <button
                key={cur}
                onClick={() => onCurrencyChange(cur)}
                className={`text-left rounded-lg px-4 py-3 transition ${
                  currency === cur ? 'bg-[#0d1f2d] text-white' : 'hover:bg-gray-100 text-gray-900'
                }`}
              >
                <span className="block text-sm">{currencyLabels[cur].name}</span>
                <span className="block font-bold">{currencyLabels[cur].symbol} {cur}</span>
              </button>
            ))}
          </div>

          <p className="text-sm font-semibold text-gray-400 mb-3">Region and Language</p>
          <div className="grid grid-cols-3 gap-3">
            {(['en', 'ar', 'it', 'ru', 'de'] as Lang[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`text-left rounded-lg px-4 py-3 transition ${
                  language === lang ? 'bg-[#0d1f2d] text-white' : 'hover:bg-gray-100 text-gray-900'
                }`}
              >
                <span className="block text-sm">{langCountries[lang]}</span>
                <span className="block font-bold">{langLabels[lang]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
