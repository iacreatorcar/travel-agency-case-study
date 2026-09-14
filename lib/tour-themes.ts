export interface TourTheme {
  slug: string;
  name: string;
  imageSeed: string;
}

export const tourThemes: TourTheme[] = [
  { slug: 'desert', name: 'Desert Tours', imageSeed: 'theme-desert' },
  { slug: 'pyramids', name: 'Pyramids Tours', imageSeed: 'theme-pyramids' },
  { slug: 'easter', name: 'Easter Tours', imageSeed: 'theme-easter' },
  { slug: 'luxor-city-breaks', name: 'Luxor City Breaks', imageSeed: 'theme-luxor' },
  { slug: 'luxury-packages', name: 'Luxury Packages', imageSeed: 'theme-luxury' },
  { slug: 'wheelchair-accessible', name: 'Wheelchair Accessible', imageSeed: 'theme-accessible' },
  { slug: 'honeymoon', name: 'Honeymoon', imageSeed: 'theme-honeymoon' },
  { slug: 'spiritual', name: 'Egypt Spiritual Tours', imageSeed: 'theme-spiritual' },
  { slug: 'small-group', name: 'Egypt Small Group Tours', imageSeed: 'theme-smallgroup' },
  { slug: 'classic', name: 'Egypt Classic Tours', imageSeed: 'theme-classic' },
  { slug: 'christmas-ny', name: 'Christmas & Ny Offers', imageSeed: 'theme-christmas' },
  { slug: 'cairo-city-breaks', name: 'Cairo City Breaks', imageSeed: 'theme-cairo' },
  { slug: 'culture', name: 'Culture Tours', imageSeed: 'theme-culture' },
  { slug: 'adventure', name: 'Adventure Tours', imageSeed: 'theme-adventure' }
];
