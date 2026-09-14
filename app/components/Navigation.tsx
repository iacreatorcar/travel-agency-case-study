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
            <Link href="/tours" className="hover:text-[#ffa500] transition">
              Tours
            </Link>
            <Link href="/hotels" className="hover:text-[#ffa500] transition">
              Hotels
            </Link>
            <Link href="/transfers" className="hover:text-[#ffa500] transition">
              Transfers
            </Link>
            <Link href="/about" className="hover:text-[#ffa500] transition">
              About
            </Link>
            <Link href="/dashboard" className="hover:text-[#ffa500] transition">
              Admin Dashboard
            </Link>
            <Link href="/agent" className="hover:text-[#ffa500] transition">
              Agent Portal
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
            <Link href="/tours" className="block hover:text-[#ffa500]">
              Tours
            </Link>
            <Link href="/hotels" className="block hover:text-[#ffa500]">
              Hotels
            </Link>
            <Link href="/transfers" className="block hover:text-[#ffa500]">
              Transfers
            </Link>
            <Link href="/about" className="block hover:text-[#ffa500]">
              About
            </Link>
            <Link href="/dashboard" className="block hover:text-[#ffa500]">
              Admin Dashboard
            </Link>
            <Link href="/agent" className="block hover:text-[#ffa500]">
              Agent Portal
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
