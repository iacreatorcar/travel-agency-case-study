'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [role, setRole] = useState<'admin' | 'agent'>('admin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('crm_access', JSON.stringify({ name: name || role, role }));
    router.push(role === 'admin' ? '/dashboard' : '/agent');
  };

  return (
    <div className="min-h-screen bg-[#0d1f2d] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
        <div className="flex justify-center mb-6">
          <span className="flex items-center justify-center h-16 w-16 rounded-full bg-[#00a8cc] text-white font-black text-2xl">V</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 text-center mb-1">Voyara Travel CRM</h1>
        <p className="text-xs text-center text-gray-500 mb-6">Internal access — no password required (demo)</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Access as</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-2 rounded-lg text-sm font-semibold border ${
                  role === 'admin' ? 'border-[#00a8cc] bg-[#00a8cc]/10 text-[#00a8cc]' : 'border-gray-200 text-gray-600'
                }`}
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => setRole('agent')}
                className={`py-2 rounded-lg text-sm font-semibold border ${
                  role === 'agent' ? 'border-[#00a8cc] bg-[#00a8cc]/10 text-[#00a8cc]' : 'border-gray-200 text-gray-600'
                }`}
              >
                Agent
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0d1f2d] text-white font-bold py-3 rounded-lg hover:bg-[#1a3549] transition"
          >
            Enter CRM
          </button>
        </form>
      </div>
    </div>
  );
}
