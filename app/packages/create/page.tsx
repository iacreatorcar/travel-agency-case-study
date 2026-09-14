'use client';

import { useState } from 'react';
import Link from 'next/link';
import { tours } from '../../../lib/tours';
import { generateQuotePDF } from '../../../lib/pdf-quote';
import { GOOGLE_REVIEW_LINK } from '../../../lib/google-review';
import { supabase } from '../../../lib/supabase';
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

const steps = [
  { n: 1, label: 'Escursioni' },
  { n: 2, label: 'Dati Viaggio' },
  { n: 3, label: 'Riepilogo' }
];

export default function CreatePackagePage() {
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

  const activeTours = tours.filter((t) => t.active !== false);
  const selectedTours = activeTours.filter((t) => selected.has(t.slug));

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
    return d.toLocaleString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const waMessage = encodeURIComponent(
    `Ciao! Vorrei creare un pacchetto su misura.\n\nEscursioni:\n${selectedTours.map((t) => `- ${t.title.it}`).join('\n')}\n\nNome: ${form.name}\nTelefono: ${form.phone}\nEmail: ${form.email || '-'}\nStruttura: ${form.hotel || '-'}\nArrivo: ${formatDateTime(form.arrival)}\nPartenza: ${formatDateTime(form.departure)}\nAdulti: ${form.adults}, Bambini: ${form.kids0to2 + form.kids2to5 + form.kids5to10}\nNote: ${form.notes || '-'}`
  );

  const handleConfirm = async () => {
    setSubmitting(true);
    await supabase.from('package_bookings').insert({
      customer_name: form.name,
      customer_email: form.email || null,
      package_slug: 'custom-package',
      details: {
        tours: selectedTours.map((t) => t.slug),
        phone: form.phone,
        hotel: form.hotel,
        arrival: form.arrival,
        departure: form.departure,
        adults: form.adults,
        kids0to2: form.kids0to2,
        kids2to5: form.kids2to5,
        kids5to10: form.kids5to10,
        notes: form.notes
      }
    });
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
      tours: selectedTours.map((t) => ({ name: t.title.it, duration: t.duration.it }))
    });
    doc.save(`preventivo-voyaratravel-${Date.now()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header language="it" onLanguageChange={() => {}} navLinks={getMainNavLinks('it')} />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <p className="text-[#ffa500] text-xs font-bold uppercase tracking-wider mb-2">Su Misura per Te</p>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 uppercase">Crea il Tuo Pacchetto</h1>
          <p className="text-gray-500 text-sm mt-2">Tre semplici step: scegli le escursioni, inserisci le date e ricevi il preventivo su WhatsApp.</p>
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
            <h2 className="text-lg font-black text-gray-900 uppercase mb-1">Scegli le Escursioni</h2>
            <p className="text-gray-500 text-sm mb-5">Selezionane quante ne vuoi.</p>
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
                    <p className="font-bold text-gray-900 text-sm truncate">{tour.title.it}</p>
                    <p className="text-gray-500 text-xs">{tour.duration.it}</p>
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
                ← Indietro
              </Link>
              <button
                type="button"
                disabled={selected.size === 0}
                onClick={() => setStep(2)}
                className="bg-[#ffa500] text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-[#e69400] transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continua →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: FORM */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-black text-gray-900 uppercase mb-1">I Tuoi Dati</h2>
            <p className="text-gray-500 text-sm mb-5">Ci servono per organizzare al meglio il tuo pacchetto.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">👤 Nome e Cognome *</label>
                <input
                  required
                  placeholder="Mario Rossi"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">📱 Telefono / WhatsApp *</label>
                <input
                  required
                  type="tel"
                  placeholder="+39 333 1234567"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">✉️ Email</label>
                <input
                  type="email"
                  placeholder="mario.rossi@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">🏨 Nome struttura</label>
                <input
                  placeholder="Hotel dove alloggi"
                  value={form.hotel}
                  onChange={(e) => setForm({ ...form, hotel: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">✈️ Data e ora di arrivo *</label>
                <input
                  required
                  type="datetime-local"
                  value={form.arrival}
                  onChange={(e) => setForm({ ...form, arrival: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">🛫 Data e ora di partenza *</label>
                <input
                  required
                  type="datetime-local"
                  value={form.departure}
                  onChange={(e) => setForm({ ...form, departure: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">🧑 Adulti (10+ anni) *</label>
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
                <label className="block text-xs font-semibold text-gray-600 mb-1">👶 Bambini 0-2 anni</label>
                <input
                  type="number"
                  min={0}
                  value={form.kids0to2}
                  onChange={(e) => setForm({ ...form, kids0to2: Number(e.target.value) })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">🧒 Bambini 2-5 anni</label>
                <input
                  type="number"
                  min={0}
                  value={form.kids2to5}
                  onChange={(e) => setForm({ ...form, kids2to5: Number(e.target.value) })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">🧒 Bambini 5-10 anni</label>
                <input
                  type="number"
                  min={0}
                  value={form.kids5to10}
                  onChange={(e) => setForm({ ...form, kids5to10: Number(e.target.value) })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">📝 Note (opzionale)</label>
                <textarea
                  rows={3}
                  placeholder="Esigenze particolari, allergie, richieste..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-[#ffa500]"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(1)} className="border border-gray-200 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-full hover:border-gray-300 transition">
                ← Indietro
              </button>
              <button
                type="button"
                disabled={!form.name || !form.phone || !form.arrival || !form.departure}
                onClick={() => setStep(3)}
                className="bg-[#ffa500] text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-[#e69400] transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continua →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: RIEPILOGO */}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-black text-gray-900 uppercase mb-4">Riepilogo</h2>
            <div className="border border-gray-200 rounded-2xl p-6 mb-6">
              <p className="text-xs font-black text-gray-900 uppercase mb-3">Escursioni Scelte ({selectedTours.length})</p>
              <ul className="space-y-1.5 mb-5">
                {selectedTours.map((t) => (
                  <li key={t.slug} className="flex items-start gap-2 text-sm text-gray-700">
                    <span>{tourIcons[t.slug] ?? '📍'}</span>
                    <span className="font-semibold">{t.title.it}</span> — {t.duration.it}
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Nome</p>
                  <p className="text-gray-900">{form.name}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Telefono</p>
                  <p className="text-gray-900">{form.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Email</p>
                  <p className="text-gray-900">{form.email || '-'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Struttura</p>
                  <p className="text-gray-900">{form.hotel || '-'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Arrivo</p>
                  <p className="text-gray-900">{form.arrival.replace('T', ' ')}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Partenza</p>
                  <p className="text-gray-900">{form.departure.replace('T', ' ')}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Adulti</p>
                  <p className="text-gray-900">{form.adults}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Bambini</p>
                  <p className="text-gray-900">{form.kids0to2 + form.kids2to5 + form.kids5to10}</p>
                </div>
              </div>

              {submitted ? (
                <div className="mt-4 space-y-2">
                  <p className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-sm font-semibold text-center">
                    Richiesta inviata! Controlla WhatsApp.
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
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold py-3 rounded-full hover:border-[#00a8cc] transition"
                  >
                    📄 Scarica PDF
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={submitting}
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-full hover:bg-[#1ebe57] transition disabled:opacity-60"
                  >
                    💬 {submitting ? 'Invio...' : 'Prenota ora'}
                  </button>
                </div>
              )}
              <p className="text-gray-400 text-[11px] text-center mt-2">
                🔒 I tuoi dati saranno usati solo per gestire la prenotazione. Inviando accetti di essere contattato via WhatsApp.
              </p>
            </div>
            <button type="button" onClick={() => setStep(2)} className="border border-gray-200 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-full hover:border-gray-300 transition">
              ← Indietro
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
