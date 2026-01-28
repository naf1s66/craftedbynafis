/** Storage key for the persisted theme preference. */
export const THEME_STORAGE_KEY = 'theme';

export type Theme = 'dark' | 'light';

/** Returns the current theme based on the root element class list. */
export const getCurrentTheme = (root: HTMLElement): Theme =>
  root.classList.contains('dark') ? 'dark' : 'light';
