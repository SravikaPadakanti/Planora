import { useState, useEffect } from 'react';

const THEMES = ['glacier', 'ember', 'forest', 'obsidian'];
const STORAGE_KEY = 'chronicle_theme_v1';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'glacier';
    } catch {
      return 'glacier';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch {}
  }, [theme]);

  const cycleTheme = () => {
    const idx = THEMES.indexOf(theme);
    setTheme(THEMES[(idx + 1) % THEMES.length]);
  };

  return { theme, setTheme, cycleTheme, themes: THEMES };
}
