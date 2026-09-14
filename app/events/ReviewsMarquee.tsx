'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { reviews } from '../../lib/reviews';

export default function ReviewsMarquee() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let frame: number;
    const step = () => {
      if (!paused) {
        scroller.scrollLeft += 0.6;
        if (scroller.scrollLeft >= scroller.scrollWidth - scroller.clientWidth - 1) {
          scroller.scrollLeft = 0;
        }
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [paused]);

  const doubled = [...reviews, ...reviews];

  return (
    <div
      ref={scrollerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="flex gap-4 overflow-x-auto px-6 pb-2"
      style={{ scrollbarWidth: 'none' }}
    >
      {doubled.map((review, i) => (
        <div key={`${review.name}-${i}`} className="flex-shrink-0 w-64 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <Image src={`https://picsum.photos/seed/${review.avatarSeed}/80/80`} alt={review.name} fill className="object-cover" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900">{review.name}</p>
              <p className="text-[10px] text-gray-400">{review.date}</p>
            </div>
          </div>
          <p className="text-[#ffa500] text-xs mb-2">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
          <p className="text-xs text-gray-600 line-clamp-3 mb-1">{review.text}</p>
          <button className="text-[10px] text-[#00a8cc] font-semibold">Read more</button>
        </div>
      ))}
    </div>
  );
}
