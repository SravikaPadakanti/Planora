import React, { useState, useRef, useEffect } from 'react';
import { useCalendarState } from '../hooks/useCalendarState';
import { useNotes } from '../hooks/useNotes';
import { useTheme } from '../hooks/useTheme';
import { MONTHS, formatRangeLabel } from '../utils/dates';
import HeroPanel from './HeroPanel';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';
import YearStrip from './YearStrip';
import ThemeSwitcher from './ThemeSwitcher';
import './Calendar.css';

export default function Calendar() {
  const cal = useCalendarState();
  const notes = useNotes();
  const { theme, setTheme, themes } = useTheme();
  const [notesOpen, setNotesOpen] = useState(false); // mobile drawer
  const [animKey, setAnimKey] = useState(0);
  const prevMonthRef = useRef(cal.viewMonth);

  // Trigger grid animation on month change
  useEffect(() => {
    if (prevMonthRef.current !== cal.viewMonth) {
      setAnimKey(k => k + 1);
      prevMonthRef.current = cal.viewMonth;
    }
  }, [cal.viewMonth]);

  const rangeLabel = formatRangeLabel(cal.rangeStart, cal.rangeEnd);
  const selectionActive = !!(cal.rangeStart);

  return (
    <div className="chr-app" data-theme={theme}>
      {/* Top bar */}
      <header className="chr-topbar">
        <div className="chr-topbar__brand">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <span className="chr-topbar__name">Chronicle</span>
          <span className="chr-topbar__sub">Calendar</span>
        </div>

        <div className="chr-topbar__center">
          {selectionActive && rangeLabel && (
            <div className="chr-topbar__selection">
              <span className="chr-topbar__sel-label">{rangeLabel}</span>
              {cal.rangeEnd && !cal.selectingEnd && (
                <button className="chr-topbar__sel-clear" onClick={cal.clearSelection} aria-label="Clear selection">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
              {cal.selectingEnd && (
                <span className="chr-topbar__sel-hint">Select end date…</span>
              )}
            </div>
          )}
        </div>

        <div className="chr-topbar__actions">
          <button className="chr-topbar__today-btn" onClick={cal.goToToday} title="Go to today">
            Today
          </button>
          {/* Mobile notes toggle */}
          <button
            className={`chr-topbar__notes-toggle ${notesOpen ? 'chr-topbar__notes-toggle--active' : ''}`}
            onClick={() => setNotesOpen(o => !o)}
            title="Toggle notes"
            aria-label="Toggle notes panel"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            {selectionActive && <span className="chr-topbar__notes-dot" />}
          </button>
          <ThemeSwitcher theme={theme} setTheme={setTheme} themes={themes} />
        </div>
      </header>

      {/* Main card */}
      <main className="chr-main">
        <div className="chr-card">
          {/* Desktop: hero left, grid+notes right */}
          {/* Mobile: hero top, grid middle, notes drawer */}
          <div className="chr-layout">

            {/* Hero image panel */}
            <HeroPanel
              viewYear={cal.viewYear}
              viewMonth={cal.viewMonth}
              onPrev={cal.goPrevMonth}
              onNext={cal.goNextMonth}
            />

            {/* Center: grid */}
            <div className="chr-center">
              <div className="chr-center__header">
                <div className="chr-center__month-title">
                  <span className="chr-center__month">{MONTHS[cal.viewMonth]}</span>
                  <span className="chr-center__year">{cal.viewYear}</span>
                </div>
                <div className="chr-center__header-actions">
                  <button className="chr-nav-btn" onClick={cal.goPrevMonth} aria-label="Previous month">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>
                  <button className="chr-nav-btn" onClick={cal.goNextMonth} aria-label="Next month">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>
              </div>

              {/* Keyboard shortcut hint */}
              <div className="chr-kb-hint">
                <span>⌘← ⌘→ navigate months</span>
                <span>·</span>
                <span>Click to select range</span>
              </div>

              <div
                key={animKey}
                className={`chr-grid-anim chr-grid-anim--${cal.direction > 0 ? 'forward' : 'back'}`}
              >
                <CalendarGrid
                  viewYear={cal.viewYear}
                  viewMonth={cal.viewMonth}
                  rangeStart={cal.rangeStart}
                  rangeEnd={cal.rangeEnd}
                  hoverDate={cal.hoverDate}
                  selectingEnd={cal.selectingEnd}
                  today={cal.today}
                  onDayClick={cal.handleDayClick}
                  onDayHover={cal.setHoverDate}
                  hasNote={notes.hasNote}
                />
              </div>
            </div>

            {/* Notes panel — desktop always visible, mobile as drawer */}
            <div className={`chr-notes-wrap ${notesOpen ? 'chr-notes-wrap--open' : ''}`}>
              <NotesPanel
                rangeStart={cal.rangeStart}
                rangeEnd={cal.rangeEnd}
                rangeEndConfirmed={cal.rangeEndConfirmed}
                viewYear={cal.viewYear}
                viewMonth={cal.viewMonth}
                getNote={notes.getNote}
                setNote={notes.setNote}
                deleteNote={notes.deleteNote}
                getNotesForMonth={notes.getNotesForMonth}
                onClearSelection={cal.clearSelection}
              />
            </div>
          </div>

          {/* Year strip */}
          <YearStrip
            viewYear={cal.viewYear}
            viewMonth={cal.viewMonth}
            today={cal.today}
            onGoTo={cal.goToMonth}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="chr-footer">
        <span>Chronicle Calendar · Built with React</span>
        <span className="chr-footer__dot">·</span>
        <span>Data stored locally</span>
      </footer>
    </div>
  );
}
