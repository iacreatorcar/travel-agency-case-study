'use client';

import { useState } from 'react';
import { Lang } from '../../lib/tours';
import Header from '../vetrina/Header';
import Footer from '../vetrina/Footer';
import { getMainNavLinks } from '../../lib/nav';

const content: {
  [key in Lang]: {
    title: string;
    badge: string;
    intro: string;
    author: string;
    authorTitle: string;
    contactTitle: string;
    email: string;
    website: string;
  };
} = {
  en: {
    title: 'About This Project',
    badge: 'Portfolio case study — not a real operating agency',
    intro: 'This platform is a portfolio case study developed to demonstrate digital solutions for travel agencies and tour operators, including destination discovery, excursion management, booking journeys and customer-facing digital services. The project combines more than 20 years of experience across cruise operations, hospitality, travel technology and digital transformation.',
    author: 'Carmine D\'Alise',
    authorTitle: 'Travel, Hospitality & Maritime Digital Solutions',
    contactTitle: 'Get in Touch',
    email: 'Email',
    website: 'Website'
  },
  it: {
    title: 'Chi Siamo',
    badge: 'Case study di portfolio — non è un\'agenzia realmente operativa',
    intro: 'Questa piattaforma è un case study di portfolio sviluppato per dimostrare soluzioni digitali per agenzie di viaggio e tour operator, tra cui scoperta delle destinazioni, gestione delle escursioni, percorsi di prenotazione e servizi digitali rivolti al cliente. Il progetto unisce oltre 20 anni di esperienza in operazioni crocieristiche, hospitality, travel technology e trasformazione digitale.',
    author: 'Carmine D\'Alise',
    authorTitle: 'Soluzioni Digitali per Travel, Hospitality & Maritime',
    contactTitle: 'Contattaci',
    email: 'Email',
    website: 'Sito web'
  },
  ru: {
    title: 'О проекте',
    badge: 'Кейс для портфолио — не реальное действующее агентство',
    intro: 'Эта платформа представляет собой кейс для портфолио, разработанный для демонстрации цифровых решений для туристических агентств и туроператоров: поиск направлений, управление экскурсиями, процесс бронирования и цифровые сервисы для клиентов. Проект объединяет более 20 лет опыта в круизных операциях, гостеприимстве, туристических технологиях и цифровой трансформации.',
    author: 'Carmine D\'Alise',
    authorTitle: 'Цифровые решения для туризма, гостеприимства и морской отрасли',
    contactTitle: 'Связаться с нами',
    email: 'Email',
    website: 'Сайт'
  },
  de: {
    title: 'Über dieses Projekt',
    badge: 'Portfolio-Case-Study — keine real operierende Agentur',
    intro: 'Diese Plattform ist eine Portfolio-Case-Study, die entwickelt wurde, um digitale Lösungen für Reisebüros und Reiseveranstalter zu demonstrieren — darunter Zieleentdeckung, Ausflugsverwaltung, Buchungsstrecken und kundenorientierte digitale Services. Das Projekt vereint mehr als 20 Jahre Erfahrung in Kreuzfahrtbetrieb, Hospitality, Reisetechnologie und digitaler Transformation.',
    author: 'Carmine D\'Alise',
    authorTitle: 'Digitale Lösungen für Travel, Hospitality & Maritime',
    contactTitle: 'Kontakt',
    email: 'E-Mail',
    website: 'Webseite'
  }
};

export default function AboutPage() {
  const [language, setLanguage] = useState<Lang>('en');
  const t = content[language];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        backHref="/"
        navLinks={getMainNavLinks(language)}
      />

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-8">
          <span className="inline-block text-xs font-semibold tracking-wide uppercase text-[#00a8cc] bg-[#00a8cc]/10 rounded-full px-3 py-1 mb-4">
            {t.badge}
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-lg text-gray-700 mb-8">{t.intro}</p>

          <div className="border-t border-gray-200 pt-6 mb-8">
            <p className="text-lg font-semibold text-gray-900">{t.author}</p>
            <p className="text-gray-600">{t.authorTitle}</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.contactTitle}</h2>
          <div className="space-y-2 text-gray-900">
            <p>
              <span className="font-semibold">{t.website}:</span>{' '}
              <a href="https://www.cdalise.com" target="_blank" rel="noopener noreferrer" className="text-[#00a8cc] hover:underline">
                www.cdalise.com
              </a>
            </p>
            <p>
              <span className="font-semibold">{t.email}:</span>{' '}
              <a href="mailto:info@cdalise.com" className="text-[#00a8cc] hover:underline">info@cdalise.com</a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
