'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lang, tours } from '../../../lib/tours';
import { generateQuotePDF } from '../../../lib/pdf-quote';
import { GOOGLE_REVIEW_LINK } from '../../../lib/google-review';
import Header from '../../vetrina/Header';
import Footer from '../../vetrina/Footer';
import { getMainNavLinks } from '../../../lib/nav';

const tourIcons: { [slug: string]: string } = {
  'ras-mohammed-boat': '🚤',
  'tiran-island-boat': '🚤',
  'ras-mohammed-bus': '🚌',
  'colored-canyon': '🏔️',
  'abu-galum-safari': '🏜️',
  'saint-catherine-monastery': '⛪',
  'mount-sinai-climb': '⛰️',
  'grand-safari-dahab': '🏜️',
  'buggy-desert': '🏎️',
  'quad-safari': '🏍️',
  'super-safari-bedouin-dinner': '🐫',
  'horse-riding-red-sea': '🐴',
  'sina-dream-day-trip': '🚤',
  'sina-dream-night-cruise': '🌙',
  'dolphin-show': '🐬',
  'swim-with-dolphins': '🐬',
  'albatros-water-park': '🎢',
  parasailing: '🪂',
  'crazy-boat': '🚀',
  'tube-boat': '🛟',
  'banana-boat': '🍌',
  'water-skiing': '🎿',
  'water-donut': '🍩',
  'private-speedboat': '🚤',
  'private-boat': '⛵',
  'glass-boat': '🔍',
  submarine: '🚇',
  'scuba-diving-naama-bay': '🤿',
  'cairo-by-bus': '🚌',
  'cairo-by-plane': '✈️',
  'luxor-by-plane': '✈️',
  'petra-bus-boat': '🏛️',
  'jerusalem-by-bus': '🕌'
};

interface CreateDict {
  stepTours: string; stepTravel: string; stepSummary: string;
  eyebrow: string; heroTitle: string; heroSubtitle: string;
  chooseTours: string; chooseToursSub: string;
  back: string; continue: string;
  yourDetails: string; yourDetailsSub: string;
  fullName: string; fullNamePlaceholder: string;
  phone: string; phonePlaceholder: string;
  email: string; emailPlaceholder: string;
  hotelName: string; hotelPlaceholder: string;
  arrival: string; departure: string;
  adults: string; kids0to2: string; kids2to5: string; kids5to10: string;
  notes: string; notesPlaceholder: string;
  summary: string;
  chosenTours: (n: number) => string;
  labelName: string; labelPhone: string; labelEmail: string; labelHotel: string;
  labelArrival: string; labelDeparture: string; labelAdults: string; labelKids: string;
  sentTitle: string; reviewPrompt: string;
  downloadPdf: string; bookNow: string; sending: string;
  privacyNote: string;
  waMessage: (params: {
    tourNames: string[]; name: string; phone: string; email: string;
    hotel: string; arrival: string; departure: string; adults: number; kids: number; notes: string;
  }) => string;
}

const t: { [key in Lang]: CreateDict } = {
  en: {
    stepTours: 'Tours', stepTravel: 'Travel Info', stepSummary: 'Summary',
    eyebrow: 'Tailored for You', heroTitle: 'Create Your Package',
    heroSubtitle: 'Three simple steps: pick your tours, add your dates and get a quote on WhatsApp.',
    chooseTours: 'Choose Your Tours', chooseToursSub: 'Select as many as you like.',
    back: '← Back', continue: 'Continue →',
    yourDetails: 'Your Details', yourDetailsSub: "We need these to organize your package.",
    fullName: '👤 Full Name *', fullNamePlaceholder: 'John Smith',
    phone: '📱 Phone / WhatsApp *', phonePlaceholder: '+1 555 1234567',
    email: '✉️ Email', emailPlaceholder: 'john.smith@email.com',
    hotelName: '🏨 Hotel Name', hotelPlaceholder: 'Hotel where you are staying',
    arrival: '✈️ Arrival Date & Time *', departure: '🛫 Departure Date & Time *',
    adults: '🧑 Adults (10+ years) *', kids0to2: '👶 Children 0-2 years', kids2to5: '🧒 Children 2-5 years', kids5to10: '🧒 Children 5-10 years',
    notes: '📝 Notes (optional)', notesPlaceholder: 'Special requests, allergies, requests...',
    summary: 'Summary',
    chosenTours: (n) => `Selected Tours (${n})`,
    labelName: 'Name', labelPhone: 'Phone', labelEmail: 'Email', labelHotel: 'Hotel',
    labelArrival: 'Arrival', labelDeparture: 'Departure', labelAdults: 'Adults', labelKids: 'Children',
    sentTitle: 'Request sent! Check WhatsApp.', reviewPrompt: '⭐ Enjoyed your experience? Leave us a review on Google',
    downloadPdf: '📄 Download PDF', bookNow: 'Book Now', sending: 'Sending...',
    privacyNote: '🔒 Your data will only be used to manage your booking. By submitting, you agree to be contacted via WhatsApp.',
    waMessage: ({ tourNames, name, phone, email, hotel, arrival, departure, adults, kids, notes }) =>
      `Hi! I'd like to create a custom package.\n\nTours:\n${tourNames.map((n) => `- ${n}`).join('\n')}\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || '-'}\nHotel: ${hotel || '-'}\nArrival: ${arrival}\nDeparture: ${departure}\nAdults: ${adults}, Children: ${kids}\nNotes: ${notes || '-'}`
  },
  it: {
    stepTours: 'Escursioni', stepTravel: 'Dati Viaggio', stepSummary: 'Riepilogo',
    eyebrow: 'Su Misura per Te', heroTitle: 'Crea il Tuo Pacchetto',
    heroSubtitle: 'Tre semplici step: scegli le escursioni, inserisci le date e ricevi il preventivo su WhatsApp.',
    chooseTours: 'Scegli le Escursioni', chooseToursSub: 'Selezionane quante ne vuoi.',
    back: '← Indietro', continue: 'Continua →',
    yourDetails: 'I Tuoi Dati', yourDetailsSub: 'Ci servono per organizzare al meglio il tuo pacchetto.',
    fullName: '👤 Nome e Cognome *', fullNamePlaceholder: 'Mario Rossi',
    phone: '📱 Telefono / WhatsApp *', phonePlaceholder: '+39 333 1234567',
    email: '✉️ Email', emailPlaceholder: 'mario.rossi@email.com',
    hotelName: '🏨 Nome struttura', hotelPlaceholder: 'Hotel dove alloggi',
    arrival: '✈️ Data e ora di arrivo *', departure: '🛫 Data e ora di partenza *',
    adults: '🧑 Adulti (10+ anni) *', kids0to2: '👶 Bambini 0-2 anni', kids2to5: '🧒 Bambini 2-5 anni', kids5to10: '🧒 Bambini 5-10 anni',
    notes: '📝 Note (opzionale)', notesPlaceholder: 'Esigenze particolari, allergie, richieste...',
    summary: 'Riepilogo',
    chosenTours: (n) => `Escursioni Scelte (${n})`,
    labelName: 'Nome', labelPhone: 'Telefono', labelEmail: 'Email', labelHotel: 'Struttura',
    labelArrival: 'Arrivo', labelDeparture: 'Partenza', labelAdults: 'Adulti', labelKids: 'Bambini',
    sentTitle: 'Richiesta inviata! Controlla WhatsApp.', reviewPrompt: "⭐ Ti è piaciuta l'esperienza? Lasciaci una recensione su Google",
    downloadPdf: '📄 Scarica PDF', bookNow: 'Prenota ora', sending: 'Invio...',
    privacyNote: '🔒 I tuoi dati saranno usati solo per gestire la prenotazione. Inviando accetti di essere contattato via WhatsApp.',
    waMessage: ({ tourNames, name, phone, email, hotel, arrival, departure, adults, kids, notes }) =>
      `Ciao! Vorrei creare un pacchetto su misura.\n\nEscursioni:\n${tourNames.map((n) => `- ${n}`).join('\n')}\n\nNome: ${name}\nTelefono: ${phone}\nEmail: ${email || '-'}\nStruttura: ${hotel || '-'}\nArrivo: ${arrival}\nPartenza: ${departure}\nAdulti: ${adults}, Bambini: ${kids}\nNote: ${notes || '-'}`
  },
  ru: {
    stepTours: 'Экскурсии', stepTravel: 'Данные Поездки', stepSummary: 'Итог',
    eyebrow: 'Специально для Вас', heroTitle: 'Создайте Свой Пакет',
    heroSubtitle: 'Три простых шага: выберите экскурсии, укажите даты и получите предложение в WhatsApp.',
    chooseTours: 'Выберите Экскурсии', chooseToursSub: 'Выберите сколько угодно.',
    back: '← Назад', continue: 'Далее →',
    yourDetails: 'Ваши Данные', yourDetailsSub: 'Они нужны нам, чтобы лучше организовать ваш пакет.',
    fullName: '👤 Имя и Фамилия *', fullNamePlaceholder: 'Иван Иванов',
    phone: '📱 Телефон / WhatsApp *', phonePlaceholder: '+7 900 1234567',
    email: '✉️ Email', emailPlaceholder: 'ivan.ivanov@email.com',
    hotelName: '🏨 Название отеля', hotelPlaceholder: 'Отель, где вы остановились',
    arrival: '✈️ Дата и время прилёта *', departure: '🛫 Дата и время вылета *',
    adults: '🧑 Взрослые (от 10 лет) *', kids0to2: '👶 Дети 0-2 года', kids2to5: '🧒 Дети 2-5 лет', kids5to10: '🧒 Дети 5-10 лет',
    notes: '📝 Примечания (необязательно)', notesPlaceholder: 'Особые пожелания, аллергии, запросы...',
    summary: 'Итог',
    chosenTours: (n) => `Выбранные Экскурсии (${n})`,
    labelName: 'Имя', labelPhone: 'Телефон', labelEmail: 'Email', labelHotel: 'Отель',
    labelArrival: 'Прилёт', labelDeparture: 'Вылет', labelAdults: 'Взрослые', labelKids: 'Дети',
    sentTitle: 'Запрос отправлен! Проверьте WhatsApp.', reviewPrompt: '⭐ Понравился опыт? Оставьте отзыв о нас на Google',
    downloadPdf: '📄 Скачать PDF', bookNow: 'Забронировать', sending: 'Отправка...',
    privacyNote: '🔒 Ваши данные используются только для организации бронирования. Отправляя форму, вы соглашаетесь на связь через WhatsApp.',
    waMessage: ({ tourNames, name, phone, email, hotel, arrival, departure, adults, kids, notes }) =>
      `Здравствуйте! Хочу создать индивидуальный пакет.\n\nЭкскурсии:\n${tourNames.map((n) => `- ${n}`).join('\n')}\n\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email || '-'}\nОтель: ${hotel || '-'}\nПрилёт: ${arrival}\nВылет: ${departure}\nВзрослые: ${adults}, Дети: ${kids}\nПримечания: ${notes || '-'}`
  },
  de: {
    stepTours: 'Touren', stepTravel: 'Reisedaten', stepSummary: 'Zusammenfassung',
    eyebrow: 'Für Dich Maßgeschneidert', heroTitle: 'Stelle Dein Paket Zusammen',
    heroSubtitle: 'Drei einfache Schritte: wähle die Touren, gib deine Daten ein und erhalte ein Angebot per WhatsApp.',
    chooseTours: 'Wähle Deine Touren', chooseToursSub: 'Wähle so viele du möchtest.',
    back: '← Zurück', continue: 'Weiter →',
    yourDetails: 'Deine Daten', yourDetailsSub: 'Wir brauchen diese, um dein Paket optimal zu organisieren.',
    fullName: '👤 Vollständiger Name *', fullNamePlaceholder: 'Max Mustermann',
    phone: '📱 Telefon / WhatsApp *', phonePlaceholder: '+49 151 1234567',
    email: '✉️ E-Mail', emailPlaceholder: 'max.mustermann@email.com',
    hotelName: '🏨 Hotelname', hotelPlaceholder: 'Hotel, in dem du wohnst',
    arrival: '✈️ Ankunftsdatum & -zeit *', departure: '🛫 Abreisedatum & -zeit *',
    adults: '🧑 Erwachsene (ab 10 Jahren) *', kids0to2: '👶 Kinder 0-2 Jahre', kids2to5: '🧒 Kinder 2-5 Jahre', kids5to10: '🧒 Kinder 5-10 Jahre',
    notes: '📝 Notizen (optional)', notesPlaceholder: 'Besondere Wünsche, Allergien, Anfragen...',
    summary: 'Zusammenfassung',
    chosenTours: (n) => `Ausgewählte Touren (${n})`,
    labelName: 'Name', labelPhone: 'Telefon', labelEmail: 'E-Mail', labelHotel: 'Unterkunft',
    labelArrival: 'Ankunft', labelDeparture: 'Abreise', labelAdults: 'Erwachsene', labelKids: 'Kinder',
    sentTitle: 'Anfrage gesendet! Überprüfe WhatsApp.', reviewPrompt: '⭐ Hat dir die Erfahrung gefallen? Hinterlasse uns eine Google-Bewertung',
    downloadPdf: '📄 PDF Herunterladen', bookNow: 'Jetzt Buchen', sending: 'Wird gesendet...',
    privacyNote: '🔒 Deine Daten werden nur zur Verwaltung der Buchung verwendet. Mit dem Absenden stimmst du zu, per WhatsApp kontaktiert zu werden.',
    waMessage: ({ tourNames, name, phone, email, hotel, arrival, departure, adults, kids, notes }) =>
      `Hallo! Ich möchte ein individuelles Paket erstellen.\n\nTouren:\n${tourNames.map((n) => `- ${n}`).join('\n')}\n\nName: ${name}\nTelefon: ${phone}\nE-Mail: ${email || '-'}\nUnterkunft: ${hotel || '-'}\nAnkunft: ${arrival}\nAbreise: ${departure}\nErwachsene: ${adults}, Kinder: ${kids}\nNotizen: ${notes || '-'}`
  }
};

const dateLocale: { [key in Lang]: string } = { en: 'en-GB', it: 'it-IT', ru: 'ru-RU', de: 'de-DE' };

export default function CreatePackagePage() {
  const [language, setLanguage] = useState<Lang>('en');
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    hotel: '',
    arrival: '',
    departure: '',
    adults: 2,
    kids0to2: 0,
    kids2to5: 0,
    kids5to10: 0,
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const tr = t[language];
  const steps = [
    { n: 1, label: tr.stepTours },
    { n: 2, label: tr.stepTravel },
    { n: 3, label: tr.stepSummary }
  ];

  const activeTours = tours.filter((tour) => tour.active !== false);
  const selectedTours = activeTours.filter((tour) => selected.has(tour.slug));

  const toggleTour = (slug: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const formatDateTime = (value: string) => {
    const d = new Date(value);
    if (isNaN(d.getTime())) return value || '-';
    return d.toLocaleString(dateLocale[language], { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const waMessage = encodeURIComponent(
    tr.waMessage({
      tourNames: selectedTours.map((tour) => tour.title[language]),
      name: form.name,
      phone: form.phone,
      email: form.email,
      hotel: form.hotel,
      arrival: formatDateTime(form.arrival),
      departure: formatDateTime(form.departure),
      adults: form.adults,
      kids: form.kids0to2 + form.kids2to5 + form.kids5to10,
      notes: form.notes
    })
  );

  const handleConfirm = async () => {
    setSubmitting(true);
    setSubmitting(false);
    setSubmitted(true);
    window.open(`https://wa.me/000000000000?text=${waMessage}`, '_blank');
  };

  const handleDownloadPDF = async () => {
    const doc = await generateQuotePDF({
      customerName: form.name,
      hotel: form.hotel,
      arrival: form.arrival.replace('T', ' '),
      departure: form.departure.replace('T', ' '),
      adults: form.adults,
      kids: form.kids0to2 + form.kids2to5 + form.kids5to10,
      notes: form.notes,
      tours: selectedTours.map((tour) => ({ name: tour.title[language], duration: tour.duration[language] }))
    });
    doc.save(`preventivo-voyaratravel-${Date.now()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} onLanguageChange={setLanguage} navLinks={getMainNavLinks(language)} />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <p className="text-[#ffa500] text-xs font-bold uppercase tracking-wider mb-2">{tr.eyebrow}</p>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase">{tr.heroTitle}</h1>
          <p className="text-gray-500 text-sm mt-2">{tr.heroSubtitle}</p>
        </div>

        {/* STEPPER */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                    step > s.n ? 'bg-[#ffa500] text-white' : step === s.n ? 'bg-[#ffa500] text-white' : 'bg-gray-100 text-gray-400 border border-gray-200'
                  }`}
                >
                  {step > s.n ? '✓' : s.n}
                </div>
                <span className={`text-[10px] font-bold uppercase ${step >= s.n ? 'text-gray-900' : 'text-gray-400'}`}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className={`w-16 h-px ${step > s.n ? 'bg-[#ffa500]' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* STEP 1: TOURS */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-black text-gray-900 uppercase mb-1">{tr.chooseTours}</h2>
            <p className="text-gray-500 text-sm mb-5">{tr.chooseToursSub}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {activeTours.map((tour) => (
                <button
                  key={tour.slug}
                  type="button"
                  onClick={() => toggleTour(tour.slug)}
                  className={`flex items-center gap-3 border rounded-xl p-3 text-left transition ${
                    selected.has(tour.slug) ? 'border-[#ffa500] bg-[#ffa500]/5' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl shrink-0">{tourIcons[tour.slug] ?? '📍'}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-gray-900 text-sm truncate">{tour.title[language]}</p>
                    <p className="text-gray-500 text-xs">{tour.duration[language]}</p>
                  </div>
                  <span
                    className={`w-5 h-5 rounded-full border-2 shrink-0 ${
                      selected.has(tour.slug) ? 'border-[#ffa500] bg-[#ffa500]' : 'border-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <Link href="/packages" className="border border-gray-200 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-full hover:border-gray-300 transition">
                {tr.back}
              </Link>
              <button
                type="button"
                disabled={selected.size === 0}
                onClick={() => setStep(2)}
                className="bg-[#ffa500] text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-[#e69400] transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {tr.continue}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: FORM */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-black text-gray-900 uppercase mb-1">{tr.yourDetails}</h2>
            <p className="text-gray-500 text-sm mb-5">{tr.yourDetailsSub}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">{tr.fullName}</label>
                <input
                  required
                  placeholder={tr.fullNamePlaceholder}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">{tr.phone}</label>
                <input
                  required
                  type="tel"
                  placeholder={tr.phonePlaceholder}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">{tr.email}</label>
                <input
                  type="email"
                  placeholder={tr.emailPlaceholder}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">{tr.hotelName}</label>
                <input
                  placeholder={tr.hotelPlaceholder}
                  value={form.hotel}
                  onChange={(e) => setForm({ ...form, hotel: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">{tr.arrival}</label>
                <input
                  required
                  type="datetime-local"
                  value={form.arrival}
                  onChange={(e) => setForm({ ...form, arrival: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">{tr.departure}</label>
                <input
                  required
                  type="datetime-local"
                  value={form.departure}
                  onChange={(e) => setForm({ ...form, departure: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">{tr.adults}</label>
                <input
                  required
                  type="number"
                  min={1}
                  value={form.adults}
                  onChange={(e) => setForm({ ...form, adults: Number(e.target.value) })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">{tr.kids0to2}</label>
                <input
                  type="number"
                  min={0}
                  value={form.kids0to2}
                  onChange={(e) => setForm({ ...form, kids0to2: Number(e.target.value) })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">{tr.kids2to5}</label>
                <input
                  type="number"
                  min={0}
                  value={form.kids2to5}
                  onChange={(e) => setForm({ ...form, kids2to5: Number(e.target.value) })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">{tr.kids5to10}</label>
                <input
                  type="number"
                  min={0}
                  value={form.kids5to10}
                  onChange={(e) => setForm({ ...form, kids5to10: Number(e.target.value) })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">{tr.notes}</label>
                <textarea
                  rows={3}
                  placeholder={tr.notesPlaceholder}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(1)} className="border border-gray-200 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-full hover:border-gray-300 transition">
                {tr.back}
              </button>
              <button
                type="button"
                disabled={!form.name || !form.phone || !form.arrival || !form.departure}
                onClick={() => setStep(3)}
                className="bg-[#ffa500] text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-[#e69400] transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {tr.continue}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUMMARY */}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-black text-gray-900 uppercase mb-4">{tr.summary}</h2>
            <div className="border border-gray-200 rounded-2xl p-6 mb-6">
              <p className="text-xs font-black text-gray-900 uppercase mb-3">{tr.chosenTours(selectedTours.length)}</p>
              <ul className="space-y-1.5 mb-5">
                {selectedTours.map((tour) => (
                  <li key={tour.slug} className="flex items-start gap-2 text-sm text-gray-700">
                    <span>{tourIcons[tour.slug] ?? '📍'}</span>
                    <span className="font-semibold">{tour.title[language]}</span> — {tour.duration[language]}
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{tr.labelName}</p>
                  <p className="text-gray-900">{form.name}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{tr.labelPhone}</p>
                  <p className="text-gray-900">{form.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{tr.labelEmail}</p>
                  <p className="text-gray-900">{form.email || '-'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{tr.labelHotel}</p>
                  <p className="text-gray-900">{form.hotel || '-'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{tr.labelArrival}</p>
                  <p className="text-gray-900">{form.arrival.replace('T', ' ')}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{tr.labelDeparture}</p>
                  <p className="text-gray-900">{form.departure.replace('T', ' ')}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{tr.labelAdults}</p>
                  <p className="text-gray-900">{form.adults}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">{tr.labelKids}</p>
                  <p className="text-gray-900">{form.kids0to2 + form.kids2to5 + form.kids5to10}</p>
                </div>
              </div>

              {submitted ? (
                <div className="mt-4 space-y-2">
                  <p className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-sm font-semibold text-center">
                    {tr.sentTitle}
                  </p>
                  <a
                    href={GOOGLE_REVIEW_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg p-3 text-sm text-gray-700 hover:border-[#00a8cc] transition"
                  >
                    {tr.reviewPrompt}
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold py-3 rounded-full hover:border-[#00a8cc] transition"
                  >
                    {tr.downloadPdf}
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={submitting}
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-full hover:bg-[#1ebe57] transition disabled:opacity-60"
                  >
                    💬 {submitting ? tr.sending : tr.bookNow}
                  </button>
                </div>
              )}
              <p className="text-gray-400 text-[11px] text-center mt-2">
                {tr.privacyNote}
              </p>
            </div>
            <button type="button" onClick={() => setStep(2)} className="border border-gray-200 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-full hover:border-gray-300 transition">
              {tr.back}
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
