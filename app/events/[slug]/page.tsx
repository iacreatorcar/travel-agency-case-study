'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { Lang } from '../../../lib/tours';
import { useEvents } from '../../../lib/cms';
import Header from '../../vetrina/Header';

const labels: { [key in Lang]: { back: string; date: string; contactUs: string } } = {
  en: { back: 'Back to Events', date: 'Date', contactUs: 'Contact Us About This Event' },
  ar: { back: 'العودة إلى الفعاليات', date: 'التاريخ', contactUs: 'تواصل معنا بخصوص هذه الفعالية' },
  it: { back: 'Torna agli Eventi', date: 'Data', contactUs: 'Contattaci per Questo Evento' },
  ru: { back: 'Назад к событиям', date: 'Дата', contactUs: 'Связаться с нами по этому событию' },
  de: { back: 'Zurück zu den Events', date: 'Datum', contactUs: 'Kontaktiere uns zu diesem Event' }
};

export default function EventDetailPage() {
  const [language, setLanguage] = useState<Lang>('en');
  const params = useParams<{ slug: string }>();
  const { data: events, loading: eventsLoading } = useEvents();
  const event = events.find((e) => e.slug === params.slug);

  if (!event && !eventsLoading) {
    notFound();
  }
  if (!event) {
    return null;
  }

  const t = labels[language];
  const isRtl = language === 'ar';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-white">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        backHref="/events"
        navLinks={[
          { href: '/', label: 'Home' },
          { href: '/tours', label: 'Tours' },
          { href: '/quick-booking', label: 'Booking' },
          { href: '/packages', label: 'Packages' },
          { href: '/packages/create', label: 'Create Package' },
          { href: '/events', label: 'Events' },
          { href: '/contact', label: 'Contact' }
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/events" className="text-[#00a8cc] font-semibold text-sm hover:underline">← {t.back}</Link>

        <div className="relative h-72 rounded-xl overflow-hidden my-4">
          <Image src={`https://picsum.photos/seed/${event.imageSeed}/1200/700`} alt={event.title[language]} fill className="object-cover" />
        </div>

        <p className="text-sm text-gray-500 mb-1">{t.date}: {event.dateLabel[language]}</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{event.title[language]}</h1>
        <p className="text-gray-700 leading-relaxed mb-8">{event.description[language]}</p>

        <Link
          href="/contact"
          className="inline-block bg-[#ffa500] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#e69400] transition"
        >
          {t.contactUs}
        </Link>
      </div>
    </div>
  );
}
