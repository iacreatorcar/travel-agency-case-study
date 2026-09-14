'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lang } from '../../lib/tours';
import { supabase } from '../../lib/supabase';
import Header from '../vetrina/Header';
import Footer from '../vetrina/Footer';
import { getMainNavLinks } from '../../lib/nav';

interface VehicleOption {
  id: string;
  icon: string;
  image: string;
  seats: number;
  price: string;
}

const vehicles: VehicleOption[] = [
  { id: 'pullman', icon: '🚌', image: '/hero/hero-3.jpg', seats: 24, price: '€25' },
  { id: 'van', icon: '🚐', image: '/hero/hero-4.jpg', seats: 12, price: '€20' },
  { id: 'suv', icon: '🚙', image: '/hero/hero-5.jpg', seats: 4, price: '€20' },
  { id: 'limousine', icon: '🚘', image: '/hero/hero-6.jpg', seats: 4, price: '€35' }
];

const routeOptions = [
  'Aeroporto → Hotel',
  'Hotel → Mercato Vecchio',
  'Hotel → Soho Square',
  'Hotel → Farsha Case',
  'Hotel → Naama Bay'
];

const t: { [key in Lang]: { [key: string]: string } } = {
  en: {
    eyebrow: 'Rent Car',
    title: 'Private Transport Request',
    subtitle: 'Choose your vehicle and route — our team confirms availability and price within a few hours.',
    vehicleTitle: 'Vehicle', seatsLabel: 'seats', perPerson: '/ person',
    pullman: 'Private Coach', van: 'Private Minivan', suv: 'Private SUV', limousine: 'Private Limousine',
    pullmanDesc: 'Best for large groups — up to 24 people', vanDesc: 'Comfortable for mid-size groups — up to 12 people',
    suvDesc: 'Fast and private — up to 4 people', limousineDesc: 'Premium ride — up to 4 people',
    chooseVehicle: 'Select this vehicle', changeVehicle: 'Change vehicle',
    routeTitle: 'Route', routePlaceholder: 'Select a route',
    dateTitle: 'Date & Time', dateLabel: 'Date', timeLabel: 'Time',
    detailsTitle: 'Your Details', nameLabel: 'Full name', phoneLabel: 'Phone / WhatsApp', emailLabel: 'Email',
    passengersLabel: 'Passengers', notesLabel: 'Notes (optional)', notesPlaceholder: 'Number of bags, special requests...',
    submit: 'Send Request', submitting: 'Sending...',
    successTitle: 'Request sent!', successText: 'We received your request and will confirm availability shortly.',
    errorGeneric: 'Something went wrong. Please try again or contact us on WhatsApp.',
    note: 'No payment required now — this only requests availability and price.'
  },
  ar: {
    eyebrow: 'تأجير سيارات',
    title: 'طلب نقل خاص',
    subtitle: 'اختر السيارة والمسار — سيؤكد فريقنا التوفر والسعر خلال ساعات قليلة.',
    vehicleTitle: 'السيارة', seatsLabel: 'مقاعد', perPerson: '/ للشخص',
    pullman: 'باص خاص', van: 'ميني فان خاص', suv: 'SUV خاص', limousine: 'ليموزين خاصة',
    pullmanDesc: 'الأفضل للمجموعات الكبيرة — حتى 24 شخصًا', vanDesc: 'مريح للمجموعات المتوسطة — حتى 12 شخصًا',
    suvDesc: 'سريع وخاص — حتى 4 أشخاص', limousineDesc: 'رحلة فاخرة — حتى 4 أشخاص',
    chooseVehicle: 'اختر هذه السيارة', changeVehicle: 'تغيير السيارة',
    routeTitle: 'المسار', routePlaceholder: 'اختر مسارًا',
    dateTitle: 'التاريخ والوقت', dateLabel: 'التاريخ', timeLabel: 'الوقت',
    detailsTitle: 'بياناتك', nameLabel: 'الاسم الكامل', phoneLabel: 'الهاتف / واتساب', emailLabel: 'البريد الإلكتروني',
    passengersLabel: 'عدد الركاب', notesLabel: 'ملاحظات (اختياري)', notesPlaceholder: 'عدد الحقائب، طلبات خاصة...',
    submit: 'إرسال الطلب', submitting: 'جارٍ الإرسال...',
    successTitle: 'تم إرسال الطلب!', successText: 'استلمنا طلبك وسنؤكد التوفر قريبًا.',
    errorGeneric: 'حدث خطأ ما. يرجى المحاولة مرة أخرى أو التواصل معنا عبر واتساب.',
    note: 'لا يوجد دفع مطلوب الآن — هذا فقط طلب للتوفر والسعر.'
  },
  it: {
    eyebrow: 'Noleggio Auto',
    title: 'Richiesta Trasporto Privato',
    subtitle: 'Scegli veicolo e percorso — il nostro team conferma disponibilità e prezzo entro poche ore.',
    vehicleTitle: 'Veicolo', seatsLabel: 'posti', perPerson: '/ persona',
    pullman: 'Pullman Privato', van: 'Pulmino Privato', suv: 'SUV Privato', limousine: 'Limousine Privata',
    pullmanDesc: 'Ideale per gruppi numerosi — fino a 24 persone', vanDesc: 'Comodo per gruppi medi — fino a 12 persone',
    suvDesc: 'Veloce e privato — fino a 4 persone', limousineDesc: 'Viaggio premium — fino a 4 persone',
    chooseVehicle: 'Seleziona questo veicolo', changeVehicle: 'Cambia veicolo',
    routeTitle: 'Percorso', routePlaceholder: 'Seleziona un percorso',
    dateTitle: 'Data & Ora', dateLabel: 'Data', timeLabel: 'Ora',
    detailsTitle: 'I tuoi dati', nameLabel: 'Nome e cognome', phoneLabel: 'Telefono / WhatsApp', emailLabel: 'Email',
    passengersLabel: 'Passeggeri', notesLabel: 'Note (facoltativo)', notesPlaceholder: 'Numero bagagli, richieste particolari...',
    submit: 'Invia Richiesta', submitting: 'Invio in corso...',
    successTitle: 'Richiesta inviata!', successText: 'Abbiamo ricevuto la tua richiesta e confermeremo la disponibilità a breve.',
    errorGeneric: 'Qualcosa è andato storto. Riprova o scrivici su WhatsApp.',
    note: 'Nessun pagamento richiesto ora — questa è solo una richiesta di disponibilità e prezzo.'
  },
  ru: {
    eyebrow: 'Аренда авто',
    title: 'Запрос частного транспорта',
    subtitle: 'Выберите автомобиль и маршрут — наша команда подтвердит наличие и цену в течение нескольких часов.',
    vehicleTitle: 'Автомобиль', seatsLabel: 'мест', perPerson: '/ человек',
    pullman: 'Частный автобус', van: 'Частный минивэн', suv: 'Частный внедорожник', limousine: 'Частный лимузин',
    pullmanDesc: 'Лучше всего для больших групп — до 24 человек', vanDesc: 'Удобно для средних групп — до 12 человек',
    suvDesc: 'Быстро и приватно — до 4 человек', limousineDesc: 'Премиум-поездка — до 4 человек',
    chooseVehicle: 'Выбрать этот автомобиль', changeVehicle: 'Сменить автомобиль',
    routeTitle: 'Маршрут', routePlaceholder: 'Выберите маршрут',
    dateTitle: 'Дата и время', dateLabel: 'Дата', timeLabel: 'Время',
    detailsTitle: 'Ваши данные', nameLabel: 'Полное имя', phoneLabel: 'Телефон / WhatsApp', emailLabel: 'Email',
    passengersLabel: 'Пассажиры', notesLabel: 'Примечания (необязательно)', notesPlaceholder: 'Количество багажа, особые пожелания...',
    submit: 'Отправить запрос', submitting: 'Отправка...',
    successTitle: 'Запрос отправлен!', successText: 'Мы получили ваш запрос и скоро подтвердим наличие.',
    errorGeneric: 'Что-то пошло не так. Попробуйте снова или напишите нам в WhatsApp.',
    note: 'Оплата сейчас не требуется — это только запрос наличия и цены.'
  },
  de: {
    eyebrow: 'Autovermietung',
    title: 'Anfrage Privattransport',
    subtitle: 'Wähle Fahrzeug und Strecke — unser Team bestätigt Verfügbarkeit und Preis innerhalb weniger Stunden.',
    vehicleTitle: 'Fahrzeug', seatsLabel: 'Plätze', perPerson: '/ Person',
    pullman: 'Privater Reisebus', van: 'Privater Kleinbus', suv: 'Privater SUV', limousine: 'Private Limousine',
    pullmanDesc: 'Ideal für große Gruppen — bis zu 24 Personen', vanDesc: 'Bequem für mittelgroße Gruppen — bis zu 12 Personen',
    suvDesc: 'Schnell und privat — bis zu 4 Personen', limousineDesc: 'Premium-Fahrt — bis zu 4 Personen',
    chooseVehicle: 'Dieses Fahrzeug wählen', changeVehicle: 'Fahrzeug wechseln',
    routeTitle: 'Strecke', routePlaceholder: 'Strecke wählen',
    dateTitle: 'Datum & Uhrzeit', dateLabel: 'Datum', timeLabel: 'Uhrzeit',
    detailsTitle: 'Deine Daten', nameLabel: 'Vollständiger Name', phoneLabel: 'Telefon / WhatsApp', emailLabel: 'E-Mail',
    passengersLabel: 'Passagiere', notesLabel: 'Notizen (optional)', notesPlaceholder: 'Anzahl Gepäck, besondere Wünsche...',
    submit: 'Anfrage senden', submitting: 'Wird gesendet...',
    successTitle: 'Anfrage gesendet!', successText: 'Wir haben deine Anfrage erhalten und bestätigen die Verfügbarkeit in Kürze.',
    errorGeneric: 'Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreib uns auf WhatsApp.',
    note: 'Jetzt ist keine Zahlung erforderlich — dies ist nur eine Anfrage zu Verfügbarkeit und Preis.'
  }
};

export default function TransfersPage() {
  const [language, setLanguage] = useState<Lang>('en');
  const isRtl = language === 'ar';
  const tr = t[language];

  const [vehicle, setVehicle] = useState<string | null>(null);
  const [form, setForm] = useState({ route: '', date: '', time: '', name: '', phone: '', email: '', passengers: 1, notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const vehicleLabel: { [key: string]: string } = { pullman: tr.pullman, van: tr.van, suv: tr.suv, limousine: tr.limousine };
  const vehicleDesc: { [key: string]: string } = { pullman: tr.pullmanDesc, van: tr.vanDesc, suv: tr.suvDesc, limousine: tr.limousineDesc };
  const selected = vehicles.find((v) => v.id === vehicle);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicle || !selected) return;
    setSubmitting(true);
    setError('');

    const message = `Rent Car request\nVehicle: ${vehicleLabel[vehicle]} (${selected.price}${tr.perPerson})\nRoute: ${form.route || '-'}\nDate: ${form.date || '-'} ${form.time || ''}\nPassengers: ${form.passengers}\nNotes: ${form.notes || '-'}`;

    const { error: insertError } = await supabase.from('contact_messages').insert({
      full_name: form.name,
      phone: form.phone,
      email: form.email,
      message
    });

    setSubmitting(false);
    if (insertError) {
      setError(tr.errorGeneric);
      return;
    }

    fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject: 'Rent Car Request', name: form.name, phone: form.phone, email: form.email, message })
    }).catch(() => {});

    setSubmitted(true);
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-50">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        backHref="/"
        navLinks={getMainNavLinks(language)}
      />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#00a8cc] transition mb-3">
          ← Home
        </Link>
        <br />
        <span className="text-xs font-semibold uppercase tracking-wider text-[#00a8cc]">{tr.eyebrow}</span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0d1f2d] mt-2">{tr.title}</h1>
        <p className="text-gray-500 mt-2">{tr.subtitle}</p>

        {submitted ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center mt-6 max-w-2xl">
            <div className="text-4xl mb-3">✅</div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">{tr.successTitle}</h2>
            <p className="text-sm text-gray-500">{tr.successText}</p>
          </div>
        ) : (
          <>
            <h3 className="text-sm font-bold text-[#0d1f2d] mt-6 mb-3">{tr.vehicleTitle}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {vehicles.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVehicle(v.id)}
                  className={`rounded-2xl overflow-hidden border-2 text-left bg-white shadow-sm hover:shadow-lg transition ${
                    vehicle === v.id ? 'border-[#00a8cc]' : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <div className="relative h-24 sm:h-28 bg-gray-50 flex items-center justify-center">
                    <span className="text-4xl">{v.icon}</span>
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-bold text-gray-900">{vehicleLabel[v.id]}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{vehicleDesc[v.id]}</p>
                    <p className="text-[11px] font-semibold text-[#00a8cc] mt-1">{v.price}{tr.perPerson}</p>
                  </div>
                </button>
              ))}
            </div>

            {vehicle && selected && (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-[#0d1f2d]">{vehicleLabel[vehicle]}</span> · {selected.seats} {tr.seatsLabel} · {selected.price}{tr.perPerson}
              </p>
              <button type="button" onClick={() => setVehicle(null)} className="text-xs text-[#00a8cc] font-semibold hover:underline">
                {tr.changeVehicle}
              </button>
            </div>

            <h3 className="text-sm font-bold text-[#0d1f2d] mb-2">{tr.routeTitle}</h3>
            <select
              value={form.route}
              onChange={(e) => setForm({ ...form, route: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none mb-6"
            >
              <option value="">{tr.routePlaceholder}</option>
              {routeOptions.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <h3 className="text-sm font-bold text-[#0d1f2d] mb-2">{tr.dateTitle}</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div>
                <label className="block text-xs text-gray-500 mb-1">{tr.dateLabel}</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{tr.timeLabel}</label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none"
                />
              </div>
            </div>

            <h3 className="text-sm font-bold text-[#0d1f2d] mb-2">{tr.detailsTitle}</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                required
                placeholder={tr.nameLabel}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="col-span-2 sm:col-span-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none"
              />
              <input
                required
                placeholder={tr.phoneLabel}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="col-span-2 sm:col-span-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none"
              />
              <input
                required
                type="email"
                placeholder={tr.emailLabel}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none"
              />
              <input
                type="number"
                min={1}
                max={selected.seats}
                placeholder={tr.passengersLabel}
                value={form.passengers}
                onChange={(e) => setForm({ ...form, passengers: Math.max(1, Number(e.target.value) || 1) })}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none"
              />
            </div>
            <textarea
              placeholder={tr.notesPlaceholder}
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none resize-none mb-4"
            />

            {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#ffa500] text-white font-bold py-3 rounded-full hover:bg-[#e69400] disabled:opacity-50 transition"
            >
              {submitting ? tr.submitting : tr.submit}
            </button>
            <p className="text-xs text-gray-400 mt-3 text-center">{tr.note}</p>
          </form>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
