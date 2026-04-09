# Chronicle Calendar

A premium interactive wall calendar React component — built to stand out.

## ✨ Features

- **Wall Calendar Aesthetic** — Physical paper calendar feel with a spiral-bound top, hero image panel, and clean grid
- **Day Range Selector** — Click a start date, click an end date. Beautiful animated highlight sweep across the range
- **Smart Notes System** — Per-date notes with auto-save to localStorage; notes indicator dots on the grid
- **Month Image Carousel** — Curated hero images per month (can be swapped out easily)
- **Theme Switcher** — 4 hand-crafted themes: Glacier (default), Ember, Forest, Obsidian
- **Flip Page Animation** — Calendar pages flip with a 3D CSS animation when changing months
- **Holiday Markers** — Major holidays auto-labeled in the grid
- **Fully Responsive** — Desktop: side-by-side layout. Mobile: stacked with bottom sheet notes
- **Mini-map** — Year overview strip at the bottom for quick month jumping
- **Keyboard Navigation** — Arrow keys to navigate months, Escape to clear selection

## 🚀 Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🏗 Architecture

```
src/
  components/
    Calendar.jsx          # Main orchestrator
    CalendarGrid.jsx      # Month grid with range selection
    HeroPanel.jsx         # Image + month title panel
    NotesPanel.jsx        # Notes editor + list
    ThemeSwitcher.jsx     # Theme selector
    YearStrip.jsx         # Year overview navigation
    HolidayBadge.jsx      # Holiday label component
  hooks/
    useCalendarState.js   # All calendar state + logic
    useNotes.js           # Notes CRUD with localStorage
    useTheme.js           # Theme management
  utils/
    dates.js              # Date helpers using date-fns
    holidays.js           # Holiday definitions
    images.js             # Month image map
  styles/
    themes.css            # CSS custom property themes
    global.css            # Resets + base styles
```

## 🎨 Design Decisions

- **Font pairing**: Playfair Display (display) + DM Sans (body) — editorial, premium feel
- **Motion**: Framer Motion for page-flip and range-sweep; CSS transitions for micro-interactions
- **No backend**: All data persisted via localStorage
- **Color system**: 4 themes expressed as CSS custom property sets — zero JS theme logic

## 📱 Responsive Breakpoints

- `< 640px`: Mobile — stacked layout, bottom-sheet notes drawer
- `640–1024px`: Tablet — compact side-by-side
- `> 1024px`: Desktop — full editorial layout
