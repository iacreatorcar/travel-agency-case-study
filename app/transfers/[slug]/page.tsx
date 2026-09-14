'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { Lang } from '../../../lib/tours';
import { getTransferBySlug } from '../../../lib/transfers';
import { supabase } from '../../../lib/supabase';
import Header from '../../vetrina/Header';
import Footer from '../../vetrina/Footer';
import { getMainNavLinks } from '../../../lib/nav';

const labels: {
  [key in Lang]: {
    seats: string;
    luggage: string;
    specifications: string;
    prices: string;
    from: string;
    to: string;
    price: string;
    booking: string;
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    pax: string;
    fromLocation: string;
    toLocation: string;
    book: string;
    back: string;
    submit: string;
    success: string;
    contactUs: string;
    needHelp: string;
    callUs: string;
  };
} = {
  en: {
    seats: 'Seats', luggage: 'Luggage', specifications: 'Specifications', prices: 'Prices',
    from: 'From', to: 'To', price: 'Price', booking: 'Booking',
    name: 'Name', email: 'Email', phone: 'Phone', date: 'Travel date', time: 'Time',
    pax: 'Pax', fromLocation: 'Airport or Hotel name', toLocation: 'Destination',
    book: 'Book Now', back: 'Back to Transfers', submit: 'Book now',
    success: 'Booking request sent! We will contact you shortly.',
    contactUs: 'Contact Us', needHelp: 'Need Help for any Details?', callUs: 'Call Us'
  },
  ar: {
    seats: 'المقاعد', luggage: 'الأمتعة', specifications: 'المواصفات', prices: 'الأسعار',
    from: 'من', to: 'إلى', price: 'السعر', booking: 'الحجز',
    name: 'الاسم', email: 'البريد الإلكتروني', phone: 'الهاتف', date: 'تاريخ السفر', time: 'الوقت',
    pax: 'عدد الأشخاص', fromLocation: 'اسم المطار أو الفندق', toLocation: 'الوجهة',
    book: 'احجز الآن', back: 'العودة إلى خدمات النقل', submit: 'احجز الآن',
    success: 'تم إرسال طلب الحجز! سنتواصل معك قريبًا.',
    contactUs: 'تواصل معنا', needHelp: 'تحتاج مساعدة؟', callUs: 'اتصل بنا'
  },
  it: {
    seats: 'Posti', luggage: 'Bagagli', specifications: 'Specifiche', prices: 'Prezzi',
    from: 'Da', to: 'A', price: 'Prezzo', booking: 'Prenotazione',
    name: 'Nome', email: 'Email', phone: 'Telefono', date: 'Data del viaggio', time: 'Orario',
    pax: 'Persone', fromLocation: 'Nome aeroporto o hotel', toLocation: 'Destinazione',
    book: 'Prenota Ora', back: 'Torna ai Transfer', submit: 'Prenota ora',
    success: 'Richiesta inviata! Ti contatteremo a breve.',
    contactUs: 'Contattaci', needHelp: 'Serve Aiuto?', callUs: 'Chiamaci'
  },
  ru: {
    seats: 'Места', luggage: 'Багаж', specifications: 'Характеристики', prices: 'Цены',
    from: 'Откуда', to: 'Куда', price: 'Цена', booking: 'Бронирование',
    name: 'Имя', email: 'Email', phone: 'Телефон', date: 'Дата поездки', time: 'Время',
    pax: 'Пассажиры', fromLocation: 'Аэропорт или отель', toLocation: 'Пункт назначения',
    book: 'Забронировать', back: 'Назад к трансферам', submit: 'Забронировать',
    success: 'Заявка отправлена! Мы скоро свяжемся с вами.',
    contactUs: 'Связаться с нами', needHelp: 'Нужна помощь?', callUs: 'Позвонить'
  },
  de: {
    seats: 'Sitze', luggage: 'Gepäck', specifications: 'Spezifikationen', prices: 'Preise',
    from: 'Von', to: 'Nach', price: 'Preis', booking: 'Buchung',
    name: 'Name', email: 'E-Mail', phone: 'Telefon', date: 'Reisedatum', time: 'Uhrzeit',
    pax: 'Personen', fromLocation: 'Flughafen- oder Hotelname', toLocation: 'Ziel',
    book: 'Jetzt Buchen', back: 'Zurück zu den Transfers', submit: 'Jetzt buchen',
    success: 'Anfrage gesendet! Wir melden uns in Kürze bei dir.',
    contactUs: 'Kontaktiere uns', needHelp: 'Brauchst du Hilfe?', callUs: 'Anrufen'
  }
};

export default function TransferDetailPage() {
  const [language, setLanguage] = useState<Lang>('en');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    pax: '1',
    fromLocation: '',
    toLocation: ''
  });
  const params = useParams<{ slug: string }>();
  const transfer = getTransferBySlug(params.slug);

  if (!transfer) {
    notFound();
  }

  const t = labels[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const { error: insertError } = await supabase.from('transfer_bookings').insert({
      transfer_slug: transfer.slug,
      customer_name: form.name,
      customer_email: form.email,
      flight_date: form.date,
      direction: `${form.fromLocation} → ${form.toLocation}`,
      passengers: Number(form.pax)
    });
    setSubmitting(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        backHref="/transfers"
        navLinks={getMainNavLinks(language)}
      />

      <div className="max-w-6xl mx-auto p-6">
        <Link href="/transfers" className="text-[#00a8cc] font-semibold text-sm hover:underline">
          ← {t.back}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 mt-4">
          {/* MAIN COLUMN */}
          <div>
            <p className="text-xs text-gray-500 mb-2">📍 {transfer.city} · 👤 {t.seats}: {transfer.seats}</p>

            <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden mb-6">
              <Image src={transfer.image} alt={transfer.name[language]} fill className="object-cover" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-3">{transfer.vehicle[language]}</h1>
            <p className="text-gray-700 mb-6">{transfer.description[language]}</p>

            <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
              <h2 className="font-bold text-gray-900 mb-3">{t.specifications}</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p><span className="text-gray-500">{t.seats}:</span> <span className="font-semibold text-gray-900">{transfer.seats}</span></p>
                <p><span className="text-gray-500">{t.luggage}:</span> <span className="font-semibold text-gray-900">{transfer.luggage}</span></p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 overflow-x-auto">
              <h2 className="font-bold text-gray-900 mb-3">{t.prices}</h2>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left text-gray-600 bg-gray-50">
                    <th className="border border-gray-200 px-3 py-2">{t.from}</th>
                    <th className="border border-gray-200 px-3 py-2">{t.to}</th>
                    <th className="border border-gray-200 px-3 py-2 text-right">{t.price}</th>
                  </tr>
                </thead>
                <tbody>
                  {transfer.routes.map((route, i) => (
                    <tr key={i} className="even:bg-gray-50/50">
                      <td className="border border-gray-200 px-3 py-2 text-gray-700">{route.from}</td>
                      <td className="border border-gray-200 px-3 py-2 text-gray-700">{route.to}</td>
                      <td className="border border-gray-200 px-3 py-2 text-right font-semibold text-[#00a8cc]">{route.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-4 h-fit lg:sticky lg:top-24">
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow">
              <div className="bg-[#0d1f2d] text-white text-center py-3 font-semibold text-sm">{t.booking}</div>
              <div className="p-5">
                {submitted ? (
                  <p className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm font-semibold">
                    {t.success}
                  </p>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      required
                      placeholder={t.name}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                    <input
                      placeholder={t.phone}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        required
                        type="date"
                        title={t.date}
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none"
                      />
                      <input
                        type="time"
                        title={t.time}
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none"
                      />
                    </div>
                    <input
                      required
                      type="number"
                      min={1}
                      placeholder={t.pax}
                      value={form.pax}
                      onChange={(e) => setForm({ ...form, pax: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none"
                    />
                    <input
                      required
                      placeholder={t.fromLocation}
                      value={form.fromLocation}
                      onChange={(e) => setForm({ ...form, fromLocation: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none"
                    />
                    <input
                      required
                      placeholder={t.toLocation}
                      value={form.toLocation}
                      onChange={(e) => setForm({ ...form, toLocation: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none"
                    />
                    {error && <p className="text-red-600 text-xs">{error}</p>}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#27ae60] text-white font-bold py-3 rounded-lg hover:bg-[#219150] disabled:opacity-50 transition"
                    >
                      {submitting ? '...' : t.submit}
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
              <div className="bg-[#3b3fa0] text-white font-semibold text-sm px-5 py-3">{t.contactUs}</div>
              <div className="divide-y divide-gray-100">
                <a
                  href="https://wa.me/000000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition"
                >
                  <span className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center text-sm shrink-0">💬</span>
                  <span className="text-sm text-gray-700">WhatsApp</span>
                </a>
                <a
                  href="viber://chat?number=%2B000000000000"
                  className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition"
                >
                  <span className="w-8 h-8 rounded-full bg-[#7360F2] text-white flex items-center justify-center text-sm shrink-0">📞</span>
                  <span className="text-sm text-gray-700">Viber</span>
                </a>
                <a
                  href="https://www.tiktok.com/@voyara.travel.demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition"
                >
                  <span className="w-8 h-8 rounded-full bg-[#0d1f2d] text-white flex items-center justify-center text-sm shrink-0">🎵</span>
                  <span className="text-sm text-gray-700">TikTok</span>
                </a>
                <a
                  href="tel:+000000000000"
                  className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition"
                >
                  <span className="w-8 h-8 rounded-full bg-[#0d1f2d] text-white flex items-center justify-center text-sm shrink-0">📞</span>
                  <span className="text-sm text-gray-700">{t.callUs}</span>
                </a>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 bg-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#00a8cc] text-white flex items-center justify-center shrink-0">📞</div>
              <div>
                <p className="text-xs text-gray-500">{t.needHelp}</p>
                <p className="text-sm font-bold text-gray-900">+00 000 000 0000 (demo)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
