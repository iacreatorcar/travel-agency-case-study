'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Lang } from '../../lib/tours';
import { reviewSources } from '../../lib/reviews';
import Header from '../vetrina/Header';
import ReviewsMarquee from './ReviewsMarquee';
import Footer from '../vetrina/Footer';

const specialEvents = [
  {
    id: 'wedding',
    icon: '💍',
    image: '/events/sharm-aerial.jpg',
    name: { en: 'Wedding in Egypt', ar: 'زفاف في مصر', it: 'Matrimonio in Egitto', ru: 'Свадьба в Египте', de: 'Hochzeit in Ägypten' },
    desc: {
      en: 'Beach or desert ceremony, photographer, catering and decoration — fully organized.',
      ar: 'حفل على الشاطئ أو في الصحراء، مصور، تموين وديكور — تنظيم كامل.',
      it: 'Cerimonia sulla spiaggia o nel deserto, fotografo, catering e allestimento — tutto organizzato.',
      ru: 'Церемония на пляже или в пустыне, фотограф, кейтеринг и декор — полностью организовано.',
      de: 'Zeremonie am Strand oder in der Wüste, Fotograf, Catering und Dekoration — komplett organisiert.'
    }
  },
  {
    id: 'anniversary',
    icon: '💐',
    image: '/events/dahab-fishing-village.jpg',
    name: { en: 'Romantic Anniversary', ar: 'ذكرى سنوية رومانسية', it: 'Anniversario Romantico', ru: 'Романтическая годовщина', de: 'Romantisches Jubiläum' },
    desc: {
      en: 'Private dinner on the beach at sunset, candles, music and a bottle of wine.',
      ar: 'عشاء خاص على الشاطئ عند الغروب، شموع، موسيقى وزجاجة نبيذ.',
      it: 'Cena privata in spiaggia al tramonto, candele, musica e una bottiglia di vino.',
      ru: 'Частный ужин на пляже на закате, свечи, музыка и бутылка вина.',
      de: 'Privates Abendessen am Strand bei Sonnenuntergang, Kerzen, Musik und eine Flasche Wein.'
    }
  },
  {
    id: 'party-disco',
    icon: '🎉',
    image: '/events/dolce-vita-desert-party.jpg',
    name: { en: 'Private Party & Disco Night', ar: 'حفلة خاصة وليلة ديسكو', it: 'Festa Privata & Serata Disco', ru: 'Частная вечеринка и диско', de: 'Private Party & Disco-Nacht' },
    desc: {
      en: 'DJ, lights and dance floor for your private party in a unique desert or beach venue.',
      ar: 'دي جي وإضاءة ومنصة رقص لحفلتك الخاصة في موقع صحراوي أو شاطئي فريد.',
      it: 'DJ, luci e pista da ballo per la tua festa privata in una location unica nel deserto o in spiaggia.',
      ru: 'Диджей, свет и танцпол для вашей частной вечеринки в уникальном месте в пустыне или на пляже.',
      de: 'DJ, Licht und Tanzfläche für deine private Party an einem einzigartigen Ort in der Wüste oder am Strand.'
    }
  },
  {
    id: 'live-music',
    icon: '🎤',
    image: '/events/sharm-aerial.jpg',
    name: { en: 'Live Music & Artists', ar: 'موسيقى حية وفنانون', it: 'Concerti & Artisti dal Vivo', ru: 'Живая музыка и артисты', de: 'Live-Musik & Künstler' },
    desc: {
      en: 'Book local bands, DJs or performers for your event, from intimate sets to full shows.',
      ar: 'احجز فرقًا محلية أو دي جي أو فنانين لحدثك، من عروض حميمة إلى عروض كاملة.',
      it: 'Prenota band locali, DJ o artisti per il tuo evento, da set intimi a show completi.',
      ru: 'Забронируйте местные группы, диджеев или артистов для вашего мероприятия.',
      de: 'Buche lokale Bands, DJs oder Künstler für dein Event, von intimen Sets bis zu vollen Shows.'
    }
  }
];

const translations: {
  [key in Lang]: {
    navHome: string;
    navTours: string;
    navPackages: string;
    navCreatePackage: string;
    navEvents: string;
    navContact: string;
    title: string;
    intro: string;
    readMore: string;
    details: string;
    bookNow: string;
    onRequest: string;
  };
} = {
  en: {
    navHome: 'Home', navTours: 'Tours', navPackages: 'Packages', navCreatePackage: 'Create Package', navEvents: 'Events', navContact: 'Contact',
    title: 'Special Events',
    intro: 'Wedding, anniversary, private party or live music — we organize unique events in Sharm El-Sheikh\'s best locations, fully tailored to you.',
    readMore: 'Read More',
    details: 'Details',
    bookNow: 'Book Now',
    onRequest: 'On Request'
  },
  ar: {
    navHome: 'الرئيسية', navTours: 'الرحلات', navPackages: 'الباقات', navCreatePackage: 'أنشئ باقتك', navEvents: 'الفعاليات', navContact: 'اتصل بنا',
    title: 'فعاليات خاصة',
    intro: 'زفاف، ذكرى سنوية، حفلة خاصة أو موسيقى حية — ننظم فعاليات فريدة في أفضل مواقع شرم الشيخ، مصممة خصيصًا لك.',
    readMore: 'اقرأ المزيد',
    details: 'التفاصيل',
    bookNow: 'احجز الآن',
    onRequest: 'عند الطلب'
  },
  it: {
    navHome: 'Home', navTours: 'Escursioni', navPackages: 'Pacchetti', navCreatePackage: 'Crea Pacchetto', navEvents: 'Eventi', navContact: 'Contatti',
    title: 'Eventi Speciali',
    intro: 'Matrimonio, anniversario, festa privata o musica dal vivo — organizziamo eventi unici nelle migliori location di Sharm El-Sheikh, su misura per te.',
    readMore: 'Leggi di Più',
    details: 'Dettagli',
    bookNow: 'Prenota Ora',
    onRequest: 'Su Richiesta'
  },
  ru: {
    navHome: 'Главная', navTours: 'Туры', navPackages: 'Пакеты', navCreatePackage: 'Создать пакет', navEvents: 'События', navContact: 'Контакты',
    title: 'Особые события',
    intro: 'Свадьба, годовщина, частная вечеринка или живая музыка — мы организуем уникальные события в лучших местах Шарм-эль-Шейха, полностью под вас.',
    readMore: 'Подробнее',
    details: 'Подробности',
    bookNow: 'Забронировать',
    onRequest: 'По запросу'
  },
  de: {
    navHome: 'Startseite', navTours: 'Touren', navPackages: 'Pakete', navCreatePackage: 'Paket Erstellen', navEvents: 'Events', navContact: 'Kontakt',
    title: 'Besondere Events',
    intro: 'Hochzeit, Jubiläum, private Party oder Live-Musik — wir organisieren einzigartige Events an den besten Orten in Sharm El-Sheikh, ganz nach deinen Wünschen.',
    readMore: 'Mehr Erfahren',
    details: 'Details',
    bookNow: 'Jetzt Buchen',
    onRequest: 'Auf Anfrage'
  }
};

export default function EventsPage() {
  const [language, setLanguage] = useState<Lang>('en');
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [bookingEvent, setBookingEvent] = useState<string | null>(null);
  const t = translations[language];
  const isRtl = language === 'ar';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-white">
      {/* NAV */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        backHref="/"
        navLinks={[
          { href: '/', label: t.navHome },
          { href: '/tours', label: t.navTours },
          { href: '/quick-booking', label: 'Booking' },
          { href: '/packages', label: t.navPackages },
          { href: '/packages/create', label: t.navCreatePackage },
          { href: '/events', label: t.navEvents },
          { href: '/contact', label: t.navContact }
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-gray-700 text-sm leading-relaxed mb-8">{t.intro}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {specialEvents.map((event) => (
            <div key={event.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-36">
                <Image src={event.image} alt={event.name[language]} fill className="object-cover" />
                <span className="absolute top-2 right-2 bg-[#0d1f2d] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {t.onRequest}
                </span>
                <span className="absolute top-2 left-2 text-2xl drop-shadow">{event.icon}</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-base mb-2">{event.name[language]}</h3>
                {expandedEvent === event.id ? (
                  <p className="text-gray-600 text-xs mb-3">{event.desc[language]}</p>
                ) : (
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">{event.desc[language]}</p>
                )}

                {bookingEvent === event.id ? (
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`https://wa.me/000000000000?text=${encodeURIComponent(`Ciao! Vorrei informazioni su "${event.name[language]}".`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 bg-[#25D366] text-white text-xs font-bold py-2 rounded-full hover:bg-[#1ebe57] transition"
                    >
                      <Image src="/social/whatsapp.png" alt="" width={14} height={14} />
                      WhatsApp
                    </a>
                    <a
                      href={`mailto:info@cdalise.com?subject=${encodeURIComponent(event.name[language])}&body=${encodeURIComponent(`Ciao! Vorrei informazioni su "${event.name[language]}".`)}`}
                      className="flex items-center justify-center gap-1.5 bg-[#00a8cc] text-white text-xs font-bold py-2 rounded-full hover:bg-[#0088aa] transition"
                    >
                      ✉️ Email
                    </a>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                      className="border border-gray-200 text-gray-700 text-xs font-semibold py-2 rounded-full hover:border-[#00a8cc] transition"
                    >
                      {expandedEvent === event.id ? '−' : t.details}
                    </button>
                    <button
                      onClick={() => setBookingEvent(event.id)}
                      className="flex items-center justify-center bg-[#25D366] text-white text-xs font-bold py-2 rounded-full hover:bg-[#1ebe57] transition"
                    >
                      {t.bookNow}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CLIENTS FEEDBACK */}
      <section className="bg-[#f5f7fa] py-14">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Clients Feedback</h2>

        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap items-center gap-4 mb-3 text-sm">
            {reviewSources.map((source, i) => (
              <span key={source.key} className={`flex items-center gap-1 ${i === 0 ? 'font-bold text-gray-900 border-b-2 border-[#0d1f2d] pb-1' : 'text-gray-500'}`}>
                {source.label} {source.rating.toFixed(1)}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-700">
              <span className="font-bold text-gray-900">Excellent</span> ★★★★★{' '}
              <span className="font-semibold">4.7</span> | 5,267 reviews
            </p>
            <button className="border border-gray-300 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 hover:bg-white">
              Write a review
            </button>
          </div>
        </div>

        <ReviewsMarquee />
      </section>


      <Footer />
    </div>
  );
}
