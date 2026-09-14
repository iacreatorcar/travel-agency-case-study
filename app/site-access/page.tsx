'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function SiteAccessPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/site-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (!res.ok) {
        setError('Incorrect password.');
        setSubmitting(false);
        return;
      }

      router.replace('/');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d1f2d', padding: '1.5rem' }}>
      <div style={{ background: '#fff', borderRadius: '12px', padding: '2rem', width: '100%', maxWidth: '360px', boxShadow: '0 10px 40px rgba(0,0,0,0.25)' }}>
        <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0d1f2d', margin: 0, textAlign: 'center' }}>
          Private project environment
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#666', textAlign: 'center', margin: '0.75rem 0 0' }}>
          Access is currently restricted.
        </p>
        <p style={{ fontSize: '0.85rem', color: '#666', textAlign: 'center', margin: '0.25rem 0 1.5rem' }}>
          Please contact the project administrator.
        </p>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#333', marginBottom: '0.35rem' }}>
            Password
          </label>
          <input
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.9rem', color: '#111', marginBottom: '1rem', boxSizing: 'border-box' }}
          />

          {error && (
            <p style={{ fontSize: '0.8rem', color: '#c0392b', marginTop: '-0.5rem', marginBottom: '1rem' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{ width: '100%', padding: '0.65rem', background: '#0d1f2d', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem', cursor: submitting ? 'default' : 'pointer', opacity: submitting ? 0.6 : 1 }}
          >
            Access private demo
          </button>
        </form>
      </div>
    </div>
  );
}
