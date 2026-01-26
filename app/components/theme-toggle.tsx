'use client';

import { useEffect, useState } from 'react';
import { getCurrentTheme, THEME_STORAGE_KEY, type Theme } from '../lib/theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    setTheme(getCurrentTheme(root));
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const resolvedTheme = theme ?? getCurrentTheme(root);
    const nextTheme: Theme = resolvedTheme === 'dark' ? 'light' : 'dark';

    root.classList.toggle('dark', nextTheme === 'dark');
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        className="rounded-full border border-transparent px-3 py-1 text-xs font-medium opacity-0"
      >
        Theme
      </button>
    );
  }

  const isDark = theme === 'dark';
  const label = isDark ? 'Dark' : 'Light';
  const nextLabel = isDark ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={`Switch to ${nextLabel} mode`}
      className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:text-white"
    >
      {label}
    </button>
  );
}
