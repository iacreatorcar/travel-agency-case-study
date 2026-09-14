'use client';

import { useState } from 'react';
import { Lang } from '../../lib/tours';
import Header from '../vetrina/Header';
import Footer from '../vetrina/Footer';
import { getMainNavLinks } from '../../lib/nav';

const t: { [key in Lang]: { title: string; updated: string; body: string[] } } = {
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: 2026',
    body: [
      'Voyara Travel ("we", "us") collects the personal information you submit through our contact, tour request and rent car forms — typically your name, email address, phone number, and any message or trip details you provide.',
      'This information is used only to respond to your request, confirm availability, and provide the service you asked for. We do not sell or share your information with third parties for marketing purposes.',
      'Your data is stored securely using Supabase, our database provider. You can ask us to review, correct, or delete your information at any time by contacting us at info@cdalise.com.',
      'This site does not use tracking or advertising cookies beyond what is required for the site to function.'
    ]
  },
  ar: {
    title: 'سياسة الخصوصية',
    updated: 'آخر تحديث: 2026',
    body: [
      'تجمع Voyara Travel ("نحن") المعلومات الشخصية التي ترسلها من خلال نماذج التواصل وطلب الرحلات وتأجير السيارات — عادةً الاسم والبريد الإلكتروني ورقم الهاتف وأي تفاصيل رحلة تقدمها.',
      'تُستخدم هذه المعلومات فقط للرد على طلبك، وتأكيد التوفر، وتقديم الخدمة التي طلبتها. لا نبيع أو نشارك معلوماتك مع أطراف ثالثة لأغراض تسويقية.',
      'يتم تخزين بياناتك بأمان باستخدام Supabase، مزود قاعدة البيانات الخاص بنا. يمكنك أن تطلب منا مراجعة أو تصحيح أو حذف معلوماتك في أي وقت عبر التواصل معنا على info@cdalise.com.',
      'لا يستخدم هذا الموقع ملفات تعريف ارتباط للتتبع أو الإعلانات باستثناء ما هو ضروري لعمل الموقع.'
    ]
  },
  it: {
    title: 'Privacy Policy',
    updated: 'Ultimo aggiornamento: 2026',
    body: [
      'Voyara Travel ("noi") raccoglie le informazioni personali che invii tramite i nostri form di contatto, richiesta tour e noleggio auto — solitamente nome, indirizzo email, numero di telefono ed eventuali dettagli del viaggio.',
      'Queste informazioni sono usate solo per rispondere alla tua richiesta, confermare la disponibilità e fornire il servizio richiesto. Non vendiamo né condividiamo i tuoi dati con terze parti per scopi di marketing.',
      'I tuoi dati sono conservati in modo sicuro tramite Supabase, il nostro fornitore di database. Puoi chiederci in qualsiasi momento di rivedere, correggere o eliminare i tuoi dati scrivendo a info@cdalise.com.',
      'Questo sito non utilizza cookie di tracciamento o pubblicitari oltre a quelli necessari al funzionamento del sito.'
    ]
  },
  ru: {
    title: 'Политика конфиденциальности',
    updated: 'Последнее обновление: 2026',
    body: [
      'Voyara Travel («мы») собирает личную информацию, которую вы отправляете через наши формы контактов, запроса тура и аренды авто — обычно имя, email, номер телефона и детали поездки.',
      'Эта информация используется только для ответа на ваш запрос, подтверждения наличия и предоставления запрошенной услуги. Мы не продаём и не передаём ваши данные третьим лицам в маркетинговых целях.',
      'Ваши данные надёжно хранятся с помощью Supabase, нашего поставщика базы данных. Вы можете попросить нас просмотреть, исправить или удалить вашу информацию в любое время, написав на info@cdalise.com.',
      'Этот сайт не использует отслеживающие или рекламные файлы cookie, кроме необходимых для работы сайта.'
    ]
  },
  de: {
    title: 'Datenschutzerklärung',
    updated: 'Zuletzt aktualisiert: 2026',
    body: [
      'Voyara Travel („wir“) erfasst die persönlichen Daten, die du über unsere Kontakt-, Tour-Anfrage- und Mietwagenformulare übermittelst — in der Regel Name, E-Mail-Adresse, Telefonnummer und Reisedetails.',
      'Diese Informationen werden nur verwendet, um auf deine Anfrage zu antworten, die Verfügbarkeit zu bestätigen und den gewünschten Service bereitzustellen. Wir verkaufen oder teilen deine Daten nicht zu Marketingzwecken mit Dritten.',
      'Deine Daten werden sicher über Supabase, unseren Datenbankanbieter, gespeichert. Du kannst uns jederzeit bitten, deine Daten einzusehen, zu korrigieren oder zu löschen, indem du uns unter info@cdalise.com kontaktierst.',
      'Diese Website verwendet keine Tracking- oder Werbe-Cookies über das für den Betrieb der Website Notwendige hinaus.'
    ]
  }
};

export default function PrivacyPage() {
  const [language, setLanguage] = useState<Lang>('en');
  const isRtl = language === 'ar';
  const tr = t[language];

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-white">
      <Header language={language} onLanguageChange={setLanguage} backHref="/" navLinks={getMainNavLinks(language)} />

      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-[#0d1f2d] mb-2">{tr.title}</h1>
        <p className="text-sm text-gray-400 mb-8">{tr.updated}</p>
        <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
          {tr.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
