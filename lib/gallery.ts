export type GallerySource = 'tiktok' | 'youtube' | 'instagram' | 'facebook';

export interface GalleryItem {
  id: string;
  image: string;
  source: GallerySource;
  href: string;
  tall?: boolean;
}

export const galleryItems: GalleryItem[] = [
  { id: 'g2', image: '/gallery/tiktok-2.jpg', source: 'tiktok', href: 'https://www.tiktok.com/@voyara.travel.demo', tall: true }
];
