import Image from 'next/image';
import Link from 'next/link';

interface FooterLabels {
  needHelp: string;
  needHelpText: string;
  quickLinks: string;
  contactInfo: string;
  rights: string;
  license: string;
}

const defaultLabels: FooterLabels = {
  needHelp: 'Need Our Help?',
  needHelpText: 'We Would Happy To Help You...',
  quickLinks: 'Voyara Travel Links',
  contactInfo: 'Contact Info',
  rights: 'All rights reserved.',
  license: 'Portfolio case study — demo content only'
};

const links = [
  { href: '/', label: 'Home' },
  { href: '/packages', label: 'Packages' },
  { href: '/quick-booking', label: 'Booking' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' }
];

export default function Footer({ labels = defaultLabels }: { labels?: FooterLabels }) {
  return (
    <footer className="relative bg-[#0d1f2d] text-gray-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 relative z-10 pt-10">
        <div>
          <div className="bg-white rounded-lg inline-flex items-center gap-2 p-3 mb-6">
            <span className="flex items-center justify-center h-9 w-9 rounded-full bg-[#00a8cc] text-white font-black text-base">V</span>
            <span className="font-black italic text-lg text-[#0d1f2d]">Voyara <span className="text-[#00a8cc]">Travel</span></span>
          </div>
          <p className="text-white font-bold mb-1">{labels.needHelp}</p>
          <p className="text-sm text-gray-400 mb-4">{labels.needHelpText}</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { icon: '/social/facebook.png', label: 'Facebook', href: 'https://www.facebook.com/voyaratraveldemo' },
              { icon: '/social/instagram.png', label: 'Instagram', href: '#' },
              { icon: '/social/youtube.png', label: 'YouTube', href: 'https://www.youtube.com/@voyaratraveldemo' },
              { icon: '/social/tiktok.png', label: 'TikTok', href: 'https://www.tiktok.com/@voyara.travel.demo' }
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                title={social.label}
                className="w-9 h-9 rounded-full bg-white/95 flex items-center justify-center overflow-hidden hover:scale-105 transition cursor-pointer"
              >
                <Image src={social.icon} alt={social.label} width={22} height={22} className="object-contain" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-gray-400 font-semibold mb-4">{labels.quickLinks}</h3>
          <ul className="text-sm space-y-2.5">
            {links.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-white transition">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-gray-400 font-semibold mb-4">{labels.contactInfo}</h3>
          <div className="space-y-3">
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/000000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 rounded-lg p-3 transition"
            >
              <span className="text-xl">💬</span>
              <div className="text-sm">
                <p className="font-semibold text-white">Chat on WhatsApp</p>
                <p className="text-gray-400 text-xs">2-hour response time</p>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:info@cdalise.com"
              className="flex items-center gap-3 bg-[#00a8cc]/20 hover:bg-[#00a8cc]/30 border border-[#00a8cc]/40 rounded-lg p-3 transition"
            >
              <span className="text-xl">✉️</span>
              <div className="text-sm">
                <p className="font-semibold text-white">Email Us</p>
                <p className="text-gray-400 text-xs">info@cdalise.com</p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+000000000000"
              className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-3 transition"
            >
              <span className="text-xl">📞</span>
              <div className="text-sm">
                <p className="font-semibold text-white">Call Us</p>
                <p className="text-gray-400 text-xs">+00 000 000 0000 (demo)</p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-start gap-3 p-3 rounded-lg">
              <span className="text-xl mt-1">📍</span>
              <div className="text-sm">
                <p className="font-semibold text-white">Visit Us</p>
                <p className="text-gray-400">Demo Business Center<br />Example City (placeholder address)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="border border-[#ffa500]/40 bg-[#ffa500]/10 rounded-lg px-4 py-3 mb-6 text-xs text-[#ffd699] leading-relaxed">
          ⚠️ <strong>Demo purposes only.</strong> This website is a portfolio case study, not a real travel agency. All destinations, photos and locations shown are illustrative examples — not tied to any specific real place, not for sale, and not available for booking. Content is not accurate or updated for any real destination.
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 border-t border-white/10 pt-6 text-xs text-gray-500 flex flex-col sm:flex-row justify-between gap-2 relative z-10">
        <p>© 2024 Voyara Travel. {labels.rights}</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition">Terms of Use</Link>
        </div>
        <p>{labels.license}</p>
      </div>
    </footer>
  );
}
