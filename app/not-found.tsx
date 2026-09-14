import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <span className="text-5xl mb-4">🧭</span>
      <h1 className="text-3xl font-bold text-[#0d1f2d] mb-2">Page not found</h1>
      <p className="text-gray-500 mb-6">The page you're looking for doesn't exist or has moved.</p>
      <Link
        href="/vetrina"
        className="bg-[#ffa500] text-white font-bold px-6 py-3 rounded-full hover:bg-[#e69400] transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
