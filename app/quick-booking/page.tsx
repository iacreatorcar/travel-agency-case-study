'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../vetrina/Header';
import Footer from '../vetrina/Footer';
import { Lang } from '../../lib/tours';
import { getMainNavLinks } from '../../lib/nav';
import { generateBookingPDF } from '../../lib/booking-pdf';

const t: { [key in Lang]: { [key: string]: string } } = {
  en: {
    breadcrumb: 'Quick Booking',
    title: 'Quick Booking',
    subtitle: 'Submit your request — it will be sent to Email + WhatsApp.',
    tabFlights: 'Flights',
    tabHotels: 'Hotels',
    tabVisas: 'Visas',
    tabPackages: 'Packages',
    from: 'From', to: 'To', departure: 'Departure', returnDate: 'Return Date',
    roundTrip: 'Round Trip', oneWay: 'One Way', multiCity: 'Multi-city',
    adults: 'Adults', children: 'Children', infants: 'Infants',
    class: 'Class', economy: 'Economy', business: 'Business', first: 'First',
    checkIn: 'Check-in', checkOut: 'Check-out', guests: 'Guests',
    visaCountry: 'Country', visaType: 'Visa Type',
    fullName: 'Full Name', whatsapp: 'WhatsApp', email: 'Email (optional)',
    notes: 'Notes',
    submit: 'Send Request',
    success: 'Request sent! Check WhatsApp.',
    error: 'Error. Try again.',
    home: 'Home',
    flightHeading: '✈️ Flight Ticket Request', flightSubheading: "Tell us your flight preferences and we'll send options",
    cityOrAirport: 'City or airport', addFlight: '+ Add Flight',
    hotelHeading: '🏨 Hotel Request', hotelSubheading: 'Find the perfect accommodation for your stay',
    cityDestination: 'City / Destination', rooms: 'Rooms', hotelLevel: 'Hotel Level',
    any: 'Any', star3: '3 Star', star4: '4 Star', star5: '5 Star',
    visaHeading: '📋 Visa Request', visaSubheading: 'Get assistance with your visa application',
    destinationCountry: 'Destination Country', nationality: 'Nationality', travelDate: 'Travel Date',
    packagesHeading: '🌍 Travel Program Request', packagesSubheading: 'Design your custom travel package',
    destination: 'Destination', fromDate: 'From Date', toDate: 'To Date', budget: 'Budget (optional)',
    notesFlights: 'Preferred airline / seat preference...', notesHotels: 'Preferred area / budget / hotel name...',
    notesVisas: 'Residency / visa type / urgency...', notesPackages: 'Include flights? cities? preferences...'
  },
  it: {
    breadcrumb: 'Prenotazione Veloce',
    title: 'Prenotazione Veloce',
    subtitle: 'Invia la tua richiesta — verrà inviata a Email + WhatsApp.',
    tabFlights: 'Voli', tabHotels: 'Hotel', tabVisas: 'Visti', tabPackages: 'Pacchetti',
    from: 'Da', to: 'A', departure: 'Partenza', returnDate: 'Data di ritorno',
    roundTrip: 'Andata e ritorno', oneWay: 'Solo andata', multiCity: 'Più città',
    adults: 'Adulti', children: 'Bambini', infants: 'Neonati',
    class: 'Classe', economy: 'Economia', business: 'Business', first: 'Prima',
    checkIn: 'Check-in', checkOut: 'Check-out', guests: 'Ospiti',
    visaCountry: 'Paese', visaType: 'Tipo Visto',
    fullName: 'Nome Completo', whatsapp: 'WhatsApp', email: 'Email (facoltativa)',
    notes: 'Note',
    submit: 'Invia Richiesta',
    success: 'Richiesta inviata! Controlla WhatsApp.',
    error: 'Errore. Riprova.',
    home: 'Home',
    flightHeading: '✈️ Richiesta Biglietto Aereo', flightSubheading: 'Raccontaci le tue preferenze di volo e ti invieremo le opzioni',
    cityOrAirport: 'Città o aeroporto', addFlight: '+ Aggiungi Volo',
    hotelHeading: '🏨 Richiesta Hotel', hotelSubheading: 'Trova la sistemazione perfetta per il tuo soggiorno',
    cityDestination: 'Città / Destinazione', rooms: 'Camere', hotelLevel: 'Livello Hotel',
    any: 'Qualsiasi', star3: '3 Stelle', star4: '4 Stelle', star5: '5 Stelle',
    visaHeading: '📋 Richiesta Visto', visaSubheading: 'Ricevi assistenza per la tua richiesta di visto',
    destinationCountry: 'Paese di Destinazione', nationality: 'Nazionalità', travelDate: 'Data di Viaggio',
    packagesHeading: '🌍 Richiesta Programma di Viaggio', packagesSubheading: 'Componi il tuo pacchetto di viaggio su misura',
    destination: 'Destinazione', fromDate: 'Data Inizio', toDate: 'Data Fine', budget: 'Budget (facoltativo)',
    notesFlights: 'Compagnia aerea preferita / preferenza posto...', notesHotels: 'Zona preferita / budget / nome hotel...',
    notesVisas: 'Residenza / tipo di visto / urgenza...', notesPackages: 'Includere voli? città? preferenze...'
  },
  ru: {
    breadcrumb: 'Быстрое бронирование',
    title: 'Быстрое бронирование',
    subtitle: 'Отправьте запрос — он будет отправлен на Email + WhatsApp.',
    tabFlights: 'Рейсы', tabHotels: 'Отели', tabVisas: 'Визы', tabPackages: 'Пакеты',
    from: 'Из', to: 'В', departure: 'Вылет', returnDate: 'Дата возврата',
    roundTrip: 'Туда-обратно', oneWay: 'В одну сторону', multiCity: 'Несколько городов',
    adults: 'Взрослые', children: 'Дети', infants: 'Младенцы',
    class: 'Класс', economy: 'Эконом', business: 'Бизнес', first: 'Первый',
    checkIn: 'Заезд', checkOut: 'Выезд', guests: 'Гости',
    visaCountry: 'Страна', visaType: 'Тип визы',
    fullName: 'Полное имя', whatsapp: 'WhatsApp', email: 'Email (опционально)',
    notes: 'Примечания',
    submit: 'Отправить запрос',
    success: 'Запрос отправлен! Проверьте WhatsApp.',
    error: 'Ошибка. Попробуйте снова.',
    home: 'Главная',
    flightHeading: '✈️ Запрос на авиабилет', flightSubheading: 'Расскажите нам о предпочтениях по рейсу, и мы пришлём варианты',
    cityOrAirport: 'Город или аэропорт', addFlight: '+ Добавить рейс',
    hotelHeading: '🏨 Запрос на отель', hotelSubheading: 'Найдите идеальное размещение для вашего отдыха',
    cityDestination: 'Город / Направление', rooms: 'Номера', hotelLevel: 'Категория отеля',
    any: 'Любая', star3: '3 звезды', star4: '4 звезды', star5: '5 звёзд',
    visaHeading: '📋 Запрос на визу', visaSubheading: 'Получите помощь с оформлением визы',
    destinationCountry: 'Страна назначения', nationality: 'Гражданство', travelDate: 'Дата поездки',
    packagesHeading: '🌍 Запрос на туристическую программу', packagesSubheading: 'Составьте свой индивидуальный тур',
    destination: 'Направление', fromDate: 'Дата начала', toDate: 'Дата окончания', budget: 'Бюджет (по желанию)',
    notesFlights: 'Предпочтительная авиакомпания / место...', notesHotels: 'Предпочтительный район / бюджет / название отеля...',
    notesVisas: 'Резидентство / тип визы / срочность...', notesPackages: 'Включить перелёты? города? пожелания...'
  },
  de: {
    breadcrumb: 'Schnellbuchung',
    title: 'Schnellbuchung',
    subtitle: 'Sende deine Anfrage — sie wird an Email + WhatsApp gesendet.',
    tabFlights: 'Flüge', tabHotels: 'Hotels', tabVisas: 'Visa', tabPackages: 'Pakete',
    from: 'Von', to: 'Nach', departure: 'Abflug', returnDate: 'Rückflug',
    roundTrip: 'Hin- und Rückflug', oneWay: 'Einfacher Flug', multiCity: 'Mehrere Städte',
    adults: 'Erwachsene', children: 'Kinder', infants: 'Kleinkinder',
    class: 'Klasse', economy: 'Economy', business: 'Business', first: 'First',
    checkIn: 'Anreise', checkOut: 'Abreise', guests: 'Gäste',
    visaCountry: 'Land', visaType: 'Visatyp',
    fullName: 'Vollständiger Name', whatsapp: 'WhatsApp', email: 'Email (optional)',
    notes: 'Notizen',
    submit: 'Anfrage senden',
    success: 'Anfrage gesendet! Überprüfe WhatsApp.',
    error: 'Fehler. Versuche es erneut.',
    home: 'Startseite',
    flightHeading: '✈️ Fluganfrage', flightSubheading: 'Teile uns deine Flugpräferenzen mit und wir senden dir Optionen',
    cityOrAirport: 'Stadt oder Flughafen', addFlight: '+ Flug Hinzufügen',
    hotelHeading: '🏨 Hotelanfrage', hotelSubheading: 'Finde die perfekte Unterkunft für deinen Aufenthalt',
    cityDestination: 'Stadt / Reiseziel', rooms: 'Zimmer', hotelLevel: 'Hotelkategorie',
    any: 'Beliebig', star3: '3 Sterne', star4: '4 Sterne', star5: '5 Sterne',
    visaHeading: '📋 Visumanfrage', visaSubheading: 'Erhalte Unterstützung bei deinem Visumantrag',
    destinationCountry: 'Zielland', nationality: 'Staatsangehörigkeit', travelDate: 'Reisedatum',
    packagesHeading: '🌍 Reiseprogramm-Anfrage', packagesSubheading: 'Gestalte dein individuelles Reisepaket',
    destination: 'Reiseziel', fromDate: 'Von Datum', toDate: 'Bis Datum', budget: 'Budget (optional)',
    notesFlights: 'Bevorzugte Fluggesellschaft / Sitzplatzwunsch...', notesHotels: 'Bevorzugte Gegend / Budget / Hotelname...',
    notesVisas: 'Wohnsitz / Visumtyp / Dringlichkeit...', notesPackages: 'Flüge einschließen? Städte? Präferenzen...'
  }
};

type Tab = 'flights' | 'hotels' | 'visas' | 'packages';

export default function QuickBookingPage() {
  const [language, setLanguage] = useState<Lang>('en');
  const [tab, setTab] = useState<Tab>('flights');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '', whatsapp: '', email: '', notes: '',
    // Flights
    from: '', to: '', departure: '', returnDate: '', tripType: 'roundTrip' as 'roundTrip' | 'oneWay' | 'multiCity',
    adults: 1, children: 0, infants: 0, class: 'economy' as 'economy' | 'business' | 'first',
    // Hotels
    checkIn: '', checkOut: '', guests: 1,
    // Visas
    visaCountry: '', visaType: ''
  });

  const tr = t[language];

  const tabLabels: { [key in Tab]: string } = {
    flights: tr.tabFlights, hotels: tr.tabHotels, visas: tr.tabVisas, packages: tr.tabPackages
  };

  const buildDetails = (): { label: string; value: string }[] => {
    if (tab === 'flights') {
      return [
        { label: tr.from, value: form.from },
        { label: tr.to, value: form.to },
        { label: tr.departure, value: form.departure },
        { label: tr.returnDate, value: form.returnDate || '-' },
        { label: tr.adults, value: String(form.adults) },
        { label: tr.children, value: String(form.children) },
        { label: tr.class, value: form.class }
      ];
    }
    if (tab === 'hotels') {
      return [
        { label: tr.checkIn, value: form.checkIn },
        { label: tr.checkOut, value: form.checkOut },
        { label: tr.guests, value: String(form.guests) }
      ];
    }
    if (tab === 'visas') {
      return [
        { label: tr.visaCountry, value: form.visaCountry },
        { label: tr.visaType, value: form.visaType }
      ];
    }
    return [];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const details = buildDetails();

    const doc = await generateBookingPDF({
      requestType: tabLabels[tab],
      customerName: form.name,
      phone: form.whatsapp,
      email: form.email,
      notes: form.notes,
      details
    });
    doc.save(`richiesta-voyaratravel-${Date.now()}.pdf`);

    const summary = details.map((d) => `${d.label}: ${d.value}`).join('\n');
    const waText = encodeURIComponent(
      `Ciao! Nuova richiesta ${tabLabels[tab]}.\n\nNome: ${form.name}\nTelefono: ${form.whatsapp}\nEmail: ${form.email || '-'}\n\n${summary}${form.notes ? `\nNote: ${form.notes}` : ''}`
    );
    window.open(`https://wa.me/000000000000?text=${waText}`, '_blank');

    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div dir="ltr" className="min-h-screen bg-gray-100">
      <Header language={language} onLanguageChange={setLanguage} navLinks={getMainNavLinks(language)} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:underline">{tr.home}</Link> <span className="mx-2">›</span> {tr.breadcrumb}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{tr.title}</h1>
          <p className="text-gray-600 mb-8">{tr.subtitle}</p>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-gray-200">
            {(['flights', 'hotels', 'visas', 'packages'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-3 font-semibold border-b-2 transition ${
                  tab === t
                    ? 'border-[#00a8cc] text-[#00a8cc]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tr[`tab${t.charAt(0).toUpperCase() + t.slice(1)}` as keyof typeof tr]}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Flights Tab */}
            {tab === 'flights' && (
              <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{tr.flightHeading}</h3>
                  <p className="text-sm text-gray-500 mb-4">{tr.flightSubheading}</p>

                  <div className="flex gap-3 mb-6">
                    {(['roundTrip', 'oneWay', 'multiCity'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setForm({ ...form, tripType: type })}
                        className={`px-4 py-2 rounded-full font-semibold transition ${
                          form.tripType === type
                            ? 'bg-[#5e5ce6] text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {tr[type as keyof typeof tr]}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.from}</label>
                      <input type="text" placeholder={tr.cityOrAirport} value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.to}</label>
                      <input type="text" placeholder={tr.cityOrAirport} value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.departure}</label>
                      <input type="date" value={form.departure} onChange={(e) => setForm({ ...form, departure: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                    </div>
                  </div>

                  {form.tripType !== 'oneWay' && (
                    <div className="mb-4">
                      <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.returnDate}</label>
                      <input type="date" value={form.returnDate} onChange={(e) => setForm({ ...form, returnDate: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                    </div>
                  )}

                  <button type="button" className="text-[#5e5ce6] font-bold text-sm mb-6 hover:underline">{tr.addFlight}</button>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.adults}</label>
                      <input type="number" min={1} value={form.adults} onChange={(e) => setForm({ ...form, adults: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.children}</label>
                      <input type="number" min={0} value={form.children} onChange={(e) => setForm({ ...form, children: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.infants}</label>
                      <input type="number" min={0} value={form.infants} onChange={(e) => setForm({ ...form, infants: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.class}</label>
                      <select value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value as typeof form.class })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white">
                        <option value="economy">{tr.economy}</option>
                        <option value="business">{tr.business}</option>
                        <option value="first">{tr.first}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hotels Tab */}
            {tab === 'hotels' && (
              <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{tr.hotelHeading}</h3>
                  <p className="text-sm text-gray-500 mb-4">{tr.hotelSubheading}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.cityDestination}</label>
                    <input type="text" placeholder="Sharm, Cairo, Dubai..." value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.checkIn}</label>
                    <input type="date" value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.checkOut}</label>
                    <input type="date" value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.rooms}</label>
                    <input type="number" min={1} value={1} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.adults}</label>
                    <input type="number" min={1} value={form.guests} onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.children}</label>
                    <input type="number" min={0} value={form.children} onChange={(e) => setForm({ ...form, children: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.hotelLevel}</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white">
                      <option>{tr.any}</option>
                      <option>{tr.star3}</option>
                      <option>{tr.star4}</option>
                      <option>{tr.star5}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Visas Tab */}
            {tab === 'visas' && (
              <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{tr.visaHeading}</h3>
                  <p className="text-sm text-gray-500 mb-4">{tr.visaSubheading}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.destinationCountry}</label>
                    <input type="text" placeholder="UAE, Saudi, Schengen..." value={form.visaCountry} onChange={(e) => setForm({ ...form, visaCountry: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.nationality}</label>
                    <input type="text" placeholder="Egyptian, Saudi..." value={form.visaType} onChange={(e) => setForm({ ...form, visaType: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.travelDate}</label>
                    <input type="date" value={form.departure} onChange={(e) => setForm({ ...form, departure: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                  </div>
                </div>
              </div>
            )}

            {/* Packages Tab */}
            {tab === 'packages' && (
              <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{tr.packagesHeading}</h3>
                  <p className="text-sm text-gray-500 mb-4">{tr.packagesSubheading}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.destination}</label>
                    <input type="text" placeholder="Turkey, UAE, Thailand..." value={form.visaCountry} onChange={(e) => setForm({ ...form, visaCountry: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.fromDate}</label>
                    <input type="date" value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.toDate}</label>
                    <input type="date" value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.adults}</label>
                    <input type="number" min={1} value={form.adults} onChange={(e) => setForm({ ...form, adults: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.children}</label>
                    <input type="number" min={0} value={form.children} onChange={(e) => setForm({ ...form, children: Number(e.target.value) })} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.hotelLevel}</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white">
                      <option>{tr.any}</option>
                      <option>{tr.star3}</option>
                      <option>{tr.star4}</option>
                      <option>{tr.star5}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.budget}</label>
                    <input type="text" placeholder="EGP / USD / AED" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
                  </div>
                </div>
              </div>
            )}

            {/* Common Fields */}
            <div className="grid grid-cols-3 gap-4">
              <input required type="text" placeholder={tr.fullName} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
              <input required type="text" placeholder={tr.whatsapp} value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
              <input type="email" placeholder={tr.email} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white" />
            </div>

            <div>
              <label className="block text-xs text-gray-600 font-semibold mb-2">{tr.notes}</label>
              <textarea placeholder={tab === 'flights' ? tr.notesFlights : tab === 'hotels' ? tr.notesHotels : tab === 'visas' ? tr.notesVisas : tr.notesPackages} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-900 outline-none focus:border-[#5e5ce6] focus:bg-white resize-none" />
            </div>

            <button type="submit" disabled={submitting} className="w-full bg-[#00a8cc] text-white font-bold py-3 rounded-full hover:bg-[#007399] disabled:opacity-50 transition">
              {submitting ? '...' : tr.submit}
            </button>

            {submitted && <div className="bg-green-50 text-green-700 p-4 rounded-lg text-center font-semibold">{tr.success}</div>}
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
