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

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      const root = document.documentElement;
      // Treat null (cleared storage) as dark default.
      const nextTheme: Theme = event.newValue === 'light' ? 'light' : 'dark';
      root.classList.toggle('dark', nextTheme === 'dark');
      setTheme(nextTheme);
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const resolvedTheme = theme ?? getCurrentTheme(root);
    const nextTheme: Theme = resolvedTheme === 'dark' ? 'light' : 'dark';

    root.classList.toggle('dark', nextTheme === 'dark');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Ignore storage errors (private mode, quota exceeded, etc.).
    }
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
  const nextLabel = isDark ? 'light' : 'dark';
  const label = `Switch to ${nextLabel}`;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={label}
      className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:text-white"
    >
      {label}
    </button>
  );
}
