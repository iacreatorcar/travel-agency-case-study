'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { Lang } from '../../../lib/tours';
import { hotels } from '../../../lib/hotels';
import { supabase } from '../../../lib/supabase';
import Header from '../../vetrina/Header';
import Footer from '../../vetrina/Footer';
import Reveal from '../../vetrina/Reveal';

const labels: {
  [key in Lang]: {
    navHome: string;
    navHotels: string;
    navTours: string;
    navContact: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    checkAvailability: string;
    about: string;
    amenities: string;
    roomsTitle: string;
    servicesTitle: string;
    perNight: string;
    book: string;
    back: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    success: string;
    noPayment: string;
  };
} = {
  en: {
    navHome: 'Home', navHotels: 'Hotels', navTours: 'Tours', navContact: 'Contact',
    checkIn: 'Check-in', checkOut: 'Check-out', guests: 'Guests', checkAvailability: 'Check Availability',
    about: 'About This Hotel', amenities: 'Amenities', roomsTitle: 'Rooms & Suites', servicesTitle: 'Hotel Services',
    perNight: '/ night', book: 'Complete Your Booking', back: 'Back to Hotels',
    name: 'Full Name', email: 'Email', phone: 'Phone / WhatsApp', message: 'Special Requests (optional)', messagePlaceholder: 'Room preference? Dietary needs? Let us know!', submit: 'Send to WhatsApp', success: 'Booking sent! Check WhatsApp — we\'ll send options within 2 hours.', noPayment: 'No payment yet — this is just a booking request.'
  },
  ar: {
    navHome: 'الرئيسية', navHotels: 'الفنادق', navTours: 'الرحلات', navContact: 'اتصل بنا',
    checkIn: 'تسجيل الوصول', checkOut: 'تسجيل المغادرة', guests: 'عدد الضيوف', checkAvailability: 'تحقق من التوفر',
    about: 'عن هذا الفندق', amenities: 'الخدمات والمرافق', roomsTitle: 'الغرف والأجنحة', servicesTitle: 'خدمات الفندق',
    perNight: '/ ليلة', book: 'أكمل حجزك', back: 'العودة إلى الفنادق',
    name: 'الاسم الكامل', email: 'البريد الإلكتروني', phone: 'الهاتف / واتساب', message: 'طلبات خاصة (اختياري)', messagePlaceholder: 'تفضيل الغرفة؟ احتياجات غذائية؟ أخبرنا!', submit: 'إرسال إلى واتساب', success: 'تم الإرسال! تحقق من واتساب — سنرسل خيارات خلال ساعتين.', noPayment: 'بدون دفع الآن — هذا مجرد طلب حجز.'
  },
  it: {
    navHome: 'Home', navHotels: 'Hotel', navTours: 'Escursioni', navContact: 'Contatti',
    checkIn: 'Check-in', checkOut: 'Check-out', guests: 'Ospiti', checkAvailability: 'Verifica Disponibilità',
    about: 'Su Questo Hotel', amenities: 'Servizi e Comfort', roomsTitle: 'Camere e Suite', servicesTitle: 'Servizi dell\'Hotel',
    perNight: '/ notte', book: 'Completa la Tua Prenotazione', back: 'Torna agli Hotel',
    name: 'Nome Completo', email: 'Email', phone: 'Telefono / WhatsApp', message: 'Richieste Speciali (facoltativo)', messagePlaceholder: 'Preferenza camera? Esigenze dietetiche? Raccontaci!', submit: 'Invia su WhatsApp', success: 'Prenotazione inviata! Controlla WhatsApp — ti invieremo opzioni in 2 ore.', noPayment: 'Nessun pagamento ancora — questa è solo una richiesta di prenotazione.'
  },
  ru: {
    navHome: 'Главная', navHotels: 'Отели', navTours: 'Туры', navContact: 'Контакты',
    checkIn: 'Заезд', checkOut: 'Выезд', guests: 'Гости', checkAvailability: 'Проверить наличие',
    about: 'Об этом отеле', amenities: 'Удобства', roomsTitle: 'Номера и люксы', servicesTitle: 'Услуги отеля',
    perNight: '/ ночь', book: 'Завершите бронирование', back: 'Назад к отелям',
    name: 'Полное имя', email: 'Email', phone: 'Телефон / WhatsApp', message: 'Спецпожелания (опционально)', messagePlaceholder: 'Предпочтение номера? Особые потребности? Напишите!', submit: 'Отправить в WhatsApp', success: 'Бронирование отправлено! Проверьте WhatsApp — отправим варианты в течение 2 часов.', noPayment: 'Платёж пока не требуется — это просто запрос бронирования.'
  },
  de: {
    navHome: 'Startseite', navHotels: 'Hotels', navTours: 'Touren', navContact: 'Kontakt',
    checkIn: 'Anreise', checkOut: 'Abreise', guests: 'Gäste', checkAvailability: 'Verfügbarkeit Prüfen',
    about: 'Über Dieses Hotel', amenities: 'Ausstattung', roomsTitle: 'Zimmer & Suiten', servicesTitle: 'Hotel-Services',
    perNight: '/ Nacht', book: 'Buchung Vervollständigen', back: 'Zurück zu den Hotels',
    name: 'Vollständiger Name', email: 'E-Mail', phone: 'Telefon / WhatsApp', message: 'Spezialwünsche (optional)', messagePlaceholder: 'Zimmerpräferenz? Besondere Bedürfnisse? Sag Bescheid!', submit: 'An WhatsApp Senden', success: 'Buchung gesendet! Überprüfe WhatsApp — wir senden dir Optionen in 2 Stunden.', noPayment: 'Keine Zahlung erforderlich — dies ist nur eine Buchungsanfrage.'
  }
};

export default function HotelDetailPage() {
  const [language, setLanguage] = useState<Lang>('en');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const params = useParams<{ slug: string }>();
  const hotel = hotels.find((h) => h.slug === params.slug);

  if (!hotel) {
    notFound();
  }

  const t = labels[language];
  const isRtl = language === 'ar';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const { error: insertError } = await supabase.from('hotel_bookings').insert({
      hotel_slug: hotel.slug,
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone,
      customer_message: form.message,
      check_in: checkIn,
      check_out: checkOut,
      guests
    });
    setSubmitting(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-white">
      {/* NAV */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        backHref="/hotels"
        navLinks={[
          { href: '/', label: t.navHome },
          { href: '/tours', label: t.navTours },
          { href: '/quick-booking', label: 'Booking' },
          { href: '/packages', label: 'Packages' },
          { href: '/packages/create', label: 'Create Package' },
          { href: '/hotels', label: t.navHotels },
          { href: '/contact', label: t.navContact }
        ]}
      />

      {/* HERO */}
      <section className="relative h-[420px]">
        <div className="absolute inset-0 overflow-hidden">
          <Image src={`https://picsum.photos/seed/${hotel.slug}/1600/900`} alt={hotel.name[language]} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <span className="text-yellow-400 mb-2">{'★'.repeat(hotel.stars)}</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">{hotel.name[language]}</h1>
          <p className="opacity-90">{hotel.location[language]}</p>
        </div>

        {/* Booking widget */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-20 w-[92%] max-w-3xl">
          <div className="bg-white rounded-xl shadow-2xl p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t.checkIn}</label>
              <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t.checkOut}</label>
              <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t.guests}</label>
              <input type="number" min={1} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900" />
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#ffa500] text-white font-bold rounded-lg py-2 hover:bg-[#e69400] transition self-end"
            >
              {t.checkAvailability}
            </button>
          </div>
        </div>
      </section>

      <div className="pt-20" />

      {/* ABOUT */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <Reveal>
          <Link href="/hotels" className="text-[#00a8cc] font-semibold text-sm hover:underline">← {t.back}</Link>
          <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-3">{t.about}</h2>
          <p className="text-gray-600 leading-relaxed">{hotel.description[language]}</p>
        </Reveal>
      </section>

      {/* AMENITIES */}
      <section className="bg-[#f5f7fa] py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Reveal>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.amenities}</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hotel.amenities.map((a, i) => (
              <Reveal key={a.icon} delay={i * 80}>
                <div className="bg-white rounded-xl p-5 text-center shadow-sm">
                  <p className="text-3xl mb-2">{a.icon}</p>
                  <p className="text-sm font-semibold text-gray-800">{a.label[language]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ROOM TYPES */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <Reveal>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{t.roomsTitle}</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotel.roomTypes.map((room, i) => (
            <Reveal key={room.name.en} delay={i * 100}>
              <div className="bg-white border border-gray-100 rounded-xl shadow hover:shadow-lg transition p-6">
                <h3 className="font-bold text-gray-900 mb-2">{room.name[language]}</h3>
                <p className="text-sm text-gray-600 mb-1">👤 {room.occupancy[language]}</p>
                <p className="text-sm text-gray-600 mb-4">🛏️ {room.bed[language]}</p>
                <p className="text-xl font-bold text-[#00a8cc]">
                  {room.price} <span className="text-xs font-normal text-gray-500">{t.perNight}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-[#0d1f2d] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <h2 className="text-2xl font-bold mb-8">{t.servicesTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotel.services.map((service, i) => (
              <Reveal key={service.title.en} delay={i * 100}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <p className="text-3xl mb-3">{service.icon}</p>
                  <h3 className="font-bold mb-2">{service.title[language]}</h3>
                  <p className="text-sm text-gray-300">{service.text[language]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">{t.book}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            {submitted ? (
              <p className="text-green-700 font-semibold bg-green-50 border border-green-200 rounded-lg p-4 text-sm">
                {t.success}
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">{t.name}</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#00a8cc]" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">{t.email}</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#00a8cc]" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">{t.phone}</label>
                  <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#00a8cc]" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">{t.checkIn}</label>
                  <input required type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#00a8cc]" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">{t.checkOut}</label>
                  <input required type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#00a8cc]" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">{t.guests}</label>
                  <input required type="number" min={1} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#00a8cc]" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">{t.message}</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={t.messagePlaceholder} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#00a8cc] resize-none" />
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button type="submit" disabled={submitting} className="w-full bg-[#00a8cc] text-white font-bold py-3 rounded-full hover:bg-[#007399] disabled:opacity-50 transition">
                  {submitting ? '...' : t.submit}
                </button>
                <p className="text-xs text-gray-400 text-center">{t.noPayment}</p>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
