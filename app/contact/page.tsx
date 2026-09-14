'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Lang } from '../../lib/tours';
import Header from '../vetrina/Header';
import Footer from '../vetrina/Footer';
import { getMainNavLinks } from '../../lib/nav';
import { supabase } from '../../lib/supabase';

const t: { [key in Lang]: { [key: string]: string } } = {
  en: {
    heroTitle: 'Contact Us', heroSubtitle: 'Call Us, Write Us, Or Knock on Our Door',
    address: 'Our Address', addressValue: 'Demo Business Center, Example City (placeholder address)', whereToFindUs: 'See where we are (video)',
    emailAddress: 'Email',
    connectTitle: 'Send Us a Message',
    fullName: 'Full Name', nationality: 'Nationality', phone: 'Phone', email: 'Email', writeUs: 'Write Us...',
    sendMessage: 'Send Message', sending: '...',
    sentMessage: 'Message sent! We will get back to you shortly.',
    faqTitle: 'Frequently Asked Questions',
    faq1q: 'How does 24/7 support work?', faq1a: 'Our team is available around the clock via WhatsApp, phone and email to help with bookings and questions.',
    faq2q: 'How fast do you reply?', faq2a: 'We usually reply within a few hours, often much sooner during business hours in Egypt.',
    faq3q: 'Can I request a custom itinerary?', faq3a: 'Yes — use the form below or the Make Your Trip page and our team will build a tailored plan for you.',
    whatsappOnline: 'Online now', whatsappReply: 'Avg. reply: a few minutes', whatsappBubble: 'Hi! How can we help you today? 👋',
    chatWhatsapp: 'Chat on WhatsApp', mapOffice: 'Demo Office', mapHours: 'Open daily · 9:00 – 21:00'
  },
  ar: {
    heroTitle: 'اتصل بنا', heroSubtitle: 'اتصل بنا، اكتب لنا، أو زرنا',
    address: 'عنواننا', addressValue: 'مركز أعمال تجريبي، مدينة افتراضية (عنوان تجريبي)', whereToFindUs: 'شاهد أين نحن (فيديو)',
    emailAddress: 'البريد الإلكتروني',
    connectTitle: 'أرسل لنا رسالة',
    fullName: 'الاسم الكامل', nationality: 'الجنسية', phone: 'الهاتف', email: 'البريد الإلكتروني', writeUs: 'اكتب لنا...',
    sendMessage: 'إرسال الرسالة', sending: '...',
    sentMessage: 'تم إرسال الرسالة! سنتواصل معك قريبًا.',
    faqTitle: 'الأسئلة الشائعة',
    faq1q: 'كيف يعمل الدعم على مدار الساعة؟', faq1a: 'فريقنا متاح على مدار الساعة عبر واتساب والهاتف والبريد الإلكتروني للمساعدة في الحجوزات والاستفسارات.',
    faq2q: 'ما مدى سرعة ردكم؟', faq2a: 'عادةً ما نرد خلال ساعات قليلة، وغالبًا أسرع خلال ساعات العمل في مصر.',
    faq3q: 'هل يمكنني طلب برنامج رحلة مخصص؟', faq3a: 'نعم — استخدم النموذج أدناه أو صفحة "خطط رحلتك" وسيقوم فريقنا بإعداد خطة مخصصة لك.',
    whatsappOnline: 'متصل الآن', whatsappReply: 'متوسط الرد: بضع دقائق', whatsappBubble: 'مرحبًا! كيف يمكننا مساعدتك اليوم؟ 👋',
    chatWhatsapp: 'تواصل عبر واتساب', mapOffice: 'مكتب خليج نعمة', mapHours: 'مفتوح يوميًا · 9:00 – 21:00'
  },
  it: {
    heroTitle: 'Contattaci', heroSubtitle: 'Chiamaci, Scrivici, O Passa a Trovarci',
    address: 'Il Nostro Indirizzo', addressValue: 'Centro Affari Demo, Città di Esempio (indirizzo fittizio)', whereToFindUs: 'Guarda dove siamo (video)',
    emailAddress: 'Email',
    connectTitle: 'Inviaci un Messaggio',
    fullName: 'Nome e Cognome', nationality: 'Nazionalità', phone: 'Telefono', email: 'Email', writeUs: 'Scrivici...',
    sendMessage: 'Invia Messaggio', sending: '...',
    sentMessage: 'Messaggio inviato! Ti risponderemo a breve.',
    faqTitle: 'Domande Frequenti',
    faq1q: 'Come funziona l\'assistenza 24/7?', faq1a: 'Il nostro team è disponibile 24 ore su 24 via WhatsApp, telefono ed email per aiutarti con prenotazioni e domande.',
    faq2q: 'Quanto siete veloci a rispondere?', faq2a: 'Di solito rispondiamo entro poche ore, spesso più rapidamente durante l\'orario lavorativo in Egitto.',
    faq3q: 'Posso richiedere un itinerario personalizzato?', faq3a: 'Sì — usa il form qui sotto o la pagina "Crea il Tuo Viaggio" e il nostro team creerà un piano su misura per te.',
    whatsappOnline: 'Online ora', whatsappReply: 'Risposta media: pochi minuti', whatsappBubble: 'Ciao! Come possiamo aiutarti oggi? 👋',
    chatWhatsapp: 'Chatta su WhatsApp', mapOffice: 'Ufficio Demo', mapHours: 'Aperto tutti i giorni · 9:00 – 21:00'
  },
  ru: {
    heroTitle: 'Свяжитесь с нами', heroSubtitle: 'Позвоните, напишите нам или загляните лично',
    address: 'Наш адрес', addressValue: 'Демо Бизнес-Центр, Город-пример (условный адрес)', whereToFindUs: 'Смотрите, где мы (видео)',
    emailAddress: 'Email',
    connectTitle: 'Отправьте нам сообщение',
    fullName: 'Полное имя', nationality: 'Гражданство', phone: 'Телефон', email: 'Email', writeUs: 'Напишите нам...',
    sendMessage: 'Отправить сообщение', sending: '...',
    sentMessage: 'Сообщение отправлено! Мы скоро с вами свяжемся.',
    faqTitle: 'Часто задаваемые вопросы',
    faq1q: 'Как работает поддержка 24/7?', faq1a: 'Наша команда доступна круглосуточно через WhatsApp, телефон и email, чтобы помочь с бронированием и вопросами.',
    faq2q: 'Как быстро вы отвечаете?', faq2a: 'Обычно мы отвечаем в течение нескольких часов, часто быстрее в рабочее время в Египте.',
    faq3q: 'Могу ли я запросить индивидуальный маршрут?', faq3a: 'Да — используйте форму ниже или страницу "Спланировать поездку", и наша команда составит для вас индивидуальный план.',
    whatsappOnline: 'Онлайн сейчас', whatsappReply: 'Среднее время ответа: несколько минут', whatsappBubble: 'Привет! Чем мы можем помочь? 👋',
    chatWhatsapp: 'Написать в WhatsApp', mapOffice: 'Офис в Наама-Бэй', mapHours: 'Открыто ежедневно · 9:00 – 21:00'
  },
  de: {
    heroTitle: 'Kontaktiere uns', heroSubtitle: 'Ruf uns an, schreib uns, oder komm vorbei',
    address: 'Unsere Adresse', addressValue: 'Demo Business Center, Beispielstadt (Platzhalteradresse)', whereToFindUs: 'Sieh, wo wir sind (Video)',
    emailAddress: 'E-Mail',
    connectTitle: 'Sende uns eine Nachricht',
    fullName: 'Vollständiger Name', nationality: 'Nationalität', phone: 'Telefon', email: 'E-Mail', writeUs: 'Schreib uns...',
    sendMessage: 'Nachricht senden', sending: '...',
    sentMessage: 'Nachricht gesendet! Wir melden uns in Kürze bei dir.',
    faqTitle: 'Häufig gestellte Fragen',
    faq1q: 'Wie funktioniert der 24/7-Support?', faq1a: 'Unser Team ist rund um die Uhr über WhatsApp, Telefon und E-Mail erreichbar, um bei Buchungen und Fragen zu helfen.',
    faq2q: 'Wie schnell antwortet ihr?', faq2a: 'Wir antworten normalerweise innerhalb weniger Stunden, oft schneller während der Geschäftszeiten in Ägypten.',
    faq3q: 'Kann ich eine individuelle Reiseroute anfragen?', faq3a: 'Ja — nutze das Formular unten oder die Seite "Reise Zusammenstellen", und unser Team erstellt dir einen maßgeschneiderten Plan.',
    whatsappOnline: 'Jetzt online', whatsappReply: 'Durchschnittliche Antwortzeit: wenige Minuten', whatsappBubble: 'Hallo! Wie können wir dir heute helfen? 👋',
    chatWhatsapp: 'Auf WhatsApp chatten', mapOffice: 'Demo-Büro', mapHours: 'Täglich geöffnet · 9:00 – 21:00'
  }
};

function FloatingInput({
  type = 'text',
  required,
  label,
  value,
  onChange
}: {
  type?: string;
  required?: boolean;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        required={required}
        placeholder=" "
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full border border-gray-200 rounded-lg px-4 pt-5 pb-2 text-sm text-gray-900 outline-none focus:border-[#00a8cc] transition-colors"
      />
      <label
        className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all pointer-events-none
          peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[#00a8cc]
          peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[10px]"
      >
        {label}
      </label>
    </div>
  );
}

export default function ContactPage() {
  const [language, setLanguage] = useState<Lang>('en');
  const isRtl = language === 'ar';
  const tr = t[language];

  const faqs = [
    { q: tr.faq1q, a: tr.faq1a },
    { q: tr.faq2q, a: tr.faq2a },
    { q: tr.faq3q, a: tr.faq3a }
  ];

  const [form, setForm] = useState({ name: '', nationality: '', phone: '', email: '', message: '' });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const { error: insertError } = await supabase.from('contact_messages').insert({
      full_name: form.name,
      nationality: form.nationality,
      phone: form.phone,
      email: form.email,
      message: form.message
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
        subject: 'Contact Form',
        name: form.name,
        phone: form.phone,
        email: form.email,
        message: `Nationality: ${form.nationality || '-'}\n\n${form.message}`
      })
    }).catch(() => {});

    setSubmitted(true);
    setForm({ name: '', nationality: '', phone: '', email: '', message: '' });
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-white">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        backHref="/"
        navLinks={getMainNavLinks(language)}
      />

      {/* HERO with real photo + floating glass card */}
      <section className="relative h-72 sm:h-80">
        <Image src="/hero/hero-3.jpg" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 text-white">
          <h1 className="text-3xl sm:text-4xl font-bold drop-shadow">{tr.heroTitle}</h1>
          <p className="opacity-90 mt-1 drop-shadow">{tr.heroSubtitle}</p>
        </div>

        {/* Floating glass card */}
        <div className="absolute -bottom-10 inset-x-0 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl">
            <a href="tel:+000000000000" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 transition text-white">
              <span className="text-xl">📞</span>
              <span className="text-sm font-medium">+00 000 000 0000 (demo)</span>
            </a>
            <a href="https://wa.me/000000000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 transition text-white">
              <Image src="/social/whatsapp.png" alt="" width={20} height={20} />
              <span className="text-sm font-medium">WhatsApp</span>
            </a>
            <a href="mailto:info@cdalise.com" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 transition text-white">
              <span className="text-xl">✉️</span>
              <span className="text-sm font-medium">info@cdalise.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* WHATSAPP HERO CARD */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-8">
        <a
          href="https://wa.me/000000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block rounded-2xl overflow-hidden bg-gradient-to-br from-[#25D366] to-[#128C7E] p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-shadow"
        >
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                <Image src="/social/whatsapp.png" alt="WhatsApp" width={36} height={36} />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-400 border-2 border-white animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white/90 text-xs font-semibold uppercase tracking-wide">{tr.whatsappOnline}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
              </div>
              <p className="bg-white/95 text-gray-800 text-sm rounded-2xl rounded-tl-sm px-4 py-2 inline-block shadow-sm max-w-full truncate">
                {tr.whatsappBubble}
              </p>
              <p className="text-white/80 text-xs mt-2">{tr.whatsappReply}</p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-2 bg-white text-[#128C7E] font-bold px-5 py-2.5 rounded-full group-hover:scale-105 transition-transform whitespace-nowrap">
              {tr.chatWhatsapp}
            </span>
          </div>
        </a>

        {/* Secondary channels */}
        <div className="flex gap-3 mt-3">
          <a href="https://www.tiktok.com/@voyara.travel.demo" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm text-gray-700 hover:border-[#00a8cc] hover:-translate-y-0.5 transition">
            <Image src="/social/tiktok.png" alt="" width={20} height={20} />
            TikTok
          </a>
          <a href="https://m.me/voyaratraveldemo" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-sm text-gray-700 hover:border-[#00a8cc] hover:-translate-y-0.5 transition">
            <Image src="/social/facebook-messenger.png" alt="" width={20} height={20} />
            Messenger
          </a>
        </div>
      </section>

      {/* FORM + STICKY MAP */}
      <section className="max-w-6xl mx-auto px-4 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">{tr.connectTitle}</h2>
          {submitted ? (
            <p className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm font-semibold">
              {tr.sentMessage}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <FloatingInput required label={tr.fullName} value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <FloatingInput label={tr.nationality} value={form.nationality} onChange={(v) => setForm({ ...form, nationality: v })} />
              <FloatingInput label={tr.phone} value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
              <FloatingInput required type="email" label={tr.email} value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <div className="relative">
                <textarea
                  required
                  placeholder=" "
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="peer w-full border border-gray-200 rounded-lg px-4 pt-5 pb-2 text-sm text-gray-900 outline-none focus:border-[#00a8cc] transition-colors resize-none"
                />
                <label
                  className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all pointer-events-none
                    peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[#00a8cc]
                    peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[10px]"
                >
                  {tr.writeUs}
                </label>
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#ffa500] text-white font-bold py-3 rounded-lg hover:bg-[#e69400] active:scale-[0.98] disabled:opacity-50 transition"
              >
                {submitting ? tr.sending : tr.sendMessage}
              </button>
            </form>
          )}

          {/* Social row */}
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              { icon: '/social/facebook.png', label: 'Facebook', href: 'https://www.facebook.com/voyaratraveldemo' },
              { icon: '/social/instagram.png', label: 'Instagram', href: '#' },
              { icon: '/social/youtube.png', label: 'YouTube', href: 'https://www.youtube.com/@voyaratraveldemo' },
              { icon: '/social/tiktok.png', label: 'TikTok', href: 'https://www.tiktok.com/@voyara.travel.demo' }
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                title={social.label}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#00a8cc] hover:scale-110 hover:-rotate-3 transition overflow-hidden bg-white"
              >
                <Image src={social.icon} alt={social.label} width={22} height={22} className="object-contain" />
              </a>
            ))}
          </div>
        </div>

        {/* ADDRESS CARD (no map yet) */}
        <div className="lg:sticky lg:top-24 bg-[#f8fafc] rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center py-10 px-6">
          <span className="w-14 h-14 rounded-full bg-white shadow flex items-center justify-center text-2xl mb-4">📍</span>
          <p className="font-bold text-gray-900 text-lg mb-2">{tr.mapOffice}</p>
          <p className="text-gray-500 text-sm max-w-xs mb-4">{tr.addressValue}</p>
          <div className="flex flex-col gap-2 text-sm">
            <a href="tel:+000000000000" className="text-[#00a8cc] font-semibold hover:underline">📞 +00 000 000 0000 (demo)</a>
            <a href="https://wa.me/000000000000" target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:underline">💬 WhatsApp</a>
          </div>
          <a
            href="https://vm.tiktok.com/ZN8Ytj7cc/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#0d1f2d] px-4 py-2 rounded-full mt-4 hover:bg-[#1a3549] transition"
          >
            🎥 {tr.whereToFindUs}
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{tr.faqTitle}</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50"
              >
                {faq.q}
                <span
                  className={`inline-flex w-6 h-6 items-center justify-center rounded-full bg-gray-100 text-sm transition-transform duration-300 ease-out ${openFaq === i ? 'rotate-135 bg-[#00a8cc] text-white' : ''}`}
                >
                  +
                </span>
              </button>
              <div className="grid transition-all duration-300" style={{ gridTemplateRows: openFaq === i ? '1fr' : '0fr' }}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-gray-600 text-sm">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
