'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { GOOGLE_REVIEW_LINK } from '../../lib/google-review';
import { useCart } from '../../lib/cart-context';
import { Lang } from '../../lib/tours';
import Header from '../vetrina/Header';
import Footer from '../vetrina/Footer';
import { getMainNavLinks } from '../../lib/nav';

const t: { [key in Lang]: { [key: string]: string } } = {
  en: {
    breadcrumb: 'Your Selection',
    title: 'Your selected tours',
    clearAll: 'Clear all',
    empty: 'You haven\'t selected any tour yet.',
    browseTours: 'Browse tours',
    travelDate: 'Travel Date', adults: 'Adults (12+)', children: 'Children (3-11)', infants: 'Infants (0-2)',
    delete: 'Remove',
    formTitle: 'Complete Your Booking',
    formSubtitle: 'Share your details — we\'ll send you options on WhatsApp within 2 hours.',
    name: 'Full name', email: 'Email', phone: 'Phone / WhatsApp', message: 'Special requests (optional)',
    messagePlaceholder: 'Vegetarian? Mobility needs? Let us know!',
    submit: 'Send to WhatsApp', submitting: 'Sending...',
    successTitle: 'Booking sent!', successText: 'Check your WhatsApp — we\'re sending you tour options and pricing now.',
    errorGeneric: 'Oops! Please try again or message us directly on WhatsApp.',
    noBooking: 'No payment yet — this is just a booking request. We confirm everything on WhatsApp.',
    home: 'Home', reviewPrompt: '⭐ Enjoyed your experience? Leave us a review on Google'
  },
  it: {
    breadcrumb: 'La Tua Selezione',
    title: 'I tour che hai selezionato',
    clearAll: 'Svuota tutto',
    empty: 'Non hai ancora selezionato nessun tour.',
    browseTours: 'Sfoglia i tour',
    travelDate: 'Data del viaggio', adults: 'Adulti (12+)', children: 'Bambini (3-11)', infants: 'Neonati (0-2)',
    delete: 'Rimuovi',
    formTitle: 'Completa la Tua Prenotazione',
    formSubtitle: 'Condividi i tuoi dati — ti mandiamo le opzioni su WhatsApp entro 2 ore.',
    name: 'Nome e cognome', email: 'Email', phone: 'Telefono / WhatsApp', message: 'Richieste speciali (facoltativo)',
    messagePlaceholder: 'Vegetariano? Esigenze particolari? Raccontaci!',
    submit: 'Invia su WhatsApp', submitting: 'Invio in corso...',
    successTitle: 'Prenotazione inviata!', successText: 'Controlla WhatsApp — ti stiamo inviando le opzioni di tour e i prezzi ora.',
    errorGeneric: 'Oops! Riprova o contattaci direttamente su WhatsApp.',
    noBooking: 'Nessun pagamento ancora — questa è solo una richiesta di prenotazione. Confirmiamo tutto su WhatsApp.',
    home: 'Home', reviewPrompt: '⭐ Ti è piaciuta l\'esperienza? Lasciaci una recensione su Google'
  },
  ru: {
    breadcrumb: 'Ваш Выбор',
    title: 'Выбранные туры',
    clearAll: 'Очистить всё',
    empty: 'Вы ещё не выбрали ни одного тура.',
    browseTours: 'Смотреть туры',
    travelDate: 'Дата поездки', adults: 'Взрослые (12+)', children: 'Дети (3-11)', infants: 'Младенцы (0-2)',
    delete: 'Удалить',
    formTitle: 'Завершите Бронирование',
    formSubtitle: 'Поделитесь данными — отправим варианты в WhatsApp в течение 2 часов.',
    name: 'Полное имя', email: 'Email', phone: 'Телефон / WhatsApp', message: 'Особые пожелания (необязательно)',
    messagePlaceholder: 'Вегетарианец? Особые потребности? Напишите!',
    submit: 'Отправить в WhatsApp', submitting: 'Отправка...',
    successTitle: 'Бронирование отправлено!', successText: 'Проверьте WhatsApp — отправляем варианты туров и цены сейчас.',
    errorGeneric: 'Упс! Попробуйте снова или напишите нам напрямую в WhatsApp.',
    noBooking: 'Платёж ещё не требуется — это просто запрос бронирования. Всё подтвердим в WhatsApp.',
    home: 'Главная', reviewPrompt: '⭐ Понравился опыт? Оставьте отзыв о нас на Google'
  },
  de: {
    breadcrumb: 'Deine Auswahl',
    title: 'Deine ausgewählten Touren',
    clearAll: 'Alles löschen',
    empty: 'Du hast noch keine Tour ausgewählt.',
    browseTours: 'Touren ansehen',
    travelDate: 'Reisedatum', adults: 'Erwachsene (12+)', children: 'Kinder (3-11)', infants: 'Kleinkinder (0-2)',
    delete: 'Entfernen',
    formTitle: 'Vervollständige deine Buchung',
    formSubtitle: 'Teile deine Daten — wir senden dir Optionen auf WhatsApp innerhalb von 2 Stunden.',
    name: 'Vollständiger Name', email: 'E-Mail', phone: 'Telefon / WhatsApp', message: 'Besondere Wünsche (optional)',
    messagePlaceholder: 'Vegetarisch? Besondere Bedürfnisse? Sag uns Bescheid!',
    submit: 'An WhatsApp senden', submitting: 'Wird gesendet...',
    successTitle: 'Buchung gesendet!', successText: 'Überprüfe WhatsApp — wir senden dir jetzt Tour-Optionen und Preise.',
    errorGeneric: 'Hoppla! Versuche es erneut oder schreib uns direkt auf WhatsApp.',
    noBooking: 'Noch keine Zahlung nötig — dies ist nur eine Buchungsanfrage. Alles bestätigen wir auf WhatsApp.',
    home: 'Startseite', reviewPrompt: '⭐ Hat dir die Erfahrung gefallen? Hinterlasse uns eine Google-Bewertung'
  }
};

export default function CartPage() {
  const { items, updateItem, removeItem, clearCart } = useCart();
  const [language, setLanguage] = useState<Lang>('en');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const tr = t[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const tourSummary = items.length
      ? items.map((item) =>
          `• ${item.title} — ${item.date}, ${item.adults} adults, ${item.children} children, ${item.infants} infants`
        ).join('\n')
      : 'No specific tour selected.';

    const fullMessage = `${form.message ? form.message + '\n\n' : ''}Requested tours:\n${tourSummary}`;

    setSubmitting(false);

    fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject: 'Tour Request', name: form.name, phone: form.phone, email: form.email, message: fullMessage })
    }).catch(() => {});

    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', message: '' });
    clearCart();
  };

  return (
    <div dir="ltr" className="min-h-screen bg-gray-100">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        backHref="/"
        navLinks={getMainNavLinks(language)}
      />

      <div className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-500">
        <Link href="/" className="hover:underline">{tr.home}</Link> <span className="mx-1">›</span> {tr.breadcrumb}
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* TOURS LIST */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{tr.title}</h1>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="border border-gray-300 rounded-full px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
              >
                ⊗ {tr.clearAll}
              </button>
            )}
          </div>

          {items.length === 0 && (
            <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
              {tr.empty}{' '}
              <Link href="/packages" className="text-[#00a8cc] font-semibold hover:underline">{tr.browseTours}</Link>
            </div>
          )}

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.duration}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{tr.travelDate}</p>
                    <input
                      type="date"
                      value={item.date}
                      onChange={(e) => updateItem(item.id, { date: e.target.value })}
                      className="font-semibold text-gray-900 text-sm border-b border-gray-200 pb-1 w-full outline-none"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{tr.adults}</p>
                    <input
                      type="number"
                      min={1}
                      value={item.adults}
                      onChange={(e) => updateItem(item.id, { adults: Math.max(1, Number(e.target.value)) })}
                      className="font-semibold text-gray-900 text-sm border-b border-gray-200 pb-1 w-full outline-none"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{tr.children}</p>
                    <input
                      type="number"
                      min={0}
                      value={item.children}
                      onChange={(e) => updateItem(item.id, { children: Math.max(0, Number(e.target.value)) })}
                      className="font-semibold text-gray-900 text-sm border-b border-gray-200 pb-1 w-full outline-none"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{tr.infants}</p>
                    <input
                      type="number"
                      min={0}
                      value={item.infants}
                      onChange={(e) => updateItem(item.id, { infants: Math.max(0, Number(e.target.value)) })}
                      className="font-semibold text-gray-900 text-sm border-b border-gray-200 pb-1 w-full outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end border-t border-gray-100 pt-4">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-50 text-red-500 rounded-full px-5 py-2 text-sm font-semibold hover:bg-red-100"
                  >
                    🗑 {tr.delete}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REQUEST FORM */}
        <div className="bg-white rounded-xl shadow p-6 h-fit sticky top-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">✅</div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">{tr.successTitle}</h2>
              <p className="text-sm text-gray-500 mb-4">{tr.successText}</p>
              <a
                href={GOOGLE_REVIEW_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 hover:border-[#00a8cc] transition"
              >
                {tr.reviewPrompt}
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">{tr.formTitle}</h2>
              <p className="text-sm text-gray-500 mb-4">{tr.formSubtitle}</p>

              <div className="space-y-3 mb-4">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={tr.name}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#00a8cc]"
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={tr.email}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#00a8cc]"
                />
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder={tr.phone}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#00a8cc]"
                />
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={tr.messagePlaceholder}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#00a8cc] resize-none"
                />
              </div>

              {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#00a8cc] text-white font-bold py-3 rounded-full hover:bg-[#007399] disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                {submitting ? tr.submitting : tr.submit}
              </button>

              <p className="text-xs text-gray-400 mt-3 text-center">{tr.noBooking}</p>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
