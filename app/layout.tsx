import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { ReactNode } from 'react';
import ThemeToggle from './components/theme-toggle';
import SiteNav from './components/site-nav';

export const metadata: Metadata = {
  title: 'CraftedByNafis',
  description: 'Portfolio of backend-oriented full-stack engineer Nafis.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Keep this script static; never interpolate user-controlled data.
  const themeInitScript = `
    // Keep in sync with THEME_STORAGE_KEY (app/lib/theme.ts).
    const storageKey = 'theme';
    const root = document.documentElement;
    let storedTheme = null;
    try {
      storedTheme = localStorage.getItem(storageKey);
    } catch {
      storedTheme = null;
    }
    const preferredTheme = storedTheme || 'dark';
    if (preferredTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-200 dark:border-slate-800">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
              <a href="/" className="font-semibold tracking-tight">
                CraftedByNafis
              </a>
              <div className="flex items-center gap-4">
                <SiteNav />
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-slate-200 dark:border-slate-800">
            <div className="mx-auto max-w-5xl px-4 py-4 text-xs text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} CraftedByNafis. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
