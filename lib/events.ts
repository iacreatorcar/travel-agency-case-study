import { Lang } from './tours';

export interface EgyptEvent {
  slug: string;
  imageSeed: string;
  dateLabel: { [key in Lang]: string };
  title: { [key in Lang]: string };
  description: { [key in Lang]: string };
}

export const events: EgyptEvent[] = [
  {
    slug: 'solar-eclipse-2027',
    imageSeed: 'event-eclipse',
    dateLabel: { en: 'August 2027', ar: 'أغسطس 2027', it: 'Agosto 2027', ru: 'Август 2027', de: 'August 2027' },
    title: {
      en: 'Solar Eclipse Event In Egypt',
      ar: 'حدث الكسوف الشمسي في مصر',
      it: 'Eclissi Solare in Egitto',
      ru: 'Солнечное затмение в Египте',
      de: 'Sonnenfinsternis in Ägypten'
    },
    description: {
      en: 'Watch a total solar eclipse from the Egyptian desert with expert astronomers and a front-row view of the Great Pyramids.',
      ar: 'شاهد كسوفًا شمسيًا كليًا من الصحراء المصرية بصحبة خبراء فلك مع إطلالة مباشرة على الأهرامات العظيمة.',
      it: 'Osserva un\'eclissi solare totale dal deserto egiziano con astronomi esperti e una vista in prima fila sulle Grandi Piramidi.',
      ru: 'Наблюдайте полное солнечное затмение в египетской пустыне вместе с экспертами-астрономами с видом на Великие пирамиды.',
      de: 'Erlebe eine totale Sonnenfinsternis in der ägyptischen Wüste mit Astronomie-Experten und Blick auf die Großen Pyramiden.'
    }
  },
  {
    slug: 'egypt-easter-2026',
    imageSeed: 'event-easter',
    dateLabel: { en: 'April 2026', ar: 'أبريل 2026', it: 'Aprile 2026', ru: 'Апрель 2026', de: 'April 2026' },
    title: {
      en: 'Egypt Easter Event',
      ar: 'فعالية عيد الفصح في مصر',
      it: 'Evento di Pasqua in Egitto',
      ru: 'Пасхальное событие в Египте',
      de: 'Ostern in Ägypten'
    },
    description: {
      en: 'Celebrate Easter with a sunrise camel ride at the Pyramids, traditional Egyptian brunch, and festive evening entertainment.',
      ar: 'احتفل بعيد الفصح مع رحلة على الجمال عند شروق الشمس بجانب الأهرامات، وإفطار مصري تقليدي، وترفيه مسائي احتفالي.',
      it: 'Festeggia la Pasqua con un giro in cammello all\'alba alle Piramidi, brunch egiziano tradizionale e intrattenimento serale.',
      ru: 'Отпразднуйте Пасху с катанием на верблюдах на рассвете у пирамид, традиционным египетским бранчем и вечерними развлечениями.',
      de: 'Feiere Ostern mit einer Sonnenaufgangs-Kamelfahrt an den Pyramiden, traditionellem ägyptischem Brunch und Abendunterhaltung.'
    }
  },
  {
    slug: 'egypt-christmas-2027',
    imageSeed: 'event-christmas',
    dateLabel: { en: 'December 2027', ar: 'ديسمبر 2027', it: 'Dicembre 2027', ru: 'Декабрь 2027', de: 'Dezember 2027' },
    title: {
      en: 'Egypt Christmas Event',
      ar: 'فعالية عيد الميلاد في مصر',
      it: 'Evento di Natale in Egitto',
      ru: 'Рождественское событие в Египте',
      de: 'Weihnachten in Ägypten'
    },
    description: {
      en: 'Warm Christmas celebrations under the desert stars with dinner, live music and festive activities for the whole family.',
      ar: 'احتفالات دافئة بعيد الميلاد تحت نجوم الصحراء مع عشاء وموسيقى حية وأنشطة احتفالية لكل العائلة.',
      it: 'Calorose celebrazioni natalizie sotto le stelle del deserto con cena, musica dal vivo e attività festive per tutta la famiglia.',
      ru: 'Тёплое празднование Рождества под звёздами пустыни с ужином, живой музыкой и развлечениями для всей семьи.',
      de: 'Warme Weihnachtsfeier unter dem Wüstenhimmel mit Abendessen, Live-Musik und festlichen Aktivitäten für die ganze Familie.'
    }
  },
  {
    slug: 'abu-simbel-sun-festival-feb',
    imageSeed: 'event-abusimbel-feb',
    dateLabel: { en: 'February 2026', ar: 'فبراير 2026', it: 'Febbraio 2026', ru: 'Февраль 2026', de: 'Februar 2026' },
    title: {
      en: 'Abu Simbel Sun Festival',
      ar: 'مهرجان تعامد الشمس في أبو سمبل',
      it: 'Festival del Sole di Abu Simbel',
      ru: 'Фестиваль солнца в Абу-Симбеле',
      de: 'Abu-Simbel-Sonnenfestival'
    },
    description: {
      en: 'Witness the twice-yearly alignment where sunlight illuminates the inner sanctuary of Ramses II\'s temple at dawn.',
      ar: 'شاهد ظاهرة تعامد الشمس التي تحدث مرتين سنويًا حيث تضيء أشعة الشمس قدس أقداس معبد رمسيس الثاني عند الفجر.',
      it: 'Assisti al fenomeno biennale in cui la luce del sole illumina il santuario interno del tempio di Ramses II all\'alba.',
      ru: 'Станьте свидетелем дважды в год происходящего явления, когда солнечный свет освещает святилище храма Рамзеса II на рассвете.',
      de: 'Erlebe das zweimal jährlich stattfindende Ereignis, bei dem Sonnenlicht bei Sonnenaufgang das innere Heiligtum des Ramses-II-Tempels erleuchtet.'
    }
  },
  {
    slug: 'abu-simbel-sun-festival-oct',
    imageSeed: 'event-abusimbel-oct',
    dateLabel: { en: 'October 2026', ar: 'أكتوبر 2026', it: 'Ottobre 2026', ru: 'Октябрь 2026', de: 'Oktober 2026' },
    title: {
      en: 'Abu Simbel Sun Festival',
      ar: 'مهرجان تعامد الشمس في أبو سمبل',
      it: 'Festival del Sole di Abu Simbel',
      ru: 'Фестиваль солнца в Абу-Симбеле',
      de: 'Abu-Simbel-Sonnenfestival'
    },
    description: {
      en: 'The second yearly alignment of Abu Simbel — a rare, unmissable moment for photographers and history lovers.',
      ar: 'التعامد الثاني السنوي في أبو سمبل — لحظة نادرة لا تُفوَّت لعشاق التصوير والتاريخ.',
      it: 'Il secondo allineamento annuale di Abu Simbel — un momento raro e imperdibile per fotografi e appassionati di storia.',
      ru: 'Второе ежегодное явление в Абу-Симбеле — редкий, незабываемый момент для фотографов и любителей истории.',
      de: 'Die zweite jährliche Ausrichtung von Abu Simbel — ein seltener, unverzichtbarer Moment für Fotografen und Geschichtsliebhaber.'
    }
  },
  {
    slug: 'shakira-pyramids-concert',
    imageSeed: 'event-shakira',
    dateLabel: { en: 'To Be Announced', ar: 'سيُعلن لاحقًا', it: 'Da Annunciare', ru: 'Скоро объявим', de: 'Wird bekannt gegeben' },
    title: {
      en: 'Live Concert Under the Pyramids',
      ar: 'حفلة موسيقية تحت الأهرامات',
      it: 'Concerto Live Sotto le Piramidi',
      ru: 'Живой концерт под пирамидами',
      de: 'Live-Konzert Unter den Pyramiden'
    },
    description: {
      en: 'An unforgettable open-air concert with the Great Pyramids of Giza as the backdrop — VIP packages available.',
      ar: 'حفلة موسيقية لا تُنسى في الهواء الطلق بخلفية أهرامات الجيزة العظيمة — تتوفر باقات VIP.',
      it: 'Un concerto all\'aperto indimenticabile con le Grandi Piramidi di Giza sullo sfondo — pacchetti VIP disponibili.',
      ru: 'Незабываемый концерт под открытым небом на фоне Великих пирамид Гизы — доступны VIP-пакеты.',
      de: 'Ein unvergessliches Open-Air-Konzert vor der Kulisse der Großen Pyramiden von Gizeh — VIP-Pakete verfügbar.'
    }
  }
];

export function getEventBySlug(slug: string): EgyptEvent | undefined {
  return events.find((event) => event.slug === slug);
}
