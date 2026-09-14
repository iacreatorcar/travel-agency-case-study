import { Lang } from './tours';

export interface RoomType {
  name: { [key in Lang]: string };
  occupancy: { [key in Lang]: string };
  bed: { [key in Lang]: string };
  price: string;
}

export interface HotelService {
  icon: string;
  title: { [key in Lang]: string };
  text: { [key in Lang]: string };
}

export interface Hotel {
  slug: string;
  image: string;
  pricePerNight: string;
  stars: number;
  name: { [key in Lang]: string };
  location: { [key in Lang]: string };
  summary: { [key in Lang]: string };
  description: { [key in Lang]: string };
  amenities: { icon: string; label: { [key in Lang]: string } }[];
  roomTypes: RoomType[];
  services: HotelService[];
}

export const hotels: Hotel[] = [
  {
    slug: 'coral-bay-resort',
    image: '/tours/boat.jpg',
    pricePerNight: '€80',
    stars: 4,
    name: {
      en: 'Coral Bay Resort',
      ar: 'منتجع كورال باي',
      it: 'Coral Bay Resort',
      ru: 'Коралловый залив Резорт',
      de: 'Coral Bay Resort'
    },
    location: {
      en: 'Naama Bay, Sharm El-Sheikh',
      ar: 'خليج نعمة، شرم الشيخ',
      it: 'Naama Bay, Sharm El-Sheikh',
      ru: 'Наама Бэй, Шарм-эль-Шейх',
      de: 'Naama Bay, Sharm El-Sheikh'
    },
    summary: {
      en: 'Beachfront resort with private reef access',
      ar: 'منتجع على الشاطئ مع وصول خاص إلى الشعاب المرجانية',
      it: 'Resort sulla spiaggia con accesso privato alla barriera corallina',
      ru: 'Курорт на берегу моря с частным доступом к рифу',
      de: 'Strandresort mit privatem Riffzugang'
    },
    description: {
      en: 'A 4-star beachfront resort in Naama Bay featuring three pools, a private reef for snorkeling, and rooms with sea views.',
      ar: 'منتجع 4 نجوم على الشاطئ في خليج نعمة يضم ثلاثة مسابح وشعاب مرجانية خاصة للغطس وغرف بإطلالة على البحر.',
      it: 'Un resort 4 stelle sulla spiaggia a Naama Bay con tre piscine, una barriera corallina privata per lo snorkeling e camere vista mare.',
      ru: 'Четырёхзвёздочный курорт на берегу моря в Наама Бэй с тремя бассейнами, частным рифом для снорклинга и номерами с видом на море.',
      de: 'Ein 4-Sterne-Strandresort in Naama Bay mit drei Pools, einem privaten Riff zum Schnorcheln und Zimmern mit Meerblick.'
    },
    amenities: [
      { icon: '🏊', label: { en: '3 Pools', ar: '3 مسابح', it: '3 Piscine', ru: '3 бассейна', de: '3 Pools' } },
      { icon: '📶', label: { en: 'Free Wi-Fi', ar: 'واي فاي مجاني', it: 'Wi-Fi Gratuito', ru: 'Бесплатный Wi-Fi', de: 'Kostenloses WLAN' } },
      { icon: '🏖️', label: { en: 'Private Beach', ar: 'شاطئ خاص', it: 'Spiaggia Privata', ru: 'Частный пляж', de: 'Privatstrand' } },
      { icon: '🤿', label: { en: 'Private Reef', ar: 'شعاب خاصة', it: 'Barriera Privata', ru: 'Частный риф', de: 'Privates Riff' } }
    ],
    roomTypes: [
      {
        name: { en: 'Single Room', ar: 'غرفة مفردة', it: 'Camera Singola', ru: 'Одноместный номер', de: 'Einzelzimmer' },
        occupancy: { en: '1 Guest', ar: 'ضيف واحد', it: '1 Ospite', ru: '1 гость', de: '1 Gast' },
        bed: { en: '1 Single Bed', ar: 'سرير مفرد واحد', it: '1 Letto Singolo', ru: '1 односпальная кровать', de: '1 Einzelbett' },
        price: '€80'
      },
      {
        name: { en: 'Family Suite', ar: 'جناح عائلي', it: 'Suite Familiare', ru: 'Семейный люкс', de: 'Familiensuite' },
        occupancy: { en: 'Up to 4 Guests', ar: 'حتى 4 ضيوف', it: 'Fino a 4 Ospiti', ru: 'До 4 гостей', de: 'Bis zu 4 Gäste' },
        bed: { en: '2 Double Beds', ar: 'سريران مزدوجان', it: '2 Letti Matrimoniali', ru: '2 двуспальные кровати', de: '2 Doppelbetten' },
        price: '€150'
      },
      {
        name: { en: 'Double Suite', ar: 'جناح مزدوج', it: 'Suite Doppia', ru: 'Двухместный люкс', de: 'Doppelsuite' },
        occupancy: { en: '2 Guests', ar: 'ضيفان', it: '2 Ospiti', ru: '2 гостя', de: '2 Gäste' },
        bed: { en: '1 Double Bed', ar: 'سرير مزدوج واحد', it: '1 Letto Matrimoniale', ru: '1 двуспальная кровать', de: '1 Doppelbett' },
        price: '€110'
      }
    ],
    services: [
      { icon: '🎭', title: { en: 'Animation Team', ar: 'فريق الترفيه', it: 'Team di Animazione', ru: 'Аниматоры', de: 'Animationsteam' }, text: { en: 'Daily activities and evening shows for all ages.', ar: 'أنشطة يومية وعروض مسائية لجميع الأعمار.', it: 'Attività giornaliere e spettacoli serali per tutte le età.', ru: 'Ежедневные мероприятия и вечерние шоу для всех возрастов.', de: 'Tägliche Aktivitäten und Abendshows für jedes Alter.' } },
      { icon: '🍹', title: { en: 'Lobby Bar', ar: 'بار اللوبي', it: 'Lobby Bar', ru: 'Лобби-бар', de: 'Lobby-Bar' }, text: { en: 'Relax with a drink in our open-all-day lobby bar.', ar: 'استرخِ مع مشروب في بار اللوبي المفتوح طوال اليوم.', it: 'Rilassati con un drink nel nostro lobby bar aperto tutto il giorno.', ru: 'Расслабьтесь с напитком в нашем лобби-баре, открытом весь день.', de: 'Entspanne dich mit einem Getränk in unserer ganztägig geöffneten Lobby-Bar.' } },
      { icon: '🍽️', title: { en: 'Main Restaurant', ar: 'المطعم الرئيسي', it: 'Ristorante Principale', ru: 'Главный ресторан', de: 'Hauptrestaurant' }, text: { en: 'International buffet with fresh local specialties.', ar: 'بوفيه عالمي مع أطباق محلية طازجة.', it: 'Buffet internazionale con specialità locali fresche.', ru: 'Международный шведский стол со свежими местными деликатесами.', de: 'Internationales Buffet mit frischen lokalen Spezialitäten.' } }
    ]
  },
  {
    slug: 'desert-pearl-hotel',
    image: '/tours/safari.jpg',
    pricePerNight: '€55',
    stars: 3,
    name: {
      en: 'Desert Pearl Hotel',
      ar: 'فندق لؤلؤة الصحراء',
      it: 'Desert Pearl Hotel',
      ru: 'Отель Жемчужина Пустыни',
      de: 'Desert Pearl Hotel'
    },
    location: {
      en: 'Old Market, Sharm El-Sheikh',
      ar: 'السوق القديم، شرم الشيخ',
      it: 'Old Market, Sharm El-Sheikh',
      ru: 'Старый рынок, Шарм-эль-Шейх',
      de: 'Old Market, Sharm El-Sheikh'
    },
    summary: {
      en: 'Budget-friendly hotel close to the Old Market',
      ar: 'فندق اقتصادي بالقرب من السوق القديم',
      it: 'Hotel economico vicino al Vecchio Mercato',
      ru: 'Недорогой отель рядом со Старым рынком',
      de: 'Preisgünstiges Hotel in der Nähe des Alten Marktes'
    },
    description: {
      en: 'A comfortable 3-star hotel steps from the Old Market, with rooftop pool, free breakfast and easy access to shops and restaurants.',
      ar: 'فندق مريح 3 نجوم على بعد خطوات من السوق القديم، مع مسبح على السطح وإفطار مجاني وسهولة الوصول إلى المحلات والمطاعم.',
      it: 'Un comodo hotel 3 stelle a pochi passi dal Vecchio Mercato, con piscina sul tetto, colazione gratuita e facile accesso a negozi e ristoranti.',
      ru: 'Комфортабельный 3-звёздочный отель в нескольких шагах от Старого рынка, с бассейном на крыше, бесплатным завтраком и удобным доступом к магазинам и ресторанам.',
      de: 'Ein komfortables 3-Sterne-Hotel nur wenige Schritte vom Alten Markt entfernt, mit Dachpool, kostenlosem Frühstück und einfachem Zugang zu Geschäften und Restaurants.'
    },
    amenities: [
      { icon: '🏊', label: { en: 'Rooftop Pool', ar: 'مسبح على السطح', it: 'Piscina sul Tetto', ru: 'Бассейн на крыше', de: 'Dachpool' } },
      { icon: '📶', label: { en: 'Free Wi-Fi', ar: 'واي فاي مجاني', it: 'Wi-Fi Gratuito', ru: 'Бесплатный Wi-Fi', de: 'Kostenloses WLAN' } },
      { icon: '🍳', label: { en: 'Free Breakfast', ar: 'إفطار مجاني', it: 'Colazione Gratuita', ru: 'Бесплатный завтрак', de: 'Kostenloses Frühstück' } },
      { icon: '🛍️', label: { en: 'Near Old Market', ar: 'قرب السوق القديم', it: 'Vicino al Mercato', ru: 'Рядом со Старым рынком', de: 'Nahe Altem Markt' } }
    ],
    roomTypes: [
      {
        name: { en: 'Single Room', ar: 'غرفة مفردة', it: 'Camera Singola', ru: 'Одноместный номер', de: 'Einzelzimmer' },
        occupancy: { en: '1 Guest', ar: 'ضيف واحد', it: '1 Ospite', ru: '1 гость', de: '1 Gast' },
        bed: { en: '1 Single Bed', ar: 'سرير مفرد واحد', it: '1 Letto Singolo', ru: '1 односпальная кровать', de: '1 Einzelbett' },
        price: '€55'
      },
      {
        name: { en: 'Family Suite', ar: 'جناح عائلي', it: 'Suite Familiare', ru: 'Семейный люкс', de: 'Familiensuite' },
        occupancy: { en: 'Up to 4 Guests', ar: 'حتى 4 ضيوف', it: 'Fino a 4 Ospiti', ru: 'До 4 гостей', de: 'Bis zu 4 Gäste' },
        bed: { en: '2 Double Beds', ar: 'سريران مزدوجان', it: '2 Letti Matrimoniali', ru: '2 двуспальные кровати', de: '2 Doppelbetten' },
        price: '€100'
      },
      {
        name: { en: 'Double Suite', ar: 'جناح مزدوج', it: 'Suite Doppia', ru: 'Двухместный люкс', de: 'Doppelsuite' },
        occupancy: { en: '2 Guests', ar: 'ضيفان', it: '2 Ospiti', ru: '2 гостя', de: '2 Gäste' },
        bed: { en: '1 Double Bed', ar: 'سرير مزدوج واحد', it: '1 Letto Matrimoniale', ru: '1 двуспальная кровать', de: '1 Doppelbett' },
        price: '€75'
      }
    ],
    services: [
      { icon: '🎭', title: { en: 'Animation Team', ar: 'فريق الترفيه', it: 'Team di Animazione', ru: 'Аниматоры', de: 'Animationsteam' }, text: { en: 'Daily activities and evening shows for all ages.', ar: 'أنشطة يومية وعروض مسائية لجميع الأعمار.', it: 'Attività giornaliere e spettacoli serali per tutte le età.', ru: 'Ежедневные мероприятия и вечерние шоу для всех возрастов.', de: 'Tägliche Aktivitäten und Abendshows für jedes Alter.' } },
      { icon: '🍹', title: { en: 'Lobby Bar', ar: 'بار اللوبي', it: 'Lobby Bar', ru: 'Лобби-бар', de: 'Lobby-Bar' }, text: { en: 'Relax with a drink in our open-all-day lobby bar.', ar: 'استرخِ مع مشروب في بار اللوبي المفتوح طوال اليوم.', it: 'Rilassati con un drink nel nostro lobby bar aperto tutto il giorno.', ru: 'Расслабьтесь с напитком в нашем лобби-баре, открытом весь день.', de: 'Entspanne dich mit einem Getränk in unserer ganztägig geöffneten Lobby-Bar.' } },
      { icon: '🍽️', title: { en: 'Main Restaurant', ar: 'المطعم الرئيسي', it: 'Ristorante Principale', ru: 'Главный ресторан', de: 'Hauptrestaurant' }, text: { en: 'International buffet with fresh local specialties.', ar: 'بوفيه عالمي مع أطباق محلية طازجة.', it: 'Buffet internazionale con specialità locali fresche.', ru: 'Международный шведский стол со свежими местными деликатесами.', de: 'Internationales Buffet mit frischen lokalen Spezialitäten.' } }
    ]
  }
];

export function getHotelBySlug(slug: string): Hotel | undefined {
  return hotels.find((hotel) => hotel.slug === slug);
}
