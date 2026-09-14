'use client';

import { useState } from 'react';
import { Lang } from '../../lib/tours';
import Header from '../vetrina/Header';
import Footer from '../vetrina/Footer';
import { getMainNavLinks } from '../../lib/nav';

const t: { [key in Lang]: { title: string; updated: string; body: string[] } } = {
  en: {
    title: 'Terms of Use',
    updated: 'Last updated: 2026',
    body: [
      'Voyara Travel is a demo tourism company operating in Sharm El-Sheikh.',
      'This website presents our tours, excursions, transport services and their prices as listed. Submitting a request form does not confirm a booking — all requests are subject to availability and confirmation by our team, who will contact you with final details before any payment is required.',
      'Prices shown are per person unless otherwise noted, and may change without notice until a booking is confirmed directly with our team.',
      'For any question about a specific tour or reservation, contact us at info@cdalise.com or via WhatsApp.'
    ]
  },
  it: {
    title: 'Termini di Utilizzo',
    updated: 'Ultimo aggiornamento: 2026',
    body: [
      'Voyara Travel è un\'agenzia turistica dimostrativa attiva a Sharm El-Sheikh.',
      'Questo sito presenta i nostri tour, escursioni, servizi di trasporto e i relativi prezzi come indicati. L\'invio di un form di richiesta non conferma una prenotazione — tutte le richieste sono soggette a disponibilità e conferma da parte del nostro team, che ti contatterà con i dettagli finali prima di richiedere qualsiasi pagamento.',
      'I prezzi indicati sono per persona salvo diversa indicazione, e possono variare senza preavviso fino alla conferma diretta della prenotazione con il nostro team.',
      'Per qualsiasi domanda su un tour o una prenotazione specifica, contattaci a info@cdalise.com o su WhatsApp.'
    ]
  },
  ru: {
    title: 'Условия использования',
    updated: 'Последнее обновление: 2026',
    body: [
      'Voyara Travel — демонстрационная туристическая компания, работающая в Шарм-эль-Шейхе.',
      'На этом сайте представлены наши туры, экскурсии, транспортные услуги и их цены. Отправка формы запроса не подтверждает бронирование — все заявки зависят от наличия мест и подтверждения нашей командой, которая свяжется с вами для уточнения деталей перед любой оплатой.',
      'Указанные цены — за человека, если не указано иное, и могут меняться без предупреждения до прямого подтверждения бронирования с нашей командой.',
      'По любым вопросам о конкретном туре или бронировании свяжитесь с нами по адресу info@cdalise.com или в WhatsApp.'
    ]
  },
  de: {
    title: 'Nutzungsbedingungen',
    updated: 'Zuletzt aktualisiert: 2026',
    body: [
      'Voyara Travel ist ein Demo-Reiseunternehmen mit Sitz in Sharm El-Sheikh.',
      'Diese Website zeigt unsere Touren, Ausflüge, Transportdienste und die angegebenen Preise. Das Absenden eines Anfrageformulars bestätigt keine Buchung — alle Anfragen unterliegen der Verfügbarkeit und Bestätigung durch unser Team, das dich mit den endgültigen Details kontaktiert, bevor eine Zahlung verlangt wird.',
      'Die angezeigten Preise gelten pro Person, sofern nicht anders angegeben, und können sich bis zur direkten Buchungsbestätigung mit unserem Team ohne vorherige Ankündigung ändern.',
      'Bei Fragen zu einer bestimmten Tour oder Buchung kontaktiere uns unter info@cdalise.com oder per WhatsApp.'
    ]
  }
};

export default function TermsPage() {
  const [language, setLanguage] = useState<Lang>('en');
  const tr = t[language];

  return (
    <div dir="ltr" className="min-h-screen bg-white">
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
