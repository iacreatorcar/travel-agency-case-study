'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { GOOGLE_REVIEW_LINK } from '../../../lib/google-review';
import { Lang, TourType, TourCategory, tours } from '../../../lib/tours';
import { supabase } from '../../../lib/supabase';
import { useCart } from '../../../lib/cart-context';
import Header from '../../vetrina/Header';
import Footer from '../../vetrina/Footer';
import { getMainNavLinks } from '../../../lib/nav';

const categoryLabels: { [key in Lang]: { [key in TourCategory]: string } } = {
  en: { 'one-day': 'One Day Tour', 'multi-day': 'Multi Day Tour', island: 'Island' },
  ar: { 'one-day': 'رحلة يوم واحد', 'multi-day': 'رحلة متعددة الأيام', island: 'جزيرة' },
  it: { 'one-day': 'Tour di un Giorno', 'multi-day': 'Tour Multi-Giorno', island: 'Isola' },
  ru: { 'one-day': 'Однодневный тур', 'multi-day': 'Многодневный тур', island: 'Остров' },
  de: { 'one-day': 'Eintagestour', 'multi-day': 'Mehrtagestour', island: 'Insel' }
};

const labels: {
  [key in Lang]: {
    navHome: string;
    navTours: string;
    navContact: string;
    duration: string;
    location: string;
    type: string;
    category: string;
    overview: string;
    gallery: string;
    panorama: string;
    whereItIs: string;
    pickupTime: string;
    availability: string;
    highlights: string;
    included: string;
    excluded: string;
    addons: string;
    back: string;
    contactAvailability: string;
    name: string;
    nationality: string;
    phone: string;
    email: string;
    message: string;
    returnDate: string;
    date: string;
    people: string;
    adults: string;
    children: string;
    infants: string;
    total: string;
    wishlist: string;
    askQuestion: string;
    submit: string;
    success: string;
    typeLabels: { [key in TourType]: string };
  };
} = {
  en: {
    navHome: 'Home', navTours: 'Tours', navContact: 'Contact',
    duration: 'Duration', location: 'Location', type: 'Type', category: 'Category',
    overview: 'Overview', gallery: 'Gallery', panorama: '360° View', whereItIs: 'Where It Is', pickupTime: 'Pickup Time', availability: 'Availability',
    highlights: 'Highlights', included: 'What\'s Included?', excluded: 'What\'s Excluded?', addons: 'Add-ons',
    back: 'Back to Tours', contactAvailability: 'Contact Us For Checking Availability',
    name: 'Full Name', nationality: 'Nationality', phone: 'Phone', email: 'Email', message: 'Write Us...', returnDate: 'Return date (optional)', date: 'Travel date', people: 'Number of people',
    adults: 'Adults (12+)', children: 'Children (3-11)', infants: 'Infants (0-2)', total: 'Total', wishlist: 'Wishlist', askQuestion: 'Ask a Question',
    submit: 'Submit', success: 'Request sent! We will contact you shortly to confirm availability.',
    typeLabels: { 'day-tour': 'Day Tours', 'half-day': 'Half Day Tour', 'night-tour': 'Night Tours', layover: 'Layover' }
  },
  ar: {
    navHome: 'الرئيسية', navTours: 'الرحلات', navContact: 'اتصل بنا',
    duration: 'المدة', location: 'الموقع', type: 'النوع', category: 'الفئة',
    overview: 'نظرة عامة', gallery: 'معرض الصور', panorama: 'عرض 360°', whereItIs: 'أين يقع', pickupTime: 'وقت الاستلام', availability: 'التوفر',
    highlights: 'أبرز المعالم', included: 'ماذا يشمل؟', excluded: 'ماذا لا يشمل؟', addons: 'إضافات',
    back: 'العودة إلى الرحلات', contactAvailability: 'تواصل معنا للتحقق من التوفر',
    name: 'الاسم الكامل', nationality: 'الجنسية', phone: 'الهاتف', email: 'البريد الإلكتروني', message: 'اكتب لنا...', returnDate: 'تاريخ العودة (اختياري)', date: 'تاريخ السفر', people: 'عدد الأشخاص',
    adults: 'بالغون (12+)', children: 'أطفال (3-11)', infants: 'رضّع (0-2)', total: 'الإجمالي', wishlist: 'المفضلة', askQuestion: 'اطرح سؤالاً',
    submit: 'إرسال', success: 'تم إرسال الطلب! سنتواصل معك قريبًا لتأكيد التوفر.',
    typeLabels: { 'day-tour': 'جولات نهارية', 'half-day': 'نصف يوم', 'night-tour': 'جولات ليلية', layover: 'ترانزيت' }
  },
  it: {
    navHome: 'Home', navTours: 'Escursioni', navContact: 'Contatti',
    duration: 'Durata', location: 'Posizione', type: 'Tipo', category: 'Categoria',
    overview: 'Panoramica', gallery: 'Galleria', panorama: 'Vista 360°', whereItIs: 'Dove si Trova', pickupTime: 'Orario di Ritiro', availability: 'Disponibilità',
    highlights: 'Punti Salienti', included: 'Cosa Include?', excluded: 'Cosa Non Include?', addons: 'Extra',
    back: 'Torna alle Escursioni', contactAvailability: 'Contattaci per Verificare la Disponibilità',
    name: 'Nome Completo', nationality: 'Nazionalità', phone: 'Telefono', email: 'Email', message: 'Scrivici...', returnDate: 'Data di ritorno (facoltativo)', date: 'Data del viaggio', people: 'Numero di persone',
    adults: 'Adulti (12+)', children: 'Bambini (3-11)', infants: 'Neonati (0-2)', total: 'Totale', wishlist: 'Preferiti', askQuestion: 'Fai una domanda',
    submit: 'Invia', success: 'Richiesta inviata! Ti contatteremo a breve per confermare la disponibilità.',
    typeLabels: { 'day-tour': 'Tour Giornalieri', 'half-day': 'Mezza Giornata', 'night-tour': 'Tour Notturni', layover: 'Scalo' }
  },
  ru: {
    navHome: 'Главная', navTours: 'Туры', navContact: 'Контакты',
    duration: 'Продолжительность', location: 'Место', type: 'Тип', category: 'Категория',
    overview: 'Обзор', gallery: 'Галерея', panorama: 'Панорама 360°', whereItIs: 'Где это находится', pickupTime: 'Время трансфера', availability: 'Наличие',
    highlights: 'Основные моменты', included: 'Что включено?', excluded: 'Что не включено?', addons: 'Дополнительно',
    back: 'Назад к экскурсиям', contactAvailability: 'Свяжитесь с нами для проверки наличия',
    name: 'Полное имя', nationality: 'Национальность', phone: 'Телефон', email: 'Email', message: 'Напишите нам...', returnDate: 'Дата возвращения (необязательно)', date: 'Дата поездки', people: 'Количество человек',
    adults: 'Взрослые (12+)', children: 'Дети (3-11)', infants: 'Младенцы (0-2)', total: 'Итого', wishlist: 'Избранное', askQuestion: 'Задать вопрос',
    submit: 'Отправить', success: 'Заявка отправлена! Мы скоро свяжемся с вами для подтверждения.',
    typeLabels: { 'day-tour': 'Дневные туры', 'half-day': 'Полдня', 'night-tour': 'Ночные туры', layover: 'Трансфер между рейсами' }
  },
  de: {
    navHome: 'Startseite', navTours: 'Touren', navContact: 'Kontakt',
    duration: 'Dauer', location: 'Ort', type: 'Typ', category: 'Kategorie',
    overview: 'Überblick', gallery: 'Galerie', panorama: '360°-Ansicht', whereItIs: 'Wo es sich befindet', pickupTime: 'Abholzeit', availability: 'Verfügbarkeit',
    highlights: 'Highlights', included: 'Was ist Enthalten?', excluded: 'Was ist Ausgeschlossen?', addons: 'Zusatzleistungen',
    back: 'Zurück zu den Touren', contactAvailability: 'Kontaktiere uns zur Verfügbarkeitsprüfung',
    name: 'Vollständiger Name', nationality: 'Nationalität', phone: 'Telefon', email: 'E-Mail', message: 'Schreib uns...', returnDate: 'Rückreisedatum (optional)', date: 'Reisedatum', people: 'Anzahl Personen',
    adults: 'Erwachsene (12+)', children: 'Kinder (3-11)', infants: 'Kleinkinder (0-2)', total: 'Gesamt', wishlist: 'Wunschliste', askQuestion: 'Frage stellen',
    submit: 'Absenden', success: 'Anfrage gesendet! Wir melden uns in Kürze zur Bestätigung.',
    typeLabels: { 'day-tour': 'Tagestouren', 'half-day': 'Halbtagestour', 'night-tour': 'Nachttouren', layover: 'Zwischenstopp' }
  }
};

export default function TourDetailPage() {
  const [language, setLanguage] = useState<Lang>('en');
  const [form, setForm] = useState({ name: '', nationality: '', phone: '', email: '', message: '', date: '', returnDate: '' });
  const [pax, setPax] = useState({ adults: 1, children: 0, infants: 0 });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [pannellumReady, setPannellumReady] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [packageAdded, setPackageAdded] = useState(false);
  const panoRef = useRef<HTMLDivElement>(null);
  const params = useParams<{ slug: string }>();
  const { addItem } = useCart();
  const tour = tours.find((t) => t.slug === params.slug);

  if (!tour) {
    notFound();
  }
  if (tour.active === false) {
    notFound();
  }

  useEffect(() => {
    if (!pannellumReady || !tour.panorama360 || !panoRef.current) return;
    // @ts-expect-error pannellum loaded globally via script tag
    window.pannellum.viewer(panoRef.current, {
      type: 'equirectangular',
      panorama: tour.panorama360,
      autoLoad: true
    });
  }, [pannellumReady, tour.panorama360]);

  const t = labels[language];
  const isRtl = language === 'ar';
  const unitPrice = parseFloat(tour.price.replace(/[^\d.]/g, '')) || 0;
  const currencySymbol = tour.price.replace(/[\d.\s]/g, '') || '€';
  const totalPrice = unitPrice * (pax.adults + pax.children);

  const updatePax = (key: keyof typeof pax, delta: number) => {
    setPax((prev) => {
      const min = key === 'adults' ? 1 : 0;
      const next = Math.max(min, prev[key] + delta);
      return { ...prev, [key]: next };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const { error: insertError } = await supabase.from('bookings').insert({
      tour_slug: tour.slug,
      customer_name: form.name,
      customer_email: form.email,
      booking_date: form.date,
      return_date: form.returnDate || null,
      people: pax.adults + pax.children + pax.infants
    });
    setSubmitting(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setSubmitted(true);
  };

  const scrollToBooking = () => {
    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: tour.title[language], url });
      } catch {
        // user cancelled share
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    alert('Link copied to clipboard');
  };

  if (tour.theme === 'water-sports') {
    const related = tours.filter((x) => x.theme === 'water-sports' && x.slug !== tour.slug && x.active !== false);
    const waMessage = encodeURIComponent(`Ciao! Vorrei informazioni su "${tour.title[language]}" (${tour.price}).`);
    return (
      <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-white">
        <Header language={language} onLanguageChange={setLanguage} navLinks={getMainNavLinks(language)} />

        {/* HERO */}
        <div className="relative h-[300px] sm:h-[360px]">
          <Image src={tour.image} alt={tour.title[language]} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
          <div className="relative h-full max-w-5xl mx-auto px-4 flex flex-col justify-end pb-7">
            <Link href="/tours" className="text-white/80 text-xs font-semibold mb-3 hover:text-white w-fit">← {t.back}</Link>
            <span className="inline-block w-fit bg-[#ffa500] text-white text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-3">
              Sport Acquatici
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white uppercase leading-tight drop-shadow-lg">{tour.title[language]}</h1>
            <p className="text-white/85 italic text-sm sm:text-base mt-2">{tour.summary[language]}</p>
            <p className="text-white/70 text-xs sm:text-sm mt-2 max-w-xl">{tour.description[language]}</p>
            <div className="flex gap-5 mt-3 text-white/80 text-xs sm:text-sm font-medium">
              <span>⏱ {tour.duration[language]}</span>
              <span>💰 {tour.price}</span>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* MAIN */}
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase">Cosa Vivrai</h2>
            <p className="text-gray-600 text-sm mb-6">{tour.description[language]}</p>

            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase flex items-center gap-2">⭐ {t.highlights}</h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {tour.highlights[language].map((h) => (
                <span key={h} className="bg-[#ffa500]/10 text-[#ffa500] text-xs font-semibold px-3 py-1.5 rounded-full">
                  ⭐ {h}
                </span>
              ))}
            </div>

            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase">Info Utili</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="border border-gray-100 rounded-lg p-3">
                <p className="text-[11px] font-bold text-[#ffa500] uppercase mb-1">🕐 {t.pickupTime}</p>
                <p className="text-gray-600 text-sm">{tour.pickupTime[language]}</p>
              </div>
              <div className="border border-gray-100 rounded-lg p-3">
                <p className="text-[11px] font-bold text-[#ffa500] uppercase mb-1">📅 {t.availability}</p>
                <p className="text-gray-600 text-sm">{tour.availability[language]}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-base font-bold text-gray-900 mb-3 uppercase flex items-center gap-1">✓ {t.included}</h2>
                <ul className="space-y-2">
                  {tour.included[language].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-700 text-sm">
                      <span className="text-green-600">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900 mb-3 uppercase flex items-center gap-1">✕ {t.excluded}</h2>
                <ul className="space-y-2">
                  {tour.excluded[language].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-700 text-sm">
                      <span className="text-red-500">✕</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-lg shadow-gray-200/50">
              <p className="text-[#ffa500] text-[11px] font-bold uppercase tracking-wider mb-2">Prenota Adesso</p>
              <h3 className="font-bold text-gray-900 text-xl mb-1">{tour.title[language]}</h3>
              <p className="text-gray-500 text-sm mb-3">{tour.duration[language]}</p>
              <p className="text-gray-500 text-xs leading-relaxed mb-5">Ti rispondiamo in pochi minuti su WhatsApp con dettagli, disponibilità e prezzo aggiornato.</p>
              <a
                href={`https://wa.me/000000000000?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-[18px_1fr] items-center gap-2 bg-[#25D366] text-white font-bold py-3.5 px-5 rounded-full hover:bg-[#1ebe57] transition mb-2.5"
              >
                <Image src="/social/whatsapp.png" alt="" width={18} height={18} className="shrink-0 object-contain" />
                <span className="text-center">Prenota ora</span>
              </a>
              <a
                href="https://www.instagram.com/voyaratraveldemo"
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-[18px_1fr] items-center gap-2 bg-gradient-to-r from-[#ffa500] to-[#ec4899] text-white font-bold py-3.5 px-5 rounded-full hover:opacity-90 transition mb-2.5"
              >
                <Image src="/social/instagram.png" alt="" width={18} height={18} className="shrink-0 object-contain" />
                <span className="text-center">Vedi su Instagram</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  addItem({
                    slug: tour.slug,
                    title: tour.title[language],
                    image: tour.image,
                    pricePerUnit: unitPrice,
                    duration: tour.duration[language],
                    date: new Date().toISOString().slice(0, 10),
                    adults: 1,
                    children: 0,
                    infants: 0
                  });
                  setPackageAdded(true);
                }}
                className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold py-3.5 rounded-full hover:border-[#00a8cc] hover:text-[#00a8cc] transition w-full"
              >
                {packageAdded ? '✓ Aggiunto al pacchetto' : 'Aggiungi a un pacchetto'}
              </button>
              {packageAdded && (
                <Link href="/cart" className="block text-center text-[#00a8cc] text-xs font-semibold mt-3 hover:underline">
                  Vai al tuo pacchetto →
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <section className="max-w-5xl mx-auto px-4 pb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Potrebbe interessarti</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {related.slice(0, 6).map((r) => (
                <Link
                  key={r.slug}
                  href={`/tours/${r.slug}`}
                  className="group rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition"
                >
                  <div className="relative h-28">
                    <Image src={r.image} alt={r.title[language]} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">{r.title[language]}</p>
                    <p className="text-xs text-[#ffa500] font-bold mt-1">{r.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Footer />
      </div>
    );
  }

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-white pb-20 md:pb-0">
      {/* MOBILE HEADER */}
      <div className="md:hidden sticky top-0 z-30 bg-white border-b border-gray-100 flex items-center gap-3 px-4 h-14">
        <Link href="/tours" aria-label={t.back} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 shrink-0">
          ←
        </Link>
        <p className="text-sm font-semibold text-gray-900 truncate">{tour.title[language]}</p>
      </div>

      {/* NAV */}
      <div className="hidden md:block">
        <Header
          language={language}
          onLanguageChange={setLanguage}
          navLinks={getMainNavLinks(language)}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        {/* MAIN COLUMN */}
        <div className="min-w-0">
          <Link href="/tours" className="hidden md:inline text-[#00a8cc] font-semibold text-sm hover:underline">← {t.back}</Link>
          <div className="flex items-start justify-between gap-3 mt-3 mb-4">
            <h1 className="hidden md:block text-2xl font-bold text-gray-900">{tour.title[language]}</h1>
            <div className="hidden md:flex gap-2 shrink-0">
              <button aria-label="Wishlist" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#00a8cc]">♡</button>
              <button onClick={handleShare} aria-label="Share" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#00a8cc]">↗</button>
            </div>
          </div>

          {/* Photo strip (hero + gallery merged) */}
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
            {(tour.images && tour.images.length > 0 ? tour.images : [tour.image]).map((src, i) => (
              <button
                type="button"
                key={src}
                onClick={() => setLightboxIndex(i)}
                className="relative w-[85%] sm:w-72 h-56 shrink-0 rounded-xl overflow-hidden snap-start cursor-zoom-in"
              >
                <Image src={src} alt={`${tour.title[language]} ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>

          {/* Info strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">{t.duration}</p>
              <p className="font-semibold text-gray-900 text-sm">{tour.duration[language]}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">{t.location}</p>
              <p className="font-semibold text-gray-900 text-sm">{tour.locationLabel}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">{t.type}</p>
              <p className="font-semibold text-gray-900 text-sm">{t.typeLabels[tour.type]}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">{t.category}</p>
              <p className="font-semibold text-gray-900 text-sm">{categoryLabels[language][tour.category]}</p>
            </div>
          </div>

          {/* Overview */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{t.overview}</h2>
            <p className="text-gray-600 mb-4">{tour.description[language]}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">{t.pickupTime}</p>
                <p className="font-semibold text-gray-900 text-sm">{tour.pickupTime[language]}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">{t.availability}</p>
                <p className="font-semibold text-gray-900 text-sm">{tour.availability[language]}</p>
              </div>
            </div>
          </section>

          {/* 360 Panorama */}
          {tour.panorama360 && (
            <section className="mb-8">
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pannellum/2.5.6/pannellum.css" />
              <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/pannellum/2.5.6/pannellum.js"
                onLoad={() => setPannellumReady(true)}
              />
              <h2 className="text-lg font-bold text-gray-900 mb-3">{t.panorama}</h2>
              <div ref={panoRef} className="relative rounded-xl overflow-hidden border border-gray-100 h-80" />
            </section>
          )}

          {/* Map */}
          {tour.mapQuery && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">{t.whereItIs}</h2>
              <div className="rounded-xl overflow-hidden border border-gray-100 h-72">
                <iframe
                  title={tour.title[language]}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(tour.mapQuery)}&output=embed`}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </section>
          )}

          {/* Highlights */}
          <section className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{t.highlights}</h2>
            <ul className="space-y-2">
              {tour.highlights[language].map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-700 text-sm">
                  <span className="text-[#00a8cc]">✓</span> {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Included / Excluded */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{t.included}</h2>
              <ul className="space-y-2">
                {tour.included[language].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-green-600">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{t.excluded}</h2>
              <ul className="space-y-2">
                {tour.excluded[language].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-red-500">✕</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Add-ons */}
          {tour.addons.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">{t.addons}</h2>
              <div className="space-y-2">
                {tour.addons.map((addon) => (
                  <div key={addon.name.en} className="flex justify-between items-center border border-gray-100 rounded-lg px-4 py-3">
                    <span className="text-sm text-gray-700">{addon.name[language]}</span>
                    <span className="font-semibold text-gray-900 text-sm">{addon.price}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* SIDEBAR FORM */}
        <div id="booking-form" className="lg:sticky lg:top-24 h-fit scroll-mt-20">
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow">
            <div className="bg-[#0d1f2d] text-white text-center py-3 font-semibold text-sm">
              {t.contactAvailability}
            </div>
            <div className="p-5">
              {submitted ? (
                <div className="space-y-3">
                  <p className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm font-semibold">
                    {t.success}
                  </p>
                  <a
                    href={GOOGLE_REVIEW_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg p-3 text-sm text-gray-700 hover:border-[#00a8cc] transition"
                  >
                    ⭐ Ti è piaciuta l'esperienza? Lasciaci una recensione su Google
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Passenger counters */}
                  <div className="space-y-3">
                    {([
                      ['adults', t.adults],
                      ['children', t.children],
                      ['infants', t.infants]
                    ] as const).map(([key, label]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{label}</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updatePax(key, -1)}
                            className="w-7 h-7 rounded-full border border-[#00a8cc] text-[#00a8cc] flex items-center justify-center font-bold hover:bg-[#00a8cc]/10 transition"
                          >
                            −
                          </button>
                          <span className="w-5 text-center text-sm font-semibold text-gray-900">{pax[key]}</span>
                          <button
                            type="button"
                            onClick={() => updatePax(key, 1)}
                            className="w-7 h-7 rounded-full border border-[#00a8cc] text-[#00a8cc] flex items-center justify-center font-bold hover:bg-[#00a8cc]/10 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="text-sm font-semibold text-gray-900">{t.total}</span>
                    <span className="text-xl font-bold text-[#ffa500]">{currencySymbol}{totalPrice.toFixed(2)}</span>
                  </div>

                  <input
                    required
                    placeholder={t.name}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none"
                  />
                  <input
                    placeholder={t.nationality}
                    value={form.nationality}
                    onChange={(e) => setForm({ ...form, nationality: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none"
                  />
                  <input
                    placeholder={t.phone}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none"
                  />
                  <input
                    required
                    type="email"
                    placeholder={t.email}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-gray-500 mb-1">{t.date}</label>
                      <input
                        required
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-500 mb-1">{t.returnDate}</label>
                      <input
                        type="date"
                        value={form.returnDate}
                        onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none"
                      />
                    </div>
                  </div>
                  <textarea
                    placeholder={t.message}
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none"
                  />
                  {error && <p className="text-red-600 text-xs">{error}</p>}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#0d1f2d] text-white font-bold py-3 rounded-lg hover:bg-[#1a3549] disabled:opacity-50 transition"
                  >
                    {submitting ? '...' : t.submit}
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      aria-label={t.wishlist}
                      className="flex items-center justify-center gap-2 border border-gray-200 rounded-full py-2 text-sm text-gray-700 hover:border-[#00a8cc] transition"
                    >
                      ♡ {t.wishlist}
                    </button>
                    <button
                      type="button"
                      onClick={() => document.getElementById('booking-form')?.querySelector('textarea')?.focus()}
                      aria-label={t.askQuestion}
                      className="flex items-center justify-center gap-2 border border-gray-200 rounded-full py-2 text-sm text-gray-700 hover:border-[#00a8cc] transition"
                    >
                      💬 {t.askQuestion}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* MOBILE STICKY PRICE + CTA */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3 shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
        <div>
          <p className="text-xs text-gray-500">Price</p>
          <p className="text-lg font-bold text-gray-900">{tour.price}</p>
        </div>
        <button
          onClick={scrollToBooking}
          className="flex-1 bg-[#0d1f2d] text-white font-bold py-3 rounded-full"
        >
          Book now
        </button>
      </div>

      {/* GALLERY LIGHTBOX */}
      {lightboxIndex !== null && tour.images && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white text-2xl flex items-center justify-center hover:bg-white/20"
          >
            ×
          </button>
          {lightboxIndex > 0 && (
            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + tour.images!.length) % tour.images!.length); }}
              className="absolute left-2 md:left-6 w-11 h-11 rounded-full bg-white/10 text-white text-2xl flex items-center justify-center hover:bg-white/20"
            >
              ‹
            </button>
          )}
          <div className="relative w-full h-full max-w-4xl max-h-[80vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={tour.images[lightboxIndex]}
              alt={`${tour.title[language]} ${lightboxIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>
          {lightboxIndex < tour.images.length - 1 && (
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % tour.images!.length); }}
              className="absolute right-2 md:right-6 w-11 h-11 rounded-full bg-white/10 text-white text-2xl flex items-center justify-center hover:bg-white/20"
            >
              ›
            </button>
          )}
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {lightboxIndex + 1} / {tour.images.length}
          </span>
        </div>
      )}
    </div>
  );
}
