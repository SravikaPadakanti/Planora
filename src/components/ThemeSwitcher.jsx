import React, { useState } from 'react';
import './ThemeSwitcher.css';

const THEME_META = {
  glacier: { label: 'Glacier', dot: '#2563eb', bg: '#0d1f3c' },
  ember:   { label: 'Ember',   dot: '#f97316', bg: '#0d0500' },
  forest:  { label: 'Forest',  dot: '#22c55e', bg: '#051009' },
  obsidian:{ label: 'Obsidian',dot: '#e4e4e7', bg: '#000000' },
};

export default function ThemeSwitcher({ theme, setTheme, themes }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="theme-switcher">
      <button
        className="theme-switcher__trigger"
        onClick={() => setOpen(o => !o)}
        aria-label="Switch theme"
        title="Switch theme"
      >
        <span
          className="theme-switcher__dot"
          style={{ background: THEME_META[theme]?.dot }}
        />
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
        </svg>
      </button>

      {open && (
        <>
          <div className="theme-switcher__backdrop" onClick={() => setOpen(false)} />
          <div className="theme-switcher__menu">
            <div className="theme-switcher__menu-title">Theme</div>
            {themes.map(t => (
              <button
                key={t}
                className={`theme-switcher__option ${t === theme ? 'theme-switcher__option--active' : ''}`}
                onClick={() => { setTheme(t); setOpen(false); }}
              >
                <span
                  className="theme-switcher__option-swatch"
                  style={{ background: THEME_META[t]?.bg, border: `2px solid ${THEME_META[t]?.dot}` }}
                />
                <span>{THEME_META[t]?.label}</span>
                {t === theme && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto' }}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
