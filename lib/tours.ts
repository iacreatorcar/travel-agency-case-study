export type Lang = 'en' | 'ar' | 'it' | 'ru' | 'de';

export const LANGS: Lang[] = ['en', 'ar', 'it', 'ru', 'de'];

export type TourCategory = 'one-day' | 'multi-day' | 'island';

export const TOUR_CATEGORIES: { slug: TourCategory; label: string }[] = [
  { slug: 'one-day', label: 'One Day Tours' },
  { slug: 'multi-day', label: 'Multi Days Tours' },
  { slug: 'island', label: 'Island' }
];

export type TourType = 'day-tour' | 'half-day' | 'night-tour' | 'layover';

export const TOUR_TYPES: { slug: TourType; label: string }[] = [
  { slug: 'day-tour', label: 'Day Tours' },
  { slug: 'half-day', label: 'Half Day Tour' },
  { slug: 'night-tour', label: 'Night Tours' },
  { slug: 'layover', label: 'Layover' }
];

export interface TourAddon {
  name: { [key in Lang]: string };
  price: string;
}

export interface Tour {
  slug: string;
  active?: boolean;
  category: TourCategory;
  destination: string;
  theme?: string;
  type: TourType;
  locationLabel: string;
  image: string;
  images?: string[];
  mapQuery?: string;
  panorama360?: string;
  price: string;
  originalPrice?: string;
  specialOffer?: boolean;
  duration: { [key in Lang]: string };
  title: { [key in Lang]: string };
  summary: { [key in Lang]: string };
  description: { [key in Lang]: string };
  pickupTime: { [key in Lang]: string };
  availability: { [key in Lang]: string };
  highlights: { [key in Lang]: string[] };
  included: { [key in Lang]: string[] };
  excluded: { [key in Lang]: string[] };
  addons: TourAddon[];
}

export const tours: Tour[] = [
  {
    slug: 'ras-mohammed-boat',
    category: 'island',
    destination: 'ras-mohammed',
    type: 'day-tour',
    locationLabel: 'Ras Mohammed',
    image: '/tours/private-boat/1.jpg',
    price: '€25',
    duration: { en: '8.5 hours', ar: '8.5 ساعة', it: '8 ore e mezza', ru: '8,5 часов', de: '8,5 Stunden' },
    title: {
      en: 'Ras Mohammed and White Island Boat Trip',
      ar: 'رحلة بحرية إلى رأس محمد والجزيرة البيضاء',
      it: 'Ras Mohammed e Isola Bianca in barca',
      ru: 'Лодочная экскурсия в Рас-Мохаммед и на Белый остров',
      de: 'Bootsausflug zu Ras Mohammed und der Weißen Insel'
    },
    summary: {
      en: 'Sail to Ras Mohammed National Park for a day of snorkeling',
      ar: 'أبحر إلى متنزه رأس محمد الوطني ليوم من الغطس',
      it: 'Naviga verso il Parco Nazionale di Ras Mohammed per una giornata di snorkeling',
      ru: 'Морская прогулка в национальный парк Рас-Мохаммед для снорклинга',
      de: 'Bootsfahrt zum Nationalpark Ras Mohammed für einen Tag Schnorcheln'
    },
    description: {
      en: 'A full day by boat to Ras Mohammed National Park with three snorkeling stops on local reefs, lunch and soft drinks on board, and an optional scuba dive.',
      ar: 'يوم كامل بالقارب إلى متنزه رأس محمد الوطني مع ثلاث توقفات للغطس في الشعاب المحلية، وغداء ومشروبات غازية على متن القارب، مع إمكانية الغوص الاختيارية.',
      it: 'Una giornata intera in barca al Parco Nazionale di Ras Mohammed con tre soste per lo snorkeling sulle barriere locali, pranzo e bibite a bordo, con possibilità di immersione opzionale.',
      ru: 'Целый день на лодке в национальном парке Рас-Мохаммед с тремя остановками для снорклинга на местных рифах, обедом и напитками на борту, а также опциональным дайвингом.',
      de: 'Ein ganzer Tag per Boot zum Nationalpark Ras Mohammed mit drei Schnorchelstopps an lokalen Riffen, Mittagessen und Softdrinks an Bord sowie optionalem Gerätetauchen.'
    },
    pickupTime: { en: '8:00 - 16:30', ar: '8:00 - 16:30', it: '8:00 - 16:30', ru: '8:00 - 16:30', de: '8:00 - 16:30' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['A full-day boat trip through the crystal-clear waters of the Red Sea', 'Discover the breathtaking beauty of Ras Mohammed National Park', 'Explore some of the most beautiful snorkeling spots in the area', 'Swim among colorful coral reefs and fascinating marine life', 'Relax on board and enjoy the beautiful views of the Red Sea', 'A delicious lunch on board, according to the selected program', 'An unforgettable day combining adventure, snorkeling and relaxation'],
      ar: ['رحلة بحرية ليوم كامل عبر مياه البحر الأحمر الصافية', 'اكتشف الجمال الخلاب لمتنزه رأس محمد الوطني', 'استكشف بعضًا من أجمل أماكن الغطس في المنطقة', 'اسبح وسط الشعاب المرجانية الملونة والحياة البحرية الرائعة', 'استرخِ على متن القارب واستمتع بمناظر البحر الأحمر الجميلة', 'غداء لذيذ على متن القارب حسب البرنامج المختار', 'يوم لا يُنسى يجمع بين المغامرة والغطس والاسترخاء'],
      it: ['Un\'escursione in barca di un\'intera giornata tra le acque cristalline del Mar Rosso', 'Scopri la bellezza mozzafiato del Parco Nazionale di Ras Mohammed', 'Esplora alcuni dei più bei punti snorkeling della zona', 'Nuota tra coloratissime barriere coralline e un\'affascinante vita marina', 'Rilassati a bordo e goditi le splendide viste del Mar Rosso', 'Un delizioso pranzo a bordo, secondo il programma selezionato', 'Una giornata indimenticabile che unisce avventura, snorkeling e relax'],
      ru: ['Полнодневная лодочная экскурсия по кристально чистым водам Красного моря', 'Откройте для себя захватывающую красоту национального парка Рас-Мохаммед', 'Исследуйте одни из самых красивых мест для снорклинга в округе', 'Плавайте среди ярких коралловых рифов и удивительной морской жизни', 'Отдохните на борту и насладитесь прекрасными видами Красного моря', 'Вкусный обед на борту согласно выбранной программе', 'Незабываемый день, сочетающий приключения, снорклинг и отдых'],
      de: ['Ein ganztägiger Bootsausflug durch die kristallklaren Gewässer des Roten Meeres', 'Entdecke die atemberaubende Schönheit des Nationalparks Ras Mohammed', 'Erkunde einige der schönsten Schnorchelplätze der Gegend', 'Schwimme zwischen bunten Korallenriffen und faszinierendem Meeresleben', 'Entspanne an Bord und genieße die schöne Aussicht auf das Rote Meer', 'Ein köstliches Mittagessen an Bord, je nach gewähltem Programm', 'Ein unvergesslicher Tag voller Abenteuer, Schnorcheln und Entspannung']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'Transportation to and from the marina', 'Boat trip to Ras Mohammed', 'Entrance fees to Ras Mohammed National Park', 'Snorkeling equipment', 'Professional assistance and guidance', 'Lunch on board, according to the selected program', 'Soft drinks and water, according to the selected program'],
      ar: ['الاستلام والتوصيل من الفندق', 'النقل من وإلى المارينا', 'رحلة بحرية إلى رأس محمد', 'رسوم دخول متنزه رأس محمد الوطني', 'معدات الغطس', 'مساعدة وإرشاد احترافي', 'الغداء على متن القارب حسب البرنامج المختار', 'المشروبات الغازية والمياه حسب البرنامج المختار'],
      it: ['Transfer da/per l\'hotel', 'Trasporto da/per la marina', 'Escursione in barca a Ras Mohammed', 'Biglietti d\'ingresso al Parco Nazionale di Ras Mohammed', 'Attrezzatura da snorkeling', 'Assistenza e guida professionale', 'Pranzo a bordo, secondo il programma selezionato', 'Bibite analcoliche e acqua, secondo il programma selezionato'],
      ru: ['Трансфер из отеля и обратно', 'Транспорт до/от марины', 'Лодочная экскурсия в Рас-Мохаммед', 'Входные билеты в национальный парк Рас-Мохаммед', 'Снаряжение для снорклинга', 'Профессиональное сопровождение и инструктаж', 'Обед на борту согласно выбранной программе', 'Безалкогольные напитки и вода согласно выбранной программе'],
      de: ['Hoteltransfer hin und zurück', 'Transport von/zur Marina', 'Bootsausflug nach Ras Mohammed', 'Eintrittsgebühren für den Nationalpark Ras Mohammed', 'Schnorchelausrüstung', 'Professionelle Unterstützung und Betreuung', 'Mittagessen an Bord, je nach gewähltem Programm', 'Softdrinks und Wasser, je nach gewähltem Programm']
    },
    excluded: {
      en: ['Personal expenses', 'Professional photos and videos, if available as an optional service', 'Any additional activities or services not mentioned under "What\'s Included"'],
      ar: ['المصاريف الشخصية', 'الصور والفيديوهات الاحترافية، إن توفرت كخدمة اختيارية', 'أي أنشطة أو خدمات إضافية غير مذكورة ضمن "ماذا يشمل؟"'],
      it: ['Spese personali', 'Foto e video professionali, se disponibili come servizio opzionale', 'Qualsiasi attività o servizio aggiuntivo non menzionato in "Cosa Include?"'],
      ru: ['Личные расходы', 'Профессиональные фото и видео, если доступны как дополнительная услуга', 'Любые дополнительные мероприятия или услуги, не указанные в разделе "Что включено?"'],
      de: ['Persönliche Ausgaben', 'Professionelle Fotos und Videos, sofern als optionaler Service verfügbar', 'Alle zusätzlichen Aktivitäten oder Leistungen, die nicht unter "Was ist Enthalten?" aufgeführt sind']
    },
    addons: []
  },
  {
    slug: 'tiran-island-boat',
    category: 'island',
    destination: 'tiran',
    type: 'day-tour',
    locationLabel: 'Tiran Island',
    image: '/tours/private-boat/1.jpg',
    price: '€25',
    duration: { en: '8.5 hours', ar: '8.5 ساعة', it: '8 ore e mezza', ru: '8,5 часов', de: '8,5 Stunden' },
    title: {
      en: 'Tiran Island Boat Trip',
      ar: 'رحلة بحرية إلى جزيرة تيران',
      it: 'Isola di Tiran in barca',
      ru: 'Лодочная экскурсия на остров Тиран',
      de: 'Bootsausflug zur Insel Tiran'
    },
    summary: {
      en: 'Snorkel the famous reefs and shipwreck of Tiran Island',
      ar: 'مارس الغطس في الشعاب الشهيرة وحطام السفينة في جزيرة تيران',
      it: 'Fai snorkeling sulle famose barriere e sul relitto dell\'Isola di Tiran',
      ru: 'Снорклинг у знаменитых рифов и затонувшего судна острова Тиран',
      de: 'Schnorchle an den berühmten Riffen und dem Wrack der Insel Tiran'
    },
    description: {
      en: 'A boat day to the Tiran Island National Park with three snorkeling stops, including the local shipwreck, lunch and soft drinks included.',
      ar: 'يوم بالقارب إلى متنزه جزيرة تيران الوطني مع ثلاث توقفات للغطس، بما في ذلك حطام السفينة المحلي، مع الغداء والمشروبات الغازية.',
      it: 'Una giornata in barca al Parco Nazionale dell\'Isola di Tiran con tre soste per lo snorkeling, inclusa quella al relitto, pranzo e bibite incluse.',
      ru: 'День на лодке в национальном парке острова Тиран с тремя остановками для снорклинга, включая местное затонувшее судно, обед и напитки включены.',
      de: 'Ein Bootstag zum Nationalpark der Insel Tiran mit drei Schnorchelstopps, einschließlich des örtlichen Wracks, Mittagessen und Softdrinks inbegriffen.'
    },
    pickupTime: { en: '8:00 - 16:30', ar: '8:00 - 16:30', it: '8:00 - 16:30', ru: '8:00 - 16:30', de: '8:00 - 16:30' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['Snorkeling stop at the shipwreck', 'Three reef snorkeling stops', 'Lunch and soft drinks included', 'National park entrance included'],
      ar: ['توقف للغطس عند حطام السفينة', 'ثلاث توقفات للغطس في الشعاب', 'الغداء والمشروبات الغازية مشمولة', 'رسوم دخول المتنزه الوطني مشمولة'],
      it: ['Sosta snorkeling al Relitto', 'Tre soste per lo snorkeling sulla barriera', 'Pranzo e bibite analcoliche incluse', 'Ingresso al parco nazionale incluso'],
      ru: ['Остановка для снорклинга у затонувшего судна', 'Три остановки для снорклинга у рифов', 'Обед и напитки включены', 'Входной билет в нацпарк включён'],
      de: ['Schnorchelstopp am Wrack', 'Drei Riff-Schnorchelstopps', 'Mittagessen und Softdrinks inbegriffen', 'Eintritt Nationalpark inbegriffen']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'National park entrance fee', 'Snorkeling equipment', 'Lunch on board', 'Soft drinks'],
      ar: ['الاستلام والتوصيل من الفندق', 'رسوم دخول المتنزه الوطني', 'معدات الغطس', 'الغداء على متن القارب', 'المشروبات الغازية'],
      it: ['Transfer da/per l\'hotel', 'Ingresso al parco nazionale', 'Attrezzatura da snorkeling', 'Pranzo a bordo', 'Bibite analcoliche'],
      ru: ['Трансфер из отеля и обратно', 'Входной билет в нацпарк', 'Снаряжение для снорклинга', 'Обед на борту', 'Безалкогольные напитки'],
      de: ['Hoteltransfer hin und zurück', 'Eintritt Nationalpark', 'Schnorchelausrüstung', 'Mittagessen an Bord', 'Softdrinks']
    },
    excluded: {
      en: ['Optional scuba diving at Tiran Island'],
      ar: ['الغوص الاختياري في جزيرة تيران'],
      it: ['Immersioni subacquee opzionali all\'Isola di Tiran'],
      ru: ['Опциональный дайвинг у острова Тиран'],
      de: ['Optionales Gerätetauchen bei der Insel Tiran']
    },
    addons: []
  },
  {
    slug: 'ras-mohammed-bus',
    category: 'one-day',
    destination: 'ras-mohammed',
    type: 'day-tour',
    locationLabel: 'Ras Mohammed',
    image: '/tours/private-boat/1.jpg',
    price: '€20',
    duration: { en: '6 hours', ar: '6 ساعات', it: '6 ore', ru: '6 часов', de: '6 Stunden' },
    title: {
      en: 'Ras Mohammed by Bus',
      ar: 'رأس محمد بالحافلة',
      it: 'Ras Mohammed in autobus',
      ru: 'Рас-Мохаммед на автобусе',
      de: 'Ras Mohammed mit dem Bus'
    },
    summary: {
      en: 'Visit the Gate of Allah, mangroves and the color-changing Magic Lake',
      ar: 'زر بوابة الله وأشجار المانغروف وبحيرة السحر المتغيرة اللون',
      it: 'Visita la Porta di Allah, le mangrovie e il Lago Magico che cambia colore',
      ru: 'Посетите Врата Аллаха, мангровые заросли и меняющее цвет Волшебное озеро',
      de: 'Besuche das Tor Allahs, die Mangroven und den farbwechselnden Zaubersee'
    },
    description: {
      en: 'A bus tour of Ras Mohammed visiting the Gate of Allah, the mangrove gardens and the Magic Lake, with two snorkeling stops in the national park.',
      ar: 'جولة بالحافلة في رأس محمد لزيارة بوابة الله وحدائق المانغروف وبحيرة السحر، مع توقفين للغطس في المتنزه الوطني.',
      it: 'Un tour in autobus di Ras Mohammed con visita alla Porta di Allah, ai giardini di mangrovie e al Lago Magico, con due soste per lo snorkeling nel parco nazionale.',
      ru: 'Автобусный тур по Рас-Мохаммед с посещением Врат Аллаха, мангровых садов и Волшебного озера, с двумя остановками для снорклинга в нацпарке.',
      de: 'Eine Bustour durch Ras Mohammed mit Besuch des Tors Allahs, der Mangrovengärten und des Zaubersees, mit zwei Schnorchelstopps im Nationalpark.'
    },
    pickupTime: { en: '8:00 - 14:00', ar: '8:00 - 14:00', it: '8:00 - 14:00', ru: '8:00 - 14:00', de: '8:00 - 14:00' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['Gate of Allah and mangrove gardens', 'The Magic Lake, 80% salt like the Dead Sea', 'Two reef snorkeling stops', 'Hotel transfer included'],
      ar: ['بوابة الله وحدائق المانغروف', 'بحيرة السحر بنسبة ملوحة 80% مثل البحر الميت', 'توقفان للغطس في الشعاب', 'النقل من الفندق مشمول'],
      it: ['Porta di Allah e giardini di mangrovie', 'Il Lago Magico, salinità all\'80% come il Mar Morto', 'Due soste per lo snorkeling', 'Transfer da/per l\'hotel incluso'],
      ru: ['Врата Аллаха и мангровые сады', 'Волшебное озеро с 80% солёности, как Мёртвое море', 'Две остановки для снорклинга', 'Трансфер из отеля включён'],
      de: ['Tor Allahs und Mangrovengärten', 'Der Zaubersee mit 80% Salzgehalt wie das Tote Meer', 'Zwei Schnorchelstopps', 'Hoteltransfer inbegriffen']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'National park visit', 'Snorkeling equipment', 'Licensed tour guide'],
      ar: ['الاستلام والتوصيل من الفندق', 'زيارة المتنزه الوطني', 'معدات الغطس', 'مرشد سياحي مرخص'],
      it: ['Transfer da/per l\'hotel', 'Visita al parco nazionale', 'Attrezzatura da snorkeling', 'Guida turistica autorizzata'],
      ru: ['Трансфер из отеля и обратно', 'Посещение нацпарка', 'Снаряжение для снорклинга', 'Лицензированный гид'],
      de: ['Hoteltransfer hin und zurück', 'Besuch des Nationalparks', 'Schnorchelausrüstung', 'Lizenzierter Reiseführer']
    },
    excluded: {
      en: [],
      ar: [],
      it: [],
      ru: [],
      de: []
    },
    addons: []
  },
  {
    slug: 'colored-canyon',
    category: 'one-day',
    destination: 'dahab',
    type: 'day-tour',
    locationLabel: 'Dahab',
    image: '/tours/safari.jpg',
    price: '€30',
    duration: { en: '10 hours', ar: '10 ساعات', it: '10 ore', ru: '10 часов', de: '10 Stunden' },
    title: {
      en: 'Colored Canyon by Bus',
      ar: 'الكانيون الملون بالحافلة',
      it: 'Canyon colorato in autobus',
      ru: 'Цветной каньон на автобусе',
      de: 'Colored Canyon mit dem Bus'
    },
    summary: {
      en: 'Hike through the striking rock formations of the Colored Canyon',
      ar: 'تمشَّ عبر التشكيلات الصخرية المذهلة في الكانيون الملون',
      it: 'Cammina tra le suggestive formazioni rocciose del Canyon Colorato',
      ru: 'Прогулка среди впечатляющих скальных образований Цветного каньона',
      de: 'Wandere durch die eindrucksvollen Felsformationen des Colored Canyon'
    },
    description: {
      en: 'A two-hour walk through the Colored Canyon with panoramic views of the rock formations, lunch on the Gulf of Aqaba and a snorkeling stop in Dahab National Park.',
      ar: 'مشي لمدة ساعتين عبر الكانيون الملون مع إطلالات بانورامية على التشكيلات الصخرية، وغداء على خليج العقبة وتوقف للغطس في متنزه دهب الوطني.',
      it: 'Una camminata di due ore nel Canyon Colorato con viste panoramiche sulle formazioni rocciose, pranzo sul Golfo di Aqaba e una sosta per lo snorkeling nel Parco Nazionale di Dahab.',
      ru: 'Двухчасовая прогулка по Цветному каньону с панорамными видами на скальные образования, обед на заливе Акаба и остановка для снорклинга в нацпарке Дахаб.',
      de: 'Ein zweistündiger Spaziergang durch den Colored Canyon mit Panoramablick auf die Felsformationen, Mittagessen am Golf von Akaba und ein Schnorchelstopp im Nationalpark Dahab.'
    },
    pickupTime: { en: '7:00 - 17:00', ar: '7:00 - 17:00', it: '7:00 - 17:00', ru: '7:00 - 17:00', de: '7:00 - 17:00' },
    availability: { en: 'Friday and Sunday', ar: 'الجمعة والأحد', it: 'Venerdì e domenica', ru: 'Пятница и воскресенье', de: 'Freitag und Sonntag' },
    highlights: {
      en: ['Two-hour walk through the Colored Canyon', 'Panoramic rock formation views', 'Lunch on the Gulf of Aqaba', 'Shopping time in Dahab'],
      ar: ['مشي لمدة ساعتين عبر الكانيون الملون', 'إطلالات بانورامية على التشكيلات الصخرية', 'غداء على خليج العقبة', 'وقت للتسوق في دهب'],
      it: ['Camminata di due ore nel Canyon Colorato', 'Viste panoramiche sulle formazioni rocciose', 'Pranzo sul Golfo di Aqaba', 'Tempo libero per lo shopping a Dahab'],
      ru: ['Двухчасовая прогулка по Цветному каньону', 'Панорамные виды на скальные образования', 'Обед на заливе Акаба', 'Время для шопинга в Дахабе'],
      de: ['Zweistündiger Spaziergang durch den Colored Canyon', 'Panoramablick auf Felsformationen', 'Mittagessen am Golf von Akaba', 'Shoppingzeit in Dahab']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'Lunch on the Gulf of Aqaba', 'Snorkeling stop in Dahab National Park', 'Licensed tour guide'],
      ar: ['الاستلام والتوصيل من الفندق', 'غداء على خليج العقبة', 'توقف للغطس في متنزه دهب الوطني', 'مرشد سياحي مرخص'],
      it: ['Transfer da/per l\'hotel', 'Pranzo sul Golfo di Aqaba', 'Sosta snorkeling nel Parco Nazionale di Dahab', 'Guida turistica autorizzata'],
      ru: ['Трансфер из отеля и обратно', 'Обед на заливе Акаба', 'Остановка для снорклинга в нацпарке Дахаб', 'Лицензированный гид'],
      de: ['Hoteltransfer hin und zurück', 'Mittagessen am Golf von Akaba', 'Schnorchelstopp im Nationalpark Dahab', 'Lizenzierter Reiseführer']
    },
    excluded: {
      en: ['Tipping', 'Snorkeling equipment', 'Beverages and water during lunch'],
      ar: ['الإكراميات', 'معدات الغطس', 'المشروبات والمياه أثناء الغداء'],
      it: ['Mance', 'Attrezzatura da snorkeling', 'Bevande e acqua durante il pranzo'],
      ru: ['Чаевые', 'Снаряжение для снорклинга', 'Напитки и вода во время обеда'],
      de: ['Trinkgeld', 'Schnorchelausrüstung', 'Getränke und Wasser während des Mittagessens']
    },
    addons: []
  },
  {
    slug: 'abu-galum-safari',
    category: 'one-day',
    destination: 'dahab',
    type: 'day-tour',
    locationLabel: 'Abu Galum, Dahab',
    image: '/tours/safari.jpg',
    price: '€35',
    duration: { en: '11 hours', ar: '11 ساعة', it: '11 ore', ru: '11 часов', de: '11 Stunden' },
    title: {
      en: 'Abu Galum Safari by Jeep or Bus',
      ar: 'سفاري أبو جلوم بالجيب أو الحافلة',
      it: 'Safari ad Abu Galum in jeep o autobus',
      ru: 'Сафари в Абу-Галум на джипе или автобусе',
      de: 'Abu-Galum-Safari mit Jeep oder Bus'
    },
    summary: {
      en: 'Desert 4x4 safari, a Bedouin village and camel ride on the Gulf of Aqaba',
      ar: 'سفاري بسيارة دفع رباعي في الصحراء، قرية بدوية وركوب الجمال على خليج العقبة',
      it: 'Safari nel deserto in 4x4, villaggio beduino e giro in cammello sul Golfo di Aqaba',
      ru: 'Пустынное сафари на джипе 4x4, бедуинская деревня и катание на верблюдах на заливе Акаба',
      de: 'Wüstensafari im Geländewagen, ein Beduinendorf und Kamelritt am Golf von Akaba'
    },
    description: {
      en: 'Explore the desert by 4x4 jeep or bus, visit a Bedouin village, ride a camel along the Gulf of Aqaba and snorkel at the Blue Hole National Park reefs.',
      ar: 'استكشف الصحراء بسيارة جيب دفع رباعي أو حافلة، وزر قرية بدوية، واركب الجمل على طول خليج العقبة ومارس الغطس في شعاب متنزه الثقب الأزرق.',
      it: 'Esplora il deserto in jeep 4x4 o autobus, visita un villaggio beduino, fai un giro in cammello lungo il Golfo di Aqaba e snorkeling sulle barriere del Parco Nazionale del Blue Hole.',
      ru: 'Исследуйте пустыню на джипе 4x4 или автобусе, посетите бедуинскую деревню, прокатитесь на верблюде вдоль залива Акаба и понырите у рифов нацпарка Блю-Хоул.',
      de: 'Erkunde die Wüste im 4x4-Jeep oder Bus, besuche ein Beduinendorf, reite auf einem Kamel entlang des Golfs von Akaba und schnorchle an den Riffen des Blue-Hole-Nationalparks.'
    },
    pickupTime: { en: '7:00 - 18:00', ar: '7:00 - 18:00', it: '7:00 - 18:00', ru: '7:00 - 18:00', de: '7:00 - 18:00' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['4x4 jeep or bus desert safari', 'Bedouin village visit', 'Camel ride on the Gulf of Aqaba', 'Snorkeling at Blue Hole National Park'],
      ar: ['سفاري صحراوي بجيب دفع رباعي أو حافلة', 'زيارة قرية بدوية', 'ركوب الجمل على خليج العقبة', 'الغطس في متنزه الثقب الأزرق الوطني'],
      it: ['Safari nel deserto in jeep 4x4 o autobus', 'Visita a un villaggio beduino', 'Giro in cammello sul Golfo di Aqaba', 'Snorkeling al Parco Nazionale del Blue Hole'],
      ru: ['Пустынное сафари на джипе 4x4 или автобусе', 'Посещение бедуинской деревни', 'Катание на верблюде на заливе Акаба', 'Снорклинг в нацпарке Блю-Хоул'],
      de: ['Wüstensafari im 4x4-Jeep oder Bus', 'Besuch eines Beduinendorfs', 'Kamelritt am Golf von Akaba', 'Schnorcheln im Blue-Hole-Nationalpark']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'Lunch', 'Camel ride', 'Snorkeling stop at Blue Hole National Park', 'Shopping time in Dahab'],
      ar: ['الاستلام والتوصيل من الفندق', 'الغداء', 'ركوب الجمل', 'توقف للغطس في متنزه الثقب الأزرق', 'وقت للتسوق في دهب'],
      it: ['Transfer da/per l\'hotel', 'Pranzo', 'Giro in cammello', 'Sosta snorkeling al Parco Nazionale del Blue Hole', 'Tempo libero per lo shopping a Dahab'],
      ru: ['Трансфер из отеля и обратно', 'Обед', 'Катание на верблюде', 'Остановка для снорклинга в нацпарке Блю-Хоул', 'Время для шопинга в Дахабе'],
      de: ['Hoteltransfer hin und zurück', 'Mittagessen', 'Kamelritt', 'Schnorchelstopp im Blue-Hole-Nationalpark', 'Shoppingzeit in Dahab']
    },
    excluded: { en: [], ar: [], it: [], ru: [], de: [] },
    addons: []
  },
  {
    slug: 'saint-catherine-monastery',
    category: 'one-day',
    destination: 'sinai',
    type: 'day-tour',
    locationLabel: 'Saint Catherine, Sinai',
    image: '/tours/safari.jpg',
    price: '€35',
    duration: { en: '9 hours', ar: '9 ساعات', it: '9 ore', ru: '9 часов', de: '9 Stunden' },
    title: {
      en: 'Saint Catherine Monastery by Bus',
      ar: 'دير سانت كاترين بالحافلة',
      it: 'Monastero di Santa Caterina in autobus',
      ru: 'Монастырь Святой Екатерины на автобусе',
      de: 'Katharinenkloster mit dem Bus'
    },
    summary: {
      en: 'Visit the world\'s oldest continuously inhabited Christian monastery',
      ar: 'زر أقدم دير مسيحي مأهول باستمرار في العالم',
      it: 'Visita il più antico monastero cristiano abitato ininterrottamente al mondo',
      ru: 'Посетите старейший непрерывно населённый христианский монастырь в мире',
      de: 'Besuche das älteste ununterbrochen bewohnte christliche Kloster der Welt'
    },
    description: {
      en: 'Explore the church and mosque of Saint Catherine\'s Monastery, the Burning Bush and the Well of Moses, said to bless childless couples according to Christian tradition.',
      ar: 'استكشف كنيسة ومسجد دير سانت كاترين، والعليقة المشتعلة وبئر موسى، الذي يُقال إنه يبارك الأزواج الذين لا ينجبون وفقًا للتقاليد المسيحية.',
      it: 'Esplora la chiesa e la moschea del Monastero di Santa Caterina, il roveto ardente e il Pozzo di Mosè, che secondo la tradizione cristiana benedice le coppie senza figli.',
      ru: 'Исследуйте церковь и мечеть монастыря Святой Екатерины, Неопалимую купину и Колодец Моисея, который, по христианской традиции, благословляет бездетные пары.',
      de: 'Erkunde die Kirche und Moschee des Katharinenklosters, den brennenden Dornbusch und den Mosesbrunnen, der laut christlicher Tradition kinderlose Paare segnet.'
    },
    pickupTime: { en: '7:00 - 16:00', ar: '7:00 - 16:00', it: '7:00 - 16:00', ru: '7:00 - 16:00', de: '7:00 - 16:00' },
    availability: { en: 'Monday, Thursday and Saturday', ar: 'الاثنين والخميس والسبت', it: 'Lunedì, giovedì e sabato', ru: 'Понедельник, четверг и суббота', de: 'Montag, Donnerstag und Samstag' },
    highlights: {
      en: ['The world\'s oldest inhabited Christian monastery', 'The Burning Bush', 'The Well of Moses', 'Monastery gift shop'],
      ar: ['أقدم دير مسيحي مأهول في العالم', 'العليقة المشتعلة', 'بئر موسى', 'متجر هدايا الدير'],
      it: ['Il più antico monastero cristiano abitato al mondo', 'Il roveto ardente', 'Il Pozzo di Mosè', 'Negozio di articoli da regalo del monastero'],
      ru: ['Старейший населённый христианский монастырь в мире', 'Неопалимая купина', 'Колодец Моисея', 'Сувенирный магазин монастыря'],
      de: ['Das älteste bewohnte christliche Kloster der Welt', 'Der brennende Dornbusch', 'Der Mosesbrunnen', 'Klosterladen']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'Breakfast', 'Monastery visit', 'Shopping time in Dahab'],
      ar: ['الاستلام والتوصيل من الفندق', 'الإفطار', 'زيارة الدير', 'وقت للتسوق في دهب'],
      it: ['Transfer da/per l\'hotel', 'Colazione', 'Visita al monastero', 'Tempo libero per lo shopping a Dahab'],
      ru: ['Трансфер из отеля и обратно', 'Завтрак', 'Посещение монастыря', 'Время для шопинга в Дахабе'],
      de: ['Hoteltransfer hin und zurück', 'Frühstück', 'Klosterbesuch', 'Shoppingzeit in Dahab']
    },
    excluded: {
      en: ['Any extras not mentioned in the itinerary', 'Personal expenses', 'Beverages and water during lunch and dinner'],
      ar: ['أي إضافات غير مذكورة في البرنامج', 'المصاريف الشخصية', 'المشروبات والمياه أثناء الغداء والعشاء'],
      it: ['Eventuali extra non menzionati nell\'itinerario', 'Spese personali', 'Bevande e acqua durante il pranzo e la cena'],
      ru: ['Любые дополнительные услуги, не указанные в программе', 'Личные расходы', 'Напитки и вода во время обеда и ужина'],
      de: ['Etwaige nicht im Programm genannte Extras', 'Persönliche Ausgaben', 'Getränke und Wasser während Mittag- und Abendessen']
    },
    addons: []
  },
  {
    slug: 'mount-sinai-climb',
    category: 'one-day',
    destination: 'sinai',
    type: 'night-tour',
    locationLabel: 'Mount Sinai',
    image: '/tours/safari.jpg',
    price: '€40',
    duration: { en: '16 hours (overnight)', ar: '16 ساعة (رحلة ليلية)', it: '16 ore (notturno)', ru: '16 часов (ночная поездка)', de: '16 Stunden (Nachtfahrt)' },
    title: {
      en: 'Mount Sinai and Saint Catherine Monastery by Bus',
      ar: 'جبل سيناء ودير سانت كاترين بالحافلة',
      it: 'Monte Sinai e Monastero di Santa Caterina in autobus',
      ru: 'Гора Синай и монастырь Святой Екатерины на автобусе',
      de: 'Sinai-Berg und Katharinenkloster mit dem Bus'
    },
    summary: {
      en: 'Climb Mount Sinai overnight and watch the sunrise from the summit',
      ar: 'تسلق جبل سيناء ليلاً وشاهد شروق الشمس من القمة',
      it: 'Scala il Monte Sinai di notte e ammira l\'alba dalla vetta',
      ru: 'Ночное восхождение на гору Синай и рассвет с вершины',
      de: 'Besteige den Sinai-Berg über Nacht und erlebe den Sonnenaufgang vom Gipfel'
    },
    description: {
      en: 'A three-hour night climb of Mount Sinai to watch the sunrise from the summit, followed by a visit to the church and mosque of Saint Catherine\'s Monastery and the Burning Bush.',
      ar: 'تسلق ليلي لمدة ثلاث ساعات لجبل سيناء لمشاهدة شروق الشمس من القمة، يليه زيارة لكنيسة ومسجد دير سانت كاترين والعليقة المشتعلة.',
      it: 'Una scalata notturna di tre ore sul Monte Sinai per ammirare l\'alba dalla vetta, seguita da una visita alla chiesa e alla moschea del Monastero di Santa Caterina e al roveto ardente.',
      ru: 'Трёхчасовое ночное восхождение на гору Синай, чтобы увидеть рассвет с вершины, с последующим посещением церкви и мечети монастыря Святой Екатерины и Неопалимой купины.',
      de: 'Ein dreistündiger Nachtaufstieg auf den Sinai-Berg, um den Sonnenaufgang vom Gipfel zu erleben, gefolgt von einem Besuch der Kirche und Moschee des Katharinenklosters und des brennenden Dornbuschs.'
    },
    pickupTime: { en: '22:00 - 14:00 (next day)', ar: '22:00 - 14:00 (اليوم التالي)', it: '22:00 - 14:00 (giorno dopo)', ru: '22:00 - 14:00 (на следующий день)', de: '22:00 - 14:00 (am nächsten Tag)' },
    availability: { en: 'Sunday, Wednesday and Friday', ar: 'الأحد والأربعاء والجمعة', it: 'Domenica, mercoledì e venerdì', ru: 'Воскресенье, среда и пятница', de: 'Sonntag, Mittwoch und Freitag' },
    highlights: {
      en: ['Three-hour night climb of Mount Sinai', 'Sunrise from the summit', 'Saint Catherine Monastery visit', 'The Burning Bush and Well of Moses'],
      ar: ['تسلق ليلي لمدة ثلاث ساعات لجبل سيناء', 'شروق الشمس من القمة', 'زيارة دير سانت كاترين', 'العليقة المشتعلة وبئر موسى'],
      it: ['Scalata notturna di tre ore sul Monte Sinai', 'Alba dalla vetta', 'Visita al Monastero di Santa Caterina', 'Il roveto ardente e il Pozzo di Mosè'],
      ru: ['Трёхчасовое ночное восхождение на гору Синай', 'Рассвет с вершины', 'Посещение монастыря Святой Екатерины', 'Неопалимая купина и Колодец Моисея'],
      de: ['Dreistündiger Nachtaufstieg auf den Sinai-Berg', 'Sonnenaufgang vom Gipfel', 'Besuch des Katharinenklosters', 'Der brennende Dornbusch und der Mosesbrunnen']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'Breakfast', 'Monastery visit', 'Shopping time in Dahab'],
      ar: ['الاستلام والتوصيل من الفندق', 'الإفطار', 'زيارة الدير', 'وقت للتسوق في دهب'],
      it: ['Transfer da/per l\'hotel', 'Colazione', 'Visita al monastero', 'Tempo libero per lo shopping a Dahab'],
      ru: ['Трансфер из отеля и обратно', 'Завтрак', 'Посещение монастыря', 'Время для шопинга в Дахабе'],
      de: ['Hoteltransfer hin und zurück', 'Frühstück', 'Klosterbesuch', 'Shoppingzeit in Dahab']
    },
    excluded: {
      en: ['Any extras not mentioned in the itinerary', 'Optional activities', 'Personal expenses', 'Beverages and water at lunch', 'Breakfast and dinner'],
      ar: ['أي إضافات غير مذكورة في البرنامج', 'الأنشطة الاختيارية', 'المصاريف الشخصية', 'المشروبات والمياه أثناء الغداء', 'الإفطار والعشاء'],
      it: ['Eventuali extra non menzionati nell\'itinerario', 'Attività facoltative', 'Spese personali', 'Bevande e acqua a pranzo', 'Colazione e cena'],
      ru: ['Любые дополнительные услуги, не указанные в программе', 'Дополнительные мероприятия', 'Личные расходы', 'Напитки и вода на обеде', 'Завтрак и ужин'],
      de: ['Etwaige nicht im Programm genannte Extras', 'Optionale Aktivitäten', 'Persönliche Ausgaben', 'Getränke und Wasser beim Mittagessen', 'Frühstück und Abendessen']
    },
    addons: []
  },
  {
    slug: 'grand-safari-dahab',
    category: 'one-day',
    destination: 'dahab',
    type: 'day-tour',
    locationLabel: 'Dahab',
    image: '/tours/safari.jpg',
    price: '€40',
    duration: { en: '10 hours', ar: '10 ساعات', it: '10 ore', ru: '10 часов', de: '10 Stunden' },
    title: {
      en: 'Grand Safari Dahab and Wadi El Weshwash by Jeep',
      ar: 'سفاري دهب الكبرى ووادي الوشواش بالجيب',
      it: 'Grand Safari Dahab e Wadi El Weshwash in jeep',
      ru: 'Гранд-сафари Дахаб и Вади-эль-Вешваш на джипе',
      de: 'Grand-Safari Dahab und Wadi El Weshwash mit dem Jeep'
    },
    summary: {
      en: 'Mountain springs, the Colored Canyon and a Dahab reef snorkel stop',
      ar: 'ينابيع جبلية والكانيون الملون وتوقف للغطس في شعاب دهب',
      it: 'Sorgenti di montagna, Canyon colorato e sosta snorkeling sulla barriera di Dahab',
      ru: 'Горные источники, Цветной каньон и остановка для снорклинга у рифа Дахаб',
      de: 'Bergquellen, der Colored Canyon und ein Schnorchelstopp am Riff von Dahab'
    },
    description: {
      en: 'A jeep safari through the Colored Canyon with a swim stop at the Wadi El Weshwash mountain springs, a grand safari through Dahab National Park and a reef snorkeling stop.',
      ar: 'سفاري بالجيب عبر الكانيون الملون مع توقف للسباحة في ينابيع جبل وادي الوشواش، وسفاري كبرى عبر متنزه دهب الوطني وتوقف للغطس في الشعاب.',
      it: 'Un safari in jeep attraverso il Canyon Colorato con una sosta per nuotare alle sorgenti di montagna di Wadi El Weshwash, un grande safari nel Parco Nazionale di Dahab e una sosta snorkeling sulla barriera.',
      ru: 'Джип-сафари через Цветной каньон с остановкой для купания у горных источников Вади-эль-Вешваш, большое сафари по нацпарку Дахаб и остановка для снорклинга у рифа.',
      de: 'Eine Jeep-Safari durch den Colored Canyon mit einem Schwimmstopp an den Bergquellen von Wadi El Weshwash, eine große Safari durch den Nationalpark Dahab und ein Riff-Schnorchelstopp.'
    },
    pickupTime: { en: '7:00 - 17:00', ar: '7:00 - 17:00', it: '7:00 - 17:00', ru: '7:00 - 17:00', de: '7:00 - 17:00' },
    availability: { en: 'Daily except Friday and Sunday', ar: 'يوميًا باستثناء الجمعة والأحد', it: 'Tutti i giorni tranne venerdì e domenica', ru: 'Ежедневно, кроме пятницы и воскресенья', de: 'Täglich außer Freitag und Sonntag' },
    highlights: {
      en: ['Colored Canyon visit', 'Swim at Wadi El Weshwash mountain springs', 'Grand safari through Dahab National Park', 'Reef snorkeling stop'],
      ar: ['زيارة الكانيون الملون', 'السباحة في ينابيع وادي الوشواش الجبلية', 'سفاري كبرى عبر متنزه دهب الوطني', 'توقف للغطس في الشعاب'],
      it: ['Visita al Canyon Colorato', 'Nuotata alle sorgenti di montagna di Wadi El Weshwash', 'Grande safari nel Parco Nazionale di Dahab', 'Sosta snorkeling sulla barriera'],
      ru: ['Посещение Цветного каньона', 'Купание у горных источников Вади-эль-Вешваш', 'Большое сафари по нацпарку Дахаб', 'Остановка для снорклинга у рифа'],
      de: ['Besuch des Colored Canyon', 'Schwimmen an den Bergquellen von Wadi El Weshwash', 'Große Safari durch den Nationalpark Dahab', 'Riff-Schnorchelstopp']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'Lunch', 'Snorkeling stop in Dahab National Park', 'Shopping time in Dahab'],
      ar: ['الاستلام والتوصيل من الفندق', 'الغداء', 'توقف للغطس في متنزه دهب الوطني', 'وقت للتسوق في دهب'],
      it: ['Transfer da/per l\'hotel', 'Pranzo', 'Sosta snorkeling nel Parco Nazionale di Dahab', 'Tempo libero per lo shopping a Dahab'],
      ru: ['Трансфер из отеля и обратно', 'Обед', 'Остановка для снорклинга в нацпарке Дахаб', 'Время для шопинга в Дахабе'],
      de: ['Hoteltransfer hin und zurück', 'Mittagessen', 'Schnorchelstopp im Nationalpark Dahab', 'Shoppingzeit in Dahab']
    },
    excluded: {
      en: ['Any extras not mentioned in the itinerary', 'Beverages and water during lunch', 'Tipping'],
      ar: ['أي إضافات غير مذكورة في البرنامج', 'المشروبات والمياه أثناء الغداء', 'الإكراميات'],
      it: ['Eventuali extra non menzionati nell\'itinerario', 'Bevande e acqua durante il pranzo', 'Mance'],
      ru: ['Любые дополнительные услуги, не указанные в программе', 'Напитки и вода во время обеда', 'Чаевые'],
      de: ['Etwaige nicht im Programm genannte Extras', 'Getränke und Wasser während des Mittagessens', 'Trinkgeld']
    },
    addons: []
  },
  {
    slug: 'buggy-desert',
    category: 'one-day',
    destination: 'sharm-el-sheikh',
    type: 'day-tour',
    locationLabel: 'Sharm El-Sheikh Desert',
    image: '/tours/safari.jpg',
    price: '€25',
    duration: { en: '1.5 hours', ar: 'ساعة ونصف', it: '1 ora e 30 minuti', ru: '1,5 часа', de: '1,5 Stunden' },
    title: {
      en: 'Desert Car Buggy',
      ar: 'باغي السيارة الصحراوي',
      it: 'Buggy per auto nel deserto',
      ru: 'Багги по пустыне',
      de: 'Wüsten-Buggy-Fahrt'
    },
    summary: {
      en: 'Drive a buggy through the desert at sunrise or sunset',
      ar: 'قُد باغي عبر الصحراء عند الشروق أو الغروب',
      it: 'Guida un buggy nel deserto all\'alba o al tramonto',
      ru: 'Прокатитесь на багги по пустыне на рассвете или закате',
      de: 'Fahre mit einem Buggy bei Sonnenauf- oder -untergang durch die Wüste'
    },
    description: {
      en: 'A 90-minute buggy drive through the desert, stopping at the Echo Temple and a Bedouin village for tea, with optional camel or horse riding.',
      ar: 'قيادة باغي لمدة 90 دقيقة عبر الصحراء، مع توقف عند معبد الصدى وقرية بدوية لشرب الشاي، مع إمكانية ركوب الجمل أو الخيل اختياريًا.',
      it: 'Una guida di 90 minuti in buggy nel deserto, con sosta all\'Echo Temple e in un villaggio beduino per il tè, con possibilità opzionale di cavalcare un cammello o un cavallo.',
      ru: '90-минутная поездка на багги по пустыне с остановкой у Храма Эха и в бедуинской деревне для чаепития, с опциональной ездой на верблюде или лошади.',
      de: 'Eine 90-minütige Buggy-Fahrt durch die Wüste mit Halt am Echo Temple und in einem Beduinendorf zum Tee, mit optionalem Kamel- oder Pferderitt.'
    },
    pickupTime: { en: 'Sunrise or sunset', ar: 'الشروق أو الغروب', it: 'Alba o tramonto', ru: 'Рассвет или закат', de: 'Sonnenauf- oder -untergang' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['90-minute desert buggy drive', 'Echo Temple stop', 'Bedouin village tea', 'Family buggy upgrade for 4 available'],
      ar: ['قيادة باغي صحراوي لمدة 90 دقيقة', 'توقف عند معبد الصدى', 'شاي في القرية البدوية', 'إمكانية ترقية باغي عائلي لـ4 أشخاص'],
      it: ['Guida in buggy nel deserto per 90 minuti', 'Sosta all\'Echo Temple', 'Tè nel villaggio beduino', 'Upgrade Family Buggy per 4 persone disponibile'],
      ru: ['90-минутная поездка на багги по пустыне', 'Остановка у Храма Эха', 'Чай в бедуинской деревне', 'Доступен семейный багги на 4 человек'],
      de: ['90-minütige Buggy-Fahrt durch die Wüste', 'Halt am Echo Temple', 'Tee im Beduinendorf', 'Family-Buggy-Upgrade für 4 Personen verfügbar']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'Buggy rental (2 people)', 'Echo Temple stop', 'Bedouin tea'],
      ar: ['الاستلام والتوصيل من الفندق', 'استئجار باغي (شخصان)', 'توقف عند معبد الصدى', 'شاي بدوي'],
      it: ['Transfer da/per l\'hotel', 'Noleggio buggy (2 persone)', 'Sosta all\'Echo Temple', 'Tè beduino'],
      ru: ['Трансфер из отеля и обратно', 'Аренда багги (2 человека)', 'Остановка у Храма Эха', 'Бедуинский чай'],
      de: ['Hoteltransfer hin und zurück', 'Buggy-Verleih (2 Personen)', 'Halt am Echo Temple', 'Beduinentee']
    },
    excluded: {
      en: ['Family Car Buggy upgrade for 4 people', 'Camel ride', 'Desert horse riding'],
      ar: ['ترقية باغي عائلي لـ4 أشخاص', 'ركوب الجمل', 'ركوب الخيل في الصحراء'],
      it: ['Upgrade Family Car Buggy per 4 persone', 'Giro in cammello', 'Equitazione nel deserto'],
      ru: ['Апгрейд семейного багги на 4 человек', 'Катание на верблюде', 'Верховая езда в пустыне'],
      de: ['Family-Car-Buggy-Upgrade für 4 Personen', 'Kamelritt', 'Wüstenreiten']
    },
    addons: []
  },
  {
    slug: 'quad-safari',
    category: 'one-day',
    destination: 'sharm-el-sheikh',
    type: 'day-tour',
    locationLabel: 'Sharm El-Sheikh Desert',
    image: '/tours/safari.jpg',
    price: '€20',
    duration: { en: '1.5 hours', ar: 'ساعة ونصف', it: '1 ora e 30 minuti', ru: '1,5 часа', de: '1,5 Stunden' },
    title: {
      en: 'Quad Bike Safari',
      ar: 'سفاري الدراجات الرباعية',
      it: 'Moto Safari in quad',
      ru: 'Сафари на квадроциклах',
      de: 'Quad-Safari'
    },
    summary: {
      en: 'Ride a quad bike through the desert dunes at sunrise or sunset',
      ar: 'اركب دراجة رباعية عبر كثبان الصحراء عند الشروق أو الغروب',
      it: 'Guida un quad tra le dune del deserto all\'alba o al tramonto',
      ru: 'Прокатитесь на квадроцикле по дюнам на рассвете или закате',
      de: 'Fahre mit dem Quad bei Sonnenauf- oder -untergang durch die Wüstendünen'
    },
    description: {
      en: 'A 90-minute quad bike safari through the desert, with a stop at the Echo Temple and a Bedouin village, plus optional camel riding and stargazing with a telescope.',
      ar: 'سفاري دراجات رباعية لمدة 90 دقيقة عبر الصحراء، مع توقف عند معبد الصدى وقرية بدوية، بالإضافة إلى ركوب الجمل ومراقبة النجوم بالتلسكوب اختياريًا.',
      it: 'Un safari in quad di 90 minuti nel deserto, con sosta all\'Echo Temple e in un villaggio beduino, oltre alla possibilità opzionale di cavalcare un cammello e osservare le stelle con un telescopio.',
      ru: '90-минутное сафари на квадроцикле по пустыне с остановкой у Храма Эха и в бедуинской деревне, а также опциональная езда на верблюде и наблюдение за звёздами в телескоп.',
      de: 'Eine 90-minütige Quad-Safari durch die Wüste mit Halt am Echo Temple und in einem Beduinendorf, plus optionalem Kamelritt und Sternbeobachtung mit Teleskop.'
    },
    pickupTime: { en: 'Sunrise or sunset', ar: 'الشروق أو الغروب', it: 'Alba o tramonto', ru: 'Рассвет или закат', de: 'Sonnenauf- oder -untergang' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['90-minute quad bike desert safari', 'Echo Temple stop', 'Bedouin village tea', 'Optional stargazing with telescope'],
      ar: ['سفاري دراجات رباعية صحراوي لمدة 90 دقيقة', 'توقف عند معبد الصدى', 'شاي في القرية البدوية', 'مراقبة النجوم بالتلسكوب اختياريًا'],
      it: ['Safari in quad nel deserto per 90 minuti', 'Sosta all\'Echo Temple', 'Tè nel villaggio beduino', 'Osservazione delle stelle con telescopio opzionale'],
      ru: ['90-минутное сафари на квадроцикле по пустыне', 'Остановка у Храма Эха', 'Чай в бедуинской деревне', 'Опциональное наблюдение за звёздами в телескоп'],
      de: ['90-minütige Quad-Wüstensafari', 'Halt am Echo Temple', 'Tee im Beduinendorf', 'Optionale Sternbeobachtung mit Teleskop']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'Quad bike rental', 'Echo Temple stop', 'Bedouin tea'],
      ar: ['الاستلام والتوصيل من الفندق', 'استئجار الدراجة الرباعية', 'توقف عند معبد الصدى', 'شاي بدوي'],
      it: ['Transfer da/per l\'hotel', 'Noleggio quad', 'Sosta all\'Echo Temple', 'Tè beduino'],
      ru: ['Трансфер из отеля и обратно', 'Аренда квадроцикла', 'Остановка у Храма Эха', 'Бедуинский чай'],
      de: ['Hoteltransfer hin und zurück', 'Quad-Verleih', 'Halt am Echo Temple', 'Beduinentee']
    },
    excluded: {
      en: ['Camel ride', 'Desert horse riding', 'Telescope stargazing'],
      ar: ['ركوب الجمل', 'ركوب الخيل في الصحراء', 'مراقبة النجوم بالتلسكوب'],
      it: ['Giro in cammello', 'Equitazione nel deserto', 'Osservazione delle stelle con telescopio'],
      ru: ['Катание на верблюде', 'Верховая езда в пустыне', 'Наблюдение за звёздами в телескоп'],
      de: ['Kamelritt', 'Wüstenreiten', 'Sternbeobachtung mit Teleskop']
    },
    addons: []
  },
  {
    slug: 'super-safari-bedouin-dinner',
    category: 'one-day',
    destination: 'sharm-el-sheikh',
    type: 'night-tour',
    locationLabel: 'Sharm El-Sheikh Desert',
    image: '/tours/safari.jpg',
    price: '€30',
    duration: { en: '4 hours', ar: '4 ساعات', it: '4 ore', ru: '4 часа', de: '4 Stunden' },
    title: {
      en: 'Super Safari and Bedouin Dinner',
      ar: 'سوبر سفاري وعشاء بدوي',
      it: 'Super Safari e cena beduina',
      ru: 'Супер-сафари и бедуинский ужин',
      de: 'Super-Safari und Beduinen-Dinner'
    },
    summary: {
      en: 'Quad safari, camel ride and Bedouin dinner with live shows',
      ar: 'سفاري بالدراجة الرباعية وركوب الجمل وعشاء بدوي مع عروض حية',
      it: 'Safari in quad, giro in cammello e cena beduina con spettacoli dal vivo',
      ru: 'Сафари на квадроцикле, катание на верблюде и бедуинский ужин с живыми шоу',
      de: 'Quad-Safari, Kamelritt und Beduinen-Dinner mit Live-Shows'
    },
    description: {
      en: 'A 90-minute quad safari with a camel ride included, followed by a Bedouin dinner in the desert with belly dancing, fire and tannoura shows, and optional stargazing.',
      ar: 'سفاري بالدراجة الرباعية لمدة 90 دقيقة مع ركوب الجمل، يليه عشاء بدوي في الصحراء مع رقص شرقي وعروض نارية وتنورة، مع مراقبة النجوم اختياريًا.',
      it: 'Un safari in quad di 90 minuti con giro in cammello incluso, seguito da una cena beduina nel deserto con danza del ventre, spettacolo del fuoco e tannoura, con osservazione delle stelle opzionale.',
      ru: '90-минутное сафари на квадроцикле с катанием на верблюде, за которым следует бедуинский ужин в пустыне с танцем живота, огненным шоу и танурой, опционально с наблюдением за звёздами.',
      de: 'Eine 90-minütige Quad-Safari mit Kamelritt, gefolgt von einem Beduinen-Dinner in der Wüste mit Bauchtanz, Feuer- und Tannoura-Show sowie optionaler Sternbeobachtung.'
    },
    pickupTime: { en: 'Sunrise or sunset', ar: 'الشروق أو الغروب', it: 'Alba o tramonto', ru: 'Рассвет или закат', de: 'Sonnenauf- oder -untergang' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['Quad safari with camel ride included', 'Bedouin dinner in the desert', 'Belly dance, fire and tannoura shows', 'Optional VIP dinner upgrade'],
      ar: ['سفاري بالدراجة الرباعية مع ركوب الجمل', 'عشاء بدوي في الصحراء', 'رقص شرقي وعروض نارية وتنورة', 'ترقية عشاء VIP اختيارية'],
      it: ['Safari in quad con giro in cammello incluso', 'Cena beduina nel deserto', 'Danza del ventre, spettacolo del fuoco e tannoura', 'Upgrade cena VIP opzionale'],
      ru: ['Сафари на квадроцикле с катанием на верблюде', 'Бедуинский ужин в пустыне', 'Танец живота, огненное шоу и танура', 'Опциональный апгрейд до VIP-ужина'],
      de: ['Quad-Safari mit Kamelritt inklusive', 'Beduinen-Dinner in der Wüste', 'Bauchtanz-, Feuer- und Tannoura-Show', 'Optionales VIP-Dinner-Upgrade']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'Quad bike rental', 'Camel ride', 'Bedouin dinner', 'Live shows'],
      ar: ['الاستلام والتوصيل من الفندق', 'استئجار الدراجة الرباعية', 'ركوب الجمل', 'عشاء بدوي', 'عروض حية'],
      it: ['Transfer da/per l\'hotel', 'Noleggio quad', 'Giro in cammello', 'Cena beduina', 'Spettacoli dal vivo'],
      ru: ['Трансфер из отеля и обратно', 'Аренда квадроцикла', 'Катание на верблюде', 'Бедуинский ужин', 'Живые шоу'],
      de: ['Hoteltransfer hin und zurück', 'Quad-Verleih', 'Kamelritt', 'Beduinen-Dinner', 'Live-Shows']
    },
    excluded: {
      en: ['Desert horse riding', 'VIP dinner upgrade', 'Telescope stargazing'],
      ar: ['ركوب الخيل في الصحراء', 'ترقية عشاء VIP', 'مراقبة النجوم بالتلسكوب'],
      it: ['Equitazione nel deserto', 'Upgrade cena VIP', 'Osservazione delle stelle con telescopio'],
      ru: ['Верховая езда в пустыне', 'Апгрейд до VIP-ужина', 'Наблюдение за звёздами в телескоп'],
      de: ['Wüstenreiten', 'VIP-Dinner-Upgrade', 'Sternbeobachtung mit Teleskop']
    },
    addons: []
  },
  {
    slug: 'horse-riding-red-sea',
    category: 'one-day',
    destination: 'nabq-bay',
    type: 'day-tour',
    locationLabel: 'Nabq Bay',
    image: '/tours/safari.jpg',
    price: '€25',
    duration: { en: '2 hours', ar: 'ساعتان', it: '2 ore', ru: '2 часа', de: '2 Stunden' },
    title: {
      en: 'Red Sea Horse Riding',
      ar: 'ركوب الخيل على البحر الأحمر',
      it: 'Equitazione sul Mar Rosso',
      ru: 'Верховая езда на Красном море',
      de: 'Reiten am Roten Meer'
    },
    summary: {
      en: 'Ride along the shore of Nabq Bay National Park at sunrise or sunset',
      ar: 'اركب على طول شاطئ متنزه خليج نبق الوطني عند الشروق أو الغروب',
      it: 'Cavalca lungo la costa del Parco Nazionale di Nabq Bay all\'alba o al tramonto',
      ru: 'Верховая прогулка вдоль побережья нацпарка Набк-Бей на рассвете или закате',
      de: 'Reite am Ufer des Nationalparks Nabq Bay bei Sonnenauf- oder -untergang'
    },
    description: {
      en: 'A one-hour horse ride through Nabq Bay National Park, passing a shipwreck view and riding into the water, with optional volleyball on the beach.',
      ar: 'ركوب خيل لمدة ساعة عبر متنزه خليج نبق الوطني، مع إطلالة على حطام سفينة وركوب في الماء، مع إمكانية لعب الكرة الطائرة اختياريًا.',
      it: 'Un\'ora a cavallo attraverso il Parco Nazionale di Nabq Bay, passando davanti a un relitto e cavalcando in acqua, con possibilità opzionale di giocare a pallavolo sulla spiaggia.',
      ru: 'Часовая верховая прогулка по нацпарку Набк-Бей мимо затонувшего судна, с заездом в воду, опционально с волейболом на пляже.',
      de: 'Ein einstündiger Ausritt durch den Nationalpark Nabq Bay vorbei an einem Schiffswrack, mit Reiten im Wasser und optionalem Beachvolleyball.'
    },
    pickupTime: { en: 'Sunrise or sunset', ar: 'الشروق أو الغروب', it: 'Alba o tramonto', ru: 'Рассвет или закат', de: 'Sonnenauf- oder -untergang' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['One-hour horse ride in Nabq Bay National Park', 'Shipwreck views', 'Ride the horse into the water', 'Optional beach volleyball'],
      ar: ['ركوب خيل لمدة ساعة في متنزه خليج نبق الوطني', 'إطلالات على حطام السفينة', 'ركوب الخيل في الماء', 'كرة طائرة على الشاطئ اختياريًا'],
      it: ['Un\'ora a cavallo nel Parco Nazionale di Nabq Bay', 'Vista sul relitto', 'Cavalcare il cavallo in acqua', 'Pallavolo sulla spiaggia opzionale'],
      ru: ['Часовая верховая прогулка в нацпарке Набк-Бей', 'Виды на затонувшее судно', 'Заезд на лошади в воду', 'Опциональный пляжный волейбол'],
      de: ['Einstündiger Ausritt im Nationalpark Nabq Bay', 'Blick auf das Schiffswrack', 'Reiten im Wasser', 'Optionales Beachvolleyball']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'One-hour horse ride', 'National park visit'],
      ar: ['الاستلام والتوصيل من الفندق', 'ركوب الخيل لمدة ساعة', 'زيارة المتنزه الوطني'],
      it: ['Transfer da/per l\'hotel', 'Un\'ora a cavallo', 'Visita al parco nazionale'],
      ru: ['Трансфер из отеля и обратно', 'Часовая верховая прогулка', 'Посещение нацпарка'],
      de: ['Hoteltransfer hin und zurück', 'Einstündiger Ausritt', 'Besuch des Nationalparks']
    },
    excluded: {
      en: ['Beach volleyball (2 hours)'],
      ar: ['الكرة الطائرة على الشاطئ (ساعتان)'],
      it: ['Pallavolo sulla spiaggia (2 ore)'],
      ru: ['Пляжный волейбол (2 часа)'],
      de: ['Beachvolleyball (2 Stunden)']
    },
    addons: []
  },
  {
    slug: 'sina-dream-day-trip',
    category: 'one-day',
    destination: 'ras-mohammed',
    type: 'day-tour',
    locationLabel: 'Ras Mohammed',
    image: '/tours/private-boat/1.jpg',
    price: '€75',
    duration: { en: '8.5 hours', ar: '8.5 ساعة', it: '8 ore e mezza', ru: '8,5 часов', de: '8,5 Stunden' },
    title: {
      en: 'Sina Dream Day Trip',
      ar: 'رحلة يوم سينا دريم',
      it: 'Gita di un giorno a Sina Dream',
      ru: 'Дневная поездка на Sina Dream',
      de: 'Sina-Dream-Tagesausflug'
    },
    summary: {
      en: 'A premium boat day at Ras Mohammed with extra water activities',
      ar: 'يوم بحري فاخر في رأس محمد مع أنشطة مائية إضافية',
      it: 'Una giornata premium in barca a Ras Mohammed con attività acquatiche extra',
      ru: 'Премиальный день на лодке в Рас-Мохаммед с дополнительными водными активностями',
      de: 'Ein Premium-Bootstag bei Ras Mohammed mit zusätzlichen Wasseraktivitäten'
    },
    description: {
      en: 'Sail to Ras Mohammed National Park aboard the Sina Dream for three snorkeling stops, lunch, soft drinks and a range of water activities, with an optional scuba dive.',
      ar: 'أبحر إلى متنزه رأس محمد الوطني على متن سينا دريم لثلاث توقفات للغطس، وغداء، ومشروبات غازية، ومجموعة من الأنشطة المائية، مع إمكانية الغوص الاختيارية.',
      it: 'Naviga verso il Parco Nazionale di Ras Mohammed a bordo della Sina Dream per tre soste di snorkeling, pranzo, bibite e diverse attività acquatiche, con possibilità di immersione opzionale.',
      ru: 'Отправляйтесь в национальный парк Рас-Мохаммед на борту Sina Dream для трёх остановок снорклинга, обеда, напитков и разных водных активностей, опционально с дайвингом.',
      de: 'Segle mit der Sina Dream zum Nationalpark Ras Mohammed für drei Schnorchelstopps, Mittagessen, Softdrinks und verschiedene Wasseraktivitäten, mit optionalem Gerätetauchen.'
    },
    pickupTime: { en: '8:00 - 16:30', ar: '8:00 - 16:30', it: '8:00 - 16:30', ru: '8:00 - 16:30', de: '8:00 - 16:30' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['Three snorkeling stops at Ras Mohammed', 'Various water activities included', 'Lunch and soft drinks on board', 'Optional scuba diving'],
      ar: ['ثلاث توقفات للغطس في رأس محمد', 'أنشطة مائية متنوعة مشمولة', 'الغداء والمشروبات الغازية على متن القارب', 'إمكانية الغوص الاختيارية'],
      it: ['Tre soste snorkeling a Ras Mohammed', 'Diverse attività acquatiche incluse', 'Pranzo e bibite a bordo', 'Immersioni subacquee opzionali'],
      ru: ['Три остановки для снорклинга в Рас-Мохаммед', 'Разные водные активности включены', 'Обед и напитки на борту', 'Опциональный дайвинг'],
      de: ['Drei Schnorchelstopps bei Ras Mohammed', 'Verschiedene Wasseraktivitäten inbegriffen', 'Mittagessen und Softdrinks an Bord', 'Optionales Gerätetauchen']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'National park entrance fee', 'Snorkeling equipment', 'Lunch on board', 'Soft drinks', 'Water activities'],
      ar: ['الاستلام والتوصيل من الفندق', 'رسوم دخول المتنزه الوطني', 'معدات الغطس', 'الغداء على متن القارب', 'المشروبات الغازية', 'الأنشطة المائية'],
      it: ['Transfer da/per l\'hotel', 'Ingresso al parco nazionale', 'Attrezzatura da snorkeling', 'Pranzo a bordo', 'Bibite analcoliche', 'Attività acquatiche'],
      ru: ['Трансфер из отеля и обратно', 'Входной билет в нацпарк', 'Снаряжение для снорклинга', 'Обед на борту', 'Безалкогольные напитки', 'Водные активности'],
      de: ['Hoteltransfer hin und zurück', 'Eintritt Nationalpark', 'Schnorchelausrüstung', 'Mittagessen an Bord', 'Softdrinks', 'Wasseraktivitäten']
    },
    excluded: {
      en: ['Optional scuba diving at Ras Mohammed'],
      ar: ['الغوص الاختياري في رأس محمد'],
      it: ['Immersioni subacquee opzionali a Ras Mohammed'],
      ru: ['Опциональный дайвинг в Рас-Мохаммед'],
      de: ['Optionales Gerätetauchen bei Ras Mohammed']
    },
    addons: []
  },
  {
    slug: 'sina-dream-night-cruise',
    category: 'one-day',
    destination: 'sharm-el-sheikh',
    type: 'night-tour',
    locationLabel: 'Sharm El-Sheikh Lagoon',
    image: '/tours/private-boat/1.jpg',
    price: '€50',
    duration: { en: '5.5 hours', ar: '5.5 ساعة', it: '5 ore e mezza', ru: '5,5 часов', de: '5,5 Stunden' },
    title: {
      en: 'Sina Dream Night Cruise',
      ar: 'رحلة سينا دريم الليلية',
      it: 'Viaggio notturno Sina Dream',
      ru: 'Ночной круиз Sina Dream',
      de: 'Sina-Dream-Nachtkreuzfahrt'
    },
    summary: {
      en: 'An evening cruise on the lagoon with dinner and live entertainment',
      ar: 'رحلة بحرية مسائية في البحيرة مع عشاء وترفيه حي',
      it: 'Una crociera serale nella laguna con cena e intrattenimento dal vivo',
      ru: 'Вечерний круиз по лагуне с ужином и живыми развлечениями',
      de: 'Eine abendliche Kreuzfahrt auf der Lagune mit Abendessen und Live-Unterhaltung'
    },
    description: {
      en: 'Cruise the Sharm El-Sheikh lagoon at sunset aboard the Sina Dream, with dinner included and a show featuring belly dancing, magic, a DJ and live violin.',
      ar: 'أبحر في بحيرة شرم الشيخ عند الغروب على متن سينا دريم، مع عشاء مشمول وعرض يضم رقصًا شرقيًا وسحرًا وموسيقى دي جي وعزف كمان حي.',
      it: 'Naviga nella laguna di Sharm El Sheikh al tramonto a bordo della Sina Dream, con cena inclusa e uno spettacolo con danza del ventre, magia, DJ e violino dal vivo.',
      ru: 'Круиз по лагуне Шарм-эль-Шейха на закате на борту Sina Dream с включённым ужином и шоу с танцем живота, магией, диджеем и живой скрипкой.',
      de: 'Fahre bei Sonnenuntergang mit der Sina Dream durch die Lagune von Sharm El-Sheikh, mit Abendessen und einer Show mit Bauchtanz, Magie, DJ und Live-Violine.'
    },
    pickupTime: { en: '17:00 - 22:30', ar: '17:00 - 22:30', it: '17:00 - 22:30', ru: '17:00 - 22:30', de: '17:00 - 22:30' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['Cruise the Sharm El-Sheikh lagoon', 'Belly dancing and magic show', 'DJ and live violin', 'Dinner included'],
      ar: ['الإبحار في بحيرة شرم الشيخ', 'رقص شرقي وعرض سحري', 'دي جي وعزف كمان حي', 'العشاء مشمول'],
      it: ['Crociera nella laguna di Sharm El Sheikh', 'Danza del ventre e spettacolo di magia', 'DJ e violinista dal vivo', 'Cena inclusa'],
      ru: ['Круиз по лагуне Шарм-эль-Шейха', 'Танец живота и шоу магии', 'Диджей и живая скрипка', 'Ужин включён'],
      de: ['Kreuzfahrt durch die Lagune von Sharm El-Sheikh', 'Bauchtanz- und Zaubershow', 'DJ und Live-Violine', 'Abendessen inbegriffen']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'Dinner', 'Live entertainment'],
      ar: ['الاستلام والتوصيل من الفندق', 'العشاء', 'ترفيه حي'],
      it: ['Transfer da/per l\'hotel', 'Cena', 'Intrattenimento dal vivo'],
      ru: ['Трансфер из отеля и обратно', 'Ужин', 'Живые развлечения'],
      de: ['Hoteltransfer hin und zurück', 'Abendessen', 'Live-Unterhaltung']
    },
    excluded: { en: [], ar: [], it: [], ru: [], de: [] },
    addons: []
  },
  {
    slug: 'dolphin-show',
    category: 'one-day',
    destination: 'sharm-el-sheikh',
    type: 'day-tour',
    locationLabel: 'Sharm El-Sheikh',
    image: '/tours/dolphins/dolphin-show.jpg',
    images: [
      '/tours/dolphins/dolphin-show.jpg',
      '/tours/dolphins/dolphina_.jpg'
    ],
    price: '€25',
    duration: { en: '1.5 hours', ar: 'ساعة ونصف', it: '1 ora e 30 minuti', ru: '1,5 часа', de: '1,5 Stunden' },
    title: {
      en: 'Dolphin Show',
      ar: 'عرض الدلافين',
      it: 'Spettacolo dei delfini',
      ru: 'Шоу дельфинов',
      de: 'Delfinshow'
    },
    summary: {
      en: 'Watch a lively dolphin show at the Dolphin Park pool',
      ar: 'شاهد عرض دلافين حيوي في حمام سباحة حديقة الدلافين',
      it: 'Guarda uno spettacolo di delfini vivace nella piscina del Dolphin Park',
      ru: 'Посмотрите яркое шоу дельфинов в бассейне Dolphin Park',
      de: 'Erlebe eine lebhafte Delfinshow im Pool des Dolphin Park'
    },
    description: {
      en: 'A one-hour dolphin show in the Dolphin Park pool, a fun outing for the whole family with hotel transfer included.',
      ar: 'عرض دلافين لمدة ساعة في حمام سباحة حديقة الدلافين، رحلة ممتعة لكل العائلة مع النقل من الفندق مشمول.',
      it: 'Uno spettacolo di delfini di un\'ora nella piscina del Dolphin Park, un\'uscita divertente per tutta la famiglia con transfer da/per l\'hotel incluso.',
      ru: 'Часовое шоу дельфинов в бассейне Dolphin Park — весёлое развлечение для всей семьи с трансфером из отеля.',
      de: 'Eine einstündige Delfinshow im Pool des Dolphin Park, ein unterhaltsamer Ausflug für die ganze Familie mit Hoteltransfer.'
    },
    pickupTime: { en: '13:30 - 15:00', ar: '13:30 - 15:00', it: '13:30 - 15:00', ru: '13:30 - 15:00', de: '13:30 - 15:00' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['One-hour dolphin show', 'Fun for the whole family', 'Dolphin Park pool setting', 'Hotel transfer included'],
      ar: ['عرض دلافين لمدة ساعة', 'ممتع لكل العائلة', 'أجواء حمام سباحة حديقة الدلافين', 'النقل من الفندق مشمول'],
      it: ['Spettacolo di delfini di un\'ora', 'Divertimento per tutta la famiglia', 'Ambientazione nella piscina del Dolphin Park', 'Transfer da/per l\'hotel incluso'],
      ru: ['Часовое шоу дельфинов', 'Развлечение для всей семьи', 'Бассейн Dolphin Park', 'Трансфер из отеля включён'],
      de: ['Einstündige Delfinshow', 'Spaß für die ganze Familie', 'Im Pool des Dolphin Park', 'Hoteltransfer inbegriffen']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'Entrance fees', 'Dolphin experience', 'Professional assistance throughout the experience', 'Transportation according to the selected package', 'Free time to enjoy the experience and take memorable photos'],
      ar: ['الاستلام والتوصيل من الفندق', 'رسوم الدخول', 'تجربة الدلافين', 'مساعدة احترافية طوال التجربة', 'النقل حسب الباقة المختارة', 'وقت حر للاستمتاع بالتجربة والتقاط صور تذكارية'],
      it: ['Transfer da/per l\'hotel', 'Biglietti d\'ingresso', 'Esperienza con i delfini', 'Assistenza professionale durante tutta l\'esperienza', 'Trasporto secondo il pacchetto selezionato', 'Tempo libero per godersi l\'esperienza e scattare foto ricordo'],
      ru: ['Трансфер из отеля и обратно', 'Входные билеты', 'Общение с дельфинами', 'Профессиональное сопровождение на протяжении всего мероприятия', 'Транспорт согласно выбранному пакету', 'Свободное время, чтобы насладиться и сделать памятные фото'],
      de: ['Hoteltransfer hin und zurück', 'Eintrittsgebühren', 'Delfin-Erlebnis', 'Professionelle Betreuung während des gesamten Erlebnisses', 'Transport je nach gewähltem Paket', 'Freizeit, um das Erlebnis zu genießen und Erinnerungsfotos zu machen']
    },
    excluded: {
      en: ['Professional photos and videos, if available as an optional service', 'Personal expenses', 'Food and drinks, unless specifically mentioned in the program', 'Any services or activities not mentioned under "What\'s Included"'],
      ar: ['الصور والفيديوهات الاحترافية، إن توفرت كخدمة اختيارية', 'المصاريف الشخصية', 'الطعام والمشروبات، ما لم يُذكر ذلك صراحةً في البرنامج', 'أي خدمات أو أنشطة غير مذكورة ضمن "ماذا يشمل؟"'],
      it: ['Foto e video professionali, se disponibili come servizio opzionale', 'Spese personali', 'Cibo e bevande, salvo diversa indicazione nel programma', 'Qualsiasi servizio o attività non menzionati in "Cosa Include?"'],
      ru: ['Профессиональные фото и видео, если доступны как дополнительная услуга', 'Личные расходы', 'Еда и напитки, если не указано отдельно в программе', 'Любые услуги или мероприятия, не указанные в разделе "Что включено?"'],
      de: ['Professionelle Fotos und Videos, sofern als optionaler Service verfügbar', 'Persönliche Ausgaben', 'Essen und Getränke, sofern im Programm nicht ausdrücklich genannt', 'Alle nicht unter "Was ist Enthalten?" aufgeführten Leistungen oder Aktivitäten']
    },
    addons: []
  },
  {
    slug: 'swim-with-dolphins',
    category: 'one-day',
    destination: 'sharm-el-sheikh',
    type: 'day-tour',
    locationLabel: 'Sharm El-Sheikh',
    image: '/tours/dolphins/dolphina_.jpg',
    price: '€77',
    duration: { en: '15 minutes', ar: '15 دقيقة', it: '15 minuti', ru: '15 минут', de: '15 Minuten' },
    title: {
      en: 'Swim with Dolphins',
      ar: 'السباحة مع الدلافين',
      it: 'Nuotare con i delfini',
      ru: 'Плавание с дельфинами',
      de: 'Schwimmen mit Delfinen'
    },
    summary: {
      en: 'An unforgettable close encounter swimming with dolphins',
      ar: 'لقاء لا يُنسى للسباحة مع الدلافين عن قرب',
      it: 'Un incontro indimenticabile nuotando con i delfini',
      ru: 'Незабываемая близкая встреча — плавание с дельфинами',
      de: 'Eine unvergessliche Begegnung beim Schwimmen mit Delfinen'
    },
    description: {
      en: 'Swim alongside dolphins for 15 minutes with a trained guide, with an option to extend the swim by another 15 minutes and combine it with the dolphin show.',
      ar: 'اسبح مع الدلافين لمدة 15 دقيقة مع مدرب متخصص، مع إمكانية تمديد السباحة 15 دقيقة إضافية والجمع بينها وبين عرض الدلافين.',
      it: 'Nuota accanto ai delfini per 15 minuti con una guida esperta, con la possibilità di estendere il nuoto di altri 15 minuti e abbinarlo allo spettacolo dei delfini.',
      ru: 'Плавайте рядом с дельфинами 15 минут с опытным инструктором, с возможностью продлить заплыв ещё на 15 минут и совместить с шоу дельфинов.',
      de: 'Schwimme 15 Minuten lang mit Delfinen unter Anleitung eines erfahrenen Trainers, mit der Option, 15 Minuten zu verlängern und die Delfinshow zu kombinieren.'
    },
    pickupTime: { en: 'From 10:00', ar: 'من الساعة 10:00', it: 'Dalle 10:00', ru: 'С 10:00', de: 'Ab 10:00' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['15 minutes swimming with dolphins', 'Trained handlers on site', 'Extra swim time available', 'Combine with the dolphin show'],
      ar: ['15 دقيقة سباحة مع الدلافين', 'مدربون متخصصون في الموقع', 'وقت سباحة إضافي متاح', 'الجمع مع عرض الدلافين'],
      it: ['15 minuti di nuoto con i delfini', 'Addestratori esperti sul posto', 'Tempo extra di nuoto disponibile', 'Abbinabile allo spettacolo dei delfini'],
      ru: ['15 минут плавания с дельфинами', 'Опытные дрессировщики на месте', 'Доступно дополнительное время', 'Можно совместить с шоу дельфинов'],
      de: ['15 Minuten Schwimmen mit Delfinen', 'Erfahrene Trainer vor Ort', 'Zusätzliche Schwimmzeit verfügbar', 'Kombinierbar mit der Delfinshow']
    },
    included: {
      en: ['Hotel pickup and drop-off', '15-minute dolphin swim'],
      ar: ['الاستلام والتوصيل من الفندق', 'سباحة مع الدلافين لمدة 15 دقيقة'],
      it: ['Transfer da/per l\'hotel', 'Nuoto con i delfini di 15 minuti'],
      ru: ['Трансфер из отеля и обратно', '15-минутное плавание с дельфинами'],
      de: ['Hoteltransfer hin und zurück', '15-minütiges Delfinschwimmen']
    },
    excluded: {
      en: ['Extra 15 minutes swimming with dolphins', 'Combined dolphin show ticket'],
      ar: ['15 دقيقة إضافية للسباحة مع الدلافين', 'تذكرة مجمعة لعرض الدلافين'],
      it: ['15 minuti extra di nuoto con i delfini', 'Biglietto combinato con lo spettacolo dei delfini'],
      ru: ['Дополнительные 15 минут плавания с дельфинами', 'Комбинированный билет на шоу дельфинов'],
      de: ['Zusätzliche 15 Minuten Delfinschwimmen', 'Kombiticket für die Delfinshow']
    },
    addons: []
  },
  {
    slug: 'albatros-water-park',
    category: 'one-day',
    destination: 'sharm-el-sheikh',
    type: 'day-tour',
    locationLabel: 'Sharm El-Sheikh',
    image: '/tours/albatros-water-park/1.jpg',
    images: [
      '/tours/albatros-water-park/1.jpg',
      '/tours/albatros-water-park/2.jpg',
      '/tours/albatros-water-park/3.jpg',
      '/tours/albatros-water-park/4.jpg',
      '/tours/albatros-water-park/5.jpg',
      '/tours/albatros-water-park/6.jpg',
      '/tours/albatros-water-park/7.jpg',
      '/tours/albatros-water-park/8.jpg',
      '/tours/albatros-water-park/9.jpg',
      '/tours/albatros-water-park/10.jpg',
      '/tours/albatros-water-park/11.jpg',
      '/tours/albatros-water-park/12.jpg'
    ],
    price: '€75',
    duration: { en: '7 hours', ar: '7 ساعات', it: '7 ore', ru: '7 часов', de: '7 Stunden' },
    title: {
      en: 'Albatros Water Park',
      ar: 'حديقة ألباتروس المائية',
      it: 'Parco acquatico Albatros',
      ru: 'Аквапарк Альбатрос',
      de: 'Albatros Water Park'
    },
    summary: {
      en: 'A full day of slides and pools with unlimited drinks',
      ar: 'يوم كامل من الزلاقات وحمامات السباحة مع مشروبات غير محدودة',
      it: 'Una giornata intera di scivoli e piscine con bevande illimitate',
      ru: 'Целый день на горках и в бассейнах с неограниченными напитками',
      de: 'Ein ganzer Tag voller Rutschen und Pools mit unbegrenzten Getränken'
    },
    description: {
      en: 'Spend the day at Albatros Water Park with its slides and pools, unlimited drinks included, plus hotel pickup and drop-off.',
      ar: 'اقضِ يومك في حديقة ألباتروس المائية بزلاقاتها وحماماتها، مع مشروبات غير محدودة مشمولة، بالإضافة إلى النقل من الفندق.',
      it: 'Trascorri la giornata al Parco Acquatico Albatros con i suoi scivoli e piscine, bevande illimitate incluse, oltre al transfer da/per l\'hotel.',
      ru: 'Проведите день в аквапарке Альбатрос с горками и бассейнами, неограниченные напитки включены, плюс трансфер из отеля.',
      de: 'Verbringe den Tag im Albatros Water Park mit Rutschen und Pools, unbegrenzte Getränke inklusive, plus Hoteltransfer.'
    },
    pickupTime: { en: '10:00 - 17:00', ar: '10:00 - 17:00', it: '10:00 - 17:00', ru: '10:00 - 17:00', de: '10:00 - 17:00' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['Water slides and pools all day', 'Unlimited drinks included', 'Hotel transfer included', 'Family-friendly fun'],
      ar: ['زلاقات مائية وحمامات سباحة طوال اليوم', 'مشروبات غير محدودة مشمولة', 'النقل من الفندق مشمول', 'متعة مناسبة للعائلات'],
      it: ['Scivoli d\'acqua e piscine per tutto il giorno', 'Bevande illimitate incluse', 'Transfer da/per l\'hotel incluso', 'Divertimento adatto a tutta la famiglia'],
      ru: ['Водные горки и бассейны весь день', 'Неограниченные напитки включены', 'Трансфер из отеля включён', 'Развлечение для всей семьи'],
      de: ['Wasserrutschen und Pools den ganzen Tag', 'Unbegrenzte Getränke inbegriffen', 'Hoteltransfer inbegriffen', 'Familienfreundlicher Spaß']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'Water park entrance', 'Unlimited drinks'],
      ar: ['الاستلام والتوصيل من الفندق', 'دخول الحديقة المائية', 'مشروبات غير محدودة'],
      it: ['Transfer da/per l\'hotel', 'Ingresso al parco acquatico', 'Bevande illimitate'],
      ru: ['Трансфер из отеля и обратно', 'Вход в аквапарк', 'Неограниченные напитки'],
      de: ['Hoteltransfer hin und zurück', 'Eintritt Wasserpark', 'Unbegrenzte Getränke']
    },
    excluded: { en: [], ar: [], it: [], ru: [], de: [] },
    addons: []
  },
  {
    slug: 'parasailing',
    category: 'one-day',
    destination: 'sharm-el-sheikh',
    theme: 'water-sports',
    type: 'day-tour',
    locationLabel: 'Sharm El-Sheikh',
    image: '/tours/private-boat/1.jpg',
    price: '€20',
    duration: { en: '20 minutes', ar: '20 دقيقة', it: '20 minuti', ru: '20 минут', de: '20 Minuten' },
    title: { en: 'Parasailing', ar: 'المظلات الشراعية', it: 'Parasailing', ru: 'Парасейлинг', de: 'Parasailing' },
    summary: {
      en: 'Soar above the Red Sea behind a speedboat',
      ar: 'حلّق فوق البحر الأحمر خلف قارب سريع',
      it: 'Vola sopra il Mar Rosso trainato da un motoscafo',
      ru: 'Полетайте над Красным морем за катером',
      de: 'Schwebe über dem Roten Meer hinter einem Speedboot'
    },
    description: {
      en: 'A 20-minute parasailing flight towed by a speedboat, bookable in one-hour time slots, with views over the Red Sea coastline.',
      ar: 'رحلة مظلات شراعية لمدة 20 دقيقة يجرها قارب سريع، يمكن حجزها ضمن فترات ساعة واحدة، مع إطلالات على ساحل البحر الأحمر.',
      it: 'Un volo di parasailing di 20 minuti trainato da un motoscafo, prenotabile in fasce orarie di un\'ora, con vista sulla costa del Mar Rosso.',
      ru: '20-минутный полёт на парасейле за катером, бронируется по часовым слотам, с видами на побережье Красного моря.',
      de: 'Ein 20-minütiger Parasailing-Flug hinter einem Speedboot, buchbar in Ein-Stunden-Zeitfenstern, mit Blick auf die Küste des Roten Meeres.'
    },
    pickupTime: { en: '10:00 - 17:00 (hourly slots)', ar: '10:00 - 17:00 (فترات كل ساعة)', it: '10:00 - 17:00 (fasce orarie)', ru: '10:00 - 17:00 (почасовые слоты)', de: '10:00 - 17:00 (Zeitfenster stündlich)' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['20-minute parasailing flight', 'Views over the Red Sea', 'Bookable hourly time slots', 'Great for all skill levels'],
      ar: ['رحلة مظلات شراعية لمدة 20 دقيقة', 'إطلالات على البحر الأحمر', 'فترات حجز كل ساعة', 'مناسبة لجميع المستويات'],
      it: ['Volo di parasailing di 20 minuti', 'Vista sul Mar Rosso', 'Fasce orarie prenotabili', 'Adatto a tutti i livelli'],
      ru: ['20-минутный полёт на парасейле', 'Виды на Красное море', 'Почасовое бронирование', 'Подходит для всех уровней'],
      de: ['20-minütiger Parasailing-Flug', 'Blick auf das Rote Meer', 'Buchbare Stundenfenster', 'Für alle Levels geeignet']
    },
    included: {
      en: ['20-minute parasailing flight', 'Safety equipment'],
      ar: ['رحلة مظلات شراعية لمدة 20 دقيقة', 'معدات السلامة'],
      it: ['Volo di parasailing di 20 minuti', 'Attrezzatura di sicurezza'],
      ru: ['20-минутный полёт на парасейле', 'Оборудование безопасности'],
      de: ['20-minütiger Parasailing-Flug', 'Sicherheitsausrüstung']
    },
    excluded: {
      en: ['Hotel pickup and drop-off'],
      ar: ['الاستلام والتوصيل من الفندق'],
      it: ['Transfer da/per l\'hotel'],
      ru: ['Трансфер из отеля и обратно'],
      de: ['Hoteltransfer hin und zurück']
    },
    addons: []
  },
  {
    slug: 'crazy-boat',
    active: false,
    category: 'one-day',
    destination: 'sharm-el-sheikh',
    theme: 'water-sports',
    type: 'day-tour',
    locationLabel: 'Sharm El-Sheikh',
    image: '/tours/private-boat/1.jpg',
    price: '€30',
    duration: { en: '20 minutes', ar: '20 دقيقة', it: '20 minuti', ru: '20 минут', de: '20 Minuten' },
    title: { en: 'Crazy Boat', ar: 'كرايزي بوت', it: 'Crazy Boat', ru: 'Крейзи-бот', de: 'Crazy Boat' },
    summary: {
      en: 'A fast, bumpy speedboat ride for thrill seekers',
      ar: 'رحلة سريعة ومثيرة بقارب سريع لعشاق الإثارة',
      it: 'Un giro veloce e adrenalinico in motoscafo',
      ru: 'Скоростная и бодрящая прогулка на катере',
      de: 'Eine schnelle, actiongeladene Speedbootfahrt'
    },
    description: {
      en: 'A 20-minute high-speed boat ride designed for thrills, bookable in one-hour time slots.',
      ar: 'رحلة بالقارب عالية السرعة لمدة 20 دقيقة مصممة للإثارة، يمكن حجزها ضمن فترات ساعة واحدة.',
      it: 'Un giro in motoscafo ad alta velocità di 20 minuti pensato per l\'adrenalina, prenotabile in fasce orarie di un\'ora.',
      ru: '20-минутная скоростная прогулка на катере для острых ощущений, бронируется по часовым слотам.',
      de: 'Eine 20-minütige Hochgeschwindigkeits-Bootsfahrt für den Adrenalinkick, buchbar in Ein-Stunden-Zeitfenstern.'
    },
    pickupTime: { en: '10:00 - 17:00 (hourly slots)', ar: '10:00 - 17:00 (فترات كل ساعة)', it: '10:00 - 17:00 (fasce orarie)', ru: '10:00 - 17:00 (почасовые слоты)', de: '10:00 - 17:00 (Zeitfenster stündlich)' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['20-minute high-speed boat ride', 'Big thrills on the Red Sea', 'Bookable hourly time slots'],
      ar: ['رحلة بقارب عالي السرعة لمدة 20 دقيقة', 'إثارة كبيرة على البحر الأحمر', 'فترات حجز كل ساعة'],
      it: ['Giro in motoscafo ad alta velocità di 20 minuti', 'Grande adrenalina sul Mar Rosso', 'Fasce orarie prenotabili'],
      ru: ['20-минутная скоростная прогулка на катере', 'Много адреналина на Красном море', 'Почасовое бронирование'],
      de: ['20-minütige Hochgeschwindigkeits-Bootsfahrt', 'Viel Nervenkitzel auf dem Roten Meer', 'Buchbare Stundenfenster']
    },
    included: {
      en: ['20-minute speedboat ride', 'Safety equipment'],
      ar: ['رحلة بالقارب السريع لمدة 20 دقيقة', 'معدات السلامة'],
      it: ['Giro in motoscafo di 20 minuti', 'Attrezzatura di sicurezza'],
      ru: ['20-минутная прогулка на катере', 'Оборудование безопасности'],
      de: ['20-minütige Speedboot-Fahrt', 'Sicherheitsausrüstung']
    },
    excluded: {
      en: ['Hotel pickup and drop-off'],
      ar: ['الاستلام والتوصيل من الفندق'],
      it: ['Transfer da/per l\'hotel'],
      ru: ['Трансфер из отеля и обратно'],
      de: ['Hoteltransfer hin und zurück']
    },
    addons: []
  },
  {
    slug: 'tube-boat',
    category: 'one-day',
    destination: 'sharm-el-sheikh',
    theme: 'water-sports',
    type: 'day-tour',
    locationLabel: 'Sharm El-Sheikh',
    image: '/tours/private-boat/1.jpg',
    price: '€20',
    duration: { en: '11 minutes', ar: '11 دقيقة', it: '11 minuti', ru: '11 минут', de: '11 Minuten' },
    title: { en: 'Tube Boat', ar: 'تيوب بوت', it: 'Tube Boat', ru: 'Тюб-бот', de: 'Tube Boat' },
    summary: {
      en: 'Hold on tight while a speedboat tows your tube',
      ar: 'تشبث جيدًا بينما يسحبك قارب سريع على الأنبوب',
      it: 'Tieniti forte mentre un motoscafo traina il tuo tubo',
      ru: 'Держитесь крепче, пока катер тянет вашу тюбу',
      de: 'Halte dich fest, während ein Speedboot deinen Schlauch zieht'
    },
    description: {
      en: 'An 11-minute towed tube ride behind a speedboat, bookable in one-hour time slots.',
      ar: 'رحلة مقطورة لمدة 11 دقيقة خلف قارب سريع، يمكن حجزها ضمن فترات ساعة واحدة.',
      it: 'Un giro trainato sul tubo di 11 minuti dietro un motoscafo, prenotabile in fasce orarie di un\'ora.',
      ru: '11-минутная поездка на тюбе за катером, бронируется по часовым слотам.',
      de: 'Eine 11-minütige Schlauchbootfahrt hinter einem Speedboot, buchbar in Ein-Stunden-Zeitfenstern.'
    },
    pickupTime: { en: '10:00 - 17:00 (hourly slots)', ar: '10:00 - 17:00 (فترات كل ساعة)', it: '10:00 - 17:00 (fasce orarie)', ru: '10:00 - 17:00 (почасовые слоты)', de: '10:00 - 17:00 (Zeitfenster stündlich)' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['11-minute towed tube ride', 'Fun for groups and families', 'Bookable hourly time slots'],
      ar: ['رحلة مقطورة لمدة 11 دقيقة', 'ممتعة للمجموعات والعائلات', 'فترات حجز كل ساعة'],
      it: ['Giro trainato sul tubo di 11 minuti', 'Divertimento per gruppi e famiglie', 'Fasce orarie prenotabili'],
      ru: ['11-минутная поездка на тюбе', 'Веселье для групп и семей', 'Почасовое бронирование'],
      de: ['11-minütige Schlauchbootfahrt', 'Spaß für Gruppen und Familien', 'Buchbare Stundenfenster']
    },
    included: {
      en: ['11-minute tube ride', 'Safety equipment'],
      ar: ['رحلة الأنبوب لمدة 11 دقيقة', 'معدات السلامة'],
      it: ['Giro sul tubo di 11 minuti', 'Attrezzatura di sicurezza'],
      ru: ['11-минутная поездка на тюбе', 'Оборудование безопасности'],
      de: ['11-minütige Schlauchbootfahrt', 'Sicherheitsausrüstung']
    },
    excluded: {
      en: ['Hotel pickup and drop-off'],
      ar: ['الاستلام والتوصيل من الفندق'],
      it: ['Transfer da/per l\'hotel'],
      ru: ['Трансфер из отеля и обратно'],
      de: ['Hoteltransfer hin und zurück']
    },
    addons: []
  },
  {
    slug: 'banana-boat',
    category: 'one-day',
    destination: 'sharm-el-sheikh',
    theme: 'water-sports',
    type: 'day-tour',
    locationLabel: 'Sharm El-Sheikh',
    image: '/tours/private-boat/1.jpg',
    price: '€20',
    duration: { en: '11 minutes', ar: '11 دقيقة', it: '11 minuti', ru: '11 минут', de: '11 Minuten' },
    title: { en: 'Banana Boat', ar: 'قارب الموز', it: 'Banana Boat', ru: 'Банан-бот', de: 'Bananenboot' },
    summary: {
      en: 'Bounce across the waves on an inflatable banana boat',
      ar: 'اقفز فوق الأمواج على قارب الموز القابل للنفخ',
      it: 'Rimbalza tra le onde su un gommone a forma di banana',
      ru: 'Прыгайте по волнам на надувном банане',
      de: 'Hüpfe über die Wellen auf einem aufblasbaren Bananenboot'
    },
    description: {
      en: 'An 11-minute banana boat ride towed by a speedboat, a fun group activity bookable in one-hour time slots.',
      ar: 'رحلة قارب الموز لمدة 11 دقيقة يجرها قارب سريع، نشاط جماعي ممتع يمكن حجزه ضمن فترات ساعة واحدة.',
      it: 'Un giro di 11 minuti sul gommone banana trainato da un motoscafo, un\'attività di gruppo divertente prenotabile in fasce orarie di un\'ora.',
      ru: '11-минутная поездка на банане за катером — весёлое групповое развлечение, бронируется по часовым слотам.',
      de: 'Eine 11-minütige Bananenbootfahrt hinter einem Speedboot, eine lustige Gruppenaktivität, buchbar in Ein-Stunden-Zeitfenstern.'
    },
    pickupTime: { en: '10:00 - 17:00 (hourly slots)', ar: '10:00 - 17:00 (فترات كل ساعة)', it: '10:00 - 17:00 (fasce orarie)', ru: '10:00 - 17:00 (почасовые слоты)', de: '10:00 - 17:00 (Zeitfenster stündlich)' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['11-minute banana boat ride', 'Great group activity', 'Bookable hourly time slots'],
      ar: ['رحلة قارب الموز لمدة 11 دقيقة', 'نشاط جماعي ممتع', 'فترات حجز كل ساعة'],
      it: ['Giro sul gommone banana di 11 minuti', 'Ottima attività di gruppo', 'Fasce orarie prenotabili'],
      ru: ['11-минутная поездка на банане', 'Отличная групповая активность', 'Почасовое бронирование'],
      de: ['11-minütige Bananenbootfahrt', 'Tolle Gruppenaktivität', 'Buchbare Stundenfenster']
    },
    included: {
      en: ['11-minute banana boat ride', 'Safety equipment'],
      ar: ['رحلة قارب الموز لمدة 11 دقيقة', 'معدات السلامة'],
      it: ['Giro sul gommone banana di 11 minuti', 'Attrezzatura di sicurezza'],
      ru: ['11-минутная поездка на банане', 'Оборудование безопасности'],
      de: ['11-minütige Bananenbootfahrt', 'Sicherheitsausrüstung']
    },
    excluded: {
      en: ['Hotel pickup and drop-off'],
      ar: ['الاستلام والتوصيل من الفندق'],
      it: ['Transfer da/per l\'hotel'],
      ru: ['Трансфер из отеля и обратно'],
      de: ['Hoteltransfer hin und zurück']
    },
    addons: []
  },
  {
    slug: 'water-skiing',
    active: false,
    category: 'one-day',
    destination: 'sharm-el-sheikh',
    theme: 'water-sports',
    type: 'day-tour',
    locationLabel: 'Sharm El-Sheikh',
    image: '/tours/private-boat/1.jpg',
    price: '€28',
    duration: { en: '11 minutes', ar: '11 دقيقة', it: '11 minuti', ru: '11 минут', de: '11 Minuten' },
    title: { en: 'Water Skiing', ar: 'التزلج على الماء', it: 'Sci d\'acqua', ru: 'Водные лыжи', de: 'Wasserski' },
    summary: {
      en: 'Skim across the Red Sea on water skis',
      ar: 'انزلق فوق البحر الأحمر بالتزلج المائي',
      it: 'Scivola sul Mar Rosso con gli sci d\'acqua',
      ru: 'Скользите по Красному морю на водных лыжах',
      de: 'Gleite auf Wasserski über das Rote Meer'
    },
    description: {
      en: 'An 11-minute water skiing session with or without a speedboat, an exciting activity for confident swimmers.',
      ar: 'جلسة تزلج مائي لمدة 11 دقيقة مع أو بدون قارب سريع، نشاط مثير للسباحين الواثقين.',
      it: 'Una sessione di sci d\'acqua di 11 minuti con o senza motoscafo, un\'attività emozionante per nuotatori sicuri.',
      ru: '11-минутный сеанс водных лыж с катером или без, увлекательное занятие для уверенных пловцов.',
      de: 'Eine 11-minütige Wasserski-Session mit oder ohne Speedboot, eine spannende Aktivität für sichere Schwimmer.'
    },
    pickupTime: { en: '10:00 - 17:00 (hourly slots)', ar: '10:00 - 17:00 (فترات كل ساعة)', it: '10:00 - 17:00 (fasce orarie)', ru: '10:00 - 17:00 (почасовые слоты)', de: '10:00 - 17:00 (Zeitfenster stündlich)' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['11-minute water skiing session', 'With or without speedboat option', 'Bookable hourly time slots'],
      ar: ['جلسة تزلج مائي لمدة 11 دقيقة', 'خيار مع أو بدون قارب سريع', 'فترات حجز كل ساعة'],
      it: ['Sessione di sci d\'acqua di 11 minuti', 'Opzione con o senza motoscafo', 'Fasce orarie prenotabili'],
      ru: ['11-минутный сеанс водных лыж', 'Опция с катером или без', 'Почасовое бронирование'],
      de: ['11-minütige Wasserski-Session', 'Mit oder ohne Speedboot', 'Buchbare Stundenfenster']
    },
    included: {
      en: ['11-minute water skiing session', 'Equipment'],
      ar: ['جلسة تزلج مائي لمدة 11 دقيقة', 'المعدات'],
      it: ['Sessione di sci d\'acqua di 11 minuti', 'Attrezzatura'],
      ru: ['11-минутный сеанс водных лыж', 'Оборудование'],
      de: ['11-minütige Wasserski-Session', 'Ausrüstung']
    },
    excluded: {
      en: ['Hotel pickup and drop-off'],
      ar: ['الاستلام والتوصيل من الفندق'],
      it: ['Transfer da/per l\'hotel'],
      ru: ['Трансфер из отеля и обратно'],
      de: ['Hoteltransfer hin und zurück']
    },
    addons: []
  },
  {
    slug: 'water-donut',
    active: false,
    category: 'one-day',
    destination: 'sharm-el-sheikh',
    theme: 'water-sports',
    type: 'day-tour',
    locationLabel: 'Sharm El-Sheikh',
    image: '/tours/private-boat/1.jpg',
    price: '€20',
    duration: { en: '11 minutes', ar: '11 دقيقة', it: '11 minuti', ru: '11 минут', de: '11 Minuten' },
    title: { en: 'Water Donut', ar: 'الدونات المائية', it: 'Ciambelle all\'acqua', ru: 'Водный пончик', de: 'Water Donut' },
    summary: {
      en: 'Spin and splash on a giant inflatable donut',
      ar: 'دُر واقفز على دونات ضخمة قابلة للنفخ',
      it: 'Gira e schizza su un enorme gommone a forma di ciambella',
      ru: 'Кружитесь и брызгайтесь на гигантском надувном пончике',
      de: 'Drehe und spritze auf einem riesigen aufblasbaren Donut'
    },
    description: {
      en: 'An 11-minute donut boat ride towed by a speedboat, a splashy fun ride for groups, bookable in one-hour time slots.',
      ar: 'رحلة دونات مائية لمدة 11 دقيقة يجرها قارب سريع، رحلة مرحة ومبللة للمجموعات، يمكن حجزها ضمن فترات ساعة واحدة.',
      it: 'Un giro sulla ciambella di 11 minuti trainato da un motoscafo, un\'esperienza divertente e bagnata per gruppi, prenotabile in fasce orarie di un\'ora.',
      ru: '11-минутная поездка на пончике за катером — весёлое и мокрое развлечение для групп, бронируется по часовым слотам.',
      de: 'Eine 11-minütige Donut-Bootsfahrt hinter einem Speedboot, ein spritziger Spaß für Gruppen, buchbar in Ein-Stunden-Zeitfenstern.'
    },
    pickupTime: { en: '10:00 - 17:00 (hourly slots)', ar: '10:00 - 17:00 (فترات كل ساعة)', it: '10:00 - 17:00 (fasce orarie)', ru: '10:00 - 17:00 (почасовые слоты)', de: '10:00 - 17:00 (Zeitfenster stündlich)' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['11-minute donut boat ride', 'Splashy fun for groups', 'Bookable hourly time slots'],
      ar: ['رحلة دونات مائية لمدة 11 دقيقة', 'متعة مبللة للمجموعات', 'فترات حجز كل ساعة'],
      it: ['Giro sulla ciambella di 11 minuti', 'Divertimento bagnato per gruppi', 'Fasce orarie prenotabili'],
      ru: ['11-минутная поездка на пончике', 'Мокрое веселье для групп', 'Почасовое бронирование'],
      de: ['11-minütige Donut-Bootsfahrt', 'Spritziger Spaß für Gruppen', 'Buchbare Stundenfenster']
    },
    included: {
      en: ['11-minute donut boat ride', 'Safety equipment'],
      ar: ['رحلة دونات مائية لمدة 11 دقيقة', 'معدات السلامة'],
      it: ['Giro sulla ciambella di 11 minuti', 'Attrezzatura di sicurezza'],
      ru: ['11-минутная поездка на пончике', 'Оборудование безопасности'],
      de: ['11-minütige Donut-Bootsfahrt', 'Sicherheitsausrüstung']
    },
    excluded: {
      en: ['Hotel pickup and drop-off'],
      ar: ['الاستلام والتوصيل من الفندق'],
      it: ['Transfer da/per l\'hotel'],
      ru: ['Трансфер из отеля и обратно'],
      de: ['Hoteltransfer hin und zurück']
    },
    addons: []
  },
  {
    slug: 'private-speedboat',
    category: 'one-day',
    destination: 'sharm-el-sheikh',
    type: 'day-tour',
    locationLabel: 'Sharm El-Sheikh',
    image: '/tours/private-boat/1.jpg',
    price: '€40',
    duration: { en: '1 hour', ar: 'ساعة واحدة', it: '1 ora', ru: '1 час', de: '1 Stunde' },
    title: { en: 'Private Speedboat', ar: 'قارب سريع خاص', it: 'Motoscafo privato', ru: 'Частный катер', de: 'Privates Speedboot' },
    summary: {
      en: 'Have a speedboat to yourself for a full hour',
      ar: 'احصل على قارب سريع لنفسك لمدة ساعة كاملة',
      it: 'Un motoscafo tutto per te per un\'ora intera',
      ru: 'Катер только для вас на целый час',
      de: 'Ein Speedboot ganz für dich für eine ganze Stunde'
    },
    description: {
      en: 'Book a private speedboat for a full hour, for up to 5 people, to explore the coastline at your own pace.',
      ar: 'احجز قاربًا سريعًا خاصًا لمدة ساعة كاملة، لعدد يصل إلى 5 أشخاص، لاستكشاف الساحل بالسرعة التي تناسبك.',
      it: 'Prenota un motoscafo privato per un\'ora intera, fino a 5 persone, per esplorare la costa al tuo ritmo.',
      ru: 'Забронируйте частный катер на целый час для группы до 5 человек, чтобы исследовать побережье в своём темпе.',
      de: 'Buche ein privates Speedboot für eine ganze Stunde, für bis zu 5 Personen, um die Küste in deinem eigenen Tempo zu erkunden.'
    },
    pickupTime: { en: '10:00 - 17:00 (hourly slots)', ar: '10:00 - 17:00 (فترات كل ساعة)', it: '10:00 - 17:00 (fasce orarie)', ru: '10:00 - 17:00 (почасовые слоты)', de: '10:00 - 17:00 (Zeitfenster stündlich)' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['Private speedboat for a full hour', 'Up to 5 people', 'Explore the coastline your way'],
      ar: ['قارب سريع خاص لمدة ساعة كاملة', 'حتى 5 أشخاص', 'استكشف الساحل بطريقتك'],
      it: ['Motoscafo privato per un\'ora intera', 'Fino a 5 persone', 'Esplora la costa a modo tuo'],
      ru: ['Частный катер на целый час', 'До 5 человек', 'Исследуйте побережье по-своему'],
      de: ['Privates Speedboot für eine ganze Stunde', 'Bis zu 5 Personen', 'Erkunde die Küste auf deine Art']
    },
    included: {
      en: ['One full hour of private speedboat use', 'Boat driver'],
      ar: ['ساعة كاملة من استخدام القارب السريع الخاص', 'سائق القارب'],
      it: ['Un\'ora intera di utilizzo del motoscafo privato', 'Pilota del motoscafo'],
      ru: ['Полный час использования частного катера', 'Капитан катера'],
      de: ['Eine volle Stunde privates Speedboot', 'Bootsführer']
    },
    excluded: {
      en: ['Hotel pickup and drop-off'],
      ar: ['الاستلام والتوصيل من الفندق'],
      it: ['Transfer da/per l\'hotel'],
      ru: ['Трансфер из отеля и обратно'],
      de: ['Hoteltransfer hin und zurück']
    },
    addons: []
  },
  {
    slug: 'private-boat',
    category: 'one-day',
    destination: 'ras-mohammed',
    type: 'day-tour',
    locationLabel: 'Ras Mohammed',
    image: '/tours/private-boat/1.jpg',
    images: [
      '/tours/private-boat/1.jpg',
      '/tours/private-boat/2.jpg',
      '/tours/private-boat/3.jpg',
      '/tours/private-boat/4.jpg',
      '/tours/private-boat/5.jpg',
      '/tours/private-boat/6.jpg',
      '/tours/private-boat/7.jpg',
      '/tours/private-boat/8.jpg',
      '/tours/private-boat/9.jpg'
    ],
    price: '€350',
    duration: { en: '8.5 hours', ar: '8.5 ساعة', it: '8 ore e mezza', ru: '8,5 часов', de: '8,5 Stunden' },
    title: {
      en: 'Private Boat Charter',
      ar: 'استئجار قارب خاص',
      it: 'Barca privata',
      ru: 'Аренда частной лодки',
      de: 'Private Bootscharter'
    },
    summary: {
      en: 'Charter your own boat to Ras Mohammed for a group of up to 8',
      ar: 'استأجر قاربك الخاص إلى رأس محمد لمجموعة تصل إلى 8 أشخاص',
      it: 'Noleggia la tua barca privata a Ras Mohammed per un gruppo fino a 8 persone',
      ru: 'Арендуйте собственную лодку в Рас-Мохаммед для группы до 8 человек',
      de: 'Charter dein eigenes Boot nach Ras Mohammed für eine Gruppe von bis zu 8 Personen'
    },
    description: {
      en: 'A full-day private boat charter to Ras Mohammed National Park, with three snorkeling stops, included scuba diving, lunch and soft drinks, for groups of 5 to 8 people (price is per boat, not per person).',
      ar: 'استئجار قارب خاص ليوم كامل إلى متنزه رأس محمد الوطني، مع ثلاث توقفات للغطس، وغوص مشمول، وغداء ومشروبات غازية، لمجموعات من 5 إلى 8 أشخاص (السعر لكل قارب وليس للفرد).',
      it: 'Un noleggio privato per l\'intera giornata al Parco Nazionale di Ras Mohammed, con tre soste per lo snorkeling, immersioni subacquee incluse, pranzo e bibite, per gruppi da 5 a 8 persone (prezzo per l\'intera barca, non a persona).',
      ru: 'Частная лодка на весь день в национальный парк Рас-Мохаммед, с тремя остановками для снорклинга, включённым дайвингом, обедом и напитками, для групп от 5 до 8 человек (цена за лодку целиком, не за человека).',
      de: 'Eine ganztägige private Bootscharter zum Nationalpark Ras Mohammed, mit drei Schnorchelstopps, inklusive Gerätetauchen, Mittagessen und Softdrinks, für Gruppen von 5 bis 8 Personen (Preis pro Boot, nicht pro Person).'
    },
    pickupTime: { en: '8:00 - 16:30 (hourly slots)', ar: '8:00 - 16:30 (فترات كل ساعة)', it: '8:00 - 16:30 (fasce orarie)', ru: '8:00 - 16:30 (почасовые слоты)', de: '8:00 - 16:30 (Zeitfenster stündlich)' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['Private boat for your group', 'Scuba diving at Ras Mohammed included', 'Three snorkeling stops', 'Lunch and soft drinks on board'],
      ar: ['قارب خاص لمجموعتك', 'الغوص في رأس محمد مشمول', 'ثلاث توقفات للغطس', 'الغداء والمشروبات الغازية على متن القارب'],
      it: ['Barca privata per il tuo gruppo', 'Immersioni subacquee a Ras Mohammed incluse', 'Tre soste per lo snorkeling', 'Pranzo e bibite a bordo'],
      ru: ['Частная лодка для вашей группы', 'Дайвинг в Рас-Мохаммед включён', 'Три остановки для снорклинга', 'Обед и напитки на борту'],
      de: ['Privates Boot für deine Gruppe', 'Gerätetauchen bei Ras Mohammed inbegriffen', 'Drei Schnorchelstopps', 'Mittagessen und Softdrinks an Bord']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'National park entrance fee', 'Snorkeling equipment', 'Scuba diving at Ras Mohammed', 'Lunch on board', 'Soft drinks'],
      ar: ['الاستلام والتوصيل من الفندق', 'رسوم دخول المتنزه الوطني', 'معدات الغطس', 'الغوص في رأس محمد', 'الغداء على متن القارب', 'المشروبات الغازية'],
      it: ['Transfer da/per l\'hotel', 'Ingresso al parco nazionale', 'Attrezzatura da snorkeling', 'Immersioni subacquee a Ras Mohammed', 'Pranzo a bordo', 'Bibite analcoliche'],
      ru: ['Трансфер из отеля и обратно', 'Входной билет в нацпарк', 'Снаряжение для снорклинга', 'Дайвинг в Рас-Мохаммед', 'Обед на борту', 'Безалкогольные напитки'],
      de: ['Hoteltransfer hin und zurück', 'Eintritt Nationalpark', 'Schnorchelausrüstung', 'Gerätetauchen bei Ras Mohammed', 'Mittagessen an Bord', 'Softdrinks']
    },
    excluded: { en: [], ar: [], it: [], ru: [], de: [] },
    addons: []
  },
  {
    slug: 'glass-boat',
    category: 'one-day',
    destination: 'sharm-el-sheikh',
    type: 'day-tour',
    locationLabel: 'Naama Bay',
    image: '/tours/glass-boat/1.jpg',
    images: [
      '/tours/glass-boat/1.jpg',
      '/tours/glass-boat/2.jpg',
      '/tours/glass-boat/3.jpg',
      '/tours/glass-boat/4.jpg'
    ],
    price: '€10',
    duration: { en: '1 hour', ar: 'ساعة واحدة', it: '1 ora', ru: '1 час', de: '1 Stunde' },
    title: { en: 'Glass Boat', ar: 'القارب الزجاجي', it: 'Barca di vetro', ru: 'Лодка со стеклянным дном', de: 'Glasbodenboot' },
    summary: {
      en: 'See the coral reefs up close without getting wet',
      ar: 'شاهد الشعاب المرجانية عن قرب دون أن تبتل',
      it: 'Osserva le barriere coralline da vicino senza bagnarti',
      ru: 'Рассмотрите коралловые рифы вблизи, не намокнув',
      de: 'Betrachte die Korallenriffe aus nächster Nähe, ohne nass zu werden'
    },
    description: {
      en: 'A one-hour glass-bottom boat trip over the reefs of Naama Bay in Sharm El-Sheikh, ideal for those who can\'t swim.',
      ar: 'رحلة بالقارب الزجاجي لمدة ساعة فوق شعاب خليج نعمة في شرم الشيخ، مثالية لمن لا يجيدون السباحة.',
      it: 'Una gita di un\'ora in barca dal fondo di vetro sopra le barriere di Naama Bay a Sharm El Sheikh, ideale per chi non sa nuotare.',
      ru: 'Часовая экскурсия на лодке со стеклянным дном над рифами Наама-Бей в Шарм-эль-Шейхе, идеально для тех, кто не умеет плавать.',
      de: 'Eine einstündige Glasbodenboot-Fahrt über die Riffe von Naama Bay in Sharm El-Sheikh, ideal für Nichtschwimmer.'
    },
    pickupTime: { en: '10:00 - 16:00 (hourly slots)', ar: '10:00 - 16:00 (فترات كل ساعة)', it: '10:00 - 16:00 (fasce orarie)', ru: '10:00 - 16:00 (почасовые слоты)', de: '10:00 - 16:00 (Zeitfenster stündlich)' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['Glass-bottom views of Naama Bay reefs', 'No swimming required', 'One-hour boat trip'],
      ar: ['إطلالات زجاجية على شعاب خليج نعمة', 'لا حاجة للسباحة', 'رحلة بالقارب لمدة ساعة'],
      it: ['Vista sul fondo di vetro delle barriere di Naama Bay', 'Non è necessario saper nuotare', 'Gita in barca di un\'ora'],
      ru: ['Виды на рифы Наама-Бей через стеклянное дно', 'Плавать не нужно', 'Часовая прогулка на лодке'],
      de: ['Glasbodenblick auf die Riffe von Naama Bay', 'Schwimmen nicht erforderlich', 'Einstündige Bootsfahrt']
    },
    included: {
      en: ['One-hour glass boat trip'],
      ar: ['رحلة بالقارب الزجاجي لمدة ساعة'],
      it: ['Gita di un\'ora in barca di vetro'],
      ru: ['Часовая прогулка на лодке со стеклянным дном'],
      de: ['Einstündige Glasbodenboot-Fahrt']
    },
    excluded: {
      en: ['Hotel pickup and drop-off'],
      ar: ['الاستلام والتوصيل من الفندق'],
      it: ['Transfer da/per l\'hotel'],
      ru: ['Трансфер из отеля и обратно'],
      de: ['Hoteltransfer hin und zurück']
    },
    addons: []
  },
  {
    slug: 'submarine',
    category: 'one-day',
    destination: 'sharm-el-sheikh',
    type: 'day-tour',
    locationLabel: 'Ras Katy',
    image: '/tours/private-boat/1.jpg',
    price: '€40',
    duration: { en: '2 hours', ar: 'ساعتان', it: '2 ore', ru: '2 часа', de: '2 Stunden' },
    title: { en: 'Submarine Tour', ar: 'جولة الغواصة', it: 'Sottomarino', ru: 'Экскурсия на подводной лодке', de: 'U-Boot-Tour' },
    summary: {
      en: 'Explore the reefs of Ras Katy from a real submarine',
      ar: 'استكشف شعاب رأس كاتي من غواصة حقيقية',
      it: 'Esplora le barriere di Ras Katy da un vero sottomarino',
      ru: 'Исследуйте рифы Рас-Кати из настоящей подводной лодки',
      de: 'Erkunde die Riffe von Ras Katy in einem echten U-Boot'
    },
    description: {
      en: 'A two-hour submarine excursion for a close-up view of the coral reefs near Ras Katy, with soft drinks included, ideal for non-swimmers.',
      ar: 'رحلة بالغواصة لمدة ساعتين لمشاهدة الشعاب المرجانية عن قرب بالقرب من رأس كاتي، مع مشروبات غازية مشمولة، مثالية لغير السباحين.',
      it: 'Un\'escursione in sottomarino di due ore per osservare da vicino le barriere coralline vicino a Ras Katy, con bibite incluse, ideale per chi non sa nuotare.',
      ru: 'Двухчасовая экскурсия на подводной лодке для близкого осмотра коралловых рифов у Рас-Кати, с напитками, идеально для не умеющих плавать.',
      de: 'Eine zweistündige U-Boot-Exkursion für eine Nahaufnahme der Korallenriffe bei Ras Katy, mit Softdrinks, ideal für Nichtschwimmer.'
    },
    pickupTime: { en: '9:00 - 14:00 (2-hour slots)', ar: '9:00 - 14:00 (فترات ساعتين)', it: '9:00 - 14:00 (fasce da 2 ore)', ru: '9:00 - 14:00 (2-часовые слоты)', de: '9:00 - 14:00 (2-Stunden-Zeitfenster)' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['Close-up view of Ras Katy reefs', 'Real working submarine', 'No swimming required', 'Soft drinks included'],
      ar: ['مشاهدة عن قرب لشعاب رأس كاتي', 'غواصة حقيقية عاملة', 'لا حاجة للسباحة', 'المشروبات الغازية مشمولة'],
      it: ['Vista ravvicinata delle barriere di Ras Katy', 'Un vero sottomarino funzionante', 'Non è necessario saper nuotare', 'Bibite analcoliche incluse'],
      ru: ['Близкий вид на рифы Рас-Кати', 'Настоящая рабочая подлодка', 'Плавать не нужно', 'Безалкогольные напитки включены'],
      de: ['Nahaufnahme der Riffe von Ras Katy', 'Echtes funktionsfähiges U-Boot', 'Schwimmen nicht erforderlich', 'Softdrinks inbegriffen']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'Submarine tour', 'Soft drinks'],
      ar: ['الاستلام والتوصيل من الفندق', 'جولة الغواصة', 'المشروبات الغازية'],
      it: ['Transfer da/per l\'hotel', 'Tour in sottomarino', 'Bibite analcoliche'],
      ru: ['Трансфер из отеля и обратно', 'Экскурсия на подлодке', 'Безалкогольные напитки'],
      de: ['Hoteltransfer hin und zurück', 'U-Boot-Tour', 'Softdrinks']
    },
    excluded: { en: [], ar: [], it: [], ru: [], de: [] },
    addons: []
  },
  {
    slug: 'scuba-diving-naama-bay',
    category: 'one-day',
    destination: 'sharm-el-sheikh',
    type: 'day-tour',
    locationLabel: 'Naama Bay',
    image: '/tours/snorkeling.jpg',
    price: '€25',
    duration: { en: '1 hour', ar: 'ساعة واحدة', it: '1 ora', ru: '1 час', de: '1 Stunde' },
    title: { en: 'Scuba Diving in Naama Bay', ar: 'الغوص في خليج نعمة', it: 'Immersioni a Naama Bay', ru: 'Дайвинг в Наама-Бей', de: 'Gerätetauchen in Naama Bay' },
    summary: {
      en: 'A short introductory dive over the reefs of Naama Bay',
      ar: 'غطسة تعريفية قصيرة فوق شعاب خليج نعمة',
      it: 'Una breve immersione introduttiva sulle barriere di Naama Bay',
      ru: 'Короткое вводное погружение над рифами Наама-Бей',
      de: 'Ein kurzer Schnuppertauchgang über den Riffen von Naama Bay'
    },
    description: {
      en: 'A 15-minute guided dive at Naama Bay for a close-up look at the local coral reefs, suitable for beginners.',
      ar: 'غطسة بإشراف مرشد لمدة 15 دقيقة في خليج نعمة لمشاهدة الشعاب المرجانية المحلية عن قرب، مناسبة للمبتدئين.',
      it: 'Un\'immersione guidata di 15 minuti a Naama Bay per osservare da vicino le barriere coralline locali, adatta ai principianti.',
      ru: '15-минутное погружение с гидом в Наама-Бей для близкого осмотра местных рифов, подходит для новичков.',
      de: 'Ein 15-minütiger geführter Tauchgang in Naama Bay für eine Nahaufnahme der lokalen Korallenriffe, geeignet für Anfänger.'
    },
    pickupTime: { en: '10:00 - 16:00 (hourly slots)', ar: '10:00 - 16:00 (فترات كل ساعة)', it: '10:00 - 16:00 (fasce orarie)', ru: '10:00 - 16:00 (почасовые слоты)', de: '10:00 - 16:00 (Zeitfenster stündlich)' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['15-minute guided dive at Naama Bay', 'Close-up view of coral reefs', 'Beginner friendly'],
      ar: ['غطسة بإشراف مرشد لمدة 15 دقيقة في خليج نعمة', 'مشاهدة عن قرب للشعاب المرجانية', 'مناسبة للمبتدئين'],
      it: ['Immersione guidata di 15 minuti a Naama Bay', 'Vista ravvicinata delle barriere coralline', 'Adatta ai principianti'],
      ru: ['15-минутное погружение с гидом в Наама-Бей', 'Близкий вид на коралловые рифы', 'Подходит для новичков'],
      de: ['15-minütiger geführter Tauchgang in Naama Bay', 'Nahaufnahme der Korallenriffe', 'Anfängerfreundlich']
    },
    included: {
      en: ['15-minute guided dive', 'Diving equipment', 'Certified dive guide'],
      ar: ['غطسة بإشراف مرشد لمدة 15 دقيقة', 'معدات الغوص', 'مرشد غوص معتمد'],
      it: ['Immersione guidata di 15 minuti', 'Attrezzatura da immersione', 'Guida subacquea certificata'],
      ru: ['15-минутное погружение с гидом', 'Снаряжение для дайвинга', 'Сертифицированный дайв-гид'],
      de: ['15-minütiger geführter Tauchgang', 'Tauchausrüstung', 'Zertifizierter Tauchguide']
    },
    excluded: {
      en: ['Hotel pickup and drop-off'],
      ar: ['الاستلام والتوصيل من الفندق'],
      it: ['Transfer da/per l\'hotel'],
      ru: ['Трансфер из отеля и обратно'],
      de: ['Hoteltransfer hin und zurück']
    },
    addons: []
  },
  {
    slug: 'cairo-by-bus',
    category: 'one-day',
    destination: 'cairo',
    type: 'night-tour',
    locationLabel: 'Cairo',
    image: '/tours/cairo-by-bus/1.jpg',
    images: [
      '/tours/cairo-by-bus/1.jpg',
      '/tours/cairo-by-bus/2.jpg',
      '/tours/cairo-by-bus/3.jpg',
      '/tours/cairo-by-bus/4.jpg',
      '/tours/cairo-by-bus/5.jpg',
      '/tours/cairo-by-bus/6.jpg',
      '/tours/cairo-by-bus/7.jpg',
      '/tours/cairo-by-bus/8.jpg',
      '/tours/cairo-by-bus/9.jpg',
      '/tours/cairo-by-bus/10.jpg',
      '/tours/cairo-by-bus/11.jpg',
      '/tours/cairo-by-bus/12.jpg',
      '/tours/cairo-by-bus/13.jpg',
      '/tours/cairo-by-bus/14.jpg'
    ],
    price: '€65',
    duration: { en: '24 hours (overnight)', ar: '24 ساعة (رحلة ليلية)', it: '24 ore (notturno)', ru: '24 часа (ночная поездка)', de: '24 Stunden (Nachtfahrt)' },
    title: {
      en: 'Cairo by Bus',
      ar: 'القاهرة بالحافلة',
      it: 'Il Cairo in autobus',
      ru: 'Каир на автобусе',
      de: 'Kairo mit dem Bus'
    },
    summary: {
      en: 'An overnight bus trip to the Pyramids and the Egyptian Museum',
      ar: 'رحلة ليلية بالحافلة إلى الأهرامات والمتحف المصري',
      it: 'Un viaggio notturno in autobus alle Piramidi e al Museo Egizio',
      ru: 'Ночная автобусная поездка к пирамидам и Египетскому музею',
      de: 'Eine nächtliche Busfahrt zu den Pyramiden und dem Ägyptischen Museum'
    },
    description: {
      en: 'A six-hour overnight bus ride to Cairo to see the Egyptian Pyramids, the Sphinx and the Egyptian Museum, with lunch on the Nile and a visit to a papyrus gallery and perfume factory.',
      ar: 'رحلة ليلية بالحافلة لمدة ست ساعات إلى القاهرة لمشاهدة الأهرامات المصرية وأبو الهول والمتحف المصري، مع غداء على النيل وزيارة لمعرض البردي ومصنع العطور.',
      it: 'Un viaggio notturno in autobus di sei ore al Cairo per vedere le Piramidi Egizie, la Sfinge e il Museo Egizio, con pranzo sul Nilo e visita a una galleria del papiro e a una fabbrica di essenze.',
      ru: 'Шестичасовая ночная автобусная поездка в Каир, чтобы увидеть египетские пирамиды, Сфинкса и Египетский музей, с обедом на Ниле и посещением галереи папируса и парфюмерной фабрики.',
      de: 'Eine sechsstündige nächtliche Busfahrt nach Kairo, um die ägyptischen Pyramiden, die Sphinx und das Ägyptische Museum zu sehen, mit Mittagessen am Nil und Besuch einer Papyrusgalerie und Parfümfabrik.'
    },
    pickupTime: { en: '23:00 - 23:00 (next day, approx.)', ar: '23:00 - 23:00 (اليوم التالي تقريبًا)', it: '23:00 - 23:00 (giorno dopo, circa)', ru: '23:00 - 23:00 (на следующий день, ориентировочно)', de: '23:00 - 23:00 (am nächsten Tag, ca.)' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['The Egyptian Pyramids and the Sphinx', 'The Egyptian National Museum', 'Lunch on the Nile', 'Papyrus gallery and perfume factory'],
      ar: ['الأهرامات المصرية وأبو الهول', 'المتحف المصري الوطني', 'غداء على النيل', 'معرض البردي ومصنع العطور'],
      it: ['Le Piramidi Egizie e la Sfinge', 'Il Museo Nazionale Egizio', 'Pranzo sul fiume Nilo', 'Galleria del papiro e fabbrica delle essenze'],
      ru: ['Египетские пирамиды и Сфинкс', 'Египетский национальный музей', 'Обед на Ниле', 'Галерея папируса и парфюмерная фабрика'],
      de: ['Die ägyptischen Pyramiden und die Sphinx', 'Das Ägyptische Nationalmuseum', 'Mittagessen am Nil', 'Papyrusgalerie und Parfümfabrik']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'Pyramids and Sphinx visit', 'Egyptian National Museum visit', 'Lunch on the Nile', 'Papyrus gallery and perfume factory visit'],
      ar: ['الاستلام والتوصيل من الفندق', 'زيارة الأهرامات وأبو الهول', 'زيارة المتحف المصري الوطني', 'غداء على النيل', 'زيارة معرض البردي ومصنع العطور'],
      it: ['Transfer da/per l\'hotel', 'Visita alle Piramidi e alla Sfinge', 'Visita al Museo Nazionale Egizio', 'Pranzo sul Nilo', 'Visita alla galleria del papiro e alla fabbrica delle essenze'],
      ru: ['Трансфер из отеля и обратно', 'Посещение пирамид и Сфинкса', 'Посещение Египетского национального музея', 'Обед на Ниле', 'Посещение галереи папируса и парфюмерной фабрики'],
      de: ['Hoteltransfer hin und zurück', 'Besuch der Pyramiden und der Sphinx', 'Besuch des Ägyptischen Nationalmuseums', 'Mittagessen am Nil', 'Besuch der Papyrusgalerie und Parfümfabrik']
    },
    excluded: { en: [], ar: [], it: [], ru: [], de: [] },
    addons: []
  },
  {
    slug: 'cairo-by-plane',
    category: 'one-day',
    destination: 'cairo',
    type: 'day-tour',
    locationLabel: 'Cairo',
    image: '/tours/cairo-by-plane/1.jpg',
    images: ['/tours/cairo-by-plane/1.jpg'],
    price: '€190',
    duration: { en: '15 hours', ar: '15 ساعة', it: '15 ore', ru: '15 часов', de: '15 Stunden' },
    title: {
      en: 'Cairo by Plane',
      ar: 'القاهرة بالطائرة',
      it: 'Il Cairo in aereo',
      ru: 'Каир на самолёте',
      de: 'Kairo mit dem Flugzeug'
    },
    summary: {
      en: 'A quick flight to see the Pyramids and the Egyptian Museum in one day',
      ar: 'رحلة طيران سريعة لمشاهدة الأهرامات والمتحف المصري في يوم واحد',
      it: 'Un rapido volo per vedere le Piramidi e il Museo Egizio in un giorno',
      ru: 'Быстрый перелёт, чтобы увидеть пирамиды и Египетский музей за один день',
      de: 'Ein kurzer Flug, um die Pyramiden und das Ägyptische Museum an einem Tag zu sehen'
    },
    description: {
      en: 'Fly from Sharm El-Sheikh to Cairo in about 45 minutes to visit the Egyptian Pyramids, the Sphinx and the Egyptian Museum, with lunch on the Nile and a visit to a papyrus gallery and perfume factory.',
      ar: 'حلّق من شرم الشيخ إلى القاهرة في حوالي 45 دقيقة لزيارة الأهرامات المصرية وأبو الهول والمتحف المصري، مع غداء على النيل وزيارة لمعرض البردي ومصنع العطور.',
      it: 'Vola da Sharm El Sheikh al Cairo in circa 45 minuti per visitare le Piramidi Egizie, la Sfinge e il Museo Egizio, con pranzo sul Nilo e visita a una galleria del papiro e a una fabbrica di essenze.',
      ru: 'Перелёт из Шарм-эль-Шейха в Каир примерно за 45 минут для посещения пирамид, Сфинкса и Египетского музея, с обедом на Ниле и посещением галереи папируса и парфюмерной фабрики.',
      de: 'Fliege in etwa 45 Minuten von Sharm El-Sheikh nach Kairo, um die ägyptischen Pyramiden, die Sphinx und das Ägyptische Museum zu besuchen, mit Mittagessen am Nil und Besuch einer Papyrusgalerie und Parfümfabrik.'
    },
    pickupTime: { en: '6:00 - 21:00', ar: '6:00 - 21:00', it: '6:00 - 21:00', ru: '6:00 - 21:00', de: '6:00 - 21:00' },
    availability: { en: 'Sunday and Wednesday', ar: 'الأحد والأربعاء', it: 'Domenica e mercoledì', ru: 'Воскресенье и среда', de: 'Sonntag und Mittwoch' },
    highlights: {
      en: ['45-minute flight to Cairo', 'The Egyptian Pyramids and the Sphinx', 'The Egyptian National Museum', 'Lunch on the Nile'],
      ar: ['رحلة طيران 45 دقيقة إلى القاهرة', 'الأهرامات المصرية وأبو الهول', 'المتحف المصري الوطني', 'غداء على النيل'],
      it: ['Volo di 45 minuti per il Cairo', 'Le Piramidi Egizie e la Sfinge', 'Il Museo Nazionale Egizio', 'Pranzo sul fiume Nilo'],
      ru: ['45-минутный перелёт в Каир', 'Египетские пирамиды и Сфинкс', 'Египетский национальный музей', 'Обед на Ниле'],
      de: ['45-minütiger Flug nach Kairo', 'Die ägyptischen Pyramiden und die Sphinx', 'Das Ägyptische Nationalmuseum', 'Mittagessen am Nil']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'Flight to Cairo and back', 'Pyramids and Sphinx visit', 'Egyptian National Museum visit', 'Lunch on the Nile', 'Papyrus gallery and perfume factory visit'],
      ar: ['الاستلام والتوصيل من الفندق', 'الطيران إلى القاهرة والعودة', 'زيارة الأهرامات وأبو الهول', 'زيارة المتحف المصري الوطني', 'غداء على النيل', 'زيارة معرض البردي ومصنع العطور'],
      it: ['Transfer da/per l\'hotel', 'Volo andata e ritorno per il Cairo', 'Visita alle Piramidi e alla Sfinge', 'Visita al Museo Nazionale Egizio', 'Pranzo sul Nilo', 'Visita alla galleria del papiro e alla fabbrica delle essenze'],
      ru: ['Трансфер из отеля и обратно', 'Перелёт в Каир и обратно', 'Посещение пирамид и Сфинкса', 'Посещение Египетского национального музея', 'Обед на Ниле', 'Посещение галереи папируса и парфюмерной фабрики'],
      de: ['Hoteltransfer hin und zurück', 'Flug nach Kairo und zurück', 'Besuch der Pyramiden und der Sphinx', 'Besuch des Ägyptischen Nationalmuseums', 'Mittagessen am Nil', 'Besuch der Papyrusgalerie und Parfümfabrik']
    },
    excluded: { en: [], ar: [], it: [], ru: [], de: [] },
    addons: []
  },
  {
    slug: 'luxor-by-plane',
    category: 'one-day',
    destination: 'luxor',
    type: 'day-tour',
    locationLabel: 'Luxor',
    image: '/tours/luxor-by-plane/2.jpeg',
    images: [
      '/tours/luxor-by-plane/2.jpeg',
      '/tours/luxor-by-plane/3.jpeg',
      '/tours/luxor-by-plane/4.jpeg',
      '/tours/luxor-by-plane/5.jpg',
      '/tours/luxor-by-plane/6.jpg',
      '/tours/luxor-by-plane/7.jpg',
      '/tours/luxor-by-plane/8.jpg',
      '/tours/luxor-by-plane/9.jpg',
      '/tours/luxor-by-plane/10.jpg',
      '/tours/luxor-by-plane/11.jpg',
      '/tours/luxor-by-plane/12.jpg'
    ],
    price: '€270',
    duration: { en: '15 hours', ar: '15 ساعة', it: '15 ore', ru: '15 часов', de: '15 Stunden' },
    title: {
      en: 'Luxor by Plane',
      ar: 'الأقصر بالطائرة',
      it: 'Luxor in aereo',
      ru: 'Луксор на самолёте',
      de: 'Luxor mit dem Flugzeug'
    },
    summary: {
      en: 'A one-day flight tour of Luxor\'s temples and royal tombs',
      ar: 'رحلة طيران ليوم واحد لمعابد الأقصر ومقابر الملوك',
      it: 'Un tour di un giorno in aereo tra i templi e le tombe reali di Luxor',
      ru: 'Однодневный авиатур по храмам и царским гробницам Луксора',
      de: 'Eine Tagesflugtour zu den Tempeln und Königsgräbern von Luxor'
    },
    description: {
      en: 'Fly to Luxor in about an hour to visit the Temple of Karnak, the Valley of the Kings, the Temple of Hatshepsut and the Colossi of Memnon, with lunch included.',
      ar: 'حلّق إلى الأقصر في حوالي ساعة لزيارة معبد الكرنك ووادي الملوك ومعبد حتشبسوت وتمثالي ممنون، مع الغداء مشمول.',
      it: 'Vola a Luxor in circa un\'ora per visitare il Tempio di Karnak, la Valle dei Re, il Tempio di Hatshepsut e i Colossi di Memnone, con pranzo incluso.',
      ru: 'Перелёт в Луксор примерно за час для посещения храма Карнак, Долины Царей, храма Хатшепсут и Колоссов Мемнона, с обедом в стоимости.',
      de: 'Fliege in etwa einer Stunde nach Luxor, um den Karnak-Tempel, das Tal der Könige, den Hatschepsut-Tempel und die Memnon-Kolosse zu besuchen, mit Mittagessen inbegriffen.'
    },
    pickupTime: { en: '6:00 - 21:00', ar: '6:00 - 21:00', it: '6:00 - 21:00', ru: '6:00 - 21:00', de: '6:00 - 21:00' },
    availability: { en: 'Wednesday, Friday and Saturday', ar: 'الأربعاء والجمعة والسبت', it: 'Mercoledì, venerdì e sabato', ru: 'Среда, пятница и суббота', de: 'Mittwoch, Freitag und Samstag' },
    highlights: {
      en: ['One-hour flight to Luxor', 'The Temple of Karnak', 'The Valley of the Kings', 'Temple of Hatshepsut and the Colossi of Memnon'],
      ar: ['رحلة طيران ساعة واحدة إلى الأقصر', 'معبد الكرنك', 'وادي الملوك', 'معبد حتشبسوت وتمثالا ممنون'],
      it: ['Volo di un\'ora per Luxor', 'Il Tempio di Karnak', 'La Valle dei Re', 'Tempio di Hatshepsut e Colossi di Memnone'],
      ru: ['Часовой перелёт в Луксор', 'Храм Карнак', 'Долина Царей', 'Храм Хатшепсут и Колоссы Мемнона'],
      de: ['Einstündiger Flug nach Luxor', 'Der Karnak-Tempel', 'Das Tal der Könige', 'Hatschepsut-Tempel und die Memnon-Kolosse']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'Flight to Luxor and back', 'Temple of Karnak visit', 'Valley of the Kings visit', 'Lunch', 'Temple of Hatshepsut and Colossi of Memnon visit'],
      ar: ['الاستلام والتوصيل من الفندق', 'الطيران إلى الأقصر والعودة', 'زيارة معبد الكرنك', 'زيارة وادي الملوك', 'الغداء', 'زيارة معبد حتشبسوت وتمثالي ممنون'],
      it: ['Transfer da/per l\'hotel', 'Volo andata e ritorno per Luxor', 'Visita al Tempio di Karnak', 'Visita alla Valle dei Re', 'Pranzo', 'Visita al Tempio di Hatshepsut e ai Colossi di Memnone'],
      ru: ['Трансфер из отеля и обратно', 'Перелёт в Луксор и обратно', 'Посещение храма Карнак', 'Посещение Долины Царей', 'Обед', 'Посещение храма Хатшепсут и Колоссов Мемнона'],
      de: ['Hoteltransfer hin und zurück', 'Flug nach Luxor und zurück', 'Besuch des Karnak-Tempels', 'Besuch des Tals der Könige', 'Mittagessen', 'Besuch des Hatschepsut-Tempels und der Memnon-Kolosse']
    },
    excluded: { en: [], ar: [], it: [], ru: [], de: [] },
    addons: []
  },
  {
    slug: 'petra-bus-boat',
    category: 'one-day',
    destination: 'jordan',
    type: 'night-tour',
    locationLabel: 'Petra, Jordan',
    image: '/tours/petra-bus-boat/1.jpeg',
    images: [
      '/tours/petra-bus-boat/1.jpeg',
      '/tours/petra-bus-boat/2.jpg',
      '/tours/petra-bus-boat/3.jpg',
      '/tours/petra-bus-boat/4.jpg',
      '/tours/petra-bus-boat/5.jpg',
      '/tours/petra-bus-boat/6.jpg',
      '/tours/petra-bus-boat/7.jpg',
      '/tours/petra-bus-boat/8.jpg',
      '/tours/petra-bus-boat/9.jpg',
      '/tours/petra-bus-boat/10.jpg',
      '/tours/petra-bus-boat/11.jpg',
      '/tours/petra-bus-boat/12.jpg',
      '/tours/petra-bus-boat/13.jpg',
      '/tours/petra-bus-boat/14.jpg',
      '/tours/petra-bus-boat/15.jpg',
      '/tours/petra-bus-boat/16.jpg'
    ],
    price: '€270',
    duration: { en: '22 hours', ar: '22 ساعة', it: '22 ore', ru: '22 часа', de: '22 Stunden' },
    title: {
      en: 'Petra by Bus and Boat',
      ar: 'البتراء بالحافلة والقارب',
      it: 'Petra in autobus e barca',
      ru: 'Петра на автобусе и лодке',
      de: 'Petra mit Bus und Boot'
    },
    summary: {
      en: 'Cross into Jordan to walk the Siq and see the Treasury of Petra',
      ar: 'اعبر إلى الأردن للسير عبر السيق ومشاهدة خزنة البتراء',
      it: 'Attraversa il confine con la Giordania per percorrere il Siq e vedere il Tesoro di Petra',
      ru: 'Пересеките границу с Иорданией, чтобы пройти по Сик и увидеть Сокровищницу Петры',
      de: 'Reise nach Jordanien, um durch den Siq zu wandern und die Schatzkammer von Petra zu sehen'
    },
    description: {
      en: 'Travel by bus to Nuweiba, boat to Aqaba and bus again to Petra to explore the Siq canyon, the Treasury, the Citadel and the Royal Tomb, with lunch included.',
      ar: 'سافر بالحافلة إلى نويبع، ثم بالقارب إلى العقبة وبالحافلة مجددًا إلى البتراء لاستكشاف كانيون السيق والخزنة والقلعة ومقبرة الملك، مع الغداء مشمول.',
      it: 'Viaggia in autobus fino a Nuweiba, in barca fino ad Aqaba e di nuovo in autobus fino a Petra per esplorare il canyon del Siq, il Tesoro, la Cittadella e la Tomba del Re, con pranzo incluso.',
      ru: 'Путешествие на автобусе до Нувейбы, на лодке до Акабы и снова на автобусе до Петры, чтобы исследовать каньон Сик, Сокровищницу, Цитадель и Королевскую гробницу, с обедом.',
      de: 'Reise mit dem Bus nach Nuweiba, mit dem Boot nach Akaba und wieder mit dem Bus nach Petra, um den Siq-Canyon, die Schatzkammer, die Zitadelle und das Königsgrab zu erkunden, mit Mittagessen inbegriffen.'
    },
    pickupTime: { en: '1:00 - 23:00', ar: '1:00 - 23:00', it: '1:00 - 23:00', ru: '1:00 - 23:00', de: '1:00 - 23:00' },
    availability: { en: 'Daily', ar: 'يوميًا', it: 'Tutti i giorni', ru: 'Ежедневно', de: 'Täglich' },
    highlights: {
      en: ['The Petra Canyon (Al-Siq)', 'The Treasury temple', 'The Citadel and the Royal Tomb', 'Bus and boat crossing to Jordan'],
      ar: ['كانيون البتراء (السيق)', 'معبد الخزنة', 'القلعة ومقبرة الملك', 'العبور بالحافلة والقارب إلى الأردن'],
      it: ['Il Canyon di Petra (Al-Siq)', 'Il Tesoro (Tempio)', 'La Cittadella e la Tomba del Re', 'Attraversamento in autobus e barca verso la Giordania'],
      ru: ['Каньон Петры (Аль-Сик)', 'Храм-сокровищница', 'Цитадель и Королевская гробница', 'Переезд на автобусе и лодке в Иорданию'],
      de: ['Der Petra-Canyon (Al-Siq)', 'Der Schatzkammer-Tempel', 'Die Zitadelle und das Königsgrab', 'Bus- und Bootsüberfahrt nach Jordanien']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'Bus and boat transfers', 'Petra Canyon visit', 'Treasury visit', 'Citadel and Royal Tomb visit', 'Lunch'],
      ar: ['الاستلام والتوصيل من الفندق', 'التنقل بالحافلة والقارب', 'زيارة كانيون البتراء', 'زيارة الخزنة', 'زيارة القلعة ومقبرة الملك', 'الغداء'],
      it: ['Transfer da/per l\'hotel', 'Trasferimenti in autobus e barca', 'Visita al Canyon di Petra', 'Visita al Tesoro', 'Visita alla Cittadella e alla Tomba del Re', 'Pranzo'],
      ru: ['Трансфер из отеля и обратно', 'Переезды на автобусе и лодке', 'Посещение каньона Петры', 'Посещение Сокровищницы', 'Посещение Цитадели и Королевской гробницы', 'Обед'],
      de: ['Hoteltransfer hin und zurück', 'Bus- und Bootstransfers', 'Besuch des Petra-Canyons', 'Besuch der Schatzkammer', 'Besuch der Zitadelle und des Königsgrabs', 'Mittagessen']
    },
    excluded: { en: [], ar: [], it: [], ru: [], de: [] },
    addons: []
  },
  {
    slug: 'jerusalem-by-bus',
    active: false,
    category: 'one-day',
    destination: 'jerusalem',
    type: 'night-tour',
    locationLabel: 'Jerusalem',
    image: '/tours/jerusalem-by-bus/2.jpg',
    images: [
      '/tours/jerusalem-by-bus/2.jpg',
      '/tours/jerusalem-by-bus/3.jpg',
      '/tours/jerusalem-by-bus/4.jpg',
      '/tours/jerusalem-by-bus/5.jpg',
      '/tours/jerusalem-by-bus/6.jpg',
      '/tours/jerusalem-by-bus/7.jpg',
      '/tours/jerusalem-by-bus/8.jpg',
      '/tours/jerusalem-by-bus/9.jpg',
      '/tours/jerusalem-by-bus/10.jpg',
      '/tours/jerusalem-by-bus/11.jpg',
      '/tours/jerusalem-by-bus/12.jpg',
      '/tours/jerusalem-by-bus/13.jpg'
    ],
    price: '€176',
    duration: { en: '27 hours (overnight)', ar: '27 ساعة (رحلة ليلية)', it: '27 ore (notturno)', ru: '27 часов (ночная поездка)', de: '27 Stunden (Nachtfahrt)' },
    title: {
      en: 'Jerusalem by Bus',
      ar: 'القدس بالحافلة',
      it: 'Gerusalemme in autobus',
      ru: 'Иерусалим на автобусе',
      de: 'Jerusalem mit dem Bus'
    },
    summary: {
      en: 'A pilgrimage overnight trip through the Dead Sea to Jerusalem\'s holy sites',
      ar: 'رحلة حج ليلية عبر البحر الميت إلى الأماكن المقدسة في القدس',
      it: 'Un viaggio di pellegrinaggio notturno attraverso il Mar Morto ai luoghi santi di Gerusalemme',
      ru: 'Ночная паломническая поездка через Мёртвое море к святым местам Иерусалима',
      de: 'Eine nächtliche Pilgerreise über das Tote Meer zu den heiligen Stätten Jerusalems'
    },
    description: {
      en: 'Travel overnight by bus via Taba to Jerusalem, with a swim in the Dead Sea, visits to the Holy Sepulchre, the Via Dolorosa, the Western Wall, the Mount of Olives, the Cenacle and the Church of the Nativity, lunch included.',
      ar: 'سافر ليلاً بالحافلة عبر طابا إلى القدس، مع السباحة في البحر الميت، وزيارة القيامة، وطريق الآلام، وحائط البراق، وجبل الزيتون، والعلية، وكنيسة المهد، مع الغداء مشمول.',
      it: 'Viaggia di notte in autobus via Taba fino a Gerusalemme, con nuoto nel Mar Morto, visite al Santo Sepolcro, alla Via Dolorosa, al Muro del Pianto, al Monte degli Ulivi, al Cenacolo e alla Chiesa della Natività, pranzo incluso.',
      ru: 'Ночная поездка на автобусе через Табу в Иерусалим, с купанием в Мёртвом море, посещением Храма Гроба Господня, Виа Долороза, Стены Плача, Елеонской горы, Сионской горницы и Церкви Рождества, обед включён.',
      de: 'Reise über Nacht mit dem Bus über Taba nach Jerusalem, mit Baden im Toten Meer, Besuchen der Grabeskirche, der Via Dolorosa, der Klagemauer, des Ölbergs, des Abendmahlssaals und der Geburtskirche, Mittagessen inbegriffen.'
    },
    pickupTime: { en: '20:00 - 23:00 (next day)', ar: '20:00 - 23:00 (اليوم التالي)', it: '20:00 - 23:00 (giorno dopo)', ru: '20:00 - 23:00 (на следующий день)', de: '20:00 - 23:00 (am nächsten Tag)' },
    availability: { en: 'Saturday, Monday and Thursday', ar: 'السبت والاثنين والخميس', it: 'Sabato, lunedì e giovedì', ru: 'Суббота, понедельник и четверг', de: 'Samstag, Montag und Donnerstag' },
    highlights: {
      en: ['Swim in the Dead Sea', 'The Holy Sepulchre and Via Dolorosa', 'The Western Wall and Mount of Olives', 'The Church of the Nativity'],
      ar: ['السباحة في البحر الميت', 'كنيسة القيامة وطريق الآلام', 'حائط البراق وجبل الزيتون', 'كنيسة المهد'],
      it: ['Nuoto nel Mar Morto', 'Il Santo Sepolcro e la Via Dolorosa', 'Il Muro del Pianto e il Monte degli Ulivi', 'La Chiesa della Natività'],
      ru: ['Купание в Мёртвом море', 'Храм Гроба Господня и Виа Долороза', 'Стена Плача и Елеонская гора', 'Церковь Рождества'],
      de: ['Baden im Toten Meer', 'Die Grabeskirche und die Via Dolorosa', 'Die Klagemauer und der Ölberg', 'Die Geburtskirche']
    },
    included: {
      en: ['Hotel pickup and drop-off', 'Dead Sea swim', 'Holy Sepulchre and Via Dolorosa visit', 'Western Wall and Mount of Olives visit', 'Cenacle visit', 'Church of the Nativity visit', 'Lunch'],
      ar: ['الاستلام والتوصيل من الفندق', 'السباحة في البحر الميت', 'زيارة كنيسة القيامة وطريق الآلام', 'زيارة حائط البراق وجبل الزيتون', 'زيارة العلية', 'زيارة كنيسة المهد', 'الغداء'],
      it: ['Transfer da/per l\'hotel', 'Nuoto nel Mar Morto', 'Visita al Santo Sepolcro e alla Via Dolorosa', 'Visita al Muro del Pianto e al Monte degli Ulivi', 'Visita al Cenacolo', 'Visita alla Chiesa della Natività', 'Pranzo'],
      ru: ['Трансфер из отеля и обратно', 'Купание в Мёртвом море', 'Посещение Храма Гроба Господня и Виа Долороза', 'Посещение Стены Плача и Елеонской горы', 'Посещение Сионской горницы', 'Посещение Церкви Рождества', 'Обед'],
      de: ['Hoteltransfer hin und zurück', 'Baden im Toten Meer', 'Besuch der Grabeskirche und der Via Dolorosa', 'Besuch der Klagemauer und des Ölbergs', 'Besuch des Abendmahlssaals', 'Besuch der Geburtskirche', 'Mittagessen']
    },
    excluded: { en: [], ar: [], it: [], ru: [], de: [] },
    addons: []
  }
];

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((tour) => tour.slug === slug);
}
