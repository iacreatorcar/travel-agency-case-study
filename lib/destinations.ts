export interface Destination {
  slug: string;
  name: string;
  imageSeed: string;
}

export const destinations: Destination[] = [
  { slug: 'cairo', name: 'Cairo Tours', imageSeed: 'cairo-tours' },
  { slug: 'luxor', name: 'Luxor Tours', imageSeed: 'luxor-tours' },
  { slug: 'aswan', name: 'Aswan Tours', imageSeed: 'aswan-tours' },
  { slug: 'hurghada', name: 'Hurghada Tours', imageSeed: 'hurghada-tours' },
  { slug: 'sharm-el-sheikh', name: 'Sharm El Sheikh Tours', imageSeed: 'sharm-tours' },
  { slug: 'dahab', name: 'Dahab Tours', imageSeed: 'dahab-tours' },
  { slug: 'alexandria', name: 'Alexandria Tours', imageSeed: 'alexandria-tours' },
  { slug: 'taba', name: 'Taba Tours', imageSeed: 'taba-tours' },
  { slug: 'marsa-alam', name: 'Marsa Alam Tours', imageSeed: 'marsa-alam-tours' }
];
