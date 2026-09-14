'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { Lang } from '../../../lib/tours';
import { useBlogPosts } from '../../../lib/cms';
import Header from '../../vetrina/Header';
import Footer from '../../vetrina/Footer';
import { getMainNavLinks } from '../../../lib/nav';

const t: { [key in Lang]: { back: string; minutes: string } } = {
  en: { back: '← Back to Travel Tips', minutes: 'min read' },
  ar: { back: '← العودة إلى نصائح السفر', minutes: 'دقائق قراءة' },
  it: { back: '← Torna a Consigli di Viaggio', minutes: 'min di lettura' },
  ru: { back: '← Назад к советам путешественникам', minutes: 'мин чтения' },
  de: { back: '← Zurück zu Reisetipps', minutes: 'Min. Lesezeit' }
};

const dateLocale: { [key in Lang]: string } = { en: 'en-GB', ar: 'ar-EG', it: 'it-IT', ru: 'ru-RU', de: 'de-DE' };

export default function BlogPostPage() {
  const [language, setLanguage] = useState<Lang>('en');
  const params = useParams<{ slug: string }>();
  const { data: blogPosts, loading: postsLoading } = useBlogPosts();
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post && !postsLoading) {
    notFound();
  }
  if (!post) {
    return null;
  }

  const isRtl = language === 'ar';
  const tr = t[language];

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-white">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        backHref="/blog"
        navLinks={getMainNavLinks(language)}
      />

      <div className="relative h-64 sm:h-96">
        <Image src={post.image} alt={post.title[language]} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 px-4 pb-6 max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-bold text-white drop-shadow">{post.title[language]}</h1>
          <p className="text-white/80 text-sm mt-2">
            {new Date(post.date).toLocaleDateString(dateLocale[language], { year: 'numeric', month: 'long', day: 'numeric' })}
            {' · '}{post.readMinutes} {tr.minutes}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link href="/blog" className="text-[#00a8cc] font-semibold text-sm hover:underline">{tr.back}</Link>

        <div className="mt-6 space-y-4">
          {post.content[language].map((paragraph, i) => (
            <p key={i} className="text-gray-700 leading-relaxed">{paragraph}</p>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
