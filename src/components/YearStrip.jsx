import React from 'react';
import { MONTHS_SHORT } from '../utils/dates';
import './YearStrip.css';

export default function YearStrip({ viewYear, viewMonth, today, onGoTo }) {
  return (
    <div className="year-strip">
      <div className="year-strip__year">{viewYear}</div>
      <div className="year-strip__months">
        {MONTHS_SHORT.map((m, i) => {
          const isActive = i === viewMonth;
          const isToday = i === today.getMonth() && viewYear === today.getFullYear();
          return (
            <button
              key={m}
              className={`year-strip__month ${isActive ? 'year-strip__month--active' : ''} ${isToday ? 'year-strip__month--today' : ''}`}
              onClick={() => onGoTo(viewYear, i)}
              aria-pressed={isActive}
              aria-label={m}
            >
              {m}
            </button>
          );
        })}
      </div>
      <div className="year-strip__year-nav">
        <button onClick={() => onGoTo(viewYear - 1, viewMonth)} aria-label="Previous year">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button onClick={() => onGoTo(viewYear + 1, viewMonth)} aria-label="Next year">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  );
}
