'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const galleryImages = [
  'https://picsum.photos/seed/gallery-christmas/500/400',
  '/events/sharm-aerial.jpg',
  'https://picsum.photos/seed/gallery-eclipse/500/400',
  '/events/dolce-vita-desert-party.jpg',
  'https://picsum.photos/seed/gallery-sphinx-museum/500/400',
  '/events/monastero-santa-caterina.jpg',
  'https://picsum.photos/seed/gallery-nile-sunset/500/400',
  '/events/sharm-aerial.jpg',
  'https://picsum.photos/seed/gallery-desert-camp/500/400',
  '/events/dahab-fishing-village.jpg'
];

export default function EgyptGallery({ title }: { title: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % galleryImages.length;
        scrollToIndex(next);
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  const scrollToIndex = (index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const child = scroller.children[index] as HTMLElement | undefined;
    if (child) {
      scroller.scrollTo({ left: child.offsetLeft - 16, behavior: 'smooth' });
      setActive(index);
    }
  };

  const handleScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const index = Math.round(scroller.scrollLeft / (scroller.clientWidth * 0.7));
    setActive(Math.min(index, galleryImages.length - 1));
  };

  return (
    <section className="py-14">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">{title}</h2>

      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="flex gap-4 overflow-x-auto px-6 pb-2 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none' }}
      >
        {galleryImages.map((src, i) => (
          <div
            key={src}
            className="relative flex-shrink-0 w-64 h-52 snap-start rounded-xl p-2"
            style={{
              background:
                'repeating-linear-gradient(135deg, #ffa500 0px, #ffa500 10px, #ff9100 10px, #ff9100 20px)'
            }}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {galleryImages.map((src, i) => (
          <button
            key={src}
            onClick={() => scrollToIndex(i)}
            className={`w-2 h-2 rounded-full transition ${active === i ? 'bg-[#ffa500] w-5' : 'bg-gray-300'}`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
