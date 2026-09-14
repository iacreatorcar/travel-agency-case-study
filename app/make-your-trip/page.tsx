'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import { Lang } from '../../lib/tours';
import Header from '../vetrina/Header';
import Footer from '../vetrina/Footer';
import { getMainNavLinks } from '../../lib/nav';

type WhenOption = 'exact' | 'approx' | 'unsure';
type Step = 1 | 2 | 3;

const t: { [key in Lang]: { [key: string]: string } } = {
  en: {
    breadcrumb: 'Make Your Trip', title: 'Make Your Trip',
    step1: 'Quick information', step2: 'Personal information', step3: 'Confirmation',
    whenTraveling: 'When will you be traveling?', exact: 'Have An Exact Time', approx: 'Have An Approximate Time', unsure: 'Not Sure Yet',
    from: 'From', to: 'To', nextUp: 'Next up →', back: '← Back',
    fullName: 'Full Name', email: 'Email', phone: 'Phone', notes: 'Notes',
    reviewTitle: 'Review your request',
    whenLabel: 'When:', fromLabel: 'From:', toLabel: 'To:', nameLabel: 'Name:', emailLabel: 'Email:', phoneLabel: 'Phone:', notesLabel: 'Notes:',
    submitRequest: 'Submit Request', submitting: '...',
    sentTitle: 'Request sent!', sentText: 'Our team will contact you shortly to plan your trip.', backHome: 'Back to Home',
    whenExact: 'Exact time', whenApprox: 'Approximate time', whenUnsure: 'Not sure yet', dash: '—'
  },
  ar: {
    breadcrumb: 'خطط رحلتك', title: 'خطط رحلتك',
    step1: 'معلومات سريعة', step2: 'معلومات شخصية', step3: 'التأكيد',
    whenTraveling: 'متى ستسافر؟', exact: 'لدي وقت محدد', approx: 'لدي وقت تقريبي', unsure: 'غير متأكد بعد',
    from: 'من', to: 'إلى', nextUp: 'التالي ←', back: '→ رجوع',
    fullName: 'الاسم الكامل', email: 'البريد الإلكتروني', phone: 'الهاتف', notes: 'ملاحظات',
    reviewTitle: 'راجع طلبك',
    whenLabel: 'الموعد:', fromLabel: 'من:', toLabel: 'إلى:', nameLabel: 'الاسم:', emailLabel: 'البريد:', phoneLabel: 'الهاتف:', notesLabel: 'ملاحظات:',
    submitRequest: 'إرسال الطلب', submitting: '...',
    sentTitle: 'تم إرسال الطلب!', sentText: 'سيتواصل معك فريقنا قريبًا لتخطيط رحلتك.', backHome: 'العودة للرئيسية',
    whenExact: 'وقت محدد', whenApprox: 'وقت تقريبي', whenUnsure: 'غير متأكد بعد', dash: '—'
  },
  it: {
    breadcrumb: 'Crea il Tuo Viaggio', title: 'Crea il Tuo Viaggio',
    step1: 'Informazioni rapide', step2: 'Informazioni personali', step3: 'Conferma',
    whenTraveling: 'Quando vuoi viaggiare?', exact: 'Ho una Data Precisa', approx: 'Ho una Data Approssimativa', unsure: 'Non Sono Sicuro',
    from: 'Dal', to: 'Al', nextUp: 'Avanti →', back: '← Indietro',
    fullName: 'Nome e Cognome', email: 'Email', phone: 'Telefono', notes: 'Note',
    reviewTitle: 'Rivedi la tua richiesta',
    whenLabel: 'Quando:', fromLabel: 'Dal:', toLabel: 'Al:', nameLabel: 'Nome:', emailLabel: 'Email:', phoneLabel: 'Telefono:', notesLabel: 'Note:',
    submitRequest: 'Invia Richiesta', submitting: '...',
    sentTitle: 'Richiesta inviata!', sentText: 'Il nostro team ti contatterà a breve per pianificare il tuo viaggio.', backHome: 'Torna alla Home',
    whenExact: 'Data precisa', whenApprox: 'Data approssimativa', whenUnsure: 'Non sono sicuro', dash: '—'
  },
  ru: {
    breadcrumb: 'Спланировать поездку', title: 'Спланировать поездку',
    step1: 'Краткая информация', step2: 'Личные данные', step3: 'Подтверждение',
    whenTraveling: 'Когда вы планируете поездку?', exact: 'Точная дата', approx: 'Примерная дата', unsure: 'Пока не уверен',
    from: 'С', to: 'По', nextUp: 'Далее →', back: '← Назад',
    fullName: 'Полное имя', email: 'Email', phone: 'Телефон', notes: 'Примечания',
    reviewTitle: 'Проверьте ваш запрос',
    whenLabel: 'Когда:', fromLabel: 'С:', toLabel: 'По:', nameLabel: 'Имя:', emailLabel: 'Email:', phoneLabel: 'Телефон:', notesLabel: 'Примечания:',
    submitRequest: 'Отправить запрос', submitting: '...',
    sentTitle: 'Запрос отправлен!', sentText: 'Наша команда скоро свяжется с вами, чтобы спланировать поездку.', backHome: 'На главную',
    whenExact: 'Точная дата', whenApprox: 'Примерная дата', whenUnsure: 'Пока не уверен', dash: '—'
  },
  de: {
    breadcrumb: 'Reise Zusammenstellen', title: 'Reise Zusammenstellen',
    step1: 'Kurzinformationen', step2: 'Persönliche Angaben', step3: 'Bestätigung',
    whenTraveling: 'Wann möchtest du reisen?', exact: 'Genauer Zeitpunkt', approx: 'Ungefährer Zeitpunkt', unsure: 'Noch Unsicher',
    from: 'Von', to: 'Bis', nextUp: 'Weiter →', back: '← Zurück',
    fullName: 'Vollständiger Name', email: 'E-Mail', phone: 'Telefon', notes: 'Notizen',
    reviewTitle: 'Überprüfe deine Anfrage',
    whenLabel: 'Wann:', fromLabel: 'Von:', toLabel: 'Bis:', nameLabel: 'Name:', emailLabel: 'E-Mail:', phoneLabel: 'Telefon:', notesLabel: 'Notizen:',
    submitRequest: 'Anfrage senden', submitting: '...',
    sentTitle: 'Anfrage gesendet!', sentText: 'Unser Team meldet sich in Kürze bei dir, um deine Reise zu planen.', backHome: 'Zurück zur Startseite',
    whenExact: 'Genauer Zeitpunkt', whenApprox: 'Ungefährer Zeitpunkt', whenUnsure: 'Noch unsicher', dash: '—'
  }
};

export default function MakeYourTripPage() {
  const [language, setLanguage] = useState<Lang>('en');
  const isRtl = language === 'ar';
  const tr = t[language];

  const steps: { id: Step; label: string }[] = [
    { id: 1, label: tr.step1 },
    { id: 2, label: tr.step2 },
    { id: 3, label: tr.step3 }
  ];

  const [step, setStep] = useState<Step>(1);
  const [whenOption, setWhenOption] = useState<WhenOption>('exact');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const whenLabelMap: { [key in WhenOption]: string } = { exact: tr.whenExact, approx: tr.whenApprox, unsure: tr.whenUnsure };

  const goNext = () => setStep((s) => (s < 3 ? ((s + 1) as Step) : s));
  const goBack = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    const { error: insertError } = await supabase.from('trip_requests').insert({
      when_option: whenOption,
      from_date: fromDate || null,
      to_date: toDate || null,
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      notes
    });
    setSubmitting(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }

    fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: 'Make Your Trip Request',
        name,
        phone,
        email,
        message: `When: ${whenLabelMap[whenOption]}\nFrom: ${fromDate || '-'}\nTo: ${toDate || '-'}\nNotes: ${notes || '-'}`
      })
    }).catch(() => {});

    setSubmitted(true);
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-100">
      <Header language={language} onLanguageChange={setLanguage} backHref="/" navLinks={getMainNavLinks(language)} />

      <div className="max-w-5xl mx-auto px-4 py-4 text-sm text-gray-500">
        <Link href="/" className="hover:underline">Home</Link> <span className="mx-1">›</span> {tr.breadcrumb}
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-16">
        {/* Header card */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/" className="text-gray-400 hover:text-gray-600">←</Link>
            <h1 className="text-2xl font-bold text-gray-900">{tr.title}</h1>
          </div>

          {/* Step indicator */}
          <div className="flex items-center">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <div
                  className={`flex items-center gap-2 border rounded-full px-4 py-2 ${
                    step === s.id
                      ? 'border-[#ffa500] text-[#ffa500]'
                      : step > s.id
                        ? 'border-[#27ae60] text-[#27ae60]'
                        : 'border-gray-200 text-gray-400'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step === s.id
                        ? 'bg-[#ffa500] text-white'
                        : step > s.id
                          ? 'bg-[#27ae60] text-white'
                          : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {step > s.id ? '✓' : s.id}
                  </span>
                  <span className="font-semibold text-sm whitespace-nowrap">{s.label}</span>
                </div>
                {i < steps.length - 1 && <div className="flex-1 h-px bg-gray-200 mx-2" />}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-xl shadow p-6">
          {step === 1 && (
            <>
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                <span className="text-gray-500 font-medium">{tr.whenTraveling}</span>
                {([
                  { id: 'exact', label: tr.exact },
                  { id: 'approx', label: tr.approx },
                  { id: 'unsure', label: tr.unsure }
                ] as const).map((opt) => (
                  <label key={opt.id} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="when"
                      checked={whenOption === opt.id}
                      onChange={() => setWhenOption(opt.id)}
                      className="accent-[#ffa500]"
                    />
                    <span className={whenOption === opt.id ? 'text-[#ffa500] font-semibold' : 'text-gray-700'}>
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">{tr.from}</p>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm text-gray-900 outline-none"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">{tr.to}</p>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm text-gray-900 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={goNext}
                  className="bg-[#0d1f2d] text-white font-bold px-6 py-3 rounded-full hover:bg-[#1a3549] transition flex items-center gap-2"
                >
                  {tr.nextUp}
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">{tr.fullName}</p>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm text-gray-900 outline-none"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">{tr.email}</p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm text-gray-900 outline-none"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">{tr.phone}</p>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm text-gray-900 outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-semibold text-gray-900 mb-2">{tr.notes}</p>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-900 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={goBack} className="text-gray-500 font-semibold px-4 py-3 hover:text-gray-700">
                  {tr.back}
                </button>
                <button
                  onClick={goNext}
                  disabled={!name || !email}
                  className="bg-[#0d1f2d] text-white font-bold px-6 py-3 rounded-full hover:bg-[#1a3549] transition disabled:opacity-40 flex items-center gap-2"
                >
                  {tr.nextUp}
                </button>
              </div>
            </>
          )}

          {step === 3 && !submitted && (
            <>
              <h2 className="text-lg font-bold text-gray-900 mb-4">{tr.reviewTitle}</h2>
              <div className="space-y-2 text-sm text-gray-700 mb-8">
                <p><span className="font-semibold">{tr.whenLabel}</span> {whenLabelMap[whenOption]}</p>
                <p><span className="font-semibold">{tr.fromLabel}</span> {fromDate || tr.dash} <span className="font-semibold ml-4">{tr.toLabel}</span> {toDate || tr.dash}</p>
                <p><span className="font-semibold">{tr.nameLabel}</span> {name}</p>
                <p><span className="font-semibold">{tr.emailLabel}</span> {email}</p>
                <p><span className="font-semibold">{tr.phoneLabel}</span> {phone || tr.dash}</p>
                {notes && <p><span className="font-semibold">{tr.notesLabel}</span> {notes}</p>}
              </div>

              {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

              <div className="flex justify-between">
                <button onClick={goBack} className="text-gray-500 font-semibold px-4 py-3 hover:text-gray-700">
                  {tr.back}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="bg-[#ffa500] text-white font-bold px-8 py-3 rounded-full hover:bg-[#e69400] transition disabled:opacity-50"
                >
                  {submitting ? tr.submitting : tr.submitRequest}
                </button>
              </div>
            </>
          )}

          {step === 3 && submitted && (
            <div className="text-center py-8">
              <p className="text-3xl mb-3">✅</p>
              <p className="text-lg font-bold text-gray-900 mb-2">{tr.sentTitle}</p>
              <p className="text-gray-600 mb-6">{tr.sentText}</p>
              <Link href="/" className="text-[#00a8cc] font-semibold hover:underline">{tr.backHome}</Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
