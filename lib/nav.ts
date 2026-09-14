import { Lang } from './tours';

const labels: { [key in Lang]: { home: string; booking: string; packages: string; createPackage: string; about: string; contact: string } } = {
  en: { home: 'Home', booking: 'Booking', packages: 'Packages', createPackage: 'Create Package', about: 'About', contact: 'Contact' },
  ar: { home: 'الرئيسية', booking: 'الحجز', packages: 'الباقات', createPackage: 'أنشئ باقتك', about: 'من نحن', contact: 'اتصل بنا' },
  it: { home: 'Home', booking: 'Booking', packages: 'Pacchetti', createPackage: 'Crea Pacchetto', about: 'Chi Siamo', contact: 'Contatti' },
  ru: { home: 'Главная', booking: 'Бронирование', packages: 'Пакеты', createPackage: 'Создать пакет', about: 'О нас', contact: 'Контакты' },
  de: { home: 'Startseite', booking: 'Booking', packages: 'Pakete', createPackage: 'Paket Erstellen', about: 'Über uns', contact: 'Kontakt' }
};

export function getMainNavLinks(lang: Lang) {
  const l = labels[lang];
  return [
    { href: '/', label: l.home },
    { href: '/quick-booking', label: l.booking },
    { href: '/packages', label: l.packages },
    { href: '/packages/create', label: l.createPackage },
    { href: '/about', label: l.about },
    { href: '/contact', label: l.contact }
  ];
}
