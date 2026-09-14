'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/packages', icon: '🏷️', label: 'Packages' },
  { href: '/quick-booking', icon: '✈️', label: 'Booking' },
  { href: '/', icon: '🏠', label: 'Home' }
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-3">
        {items.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href.split('?')[0]);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 py-2.5 text-[11px] font-medium ${
                isActive ? 'text-[#ffa500]' : 'text-gray-400'
              }`}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
