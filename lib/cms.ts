'use client';

import { useEffect, useState } from 'react';
import type { Tour } from './tours';
import { tours as staticTours } from './tours';
import type { Hotel } from './hotels';
import type { BlogPost } from './blog';
import type { EgyptEvent } from './events';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

const cache = new Map<string, unknown[]>();
const inflight = new Map<string, Promise<unknown[]>>();

async function fetchCollection<T>(endpoint: string): Promise<T[]> {
  if (cache.has(endpoint)) return cache.get(endpoint) as T[];
  if (inflight.has(endpoint)) return inflight.get(endpoint) as Promise<T[]>;

  const promise = fetch(`${STRAPI_URL}/api/${endpoint}?pagination[pageSize]=200`)
    .then((res) => (res.ok ? res.json() : { data: [] }))
    .then((json) => {
      const data = (json.data ?? []) as T[];
      cache.set(endpoint, data);
      inflight.delete(endpoint);
      return data;
    })
    .catch(() => {
      inflight.delete(endpoint);
      return [] as T[];
    });

  inflight.set(endpoint, promise);
  return promise;
}

function useCollection<T>(endpoint: string): { data: T[]; loading: boolean } {
  const [data, setData] = useState<T[]>((cache.get(endpoint) as T[]) || []);
  const [loading, setLoading] = useState(!cache.has(endpoint));

  useEffect(() => {
    let cancelled = false;
    if (cache.has(endpoint)) {
      setData(cache.get(endpoint) as T[]);
      setLoading(false);
      return;
    }
    fetchCollection<T>(endpoint).then((result) => {
      if (!cancelled) {
        setData(result);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [endpoint]);

  return { data, loading };
}

export function useTours() {
  const result = useCollection<Tour>('tours');
  if (!result.loading && result.data.length === 0) {
    return { data: staticTours, loading: false };
  }
  return result;
}

export function useHotels() {
  return useCollection<Hotel>('hotels');
}

export function useBlogPosts() {
  return useCollection<BlogPost>('blog-posts');
}

export function useEvents() {
  return useCollection<EgyptEvent>('events');
}
