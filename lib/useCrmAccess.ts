'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CrmSession {
  name: string;
  role: 'admin' | 'agent';
}

export function useCrmAccess() {
  const router = useRouter();
  const [session, setSession] = useState<CrmSession | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('crm_access');
    if (!stored) {
      router.replace('/login');
      return;
    }
    try {
      setSession(JSON.parse(stored));
    } catch {
      router.replace('/login');
      return;
    }
    setChecked(true);
  }, [router]);

  const logout = () => {
    localStorage.removeItem('crm_access');
    router.replace('/login');
  };

  return { session, checked, logout };
}
