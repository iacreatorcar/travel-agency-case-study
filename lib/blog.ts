import { Lang } from './tours';

export interface BlogPost {
  slug: string;
  image: string;
  date: string;
  readMinutes: number;
  title: { [key in Lang]: string };
  excerpt: { [key in Lang]: string };
  content: { [key in Lang]: string[] };
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'best-time-to-visit-sharm-el-sheikh',
    image: '/hero/hero-2.jpg',
    date: '2026-08-15',
    readMinutes: 4,
    title: {
      en: 'Best Time to Visit Sharm El-Sheikh',
      ar: 'أفضل وقت لزيارة شرم الشيخ',
      it: 'Il Momento Migliore per Visitare Sharm El-Sheikh',
      ru: 'Лучшее время для посещения Шарм-эль-Шейха',
      de: 'Die beste Reisezeit für Sharm El-Sheikh'
    },
    excerpt: {
      en: 'Warm water, clear skies and the best diving conditions — here is when to plan your trip.',
      ar: 'مياه دافئة، سماء صافية وأفضل ظروف للغوص — إليك متى تخطط لرحلتك.',
      it: 'Acqua calda, cieli limpidi e condizioni ideali per le immersioni — ecco quando pianificare il tuo viaggio.',
      ru: 'Тёплая вода, ясное небо и лучшие условия для дайвинга — вот когда планировать поездку.',
      de: 'Warmes Wasser, klarer Himmel und beste Tauchbedingungen — hier erfährst du, wann du reisen solltest.'
    },
    content: {
      en: [
        'Sharm El-Sheikh enjoys warm weather almost all year round, but each season has its own character.',
        'March to May and September to November offer the most comfortable temperatures for exploring, snorkeling and desert safaris, without the peak summer heat.',
        'June to August is hot but ideal for beach and water activities, with the Red Sea at its warmest for diving.',
        'December to February is mild and popular with visitors escaping colder climates back home — pack a light jacket for the evenings.'
      ],
      ar: [
        'تتمتع شرم الشيخ بطقس دافئ على مدار العام تقريبًا، لكن لكل موسم طابعه الخاص.',
        'من مارس إلى مايو ومن سبتمبر إلى نوفمبر توفر درجات حرارة مريحة للاستكشاف والغطس ورحلات السفاري الصحراوية دون حرارة الصيف الشديدة.',
        'من يونيو إلى أغسطس الجو حار لكنه مثالي للأنشطة الشاطئية والمائية، مع دفء البحر الأحمر المناسب للغوص.',
        'من ديسمبر إلى فبراير الجو معتدل ومحبوب لدى الزوار الهاربين من برد بلادهم — احضر سترة خفيفة للأمسيات.'
      ],
      it: [
        'Sharm El-Sheikh gode di un clima caldo quasi tutto l\'anno, ma ogni stagione ha il suo carattere.',
        'Da marzo a maggio e da settembre a novembre le temperature sono più piacevoli per esplorare, fare snorkeling e safari nel deserto, senza il caldo estivo intenso.',
        'Da giugno ad agosto fa caldo ma è ideale per spiaggia e attività acquatiche, con il Mar Rosso alla temperatura migliore per le immersioni.',
        'Da dicembre a febbraio il clima è mite ed è amato da chi fugge dal freddo di casa — porta una giacca leggera per le sere.'
      ],
      ru: [
        'В Шарм-эль-Шейхе тепло почти круглый год, но у каждого сезона свой характер.',
        'С марта по май и с сентября по ноябрь температура наиболее комфортна для прогулок, снорклинга и сафари в пустыне, без летней жары.',
        'С июня по август жарко, но идеально для пляжа и водных развлечений, а Красное море особенно тёплое для дайвинга.',
        'С декабря по февраль мягкий климат, популярный у гостей, спасающихся от холода дома — возьмите лёгкую куртку на вечер.'
      ],
      de: [
        'In Sharm El-Sheikh ist es fast das ganze Jahr über warm, doch jede Jahreszeit hat ihren eigenen Charakter.',
        'Von März bis Mai und von September bis November sind die Temperaturen am angenehmsten für Ausflüge, Schnorcheln und Wüstensafaris, ohne die intensive Sommerhitze.',
        'Von Juni bis August ist es heiß, aber ideal für Strand und Wasseraktivitäten, das Rote Meer ist dann am wärmsten zum Tauchen.',
        'Von Dezember bis Februar ist das Klima mild und beliebt bei Gästen, die der Kälte zu Hause entfliehen — nimm eine leichte Jacke für die Abende mit.'
      ]
    }
  },
  {
    slug: 'top-5-snorkeling-spots-red-sea',
    image: '/hero/hero-9.jpg',
    date: '2026-08-22',
    readMinutes: 5,
    title: {
      en: 'Top 5 Snorkeling Spots in the Red Sea',
      ar: 'أفضل 5 أماكن للغطس في البحر الأحمر',
      it: 'I 5 Migliori Punti Snorkeling nel Mar Rosso',
      ru: '5 лучших мест для снорклинга в Красном море',
      de: 'Die 5 besten Schnorchelplätze im Roten Meer'
    },
    excerpt: {
      en: 'From Ras Mohammed to Tiran Island, here are the reefs you shouldn\'t miss.',
      ar: 'من رأس محمد إلى جزيرة تيران، إليك الشعاب المرجانية التي لا يجب أن تفوتك.',
      it: 'Da Ras Mohammed all\'Isola di Tiran, ecco le barriere che non puoi perderti.',
      ru: 'От Рас-Мохаммеда до острова Тиран — рифы, которые нельзя пропустить.',
      de: 'Von Ras Mohammed bis zur Insel Tiran — diese Riffe solltest du nicht verpassen.'
    },
    content: {
      en: [
        'Ras Mohammed National Park tops the list, with dramatic drop-offs and dense coral gardens just off the boat.',
        'Tiran Island offers four distinct reefs, each with its own currents and marine life — great for more experienced snorkelers.',
        'Naama Bay is the easiest to reach, ideal for beginners and families, with calm, shallow water close to shore.',
        'Nabq Bay is quieter and known for its mangroves alongside the reef, home to rays and the occasional turtle.',
        'Blue Hole near Dahab is famous among divers but the shallow reef edge is also stunning for snorkelers who stay close to shore.'
      ],
      ar: [
        'يتصدر متنزه رأس محمد الوطني القائمة، بحواف صخرية مذهلة وحدائق مرجانية كثيفة على بعد خطوات من القارب.',
        'توفر جزيرة تيران أربع شعاب مرجانية مختلفة، لكل منها تياراتها وحياتها البحرية الخاصة — رائعة للأكثر خبرة.',
        'خليج نعمة هو الأسهل للوصول إليه، مثالي للمبتدئين والعائلات، بمياه هادئة وضحلة قريبة من الشاطئ.',
        'خليج نبق أكثر هدوءًا ومعروف بأشجار المانغروف بجانب الشعاب، موطن للراي وأحيانًا السلاحف.',
        'البلو هول بالقرب من دهب مشهورة بين الغواصين لكن حافة الشعاب الضحلة رائعة أيضًا لمن يبقى قريبًا من الشاطئ.'
      ],
      it: [
        'Il Parco Nazionale di Ras Mohammed è in cima alla lista, con pareti spettacolari e giardini di corallo densi a pochi passi dalla barca.',
        'L\'Isola di Tiran offre quattro barriere distinte, ognuna con correnti e vita marina proprie — ottima per chi ha più esperienza.',
        'Naama Bay è la più facile da raggiungere, ideale per principianti e famiglie, con acque calme e basse vicino alla riva.',
        'Nabq Bay è più tranquilla ed è nota per le mangrovie accanto alla barriera, casa di razze e occasionali tartarughe.',
        'Il Blue Hole vicino Dahab è famoso tra i subacquei ma il bordo poco profondo della barriera è splendido anche per chi fa snorkeling restando vicino alla riva.'
      ],
      ru: [
        'Национальный парк Рас-Мохаммед возглавляет список — впечатляющие обрывы и густые коралловые сады прямо у лодки.',
        'Остров Тиран предлагает четыре разных рифа, у каждого свои течения и морская жизнь — отлично для более опытных.',
        'Наама-Бэй проще всего добраться, идеально для новичков и семей, спокойная мелкая вода у берега.',
        'Бухта Набк тише и известна мангровыми зарослями рядом с рифом, домом для скатов и иногда черепах.',
        'Блю-Хоул возле Дахаба известен среди дайверов, но мелкий край рифа тоже прекрасен для снорклинга у берега.'
      ],
      de: [
        'Der Nationalpark Ras Mohammed führt die Liste an, mit dramatischen Abhängen und dichten Korallengärten direkt vor dem Boot.',
        'Die Insel Tiran bietet vier unterschiedliche Riffe, jedes mit eigenen Strömungen und Meeresleben — ideal für erfahrenere Schnorchler.',
        'Naama Bay ist am leichtesten zu erreichen, ideal für Anfänger und Familien, mit ruhigem, flachem Wasser nahe der Küste.',
        'Nabq Bay ist ruhiger und bekannt für seine Mangroven neben dem Riff, Heimat von Rochen und gelegentlichen Schildkröten.',
        'Das Blue Hole bei Dahab ist bei Tauchern berühmt, doch auch der flache Riffrand ist für Schnorchler nahe der Küste beeindruckend.'
      ]
    }
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
