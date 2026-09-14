'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lang, tours } from '../../lib/tours';
import { bundles } from '../../lib/bundles';
import Header from '../vetrina/Header';
import Footer from '../vetrina/Footer';
import { getMainNavLinks } from '../../lib/nav';

const collections: {
  id: string;
  icon: string;
  image: string;
  accent: string;
  accentSoft: string;
  slugs: string[];
}[] = [
  {
    id: 'desert',
    icon: '🏜️',
    image: '/hero/hero-5.jpg',
    accent: 'from-[#f59e0b]/90 via-[#f59e0b]/10',
    accentSoft: '#f59e0b',
    slugs: ['buggy-desert', 'quad-safari', 'super-safari-bedouin-dinner', 'horse-riding-red-sea', 'abu-galum-safari']
  },
  {
    id: 'sea',
    icon: '🤿',
    image: '/hero/hero-9.jpg',
    accent: 'from-[#00a8cc]/90 via-[#00a8cc]/10',
    accentSoft: '#00a8cc',
    slugs: ['ras-mohammed-boat', 'tiran-island-boat', 'private-boat', 'glass-boat', 'submarine', 'scuba-diving-naama-bay']
  },
  {
    id: 'beyond',
    icon: '🏛️',
    image: '/hero/hero-14.jpg',
    accent: 'from-[#6366f1]/90 via-[#6366f1]/10',
    accentSoft: '#6366f1',
    slugs: ['cairo-by-bus', 'cairo-by-plane', 'luxor-by-plane', 'petra-bus-boat', 'jerusalem-by-bus']
  },
  {
    id: 'fun',
    icon: '🎉',
    image: '/hero/hero-19.jpg',
    accent: 'from-[#ec4899]/90 via-[#ec4899]/10',
    accentSoft: '#ec4899',
    slugs: ['albatros-water-park', 'dolphin-show', 'swim-with-dolphins', 'parasailing', 'crazy-boat', 'banana-boat']
  }
];

const t: { [key in Lang]: { [key: string]: string } } = {
  en: {
    eyebrow: 'Curated Collections',
    title: 'Find Your Egypt',
    subtitle: 'Tours grouped by theme — pick the mood, browse the picks, book what fits. Every tour is bookable on its own.',
    desertTitle: 'Desert Adventure', desertDesc: 'Buggy, quad, safari and a Bedouin night under the stars.',
    seaTitle: 'Sea & Snorkeling', seaDesc: 'Ras Mohammed, Tiran, private boats and the coral reefs of the Red Sea.',
    beyondTitle: 'Beyond Sharm', beyondDesc: 'Cairo, Luxor, Petra and Jerusalem — day trips outside Sinai.',
    funTitle: 'Fun & Water', funDesc: 'Water park, dolphins, parasailing and speedboat rides.',
    toursIn: 'tours', explore: 'Explore', from: 'from'
  },
  it: {
    eyebrow: 'Collezioni Curate',
    title: 'Trova il Tuo Egitto',
    subtitle: 'Tour raggruppati per tema — scegli il mood, sfoglia la selezione, prenota quello che fa per te. Ogni tour è prenotabile singolarmente.',
    desertTitle: 'Avventura nel Deserto', desertDesc: 'Buggy, quad, safari e una notte beduina sotto le stelle.',
    seaTitle: 'Mare & Snorkeling', seaDesc: 'Ras Mohammed, Tiran, barche private e le barriere coralline del Mar Rosso.',
    beyondTitle: 'Fuori Sharm', beyondDesc: 'Cairo, Luxor, Petra e Gerusalemme — gite di un giorno fuori dal Sinai.',
    funTitle: 'Divertimento & Acqua', funDesc: 'Parco acquatico, delfini, parasailing e giri in motoscafo.',
    toursIn: 'tour', explore: 'Scopri', from: 'da'
  },
  ru: {
    eyebrow: 'Тематические подборки',
    title: 'Найди свой Египет',
    subtitle: 'Туры сгруппированы по темам — выберите настроение, просмотрите подборку, забронируйте то, что подходит. Каждый тур бронируется отдельно.',
    desertTitle: 'Приключения в пустыне', desertDesc: 'Багги, квадроциклы, сафари и бедуинская ночь под звёздами.',
    seaTitle: 'Море и снорклинг', seaDesc: 'Рас-Мухаммед, Тиран, частные лодки и коралловые рифы Красного моря.',
    beyondTitle: 'За пределами Шарма', beyondDesc: 'Каир, Луксор, Петра и Иерусалим — однодневные поездки за пределы Синая.',
    funTitle: 'Развлечения и вода', funDesc: 'Аквапарк, дельфины, парасейлинг и катание на катере.',
    toursIn: 'туров', explore: 'Смотреть', from: 'от'
  },
  de: {
    eyebrow: 'Kuratierte Kollektionen',
    title: 'Finde Dein Ägypten',
    subtitle: 'Touren nach Thema gruppiert — wähle die Stimmung, stöbere in der Auswahl, buche was passt. Jede Tour ist einzeln buchbar.',
    desertTitle: 'Wüstenabenteuer', desertDesc: 'Buggy, Quad, Safari und eine Beduinennacht unter den Sternen.',
    seaTitle: 'Meer & Schnorcheln', seaDesc: 'Ras Mohammed, Tiran, private Boote und die Korallenriffe des Roten Meeres.',
    beyondTitle: 'Jenseits von Sharm', beyondDesc: 'Kairo, Luxor, Petra und Jerusalem — Tagesausflüge außerhalb des Sinai.',
    funTitle: 'Spaß & Wasser', funDesc: 'Wasserpark, Delfine, Parasailing und Speedboot-Touren.',
    toursIn: 'Touren', explore: 'Entdecken', from: 'ab'
  }
};

export default function PackagesPage() {
  const [language, setLanguage] = useState<Lang>('en');
  const [bookingBundle, setBookingBundle] = useState<string | null>(null);
  const tr = t[language];

  const titleKey: { [key: string]: string } = { desert: 'desertTitle', sea: 'seaTitle', beyond: 'beyondTitle', fun: 'funTitle' };
  const descKey: { [key: string]: string } = { desert: 'desertDesc', sea: 'seaDesc', beyond: 'beyondDesc', fun: 'funDesc' };

  return (
    <div dir="ltr" className="min-h-screen bg-[#0d1f2d]">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        backHref="/"
        navLinks={getMainNavLinks(language)}
      />

      {/* HERO */}
      <div className="relative h-[300px] sm:h-[380px] overflow-hidden">
        {/*
          Video vero dai social del cliente (Instagram/TikTok reel), non stock generico.
          Quando arriva il file: metterlo in /public/videos/packages-hero.mp4 e scommentare qui sotto,
          il fallback <Image> resta sotto come poster/placeholder finché il video non c'è.

          <video
            autoPlay muted loop playsInline
            poster="/hero/hero-1.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/packages-hero.mp4" type="video/mp4" />
          </video>
        */}
        <Image src="/hero/hero-3.jpg" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0d1f2d]" />
        <div className="relative h-full max-w-4xl mx-auto px-4 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffa500]">{tr.eyebrow}</span>
          <h1 className="text-4xl sm:text-6xl font-black text-white mt-3 drop-shadow-lg">{tr.title}</h1>
          <p className="text-white/85 mt-4 max-w-xl text-sm sm:text-base">{tr.subtitle}</p>
        </div>
      </div>

      {/* BUNDLE PACKAGES */}
      <div className="bg-[#0d1f2d] pt-10 pb-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="inline-block bg-[#ffa500] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            🎁 Bundle Package
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Pacchetti Combinati</h2>
          <p className="text-white/60 text-sm mb-8 max-w-xl">Più attività insieme, prezzo scontato rispetto a prenotarle separatamente.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-4">
            {bundles.map((bundle) => {
              const includedTours = bundle.slugs
                .map((slug) => tours.find((tr) => tr.slug === slug))
                .filter((tr): tr is NonNullable<typeof tr> => tr !== undefined);
              return (
                <div key={bundle.id} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="relative h-36">
                    <Image src={bundle.image} alt={bundle.name} fill className="object-cover" />
                    <span className="absolute top-2 right-2 bg-[#0d1f2d] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      €{bundle.price}
                    </span>
                    {bundle.originalPrice > bundle.price && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full line-through decoration-white">
                        €{bundle.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-base">{bundle.name}</h3>
                    <p className="text-gray-500 text-xs mb-3">{bundle.subtitle}</p>
                    <ul className="space-y-1 mb-4">
                      {includedTours.map((tr) => (
                        <li key={tr.slug} className="flex items-start gap-1.5 text-xs text-gray-600">
                          <span className="text-green-600">✓</span> {tr.title[language]}
                        </li>
                      ))}
                    </ul>

                    {bookingBundle === bundle.id ? (
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={`https://wa.me/000000000000?text=${encodeURIComponent(`Ciao! Vorrei prenotare il pacchetto "${bundle.name}" (€${bundle.price}).`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 bg-[#25D366] text-white text-xs font-bold py-2 rounded-full hover:bg-[#1ebe57] transition"
                        >
                          <Image src="/social/whatsapp.png" alt="" width={14} height={14} />
                          WhatsApp
                        </a>
                        <a
                          href={`mailto:info@cdalise.com?subject=${encodeURIComponent(`Prenotazione: ${bundle.name}`)}&body=${encodeURIComponent(`Ciao! Vorrei prenotare il pacchetto "${bundle.name}" (€${bundle.price}).`)}`}
                          className="flex items-center justify-center gap-1.5 bg-[#00a8cc] text-white text-xs font-bold py-2 rounded-full hover:bg-[#0088aa] transition"
                        >
                          ✉️ Email
                        </a>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/packages/${bundle.id}`}
                          className="flex items-center justify-center border border-gray-200 text-gray-700 text-xs font-semibold py-2 rounded-full hover:border-[#00a8cc] transition"
                        >
                          Dettagli
                        </Link>
                        <button
                          onClick={() => setBookingBundle(bundle.id)}
                          className="flex items-center justify-center bg-[#25D366] text-white text-xs font-bold py-2 rounded-full hover:bg-[#1ebe57] transition"
                        >
                          Prenota ora
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CREATE YOUR OWN PACKAGE */}
      <div className="bg-[#ffa500] py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="font-black text-white uppercase text-lg">Nessun pacchetto ti convince al 100%?</h3>
            <p className="text-white/90 text-sm">Componi tu il pacchetto: scegli le escursioni, indica le date e ricevi il preventivo su WhatsApp.</p>
          </div>
          <Link
            href="/packages/create"
            className="shrink-0 bg-white text-[#0d1f2d] font-bold text-sm px-6 py-3 rounded-full hover:bg-gray-100 transition whitespace-nowrap"
          >
            Crea il tuo pacchetto →
          </Link>
        </div>
      </div>

      {/* COLLECTIONS */}
      <div className="bg-[#0d1f2d] pb-20">
        <div className="max-w-6xl mx-auto px-4 space-y-16 pt-4">
          {collections.map((col, colIdx) => {
            const colTours = col.slugs
              .map((slug) => tours.find((tour) => tour.slug === slug))
              .filter((tour): tour is NonNullable<typeof tour> => tour !== undefined && tour.active !== false);

            if (colTours.length === 0) return null;

            return (
              <section key={col.id}>
                {/* Collection banner */}
                <div className="relative h-56 sm:h-72 rounded-3xl overflow-hidden group">
                  <Image
                    src={col.image}
                    alt={tr[titleKey[col.id]]}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${col.accent} to-black/10`} />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

                  <span
                    className="absolute top-5 left-5 sm:top-6 sm:left-6 text-3xl sm:text-4xl w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-lg"
                    aria-hidden
                  >
                    {col.icon}
                  </span>

                  <span className="absolute top-5 right-5 sm:top-6 sm:right-6 bg-white text-[#0d1f2d] text-xs font-bold px-3 py-1.5 rounded-full shadow">
                    {colTours.length} {tr.toursIn}
                  </span>

                  <div className="absolute bottom-6 left-5 right-5 sm:left-6 sm:right-6">
                    <h2 className="text-2xl sm:text-4xl font-black text-white drop-shadow-lg leading-tight">
                      {tr[titleKey[col.id]]}
                    </h2>
                    <p className="text-white/90 text-sm sm:text-base mt-1.5 max-w-lg drop-shadow">
                      {tr[descKey[col.id]]}
                    </p>
                  </div>

                  <span
                    className="absolute -bottom-px left-0 right-0 h-1.5"
                    style={{ background: col.accentSoft }}
                  />
                </div>

                {/* Tour cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
                  {colTours.map((tour) => (
                    <div
                      key={tour.slug}
                      className="group relative rounded-2xl overflow-hidden shadow-md"
                    >
                      <div className="relative h-36 sm:h-40">
                        <Image
                          src={tour.image}
                          alt={tour.title[language]}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-tight drop-shadow">
                          {tour.title[language]}
                        </p>
                        <span
                          className="inline-block mt-1.5 text-[11px] font-bold text-white px-2 py-0.5 rounded-full"
                          style={{ background: col.accentSoft }}
                        >
                          {tour.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {colIdx < collections.length - 1 && (
                  <div className="h-px bg-white/10 mt-16" />
                )}
              </section>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
