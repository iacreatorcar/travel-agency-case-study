'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/site-auth', { method: 'DELETE' });
    router.replace('/site-access');
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      style={{
        position: 'fixed',
        bottom: '12px',
        right: '12px',
        zIndex: 9999,
        background: '#0d1f2d',
        color: '#fff',
        border: 'none',
        borderRadius: '999px',
        padding: '0.5rem 1rem',
        fontSize: '0.75rem',
        fontWeight: 700,
        cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(0,0,0,0.25)'
      }}
    >
      Logout
    </button>
  );
}
