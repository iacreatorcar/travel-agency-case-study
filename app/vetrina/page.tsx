'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from './Reveal';
import HeroCarousel from './HeroCarousel';
import Logo from './Logo';
import FloatingButtons from './FloatingButtons';
import MobileBottomNav from './MobileBottomNav';
import Footer from './Footer';
import ReviewsMarquee from './ReviewsMarquee';
import { galleryItems, GallerySource } from '../../lib/gallery';
import { tours } from '../../lib/tours';
import { bundles } from '../../lib/bundles';
import { useCart } from '../../lib/cart-context';

type Lang = 'en' | 'ar' | 'it' | 'ru' | 'de';
type Currency = 'USD' | 'EUR';

const LANGS: Lang[] = ['en', 'ar', 'it', 'ru', 'de'];
const CURRENCIES: Currency[] = ['USD', 'EUR'];
const flagMap: { [key in Lang]: string } = {
  en: '/flag/en.png',
  ar: '/flag/ar.jpg',
  it: '/flag/it.png',
  ru: '/flag/ru.png',
  de: '/flag/de.png'
};
const langName: { [key in Lang]: string } = {
  en: 'English',
  ar: 'العربية',
  it: 'Italiano',
  ru: 'Русский',
  de: 'Deutsch'
};
const currencyLabel: { [key in Currency]: string } = {
  USD: 'USD ($)',
  EUR: 'EUR (€)'
};

const translations: { [key in Lang]: { [key: string]: string } } = {
  en: {
    navHome: 'Home', navPackages: 'Packages', navAbout: 'About',
    login: 'Login',
    requestInfo: 'Request Info',
    heroTitle: 'Book Egypt Tours – Simple, Transparent, Trusted',
    heroSubtitle: 'Desert safaris, Nile cruises, snorkeling. All-inclusive pricing, no surprises.',
    searchDestination: 'Destination', searchCheckIn: 'Check-in', searchGuests: 'Guests', searchBtn: 'Search',
    tabMakeTrip: 'Make Your Trip', tabFindTrip: 'Find your trip', tabRentCar: 'Transfers',
    whenTraveling: 'When will you be traveling?', exactTime: 'Have An Exact Time', approxTime: 'Have An Approximate Time', notSure: 'Not Sure Yet',
    fromLabel: 'From', fromPlaceholder: 'Select the start date of the trip',
    toLabel: 'To', toPlaceholder: 'Select the end date of the trip',
    makeTripBtn: 'Make Trip',
    statTravelers: 'WhatsApp Reply Time', statTours: 'Experiences', statDestinations: 'Categories', statRating: 'Support',
    popularTours: 'Popular Tours', viewAll: 'View All', perPerson: '/ person',
    howItWorks: 'How it works — 3 simple steps', step1: '1️⃣ Browse & Select', step2: '2️⃣ Share Details', step3: '3️⃣ Confirm on WhatsApp',
    highlights: 'Highlights of Egypt',
    waysEyebrow: 'Choose Your Travel Style', waysTitle: '5 Ways to Live Sharm',
    wayReef: 'Sea & Snorkeling', wayDesert: 'Desert & Adventure', wayCulture: 'Culture & Tradition', wayCity: 'Fun & Water', wayAbroad: 'Abroad & Big Tours',
    packagesEyebrow: 'Bundle & Save', packagesTitle: 'Packages', packagesViewAll: 'View All Packages',
    reviewsEyebrow: 'What Travelers Say', reviewsTitle: 'Our Travelers\' Voice', reviewsCount: 'verified reviews on Google',
    tipsEyebrow: 'Tips From the Guides', tipsTitle: 'Before You Go',
    tip1: 'Book in advance to secure availability during high season',
    tip2: 'In the desert bring high-protection sunscreen, a hat and water',
    tip3: 'For snorkeling, your own mask and snorkel make a difference',
    tip4: 'Ask us for custom packages — discounts for groups and families',
    customEyebrow: 'Tailored Quote', customTitle1: 'Build Your', customTitleHighlight: 'Package', customTitle2: 'in 3 Steps',
    customDesc: 'Choose the experiences, add your travel dates and get a detailed quote on WhatsApp. A real person answers, not a bot.',
    customTime: '2 minutes', customNoCommit: 'No commitment', customCta: 'Start Now',
    certTitle: 'Tailored guidance for your sustainability journey',
    certBrand: 'Travelife Certified', certSubtitle: 'Excellence in sustainability',
    faqTitle: 'Common Questions',
    faq1q: 'How do I book a tour?', faq1a: '1) Browse tours 2) Click "Book Now" 3) Share your dates & WhatsApp 4) We send options within 2 hours 5) Confirm and get details',
    faq2q: 'Are guides & meals included?', faq2a: 'Yes. All prices are all-inclusive: licensed local guide, lunch, drinks, entrance fees. No surprises.',
    faq3q: 'What if I need to cancel?', faq3a: 'Free cancellation up to 48 hours before. Just message us on WhatsApp — no questions asked.',
    helpTitle: 'Need help Finding your Trip?', helpBtn: 'Contact Us',
    helpWhatsapp: 'Chat with us on WhatsApp', helpAssistance: '24/7 support in 20+ languages',
    galleryTitle: 'Exciting Travel Gallery', gallerySubtitle: 'Follow us on social media for more exciting journeys',
    newsletterTitle: 'Subscribe to Our Newsletter', newsletterSubtitle: 'Get Voyara Travel updates, offers and news straight to your inbox.',
    newsletterPlaceholder: 'Your email address', newsletterBtn: 'Subscribe',
    footerAbout: 'About Voyara Travel', footerAboutText: 'A portfolio demo built for travel agencies and tour operators.',
    footerContact: 'Contact', footerLinks: 'Quick Links', footerLicense: 'Portfolio case study — demo content only',
    rights: 'All rights reserved.'
  },
  ar: {
    navHome: 'الرئيسية', navPackages: 'الباقات', navAbout: 'من نحن',
    login: 'تسجيل الدخول',
    requestInfo: 'اطلب معلومات',
    heroTitle: 'احجز رحلات مصر – بسيطة وشفافة وموثوقة',
    heroSubtitle: 'سفاري صحراوي، رحلات نيلية، غطس. أسعار شاملة بدون مفاجآت.',
    searchDestination: 'الوجهة', searchCheckIn: 'تاريخ الوصول', searchGuests: 'الضيوف', searchBtn: 'بحث',
    tabMakeTrip: 'خطط رحلتك', tabFindTrip: 'ابحث عن رحلتك', tabRentCar: 'التحويلات',
    whenTraveling: 'متى ستسافر؟', exactTime: 'لدي وقت محدد', approxTime: 'لدي وقت تقريبي', notSure: 'غير متأكد بعد',
    fromLabel: 'من', fromPlaceholder: 'اختر تاريخ بداية الرحلة',
    toLabel: 'إلى', toPlaceholder: 'اختر تاريخ نهاية الرحلة',
    makeTripBtn: 'ابدأ الرحلة',
    statTravelers: 'وقت الرد عبر واتساب', statTours: 'تجربة', statDestinations: 'فئات', statRating: 'دعم',
    popularTours: 'الرحلات الشائعة', viewAll: 'عرض الكل', perPerson: '/ للشخص',
    howItWorks: 'كيف يعمل — 3 خطوات بسيطة', step1: '1️⃣ تصفح واختر', step2: '2️⃣ شارك بياناتك', step3: '3️⃣ تأكيد على واتساب',
    highlights: 'أبرز معالم مصر',
    waysEyebrow: 'اختر أسلوب رحلتك', waysTitle: '5 طرق لعيش شرم',
    wayReef: 'البحر والغطس', wayDesert: 'الصحراء والمغامرة', wayCulture: 'الثقافة والتقاليد', wayCity: 'المرح والمياه', wayAbroad: 'خارج شرم والجولات الكبرى',
    packagesEyebrow: 'وفر مع الباقات', packagesTitle: 'الباقات', packagesViewAll: 'عرض كل الباقات',
    reviewsEyebrow: 'ماذا يقول المسافرون', reviewsTitle: 'صوت مسافرينا', reviewsCount: 'تقييم موثّق على جوجل',
    tipsEyebrow: 'نصائح من المرشدين', tipsTitle: 'قبل السفر',
    tip1: 'احجز مسبقًا لضمان التوفر في موسم الذروة',
    tip2: 'في الصحراء أحضر واقي شمس عالي الحماية وقبعة وماء',
    tip3: 'للغطس، قناعك وأنبوب التنفس الخاص بك يحدثان فرقًا',
    tip4: 'اسألنا عن باقات مخصصة — خصومات للمجموعات والعائلات',
    customEyebrow: 'عرض مخصص', customTitle1: 'صمّم', customTitleHighlight: 'باقتك', customTitle2: 'في 3 خطوات',
    customDesc: 'اختر التجارب، أضف تواريخ سفرك واحصل على عرض تفصيلي عبر واتساب. يرد عليك شخص حقيقي، وليس روبوتًا.',
    customTime: 'دقيقتان', customNoCommit: 'بدون التزام', customCta: 'ابدأ الآن',
    certTitle: 'إرشادات مخصصة لرحلة الاستدامة الخاصة بك',
    certBrand: 'معتمد من Travelife', certSubtitle: 'التميز في الاستدامة',
    faqTitle: 'أسئلة شائعة',
    faq1q: 'كيف أحجز رحلة؟', faq1a: '1) تصفح الرحلات 2) انقر "احجز الآن" 3) شارك تواريخك وواتساب 4) نرسل خيارات في غضون ساعتين 5) تأكيد والحصول على التفاصيل',
    faq2q: 'هل المرشدون والطعام مشمولون؟', faq2a: 'نعم. جميع الأسعار شاملة الكل: مرشد محلي مرخص، غداء، مشروبات، رسوم الدخول. بدون مفاجآت.',
    faq3q: 'إذا احتجت لإلغاء؟', faq3a: 'إلغاء مجاني حتى 48 ساعة قبل. راسلنا فقط على واتساب — بدون أسئلة.',
    helpTitle: 'تحتاج مساعدة في إيجاد رحلتك؟', helpBtn: 'اتصل بنا',
    helpWhatsapp: 'تواصل معنا عبر واتساب', helpAssistance: 'دعم على مدار الساعة بأكثر من 20 لغة',
    galleryTitle: 'معرض رحلات مثيرة', gallerySubtitle: 'تابعنا على وسائل التواصل الاجتماعي للمزيد من الرحلات المثيرة',
    newsletterTitle: 'اشترك في نشرتنا الإخبارية', newsletterSubtitle: 'احصل على تحديثات Voyara Travel والعروض والأخبار مباشرة في بريدك.',
    newsletterPlaceholder: 'بريدك الإلكتروني', newsletterBtn: 'اشترك',
    footerAbout: 'عن Voyara Travel', footerAboutText: 'عرض تجريبي في معرض الأعمال لوكالات السفر ومشغلي الرحلات.',
    footerContact: 'اتصل بنا', footerLinks: 'روابط سريعة', footerLicense: 'دراسة حالة في معرض الأعمال — محتوى تجريبي فقط',
    rights: 'جميع الحقوق محفوظة.'
  },
  it: {
    navHome: 'Home', navPackages: 'Pacchetti', navAbout: 'Chi Siamo',
    login: 'Accedi',
    requestInfo: 'Richiedi Info',
    heroTitle: 'Prenota Tour in Egitto – Semplice, Trasparente, Affidabile',
    heroSubtitle: 'Safari nel deserto, crociere sul Nilo, snorkeling. Prezzi all-inclusive, nessuna sorpresa.',
    searchDestination: 'Destinazione', searchCheckIn: 'Check-in', searchGuests: 'Ospiti', searchBtn: 'Cerca',
    tabMakeTrip: 'Crea il Tuo Viaggio', tabFindTrip: 'Trova il tuo viaggio', tabRentCar: 'Trasferimenti',
    whenTraveling: 'Quando vuoi viaggiare?', exactTime: 'Ho una Data Precisa', approxTime: 'Ho una Data Approssimativa', notSure: 'Non Sono Sicuro',
    fromLabel: 'Dal', fromPlaceholder: 'Seleziona la data di inizio viaggio',
    toLabel: 'Al', toPlaceholder: 'Seleziona la data di fine viaggio',
    makeTripBtn: 'Crea Viaggio',
    statTravelers: 'Risposta su WhatsApp', statTours: 'Esperienze', statDestinations: 'Categorie', statRating: 'Assistenza',
    popularTours: 'Tour Popolari', viewAll: 'Vedi Tutti', perPerson: '/ persona',
    howItWorks: 'Come funziona — 3 semplici passaggi', step1: '1️⃣ Sfoglia e Seleziona', step2: '2️⃣ Condividi Dati', step3: '3️⃣ Conferma su WhatsApp',
    highlights: 'Highlights dell\'Egitto',
    waysEyebrow: 'Scegli il Tuo Stile di Viaggio', waysTitle: '5 Modi di Vivere Sharm',
    wayReef: 'Mare & Snorkeling', wayDesert: 'Deserto & Avventura', wayCulture: 'Cultura & Tradizione', wayCity: 'Divertimento & Acqua', wayAbroad: 'Fuori Sharm & Grandi Tour',
    packagesEyebrow: 'Combina e Risparmia', packagesTitle: 'Pacchetti', packagesViewAll: 'Vedi Tutti i Pacchetti',
    reviewsEyebrow: 'Dicono di Noi', reviewsTitle: 'La Voce dei Nostri Viaggiatori', reviewsCount: 'recensioni verificate su Google',
    tipsEyebrow: 'Consigli dalla Guida', tipsTitle: 'Prima di Partire',
    tip1: 'Prenota in anticipo per garantirti la disponibilità in alta stagione',
    tip2: 'Nel deserto porta crema solare alta protezione, cappello e acqua',
    tip3: 'Per lo snorkeling, maschera e boccaglio personali fanno la differenza',
    tip4: 'Chiedici pacchetti su misura: sconti per gruppi e famiglie',
    customEyebrow: 'Preventivo su Misura', customTitle1: 'Componi il Tuo', customTitleHighlight: 'Pacchetto', customTitle2: 'in 3 Step',
    customDesc: 'Scegli le esperienze, inserisci le date del soggiorno e ricevi un preventivo dettagliato via WhatsApp. Ti risponde una persona, non un bot.',
    customTime: '2 minuti', customNoCommit: 'Nessun impegno', customCta: 'Componi Ora',
    certTitle: 'Guida su misura per il tuo percorso di sostenibilità',
    certBrand: 'Certificato Travelife', certSubtitle: 'Eccellenza nella sostenibilità',
    faqTitle: 'Domande Frequenti',
    faq1q: 'Come prenoto un tour?', faq1a: '1) Sfoglia tour 2) Clicca "Prenota Ora" 3) Condividi date e WhatsApp 4) Ricevi opzioni entro 2 ore 5) Conferma e ottieni dettagli',
    faq2q: 'Guide e pasti sono inclusi?', faq2a: 'Sì. Tutti i prezzi sono all-inclusive: guida locale certificata, pranzo, bevande, ingressi. Nessuna sorpresa.',
    faq3q: 'Posso cancellare?', faq3a: 'Cancellazione gratuita fino a 48 ore prima. Scrivi solo su WhatsApp — nessuna domanda.',
    helpTitle: 'Hai bisogno di aiuto per trovare il tuo viaggio?', helpBtn: 'Contattaci',
    helpWhatsapp: 'Chatta con noi su WhatsApp', helpAssistance: 'Assistenza 24/7 in 20+ lingue',
    galleryTitle: 'Galleria di Viaggi Emozionanti', gallerySubtitle: 'Seguici sui social per vedere più viaggi emozionanti',
    newsletterTitle: 'Iscriviti alla Newsletter', newsletterSubtitle: 'Ricevi aggiornamenti, offerte e novità di Voyara Travel direttamente nella tua email.',
    newsletterPlaceholder: 'Il tuo indirizzo email', newsletterBtn: 'Iscriviti',
    footerAbout: 'Chi è Voyara Travel', footerAboutText: 'Un case study di portfolio per agenzie di viaggio e tour operator.',
    footerContact: 'Contatti', footerLinks: 'Link Rapidi', footerLicense: 'Case study di portfolio — solo contenuto dimostrativo',
    rights: 'Tutti i diritti riservati.'
  },
  ru: {
    navHome: 'Главная', navPackages: 'Пакеты', navAbout: 'О нас',
    login: 'Войти',
    requestInfo: 'Запросить информацию',
    heroTitle: 'Туры по Египту – Просто, Прозрачно, Надёжно',
    heroSubtitle: 'Пустынные сафари, круизы по Нилу, снорклинг. Всё включено, никаких сюрпризов.',
    searchDestination: 'Направление', searchCheckIn: 'Дата заезда', searchGuests: 'Гости', searchBtn: 'Поиск',
    tabMakeTrip: 'Спланировать поездку', tabFindTrip: 'Найти поездку', tabRentCar: 'Трансферы',
    whenTraveling: 'Когда вы планируете поездку?', exactTime: 'Точная дата', approxTime: 'Примерная дата', notSure: 'Пока не уверен',
    fromLabel: 'С', fromPlaceholder: 'Выберите дату начала поездки',
    toLabel: 'По', toPlaceholder: 'Выберите дату окончания поездки',
    makeTripBtn: 'Создать поездку',
    statTravelers: 'Ответ в WhatsApp', statTours: 'Впечатлений', statDestinations: 'Категорий', statRating: 'Поддержка',
    popularTours: 'Популярные туры', viewAll: 'Смотреть все', perPerson: '/ человек',
    howItWorks: 'Как это работает — 3 простых шага', step1: '1️⃣ Просмотри и Выбери', step2: '2️⃣ Поделись Данными', step3: '3️⃣ Подтверди в WhatsApp',
    highlights: 'Достопримечательности Египта',
    waysEyebrow: 'Выберите свой стиль путешествия', waysTitle: '5 способов открыть Шарм',
    wayReef: 'Море и снорклинг', wayDesert: 'Пустыня и приключения', wayCulture: 'Культура и традиции', wayCity: 'Развлечения и вода', wayAbroad: 'За пределами Шарма',
    packagesEyebrow: 'Комбо и экономия', packagesTitle: 'Пакеты', packagesViewAll: 'Смотреть все пакеты',
    reviewsEyebrow: 'Отзывы путешественников', reviewsTitle: 'Голос наших туристов', reviewsCount: 'проверенных отзывов на Google',
    tipsEyebrow: 'Советы от гидов', tipsTitle: 'Перед поездкой',
    tip1: 'Бронируйте заранее, чтобы гарантировать наличие мест в высокий сезон',
    tip2: 'В пустыне возьмите солнцезащитный крем, шляпу и воду',
    tip3: 'Для снорклинга собственная маска и трубка имеют значение',
    tip4: 'Спросите нас про индивидуальные пакеты — скидки для групп и семей',
    customEyebrow: 'Индивидуальное предложение', customTitle1: 'Соберите свой', customTitleHighlight: 'пакет', customTitle2: 'за 3 шага',
    customDesc: 'Выберите впечатления, укажите даты поездки и получите подробное предложение в WhatsApp. Отвечает реальный человек, а не бот.',
    customTime: '2 минуты', customNoCommit: 'Без обязательств', customCta: 'Начать',
    certTitle: 'Индивидуальное руководство для вашего пути к устойчивости',
    certBrand: 'Сертифицировано Travelife', certSubtitle: 'Совершенство в устойчивом развитии',
    faqTitle: 'Часто задаваемые вопросы',
    faq1q: 'Как забронировать тур?', faq1a: '1) Просмотри туры 2) Кликни "Забронировать" 3) Поделись датами и WhatsApp 4) Получи варианты за 2 часа 5) Подтверди и получи детали',
    faq2q: 'Гид и еда включены?', faq2a: 'Да. Все цены все-включено: лицензированный местный гид, обед, напитки, входные билеты. Без сюрпризов.',
    faq3q: 'Можно отменить?', faq3a: 'Бесплатная отмена за 48 часов. Просто напиши в WhatsApp — без вопросов.',
    helpTitle: 'Нужна помощь с выбором тура?', helpBtn: 'Связаться с нами',
    helpWhatsapp: 'Написать нам в WhatsApp', helpAssistance: 'Поддержка 24/7 на более чем 20 языках',
    galleryTitle: 'Галерея увлекательных путешествий', gallerySubtitle: 'Подписывайтесь на нас в соцсетях, чтобы видеть больше путешествий',
    newsletterTitle: 'Подпишитесь на рассылку', newsletterSubtitle: 'Получайте новости, акции и обновления Voyara Travel прямо на почту.',
    newsletterPlaceholder: 'Ваш email', newsletterBtn: 'Подписаться',
    footerAbout: 'О компании Voyara Travel', footerAboutText: 'Демонстрационный кейс для портфолио, созданный для туристических агентств.',
    footerContact: 'Контакты', footerLinks: 'Быстрые ссылки', footerLicense: 'Кейс для портфолио — только демонстрационный контент',
    rights: 'Все права защищены.'
  },
  de: {
    navHome: 'Startseite', navPackages: 'Pakete', navAbout: 'Über uns',
    login: 'Anmelden',
    requestInfo: 'Info Anfragen',
    heroTitle: 'Ägypten-Touren Buchen – Einfach, Transparent, Zuverlässig',
    heroSubtitle: 'Wüstensafaris, Nilkreuzfahrten, Schnorcheln. Alles inklusive, keine Überraschungen.',
    searchDestination: 'Reiseziel', searchCheckIn: 'Anreise', searchGuests: 'Gäste', searchBtn: 'Suchen',
    tabMakeTrip: 'Reise Zusammenstellen', tabFindTrip: 'Reise Finden', tabRentCar: 'Transfers',
    whenTraveling: 'Wann möchtest du reisen?', exactTime: 'Genauer Zeitpunkt', approxTime: 'Ungefährer Zeitpunkt', notSure: 'Noch Unsicher',
    fromLabel: 'Von', fromPlaceholder: 'Startdatum der Reise wählen',
    toLabel: 'Bis', toPlaceholder: 'Enddatum der Reise wählen',
    makeTripBtn: 'Reise Erstellen',
    statTravelers: 'WhatsApp-Antwortzeit', statTours: 'Erlebnisse', statDestinations: 'Kategorien', statRating: 'Support',
    popularTours: 'Beliebte Touren', viewAll: 'Alle Ansehen', perPerson: '/ Person',
    howItWorks: 'Wie funktioniert es — 3 einfache Schritte', step1: '1️⃣ Durchsuche und Wähle', step2: '2️⃣ Teile Daten', step3: '3️⃣ Bestätige auf WhatsApp',
    highlights: 'Highlights Ägyptens',
    waysEyebrow: 'Wähle Deinen Reisestil', waysTitle: '5 Wege Sharm zu Erleben',
    wayReef: 'Meer & Schnorcheln', wayDesert: 'Wüste & Abenteuer', wayCulture: 'Kultur & Tradition', wayCity: 'Spaß & Wasser', wayAbroad: 'Außerhalb & Große Touren',
    packagesEyebrow: 'Kombinieren & Sparen', packagesTitle: 'Pakete', packagesViewAll: 'Alle Pakete Ansehen',
    reviewsEyebrow: 'Das Sagen Reisende', reviewsTitle: 'Die Stimme Unserer Reisenden', reviewsCount: 'verifizierte Google-Bewertungen',
    tipsEyebrow: 'Tipps von den Guides', tipsTitle: 'Vor der Reise',
    tip1: 'Buche im Voraus, um Verfügbarkeit in der Hochsaison zu sichern',
    tip2: 'Nimm in die Wüste Sonnencreme mit hohem Schutz, Hut und Wasser mit',
    tip3: 'Beim Schnorcheln machen eigene Maske und Schnorchel den Unterschied',
    tip4: 'Frag uns nach individuellen Paketen — Rabatte für Gruppen und Familien',
    customEyebrow: 'Individuelles Angebot', customTitle1: 'Stelle Dein', customTitleHighlight: 'Paket', customTitle2: 'in 3 Schritten Zusammen',
    customDesc: 'Wähle die Erlebnisse, gib deine Reisedaten ein und erhalte ein detailliertes Angebot per WhatsApp. Eine echte Person antwortet, kein Bot.',
    customTime: '2 Minuten', customNoCommit: 'Unverbindlich', customCta: 'Jetzt Starten',
    certTitle: 'Maßgeschneiderte Beratung für deinen Nachhaltigkeitsweg',
    certBrand: 'Travelife Zertifiziert', certSubtitle: 'Exzellenz in Nachhaltigkeit',
    faqTitle: 'Häufig Gestellte Fragen',
    faq1q: 'Wie buche ich eine Tour?', faq1a: '1) Durchsuche Touren 2) Klick "Jetzt Buchen" 3) Teile Daten und WhatsApp 4) Erhalte Optionen in 2 Stunden 5) Bestätige und erhalte Details',
    faq2q: 'Guide und Mahlzeit inklusive?', faq2a: 'Ja. Alle Preise sind All-Inclusive: lokaler lizenzierter Guide, Mittagessen, Getränke, Eintritt. Keine Überraschungen.',
    faq3q: 'Kann ich stornieren?', faq3a: 'Kostenlose Stornierung bis 48 Stunden vorher. Schreib einfach auf WhatsApp — keine Fragen.',
    helpTitle: 'Brauchst du Hilfe bei der Suche nach deiner Reise?', helpBtn: 'Kontaktiere uns',
    helpWhatsapp: 'Chatte mit uns auf WhatsApp', helpAssistance: '24/7-Support in über 20 Sprachen',
    galleryTitle: 'Aufregende Reisegalerie', gallerySubtitle: 'Folge uns in den sozialen Medien für mehr aufregende Reisen',
    newsletterTitle: 'Newsletter Abonnieren', newsletterSubtitle: 'Erhalte Voyara Travel Updates, Angebote und Neuigkeiten direkt in dein Postfach.',
    newsletterPlaceholder: 'Deine E-Mail-Adresse', newsletterBtn: 'Abonnieren',
    footerAbout: 'Über Voyara Travel', footerAboutText: 'Eine Portfolio-Case-Study für Reisebüros und Reiseveranstalter.',
    footerContact: 'Kontakt', footerLinks: 'Schnelllinks', footerLicense: 'Portfolio-Case-Study — nur Demoinhalte',
    rights: 'Alle Rechte vorbehalten.'
  }
};

const faqs = ['faq1', 'faq2', 'faq3'] as const;

const socialGlyph: { [key in GallerySource]: string } = {
  tiktok: '🎵',
  youtube: '▶️',
  instagram: '📸',
  facebook: '👍'
};

export default function VetrinaPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<Lang>('en');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { items: cartItems } = useCart();
  const t = translations[language];
  const isRtl = language === 'ar';
  const activeTours = tours.filter((tour) => tour.active !== false);

  const runSearch = () => {
    router.push('/packages');
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-white pb-16 md:pb-0">
      {/* NAV */}
      <nav className="sticky top-0 z-30 bg-white border-b border-gray-100">
        {/* Row 1: logo, search, lang/currency, cart, sign in */}
        <div className="max-w-7xl mx-auto px-4 h-24 sm:h-28 flex items-center gap-2 sm:gap-4 justify-between">
          <Logo />

          <form
            onSubmit={(e) => { e.preventDefault(); runSearch(); }}
            className="hidden md:flex flex-1 max-w-md items-center border border-gray-200 rounded-full px-4 py-2 focus-within:border-[#00a8cc]"
          >
            <span className="text-gray-400 mr-2">🔍</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find places and things to do"
              className="flex-1 outline-none text-sm text-gray-700 placeholder:text-gray-400"
            />
          </form>

          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Language dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setLangMenuOpen((v) => !v); setCurrencyMenuOpen(false); }}
                className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span aria-hidden>🌐</span>
                <span className="hidden sm:inline">{langName[language]}</span>
                <span className="text-gray-400 text-xs">▾</span>
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-40 w-40">
                  {LANGS.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => { setLanguage(lang); setLangMenuOpen(false); }}
                      className={`flex items-center gap-2 w-full text-left px-3 py-2 text-sm ${
                        language === lang ? 'text-[#00a8cc] bg-[#00a8cc]/10 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Image src={flagMap[lang]} alt="" width={20} height={14} className="rounded-sm object-cover shrink-0" />
                      {langName[lang]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setCurrencyMenuOpen((v) => !v); setLangMenuOpen(false); }}
                className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {currencyLabel[currency]}
                <span className="text-gray-400 text-xs">▾</span>
              </button>
              {currencyMenuOpen && (
                <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-40 w-32">
                  {CURRENCIES.map((cur) => (
                    <button
                      key={cur}
                      type="button"
                      onClick={() => { setCurrency(cur); setCurrencyMenuOpen(false); }}
                      className={`block w-full text-left px-3 py-2 text-sm whitespace-nowrap ${
                        currency === cur ? 'text-[#00a8cc] bg-[#00a8cc]/10 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {currencyLabel[cur]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Request info CTA */}
            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 bg-[#ffa500] text-white text-sm font-bold px-4 sm:px-5 py-2 rounded-full hover:bg-[#e69400] transition whitespace-nowrap"
            >
              <span className="hidden sm:inline">{t.requestInfo}</span>
              <span className="sm:hidden" aria-hidden>📩</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#0d1f2d] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Parcheggiato: login/CRM non incluso nella Phase 1 — riattivare quando serve
            <Link href="/login" className="hidden sm:block border border-[#0d1f2d] text-[#0d1f2d] text-sm font-semibold px-5 py-2 rounded-full hover:bg-gray-50">
              {t.login}
            </Link>
            */}
          </div>
        </div>

        {/* Row 2: menu links */}
        <div className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between text-sm font-medium text-gray-700">
            <div className="flex items-center gap-6 overflow-x-auto">
              <Link href="/" className="hover:text-[#00a8cc] whitespace-nowrap">{t.navHome}</Link>
              <Link href="/quick-booking" className="hover:text-[#00a8cc] whitespace-nowrap font-semibold text-[#00a8cc]">Booking</Link>
              <Link href="/packages" className="hover:text-[#00a8cc] whitespace-nowrap">{t.navPackages}</Link>
              <Link href="/about" className="hover:text-[#00a8cc] whitespace-nowrap">{t.navAbout}</Link>
              <Link href="/contact" className="hover:text-[#00a8cc] whitespace-nowrap">{t.footerContact}</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-[560px] md:h-[640px]">
        <HeroCarousel />

        {/* Hero headline */}
        <div className="absolute inset-x-0 top-0 pt-10 sm:pt-16 z-10 text-center px-4">
          <h1 className="text-3xl sm:text-5xl font-black text-white drop-shadow-lg leading-tight">
            {t.heroTitle}
          </h1>
        </div>

      </section>

      {/* STATS BAR */}
      <section className="pt-48 md:pt-32 pb-8 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center px-4">
          {[
            { value: `${activeTours.length}+`, label: t.statTours },
            { value: '4', label: t.statDestinations },
            { value: '2h', label: t.statTravelers },
            { value: '24/7', label: t.statRating }
          ].map((stat) => (
            <Reveal key={stat.label}>
              <div>
                <div className="text-3xl font-bold text-[#00a8cc]">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d1f2d] mb-8">{t.howItWorks}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[t.step1, t.step2, t.step3].map((step, i) => (
              <Reveal key={step} delay={i * 150}>
                <div>
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#00a8cc] text-white flex items-center justify-center text-xl font-bold mb-4">
                    {i + 1}
                  </div>
                  <p className="font-semibold text-[#0d1f2d]">{step}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#ffa500] mb-1">{t.packagesEyebrow}</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0d1f2d]">{t.packagesTitle}</h2>
              </div>
              <Link href="/packages" className="text-[#00a8cc] font-semibold text-sm hover:underline whitespace-nowrap">{t.packagesViewAll} →</Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {bundles.map((bundle, i) => (
              <Reveal key={bundle.id} delay={i * 100}>
                <Link
                  href={`/packages/${bundle.id}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="relative h-36">
                    <Image src={bundle.image} alt={bundle.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2 right-2 bg-[#0d1f2d] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      €{bundle.price}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-base">{bundle.name}</h3>
                    <p className="text-gray-500 text-xs mt-1">{bundle.subtitle}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 WAYS TO LIVE SHARM */}
      <section className="py-12 bg-[#f5f7fa]">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-[#00a8cc] mb-2">{t.waysEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d1f2d] mb-8">{t.waysTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: '🐠', label: t.wayReef, href: '/packages' },
              { icon: '🏜️', label: t.wayDesert, href: '/packages' },
              { icon: '🕌', label: t.wayCulture, href: '/packages' },
              { icon: '🌃', label: t.wayCity, href: '/packages' },
              { icon: '🏛️', label: t.wayAbroad, href: '/packages' }
            ].map((way, i) => (
              <Reveal key={way.label} delay={i * 80}>
                <Link
                  href={way.href}
                  className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition border border-gray-100 hover:border-[#00a8cc]/30"
                >
                  <span className="text-3xl">{way.icon}</span>
                  <span className="font-bold text-[#0d1f2d] text-xs sm:text-sm">{way.label}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d1f2d] mb-6 text-center">{t.faqTitle}</h2>
          </Reveal>
          <div className="space-y-3">
            {faqs.map((key, i) => (
              <Reveal key={key} delay={i * 80}>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === key ? null : key)}
                    className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-[#0d1f2d] hover:bg-gray-50"
                  >
                    {t[`${key}q`]}
                    <span className={`transition-transform ${openFaq === key ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <div
                    className="grid transition-all duration-300"
                    style={{ gridTemplateRows: openFaq === key ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-gray-600 text-sm">{t[`${key}a`]}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HELP CTA */}
      <section className="py-4 px-4">
        <Reveal>
          <div className="max-w-6xl mx-auto bg-[#0e2a5e] rounded-2xl px-6 py-10 md:px-10 flex flex-col items-center text-center">
            <h2 className="text-white text-xl md:text-2xl font-bold mb-6">{t.helpTitle}</h2>
            <a
              href="https://wa.me/000000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-8 py-3 rounded-full hover:bg-[#1ebe57] transition"
            >
              <Image src="/social/whatsapp.png" alt="" width={22} height={22} />
              {t.helpWhatsapp}
            </a>
            <p className="text-white/70 text-sm mt-3">{t.helpAssistance}</p>
          </div>
        </Reveal>
      </section>

      {/* SOCIAL GALLERY */}
      <section className="py-12 px-4 bg-[#f5f7fa]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d1f2d] text-center mb-2">{t.galleryTitle}</h2>
            <p className="text-gray-500 text-center text-sm mb-8">{t.gallerySubtitle}</p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 auto-rows-35 sm:auto-rows-40">
            {galleryItems.map((item, i) => (
              <Reveal key={item.id} delay={i * 60} className={item.tall ? 'row-span-2' : ''}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block w-full h-full rounded-xl overflow-hidden"
                >
                  <Image src={item.image} alt="" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <span className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center text-lg opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all">
                      ▶
                    </span>
                  </div>
                  <span className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                    {socialGlyph[item.source]}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 mb-6">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-[#ffa500] mb-1 text-center">{t.reviewsEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d1f2d] text-center">{t.reviewsTitle}</h2>
            <p className="text-gray-500 text-sm text-center mt-2">5.0 ★★★★★ · 392 {t.reviewsCount}</p>
          </Reveal>
        </div>
        <ReviewsMarquee />
      </section>

      {/* TIPS BEFORE YOU GO */}
      <section className="py-12 bg-[#f5f7fa]">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-[#00a8cc] mb-2">{t.tipsEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d1f2d] mb-8">{t.tipsTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '☀️', text: t.tip1 },
              { icon: '🧴', text: t.tip2 },
              { icon: '🤿', text: t.tip3 },
              { icon: '👨‍👩‍👧', text: t.tip4 }
            ].map((tip, i) => (
              <Reveal key={tip.text} delay={i * 80}>
                <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-start gap-3">
                  <span className="text-2xl shrink-0">{tip.icon}</span>
                  <p className="text-sm text-gray-700">{tip.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CREATE YOUR PACKAGE CTA */}
      <section className="bg-[#0d1f2d] py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <p className="text-[#ffa500] text-xs font-bold uppercase tracking-widest mb-2">{t.customEyebrow}</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
              {t.customTitle1} <span className="text-[#ffa500]">{t.customTitleHighlight}</span> {t.customTitle2}
            </h2>
            <p className="text-white/70 text-sm max-w-lg">{t.customDesc}</p>
            <div className="flex items-center gap-4 mt-3 text-white/60 text-xs justify-center lg:justify-start">
              <span>⏱ {t.customTime}</span>
              <span>💬 {t.customNoCommit}</span>
            </div>
          </div>
          <Link
            href="/packages/create"
            className="shrink-0 bg-[#ffa500] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#e69400] transition whitespace-nowrap"
          >
            {t.customCta} →
          </Link>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-10 bg-white">
        <div className="max-w-md mx-auto px-4 text-center">
          <h3 className="font-bold text-[#0d1f2d] mb-1">{t.newsletterTitle}</h3>
          <p className="text-gray-500 text-sm mb-4">{t.newsletterSubtitle}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const email = (e.currentTarget.elements.namedItem('newsletterEmail') as HTMLInputElement).value;
              window.location.href = `mailto:info@cdalise.com?subject=${encodeURIComponent('Iscrizione Newsletter')}&body=${encodeURIComponent(`Vorrei iscrivermi alla newsletter. Email: ${email}`)}`;
            }}
            className="flex gap-2"
          >
            <input
              name="newsletterEmail"
              type="email"
              required
              placeholder={t.newsletterPlaceholder}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 text-sm"
            />
            <button type="submit" className="bg-[#ffa500] text-white font-bold px-6 rounded-lg hover:bg-[#e69400]">
              {t.newsletterBtn}
            </button>
          </form>
        </div>
      </section>

      <Footer />

      <FloatingButtons />
      <MobileBottomNav />

      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.1) translate(-1%, -1%); }
          100% { transform: scale(1) translate(0, 0); }
        }
      `}</style>
    </div>
  );
}
