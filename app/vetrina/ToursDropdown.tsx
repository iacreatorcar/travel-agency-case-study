'use client';

import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Lang } from '../../lib/tours';

const itemLabels: { [key in Lang]: { tours: string; packages: string; events: string; hotels: string } } = {
  en: { tours: 'Tours', packages: 'Packages', events: 'Special Events', hotels: 'Hotels' },
  ar: { tours: 'الرحلات', packages: 'الباقات', events: 'الفعاليات الخاصة', hotels: 'الفنادق' },
  it: { tours: 'Tour', packages: 'Pacchetti', events: 'Eventi Speciali', hotels: 'Hotel' },
  ru: { tours: 'Туры', packages: 'Пакеты', events: 'Спецсобытия', hotels: 'Отели' },
  de: { tours: 'Touren', packages: 'Pakete', events: 'Spezialevents', hotels: 'Hotels' }
};

export default function ToursDropdown({ label, language = 'en' }: { label: string; language?: Lang }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);

  const l = itemLabels[language];
  const items = [
    { label: l.tours, href: '/tours' },
    { label: l.packages, href: '/packages' },
    { label: l.events, href: '/events' },
    { label: l.hotels, href: '/hotels' }
  ];

  useEffect(() => {
    if (open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + 8, left: rect.left });
    }
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 hover:text-[#00a8cc] whitespace-nowrap"
      >
        {label} <span className={`text-xs transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open &&
        createPortal(
          <>
            <div className="fixed inset-0 z-[90]" onClick={() => setOpen(false)} />
            <div
              className="fixed w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[100]"
              style={{ top: coords.top, left: coords.left }}
            >
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#00a8cc]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
