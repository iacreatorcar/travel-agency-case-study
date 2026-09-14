'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lang } from '../../lib/tours';
import { useBlogPosts } from '../../lib/cms';
import Header from '../vetrina/Header';
import Footer from '../vetrina/Footer';
import { getMainNavLinks } from '../../lib/nav';

const t: { [key in Lang]: { title: string; subtitle: string; readMore: string; minutes: string } } = {
  en: { title: 'Travel Tips', subtitle: 'Stories, travel tips and news from Egypt.', readMore: 'Read more →', minutes: 'min read' },
  ar: { title: 'نصائح السفر', subtitle: 'قصص ونصائح سفر وأخبار من مصر.', readMore: 'اقرأ المزيد ←', minutes: 'دقائق قراءة' },
  it: { title: 'Consigli di Viaggio', subtitle: 'Storie, consigli di viaggio e novità dall\'Egitto.', readMore: 'Leggi di più →', minutes: 'min di lettura' },
  ru: { title: 'Советы путешественникам', subtitle: 'Истории, советы для путешествий и новости из Египта.', readMore: 'Читать далее →', minutes: 'мин чтения' },
  de: { title: 'Reisetipps', subtitle: 'Geschichten, Reisetipps und Neuigkeiten aus Ägypten.', readMore: 'Weiterlesen →', minutes: 'Min. Lesezeit' }
};

const dateLocale: { [key in Lang]: string } = { en: 'en-GB', ar: 'ar-EG', it: 'it-IT', ru: 'ru-RU', de: 'de-DE' };

export default function BlogPage() {
  const { data: blogPosts } = useBlogPosts();
  const [language, setLanguage] = useState<Lang>('en');
  const isRtl = language === 'ar';
  const tr = t[language];

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-white">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        backHref="/"
        navLinks={getMainNavLinks(language)}
      />

      <div className="relative h-56 sm:h-72">
        <Image src="/hero/hero-12.jpg" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center text-center px-4">
          <span className="text-5xl mb-3">✍️</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow">{tr.title}</h1>
          <p className="text-white/90 mt-2 max-w-md drop-shadow">{tr.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition"
            >
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title[language]}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-400 mb-1">
                  {new Date(post.date).toLocaleDateString(dateLocale[language], { year: 'numeric', month: 'long', day: 'numeric' })}
                  {' · '}{post.readMinutes} {tr.minutes}
                </p>
                <h2 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#00a8cc] transition">{post.title[language]}</h2>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt[language]}</p>
                <span className="text-sm font-semibold text-[#00a8cc]">{tr.readMore}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
