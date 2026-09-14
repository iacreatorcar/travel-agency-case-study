'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#00a8cc] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold hover:text-[#ffa500]">
            🌍 Voyara Travel
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            <Link href="/" className="hover:text-[#ffa500] transition">
              Home
            </Link>
            <Link href="/packages" className="hover:text-[#ffa500] transition">
              Packages
            </Link>
            <Link href="/quick-booking" className="hover:text-[#ffa500] transition">
              Booking
            </Link>
            <Link href="/about" className="hover:text-[#ffa500] transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#ffa500] transition">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block hover:text-[#ffa500]">
              Home
            </Link>
            <Link href="/packages" className="block hover:text-[#ffa500]">
              Packages
            </Link>
            <Link href="/quick-booking" className="block hover:text-[#ffa500]">
              Booking
            </Link>
            <Link href="/about" className="block hover:text-[#ffa500]">
              About
            </Link>
            <Link href="/contact" className="block hover:text-[#ffa500]">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
