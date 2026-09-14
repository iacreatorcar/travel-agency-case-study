'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <Link
        href="/contact"
        className="w-12 h-12 rounded-full bg-[#0d1f2d] flex items-center justify-center shadow-lg hover:scale-105 transition text-2xl"
        aria-label="Chat with us"
      >
        💬
      </Link>

      <a
        href="https://wa.me/000000000000"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-white shadow-lg hover:scale-105 transition overflow-hidden flex items-center justify-center"
        aria-label="WhatsApp"
      >
        <Image src="/social/whatsapp.png" alt="WhatsApp" width={48} height={48} className="object-contain w-full h-full p-1" />
      </a>
    </div>
  );
}
