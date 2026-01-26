export const THEME_STORAGE_KEY = 'theme';

export type Theme = 'dark' | 'light';

export const getCurrentTheme = (root: HTMLElement): Theme =>
  root.classList.contains('dark') ? 'dark' : 'light';
