(() => {
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
})();
