export interface Bundle {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  price: number;
  originalPrice: number;
  slugs: string[];
  eveningOut?: string[];
  extras?: { label: string; price: number }[];
}

export const bundles: Bundle[] = [
  {
    id: 'soft-sharm',
    name: 'Soft Sharm',
    subtitle: 'Deserto + mare in un giorno',
    image: '/tours/safari.jpg',
    price: 45,
    originalPrice: 50,
    slugs: ['buggy-desert', 'ras-mohammed-boat'],
    eveningOut: ['Soho Square', 'Sharm Vecchia', 'Naama Bay'],
    extras: [{ label: 'Cena beduina + spettacolo', price: 20 }]
  },
  {
    id: 'family-sharm',
    name: 'Family Sharm',
    subtitle: 'Perfetto per famiglie con bambini',
    image: '/tours/dolphins/dolphin-show.jpg',
    price: 60,
    originalPrice: 65,
    slugs: ['quad-safari', 'ras-mohammed-bus', 'dolphin-show'],
    eveningOut: ['Soho Square', 'Naama Bay'],
    extras: [{ label: 'Cena beduina + spettacolo', price: 20 }]
  },
  {
    id: 'desert-sea',
    name: 'Desert & Sea',
    subtitle: 'Grande safari e barca di vetro',
    image: '/tours/private-boat/1.jpg',
    price: 45,
    originalPrice: 50,
    slugs: ['grand-safari-dahab', 'glass-boat'],
    eveningOut: ['Sharm Vecchia', 'Naama Bay'],
    extras: [{ label: 'Cena beduina + spettacolo', price: 20 }]
  }
];
