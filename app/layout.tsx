import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'CraftedByNafis',
  description: 'Portfolio of backend-oriented full-stack engineer Nafis.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-800">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
              <a href="/" className="font-semibold tracking-tight">
                CraftedByNafis
              </a>
              <nav className="flex gap-4 text-sm text-slate-300">
                <a href="/">Home</a>
                <a href="/projects">Projects</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
              </nav>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-slate-800">
            <div className="mx-auto max-w-5xl px-4 py-4 text-xs text-slate-500">
              © {new Date().getFullYear()} CraftedByNafis. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
