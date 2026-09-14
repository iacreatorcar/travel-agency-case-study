import { Lang } from './tours';

export interface RoutePrice {
  from: string;
  to: string;
  price: string;
}

export interface TransferOption {
  slug: string;
  city: string;
  image: string;
  seats: number;
  luggage: number;
  price: string;
  vehicle: { [key in Lang]: string };
  name: { [key in Lang]: string };
  summary: { [key in Lang]: string };
  description: { [key in Lang]: string };
  routes: RoutePrice[];
}

export const transferCities = ['Sharm El Sheikh', 'Alexandria', 'Cairo'];

export const transfers: TransferOption[] = [
  {
    slug: 'mercedes-e200',
    city: 'Sharm El Sheikh',
    image: '/hero/hero-2.jpg',
    seats: 3,
    luggage: 2,
    price: '$80',
    routes: [
      { from: 'Any Hotel In Sharm el Sheikh', to: 'Old Market', price: '$80' },
      { from: 'Any hotel in Sharm', to: 'Naama Bay', price: '$80' },
      { from: 'Any hotel in Sharm', to: 'SOHO Square', price: '$80' },
      { from: 'Any Hotel In Sharm el Sheikh', to: 'Farsha Cafe', price: '$80' },
      { from: 'Any hotel in Sharm', to: 'Dahab City', price: '$300' },
      { from: 'Sharm el Sheikh Airport', to: 'Dahab City', price: '$320' },
      { from: 'Any Hotel In Sharm El Sheikh', to: 'Taba', price: '$500' },
      { from: 'Any Hotel In Sharm El Sheikh', to: 'Nuweiba City', price: '$500' },
      { from: 'Any Hotel in Sharm El Sheikh', to: 'Airport Sharm El Sheikh', price: '$100' },
      { from: 'Sharm el Sheikh Airport', to: 'Any Hotel In Sharm', price: '$140' },
      { from: 'Sharm El Sheikh Airport', to: 'Taba Border Crossing', price: '$600' }
    ],
    vehicle: {
      en: 'Mercedes E200',
      ar: 'مرسيدس E200',
      it: 'Mercedes E200',
      ru: 'Mercedes E200',
      de: 'Mercedes E200'
    },
    name: {
      en: 'Mercedes E200 Transfer',
      ar: 'نقل بسيارة مرسيدس E200',
      it: 'Transfer Mercedes E200',
      ru: 'Трансфер на Mercedes E200',
      de: 'Mercedes E200 Transfer'
    },
    summary: {
      en: 'Book transfers with Yalla Sharm, the latest types of cars',
      ar: 'احجز النقل مع يالا شرم، بأحدث أنواع السيارات',
      it: 'Prenota i transfer con Yalla Sharm, gli ultimi modelli di auto',
      ru: 'Забронируйте трансфер с Yalla Sharm — новейшие модели автомобилей',
      de: 'Buche Transfers mit Yalla Sharm, den neuesten Fahrzeugmodellen'
    },
    description: {
      en: 'Book transfers with Yalla Sharm, the latest types of cars. Mercedes E200.',
      ar: 'احجز النقل مع يالا شرم، بأحدث أنواع السيارات. مرسيدس E200.',
      it: 'Prenota i transfer con Yalla Sharm, gli ultimi modelli di auto. Mercedes E200.',
      ru: 'Забронируйте трансфер с Yalla Sharm — новейшие модели автомобилей. Mercedes E200.',
      de: 'Buche Transfers mit Yalla Sharm, den neuesten Fahrzeugmodellen. Mercedes E200.'
    }
  },
  {
    slug: 'hyundai-h1',
    city: 'Sharm El Sheikh',
    image: 'https://picsum.photos/seed/hyundai-h1/800/500',
    seats: 5,
    luggage: 5,
    price: '$20',
    routes: [
      { from: 'Any Hotel In Sharm el Sheikh', to: 'Old Market', price: '$20' },
      { from: 'Any hotel in Sharm', to: 'Naama Bay', price: '$20' },
      { from: 'Any hotel in Sharm', to: 'SOHO Square', price: '$20' },
      { from: 'Any Hotel In Sharm el Sheikh', to: 'Farsha Cafe', price: '$20' },
      { from: 'Any hotel in Sharm', to: 'Dahab City', price: '$100' },
      { from: 'Sharm el Sheikh Airport', to: 'Dahab City', price: '$110' },
      { from: 'Any Hotel in Sharm El Sheikh', to: 'Airport Sharm El Sheikh', price: '$30' },
      { from: 'Sharm el Sheikh Airport', to: 'Any Hotel In Sharm', price: '$35' }
    ],
    vehicle: {
      en: 'Hyundai H1',
      ar: 'هيونداي H1',
      it: 'Hyundai H1',
      ru: 'Hyundai H1',
      de: 'Hyundai H1'
    },
    name: {
      en: 'Hyundai H1 Transfer',
      ar: 'نقل بسيارة هيونداي H1',
      it: 'Transfer Hyundai H1',
      ru: 'Трансфер на Hyundai H1',
      de: 'Hyundai H1 Transfer'
    },
    summary: {
      en: 'Comfortable family van transfer around Sharm El Sheikh',
      ar: 'نقل عائلي مريح بفان في شرم الشيخ',
      it: 'Transfer familiare comodo a Sharm El Sheikh',
      ru: 'Комфортный семейный трансфер по Шарм-эль-Шейху',
      de: 'Komfortabler Familien-Van-Transfer in Sharm El Sheikh'
    },
    description: {
      en: 'Book your trip in Sharm El Sheikh for you and your family with a Hyundai H1 car and enjoy the luxury. Shorten distances with Yalla Sharm.',
      ar: 'احجز رحلتك في شرم الشيخ لك ولعائلتك بسيارة هيونداي H1 واستمتع بالفخامة. اختصر المسافات مع يالا شرم.',
      it: 'Prenota il tuo viaggio a Sharm El Sheikh per te e la tua famiglia con una Hyundai H1 e goditi il lusso. Accorcia le distanze con Yalla Sharm.',
      ru: 'Забронируйте поездку по Шарм-эль-Шейху для себя и своей семьи на Hyundai H1 и насладитесь роскошью. Сократите расстояния с Yalla Sharm.',
      de: 'Buche deine Reise in Sharm El Sheikh für dich und deine Familie mit einem Hyundai H1 und genieße den Luxus. Verkürze Distanzen mit Yalla Sharm.'
    }
  },
  {
    slug: 'private-sedan',
    city: 'Sharm El Sheikh',
    image: '/tours/boat.jpg',
    seats: 3,
    luggage: 3,
    price: '€25',
    routes: [
      { from: 'Any hotel in Sharm', to: 'Sharm El Sheikh Airport', price: '€25' },
      { from: 'Sharm El Sheikh Airport', to: 'Naama Bay', price: '€25' },
      { from: 'Any hotel in Sharm', to: 'Airport Sharm El Sheikh', price: '€25' }
    ],
    vehicle: {
      en: 'Private Sedan (up to 3 people)',
      ar: 'سيارة سيدان خاصة (حتى 3 أشخاص)',
      it: 'Berlina Privata (fino a 3 persone)',
      ru: 'Частный седан (до 3 человек)',
      de: 'Privater Sedan (bis zu 3 Personen)'
    },
    name: {
      en: 'Private Airport Transfer',
      ar: 'نقل خاص من وإلى المطار',
      it: 'Transfer Privato Aeroporto',
      ru: 'Частный трансфер из аэропорта',
      de: 'Privater Flughafentransfer'
    },
    summary: {
      en: 'Direct private transfer between the airport and your hotel',
      ar: 'نقل خاص مباشر بين المطار وفندقك',
      it: 'Transfer privato diretto tra aeroporto e hotel',
      ru: 'Прямой частный трансфер между аэропортом и отелем',
      de: 'Direkter privater Transfer zwischen Flughafen und Hotel'
    },
    description: {
      en: 'Air-conditioned sedan with driver waiting at arrivals with a name sign. Door-to-door service, no shared stops.',
      ar: 'سيارة سيدان مكيفة مع سائق ينتظر في صالة الوصول حاملاً لافتة بالاسم. خدمة من الباب إلى الباب دون توقفات مشتركة.',
      it: 'Berlina con aria condizionata e autista che attende all\'arrivo con cartello nominativo. Servizio porta a porta, senza soste condivise.',
      ru: 'Кондиционируемый седан с водителем, ожидающим в зале прилёта с табличкой с именем. Услуга «от двери до двери», без общих остановок.',
      de: 'Klimatisierter Sedan mit Fahrer, der bei der Ankunft mit einem Namensschild wartet. Tür-zu-Tür-Service ohne gemeinsame Stopps.'
    }
  },
  {
    slug: 'private-van',
    city: 'Sharm El Sheikh',
    image: '/tours/safari.jpg',
    seats: 8,
    luggage: 8,
    price: '€40',
    routes: [
      { from: 'Any hotel in Sharm', to: 'Sharm El Sheikh Airport', price: '€40' },
      { from: 'Sharm El Sheikh Airport', to: 'Naama Bay', price: '€40' },
      { from: 'Any hotel in Sharm', to: 'SOHO Square', price: '€40' }
    ],
    vehicle: {
      en: 'Private Van (up to 8 people)',
      ar: 'فان خاص (حتى 8 أشخاص)',
      it: 'Van Privato (fino a 8 persone)',
      ru: 'Частный микроавтобус (до 8 человек)',
      de: 'Privater Van (bis zu 8 Personen)'
    },
    name: {
      en: 'Group Airport Transfer',
      ar: 'نقل جماعي من وإلى المطار',
      it: 'Transfer Aeroporto di Gruppo',
      ru: 'Групповой трансфер из аэропорта',
      de: 'Gruppen-Flughafentransfer'
    },
    summary: {
      en: 'Spacious van transfer ideal for families and groups',
      ar: 'نقل بفان واسع مثالي للعائلات والمجموعات',
      it: 'Transfer con van spazioso ideale per famiglie e gruppi',
      ru: 'Просторный трансфер на микроавтобусе, идеально подходит для семей и групп',
      de: 'Geräumiger Van-Transfer, ideal für Familien und Gruppen'
    },
    description: {
      en: 'Air-conditioned van with room for luggage, direct to your hotel. Great for families or groups traveling together.',
      ar: 'فان مكيف مع مساحة للأمتعة، مباشرة إلى فندقك. مثالي للعائلات أو المجموعات المسافرة معًا.',
      it: 'Van con aria condizionata e spazio per i bagagli, diretto al tuo hotel. Ideale per famiglie o gruppi in viaggio insieme.',
      ru: 'Кондиционируемый микроавтобус с местом для багажа, прямо до вашего отеля. Отлично подходит для семей или групп, путешествующих вместе.',
      de: 'Klimatisierter Van mit Platz für Gepäck, direkt zu deinem Hotel. Ideal für Familien oder Gruppen, die gemeinsam reisen.'
    }
  }
];

export function getTransferBySlug(slug: string): TransferOption | undefined {
  return transfers.find((transfer) => transfer.slug === slug);
}
