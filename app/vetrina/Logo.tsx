import Link from 'next/link';

/**
 * Text-based placeholder logo. The original project used real client logo
 * image files (logo.png / logo-banner.png) which have been removed from this
 * sanitized portfolio case study — see CASE-STUDY-NOTES.md.
 */
export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <span className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#00a8cc] text-white font-black text-lg sm:text-xl shrink-0">
        V
      </span>
      <span className="font-black italic text-lg sm:text-2xl text-[#0d1f2d] leading-none">
        Voyara <span className="text-[#00a8cc]">Travel</span>
      </span>
    </Link>
  );
}
