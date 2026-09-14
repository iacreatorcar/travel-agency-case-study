'use client';

import { Suspense, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Lang, TourType, TourCategory, tours } from '../../lib/tours';
import { destinations } from '../../lib/destinations';
import Header from '../vetrina/Header';
import Footer from '../vetrina/Footer';
import { getMainNavLinks } from '../../lib/nav';

const PRICE_MIN = 0;
const PRICE_MAX = 200;

const translations: {
  [key in Lang]: {
    navHome: string;
    navTours: string;
    navHotels: string;
    navContact: string;
    eyebrow: string;
    allTours: string;
    waterSports: string;
    all: string;
    specialOffer: string;
    specialOffers: string;
    startsFrom: string;
    empty: string;
    typeLabels: { [key in TourType]: string };
    toursType: string;
    price: string;
    min: string;
    max: string;
    search: string;
    clearAll: string;
    sortBy: string;
    sortDefault: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
  };
} = {
  en: {
    navHome: 'Home', navTours: 'Tours', navHotels: 'Hotels', navContact: 'Contact',
    eyebrow: 'Egypt Day Tours', allTours: 'Egypt Tours', waterSports: 'Water Sports', all: 'All', specialOffer: 'Special Offer', specialOffers: 'Special Offers', startsFrom: 'Starts From',
    empty: 'No tours found for this filter yet — check back soon.',
    typeLabels: { 'day-tour': 'Day Tour', 'half-day': 'Half Day Tour', 'night-tour': 'Night Tours', layover: 'Layover' },
    toursType: 'Tours Type', price: 'Price', min: 'Min', max: 'Max', search: 'Search', clearAll: 'Clear all',
    sortBy: 'Sort by', sortDefault: 'Featured', sortPriceAsc: 'Price: Low to High', sortPriceDesc: 'Price: High to Low'
  },
  ar: {
    navHome: 'الرئيسية', navTours: 'الرحلات', navHotels: 'الفنادق', navContact: 'اتصل بنا',
    eyebrow: 'جولات مصر اليومية', allTours: 'رحلات مصر', waterSports: 'الرياضات المائية', all: 'الكل', specialOffer: 'عرض خاص', specialOffers: 'عروض خاصة', startsFrom: 'يبدأ من',
    empty: 'لا توجد رحلات لهذا الفلتر بعد — تحقق قريبًا.',
    typeLabels: { 'day-tour': 'جولة نهارية', 'half-day': 'نصف يوم', 'night-tour': 'جولات ليلية', layover: 'ترانزيت' },
    toursType: 'نوع الرحلة', price: 'السعر', min: 'الحد الأدنى', max: 'الحد الأقصى', search: 'بحث', clearAll: 'مسح الكل',
    sortBy: 'ترتيب حسب', sortDefault: 'مميزة', sortPriceAsc: 'السعر: من الأقل', sortPriceDesc: 'السعر: من الأعلى'
  },
  it: {
    navHome: 'Home', navTours: 'Escursioni', navHotels: 'Hotel', navContact: 'Contatti',
    eyebrow: 'Escursioni Giornaliere in Egitto', allTours: 'Tour in Egitto', waterSports: 'Spot Acquatici', all: 'Tutti', specialOffer: 'Offerta Speciale', specialOffers: 'Offerte Speciali', startsFrom: 'A Partire Da',
    empty: 'Nessuna escursione trovata per questo filtro — torna presto a controllare.',
    typeLabels: { 'day-tour': 'Tour Giornaliero', 'half-day': 'Mezza Giornata', 'night-tour': 'Tour Notturni', layover: 'Scalo' },
    toursType: 'Tipo di Tour', price: 'Prezzo', min: 'Min', max: 'Max', search: 'Cerca', clearAll: 'Cancella tutto',
    sortBy: 'Ordina per', sortDefault: 'In Evidenza', sortPriceAsc: 'Prezzo: dal più basso', sortPriceDesc: 'Prezzo: dal più alto'
  },
  ru: {
    navHome: 'Главная', navTours: 'Туры', navHotels: 'Отели', navContact: 'Контакты',
    eyebrow: 'Однодневные туры по Египту', allTours: 'Туры по Египту', waterSports: 'Водные развлечения', all: 'Все', specialOffer: 'Спецпредложение', specialOffers: 'Спецпредложения', startsFrom: 'От',
    empty: 'По этому фильтру туров пока нет — загляните позже.',
    typeLabels: { 'day-tour': 'Дневной тур', 'half-day': 'Полдня', 'night-tour': 'Ночные туры', layover: 'Трансфер между рейсами' },
    toursType: 'Тип тура', price: 'Цена', min: 'Мин', max: 'Макс', search: 'Поиск', clearAll: 'Очистить всё',
    sortBy: 'Сортировать', sortDefault: 'Рекомендуемые', sortPriceAsc: 'Цена: по возрастанию', sortPriceDesc: 'Цена: по убыванию'
  },
  de: {
    navHome: 'Startseite', navTours: 'Touren', navHotels: 'Hotels', navContact: 'Kontakt',
    eyebrow: 'Ägypten Tagestouren', allTours: 'Ägypten Touren', waterSports: 'Wassersport', all: 'Alle', specialOffer: 'Sonderangebot', specialOffers: 'Sonderangebote', startsFrom: 'Ab',
    empty: 'Für diesen Filter noch keine Touren gefunden — schau bald wieder vorbei.',
    typeLabels: { 'day-tour': 'Tagestour', 'half-day': 'Halbtagestour', 'night-tour': 'Nachttouren', layover: 'Zwischenstopp' },
    toursType: 'Tourart', price: 'Preis', min: 'Min', max: 'Max', search: 'Suchen', clearAll: 'Alles löschen',
    sortBy: 'Sortieren nach', sortDefault: 'Empfohlen', sortPriceAsc: 'Preis: aufsteigend', sortPriceDesc: 'Preis: absteigend'
  }
};

function priceNumber(price: string) {
  return Number(price.replace(/[^\d.]/g, '')) || 0;
}

function ToursContent() {
  const [language, setLanguage] = useState<Lang>('en');
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const searchParams = useSearchParams();
  const destinationParam = searchParams.get('destination');
  const categoryParam = searchParams.get('category') as TourCategory | null;
  const themeParam = searchParams.get('theme');
  const queryParam = searchParams.get('q')?.trim().toLowerCase() ?? '';

  const [typeFilters, setTypeFilters] = useState<Set<TourType>>(new Set());
  const [specialOffersOnly, setSpecialOffersOnly] = useState(searchParams.get('offers') === '1');
  const [priceMin, setPriceMin] = useState(PRICE_MIN);
  const [priceMax, setPriceMax] = useState(PRICE_MAX);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const destination = destinations.find((d) => d.slug === destinationParam);
  const t = translations[language];

  const baseTours = useMemo(
    () =>
      tours.filter((tour) => {
        if (tour.active === false) return false;
        if (destinationParam && tour.destination !== destinationParam) return false;
        if (categoryParam && tour.category !== categoryParam) return false;
        if (themeParam && tour.theme !== themeParam) return false;
        if (!themeParam && tour.theme === 'water-sports') return false;
        if (queryParam) {
          const haystack = `${tour.title.en} ${tour.locationLabel} ${tour.summary.en}`.toLowerCase();
          if (!haystack.includes(queryParam)) return false;
        }
        return true;
      }),
    [tours, destinationParam, categoryParam, themeParam, queryParam]
  );

  const filteredTours = useMemo(() => {
    let result = baseTours.filter((tour) => {
      if (typeFilters.size > 0 && !typeFilters.has(tour.type)) return false;
      if (specialOffersOnly && !tour.specialOffer) return false;
      const price = priceNumber(tour.price);
      if (price < priceMin || price > priceMax) return false;
      return true;
    });

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => priceNumber(a.price) - priceNumber(b.price));
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => priceNumber(b.price) - priceNumber(a.price));
    }
    return result;
  }, [baseTours, typeFilters, specialOffersOnly, priceMin, priceMax, sortBy]);

  const toggleType = (type: TourType) => {
    setTypeFilters((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const clearAll = () => {
    setTypeFilters(new Set());
    setSpecialOffersOnly(false);
    setPriceMin(PRICE_MIN);
    setPriceMax(PRICE_MAX);
  };

  const hasActiveFilters = typeFilters.size > 0 || specialOffersOnly || priceMin !== PRICE_MIN || priceMax !== PRICE_MAX;

  const toggleWishlist = (slug: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        language={language}
        onLanguageChange={setLanguage}
        backHref="/"
        navLinks={getMainNavLinks(language)}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {themeParam === 'water-sports' ? t.waterSports : destination ? destination.name : t.allTours}
          </h1>
          {themeParam !== 'water-sports' && (
            <Link
              href="/tours?theme=water-sports"
              className="inline-flex items-center gap-2 bg-[#00a8cc] text-white font-semibold text-sm px-4 py-2 rounded-full hover:bg-[#0089a8] transition"
            >
              🌊 {t.waterSports}
            </Link>
          )}
        </div>

        <div>
          {/* MAIN */}
          <div>
            {/* Active filter chips + sort */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex flex-wrap gap-2 items-center">
                {hasActiveFilters && (
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-1 border border-[#00a8cc] text-[#00a8cc] rounded-full px-3 py-1 text-xs font-semibold"
                  >
                    ✕ {t.clearAll}
                  </button>
                )}
                {Array.from(typeFilters).map((type) => (
                  <span key={type} className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
                    {t.typeLabels[type]}
                    <button onClick={() => toggleType(type)}>✕</button>
                  </span>
                ))}
                {specialOffersOnly && (
                  <span className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
                    {t.specialOffers}
                    <button onClick={() => setSpecialOffersOnly(false)}>✕</button>
                  </span>
                )}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-700"
              >
                <option value="default">{t.sortBy}: {t.sortDefault}</option>
                <option value="price-asc">{t.sortPriceAsc}</option>
                <option value="price-desc">{t.sortPriceDesc}</option>
              </select>
            </div>

            {/* TOUR GRID */}
            {filteredTours.length === 0 ? (
              <p className="text-center text-gray-500 py-16">{t.empty}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {filteredTours.map((tour) => (
                  <Link
                    key={tour.slug}
                    href={`/tours/${tour.slug}`}
                    className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition overflow-hidden"
                  >
                    <div className="relative h-32 overflow-hidden">
                      <Image
                        src={tour.image}
                        alt={tour.title[language]}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {tour.specialOffer && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                          {t.specialOffer}
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(tour.slug);
                        }}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-sm"
                      >
                        {wishlist.has(tour.slug) ? '❤️' : '🤍'}
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 min-h-[2.5rem]">{tour.title[language]}</h3>
                      <p className="text-xs text-gray-500 mb-2 line-clamp-2">{tour.summary[language]}</p>
                      <div className="flex gap-1 mb-3 flex-wrap">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#00a8cc]/10 text-[#00a8cc]">
                          📍 {tour.locationLabel}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#ffa500]/10 text-[#ffa500]">
                          {t.typeLabels[tour.type]}
                        </span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="font-bold text-gray-900">
                            {tour.price}{' '}
                            {tour.originalPrice && <span className="line-through text-gray-400 text-xs">{tour.originalPrice}</span>}
                          </p>
                        </div>
                        <span className="text-[10px] border border-gray-200 rounded-full px-2 py-1 text-gray-500">
                          ⏱ {tour.duration[language]}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function ToursPage() {
  return (
    <Suspense fallback={null}>
      <ToursContent />
    </Suspense>
  );
}
