'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lang } from '../../lib/tours';
import { hotels } from '../../lib/hotels';
import Header from '../vetrina/Header';
import Footer from '../vetrina/Footer';
import { getMainNavLinks } from '../../lib/nav';

const pageTitle: { [key in Lang]: string } = {
  en: 'Our Hotels',
  ar: 'فنادقنا',
  it: 'I Nostri Hotel',
  ru: 'Наши Отели',
  de: 'Unsere Hotels'
};

const perNight: { [key in Lang]: string } = {
  en: '/ night',
  ar: '/ ليلة',
  it: '/ notte',
  ru: '/ ночь',
  de: '/ Nacht'
};

const viewLabel: { [key in Lang]: string } = {
  en: 'View Details',
  ar: 'عرض التفاصيل',
  it: 'Vedi Dettagli',
  ru: 'Подробнее',
  de: 'Details Ansehen'
};

export default function HotelsPage() {
  const [language, setLanguage] = useState<Lang>('en');

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        backHref="/"
        navLinks={getMainNavLinks(language)}
      />

      <h1 className="text-3xl font-bold text-center mt-10 text-gray-900">{pageTitle[language]}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto p-6 mt-6">
        {hotels.map((hotel) => (
          <Link
            key={hotel.slug}
            href={`/hotels/${hotel.slug}`}
            className="group block bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="relative h-40 overflow-hidden">
              <Image
                src={`https://picsum.photos/seed/${hotel.slug}/800/500`}
                alt={hotel.name[language]}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <span className="absolute top-2 right-2 bg-white/90 rounded-full w-8 h-8 flex items-center justify-center text-sm">♡</span>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-[#0d1f2d] text-sm flex-1">{hotel.name[language]}</h3>
                <span className="text-[10px] font-bold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded whitespace-nowrap ml-2">
                  {'★'.repeat(hotel.stars)}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-2">📍 {hotel.location[language]}</p>
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{hotel.summary[language]}</p>
              <div className="flex justify-between items-center">
                <span className="text-[#00a8cc] font-bold">
                  {hotel.pricePerNight} <span className="text-xs text-gray-500 font-normal">{perNight[language]}</span>
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/hotels/${hotel.slug}`;
                  }}
                  className="text-xs font-semibold bg-[#0d1f2d] text-white px-3 py-1.5 rounded-full hover:bg-[#00a8cc] transition"
                >
                  {viewLabel[language]}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
}
