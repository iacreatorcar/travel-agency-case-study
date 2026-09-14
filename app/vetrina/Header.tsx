'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LANGS, Lang } from '../../lib/tours';
import { useCart } from '../../lib/cart-context';
import Logo from './Logo';

export type Currency = 'USD' | 'EUR';
const CURRENCIES: Currency[] = ['USD', 'EUR'];
const currencyLabel: { [key in Currency]: string } = {
  USD: 'USD ($)',
  EUR: 'EUR (€)'
};

const flagMap: { [key in Lang]: string } = {
  en: '/flag/en.png',
  it: '/flag/it.png',
  ru: '/flag/ru.png',
  de: '/flag/de.png'
};

const langName: { [key in Lang]: string } = {
  en: 'English',
  it: 'Italiano',
  ru: 'Русский',
  de: 'Deutsch'
};

const bookLabel: { [key in Lang]: string } = {
  en: 'Book Now',
  it: 'Prenota Ora',
  ru: 'Забронировать',
  de: 'Jetzt Buchen'
};

interface HeaderProps {
  language: Lang;
  onLanguageChange: (lang: Lang) => void;
  navLinks?: { href: string; label: string }[];
  backHref?: string;
}

export default function Header({ language, onLanguageChange, navLinks, backHref }: HeaderProps) {
  const { items } = useCart();
  const pathname = usePathname();
  const hideBookButton = pathname?.includes('/quick-booking');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-30 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-24 sm:h-28 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {backHref && (
            <Link
              href={backHref}
              aria-label="Back"
              className="md:hidden w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 shrink-0"
            >
              ←
            </Link>
          )}
          <Logo />
        </div>

        {navLinks && navLinks.length > 0 && (
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-[#00a8cc]">
                {link.label}
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { setLangOpen((v) => !v); setCurrencyOpen(false); }}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <span aria-hidden>🌐</span>
              <span className="hidden sm:inline">{langName[language]}</span>
              <span className="text-gray-400 text-xs">▾</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-40 w-40">
                {LANGS.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => { onLanguageChange(lang); setLangOpen(false); }}
                    className={`flex items-center gap-2 w-full text-left px-3 py-2 text-sm ${
                      language === lang ? 'text-[#00a8cc] bg-[#00a8cc]/10 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Image src={flagMap[lang]} alt="" width={20} height={14} className="rounded-sm object-cover shrink-0" />
                    {langName[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => { setCurrencyOpen((v) => !v); setLangOpen(false); }}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {currencyLabel[currency]}
              <span className="text-gray-400 text-xs">▾</span>
            </button>
            {currencyOpen && (
              <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-40 w-32">
                {CURRENCIES.map((cur) => (
                  <button
                    key={cur}
                    type="button"
                    onClick={() => { setCurrency(cur); setCurrencyOpen(false); }}
                    className={`block w-full text-left px-3 py-2 text-sm whitespace-nowrap ${
                      currency === cur ? 'text-[#00a8cc] bg-[#00a8cc]/10 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {currencyLabel[cur]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {!hideBookButton && (
            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 bg-[#ffa500] text-white text-sm font-bold px-4 sm:px-5 py-2 rounded-full hover:bg-[#e69400] transition whitespace-nowrap"
            >
              <span className="hidden sm:inline">{bookLabel[language]}</span>
              <span className="sm:hidden" aria-hidden>📋</span>
              {items.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#0d1f2d] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
