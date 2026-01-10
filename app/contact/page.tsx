'use client';

import { FormEvent, useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      e.currentTarget.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="mx-auto max-w-md px-4 py-12 space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="text-sm text-slate-300">
        This form sends an email via Resend using a Next.js API route. Until environment
        variables are configured, it will be a no-op and should be treated as a placeholder.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          required
          placeholder="Your name"
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Your email"
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
        />
        <textarea
          name="message"
          required
          placeholder="Your message"
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          rows={4}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400 disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </button>
        {status === 'success' && (
          <p className="text-xs text-emerald-400">Message sent. Check your inbox.</p>
        )}
        {status === 'error' && (
          <p className="text-xs text-rose-400">
            Something went wrong. Ensure Resend is configured or try again later.
          </p>
        )}
      </form>
    </section>
  );
}
