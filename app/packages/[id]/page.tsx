'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { Lang, tours } from '../../../lib/tours';
import { bundles } from '../../../lib/bundles';
import Header from '../../vetrina/Header';
import Footer from '../../vetrina/Footer';
import FloatingButtons from '../../vetrina/FloatingButtons';
import { getMainNavLinks } from '../../../lib/nav';

interface BundleDict {
  backToPackages: string;
  overview: string;
  includedTours: string; includedToursNote: string;
  eveningOut: string; eveningOutNote: string;
  optionalExtras: string;
  includes: string; excludes: string;
  readyToGo: string; perPersonFixed: string;
  bookNow: string; customizeIt: string;
  waBook: (name: string, price: number) => string;
  waCustomize: (name: string) => string;
}

const t: { [key in Lang]: BundleDict } = {
  en: {
    backToPackages: '← Back to packages',
    overview: 'Overview',
    includedTours: 'Included Tours', includedToursNote: 'Days are scheduled based on availability during your stay.',
    eveningOut: 'Complimentary Evenings Out', eveningOutNote: 'Evening transfer included from Moon Sharm Excursions.',
    optionalExtras: 'Optional Extras',
    includes: 'Includes', excludes: 'Excludes',
    readyToGo: 'Ready to go?', perPersonFixed: 'per person · fixed price',
    bookNow: 'Book Now', customizeIt: 'Customize it',
    waBook: (name, price) => `Hi! I'd like to book the "${name}" package (€${price}).`,
    waCustomize: (name) => `Hi! I'd like to customize the "${name}" package.`
  },
  it: {
    backToPackages: '← Torna ai pacchetti',
    overview: 'Panoramica',
    includedTours: 'Escursioni Incluse', includedToursNote: 'Le giornate si programmano in base alla disponibilità durante il tuo soggiorno.',
    eveningOut: 'Uscite Serali in Omaggio', eveningOutNote: 'Transfer serale incluso da Moon Sharm Escursioni.',
    optionalExtras: 'Extra Opzionali',
    includes: 'Comprende', excludes: 'Escluso',
    readyToGo: 'Pronto a partire?', perPersonFixed: 'a persona · prezzo finito',
    bookNow: 'Prenota ora', customizeIt: 'Voglio personalizzarlo',
    waBook: (name, price) => `Ciao! Vorrei prenotare il pacchetto "${name}" (€${price}).`,
    waCustomize: (name) => `Ciao! Vorrei personalizzare il pacchetto "${name}".`
  },
  ru: {
    backToPackages: '← Назад к пакетам',
    overview: 'Обзор',
    includedTours: 'Включённые экскурсии', includedToursNote: 'Дни планируются в зависимости от наличия мест во время вашего пребывания.',
    eveningOut: 'Вечерние выезды в подарок', eveningOutNote: 'Вечерний трансфер включён от Moon Sharm Excursions.',
    optionalExtras: 'Дополнительные опции',
    includes: 'Включено', excludes: 'Не включено',
    readyToGo: 'Готовы отправиться?', perPersonFixed: 'с человека · фиксированная цена',
    bookNow: 'Забронировать', customizeIt: 'Хочу настроить',
    waBook: (name, price) => `Здравствуйте! Хочу забронировать пакет "${name}" (€${price}).`,
    waCustomize: (name) => `Здравствуйте! Хочу настроить пакет "${name}".`
  },
  de: {
    backToPackages: '← Zurück zu den Paketen',
    overview: 'Überblick',
    includedTours: 'Inbegriffene Touren', includedToursNote: 'Die Tage werden je nach Verfügbarkeit während deines Aufenthalts geplant.',
    eveningOut: 'Kostenlose Abendausflüge', eveningOutNote: 'Abendtransfer inklusive von Moon Sharm Excursions.',
    optionalExtras: 'Optionale Extras',
    includes: 'Enthält', excludes: 'Nicht enthalten',
    readyToGo: 'Bereit loszulegen?', perPersonFixed: 'pro Person · Festpreis',
    bookNow: 'Jetzt Buchen', customizeIt: 'Ich möchte es anpassen',
    waBook: (name, price) => `Hallo! Ich möchte das Paket "${name}" buchen (€${price}).`,
    waCustomize: (name) => `Hallo! Ich möchte das Paket "${name}" individuell anpassen.`
  }
};

export default function BundleDetailPage() {
  const [language, setLanguage] = useState<Lang>('en');
  const [extras, setExtras] = useState<Set<string>>(new Set());
  const params = useParams<{ id: string }>();
  const bundle = bundles.find((b) => b.id === params.id);

  if (!bundle) {
    notFound();
  }

  const includedTours = bundle.slugs
    .map((slug) => tours.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => t !== undefined);

  const includedItems = Array.from(new Set(includedTours.flatMap((t) => t.included[language]))).slice(0, 6);
  const excludedItems = Array.from(new Set(includedTours.flatMap((t) => t.excluded[language]))).slice(0, 5);

  const extraTotal = (bundle.extras ?? []).filter((e) => extras.has(e.label)).reduce((sum, e) => sum + e.price, 0);
  const totalPrice = bundle.price + extraTotal;

  const toggleExtra = (label: string) => {
    setExtras((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const tr = t[language];
  const waMessage = encodeURIComponent(tr.waBook(bundle.name, totalPrice));

  return (
    <div className="min-h-screen bg-white pb-16">
      <Header language={language} onLanguageChange={setLanguage} navLinks={getMainNavLinks(language)} />

      {/* HERO */}
      <div className="relative h-64 sm:h-80">
        <Image src={bundle.image} alt={bundle.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="relative h-full max-w-6xl mx-auto px-4 flex flex-col justify-end pb-6">
          <Link href="/packages" className="text-white/80 text-xs font-semibold mb-2 hover:text-white w-fit">{tr.backToPackages}</Link>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase">{bundle.name}</h1>
          <p className="text-white/85 text-sm mt-1">{bundle.subtitle}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* MAIN */}
        <div className="min-w-0">
          <h2 className="text-lg font-black text-gray-900 uppercase mb-2">{tr.overview}</h2>
          <p className="text-gray-600 text-sm mb-6">
            {includedTours.map((t) => t.summary[language]).join('. ')}.
          </p>

          <h2 className="text-lg font-black text-gray-900 uppercase mb-1">{tr.includedTours}</h2>
          <p className="text-gray-500 text-xs mb-3">{tr.includedToursNote}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
            {includedTours.map((tour) => (
              <div
                key={tour.slug}
                className="flex items-center gap-2.5 border border-gray-200 rounded-lg p-2"
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                  <Image src={tour.image} alt={tour.title[language]} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-gray-900 text-sm uppercase truncate">{tour.title[language]}</p>
                  <p className="text-gray-500 text-xs">{tour.duration[language]}</p>
                </div>
              </div>
            ))}
          </div>

          {bundle.eveningOut && bundle.eveningOut.length > 0 && (
            <>
              <h2 className="text-lg font-black text-gray-900 uppercase mb-1">{tr.eveningOut}</h2>
              <p className="text-gray-500 text-xs mb-3">{tr.eveningOutNote}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {bundle.eveningOut.map((place) => (
                  <span key={place} className="border border-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-700">
                    {place}
                  </span>
                ))}
              </div>
            </>
          )}

          {bundle.extras && bundle.extras.length > 0 && (
            <>
              <h2 className="text-lg font-black text-gray-900 uppercase mb-3">{tr.optionalExtras}</h2>
              <div className="space-y-2">
                {bundle.extras.map((extra) => (
                  <button
                    key={extra.label}
                    type="button"
                    onClick={() => toggleExtra(extra.label)}
                    className={`w-full flex items-center justify-between border rounded-lg px-3 py-2.5 text-sm transition ${
                      extras.has(extra.label) ? 'border-[#00a8cc] bg-[#00a8cc]/5' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="flex items-center gap-2 text-gray-700">
                      <span className={extras.has(extra.label) ? 'text-[#00a8cc]' : 'text-gray-400'}>
                        {extras.has(extra.label) ? '✓' : '+'}
                      </span>
                      {extra.label}
                    </span>
                    <span className="font-bold text-gray-900">+{extra.price}€</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="lg:sticky lg:top-24 h-fit space-y-3">
          <div className="border border-gray-200 rounded-xl p-4">
            <h3 className="text-xs font-black text-gray-900 uppercase mb-2">{tr.includes}</h3>
            <ul className="space-y-1.5">
              {includedItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                  <span className="text-[#ffa500]">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {excludedItems.length > 0 && (
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="text-xs font-black text-gray-900 uppercase mb-2">{tr.excludes}</h3>
              <ul className="space-y-1.5">
                {excludedItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                    <span className="text-red-500">✕</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-[#fdf6e3] border border-[#ffa500]/30 rounded-xl p-4">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-1">{tr.readyToGo}</p>
            <p className="text-2xl font-black text-gray-900 mb-1">{totalPrice}€</p>
            <p className="text-xs text-gray-500 mb-3">{tr.perPersonFixed}</p>
            <a
              href={`https://wa.me/000000000000?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-2.5 rounded-full hover:bg-[#1ebe57] transition mb-2 text-sm"
            >
              <Image src="/social/whatsapp.png" alt="" width={16} height={16} />
              {tr.bookNow}
            </a>
            <a
              href={`https://wa.me/000000000000?text=${encodeURIComponent(tr.waCustomize(bundle.name))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-full hover:border-[#00a8cc] transition text-sm"
            >
              {tr.customizeIt}
            </a>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingButtons />
    </div>
  );
}
