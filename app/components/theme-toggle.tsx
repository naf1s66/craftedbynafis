'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

type Theme = 'dark' | 'light';

const getCurrentTheme = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  const toggleTheme = () => {
    const resolvedTheme = theme ?? getCurrentTheme();
    const nextTheme: Theme = resolvedTheme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;

    if (nextTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem(STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  };

  const isDark = theme === null ? true : theme === 'dark';
  const label = theme === null ? 'Theme' : isDark ? 'Dark' : 'Light';
  const nextLabel = isDark ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={theme === null ? undefined : isDark}
      aria-label={`Switch to ${nextLabel} mode`}
      className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 transition hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:text-white"
    >
      {label}
    </button>
  );
}
