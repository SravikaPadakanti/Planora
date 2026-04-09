import React, { useCallback } from 'react';
import { buildMonthGrid, isSameMonth, isSameDay, isToday, isBetween, isRangeStart, isRangeEnd, formatDateKey, DAYS_SHORT } from '../utils/dates';
import { getHoliday } from '../utils/holidays';
import './CalendarGrid.css';

export default function CalendarGrid({
  viewYear, viewMonth, rangeStart, rangeEnd, hoverDate,
  selectingEnd, today, onDayClick, onDayHover, hasNote
}) {
  const days = buildMonthGrid(viewYear, viewMonth);
  const effectiveEnd = selectingEnd && hoverDate ? hoverDate : rangeEnd;

  const getDayClass = useCallback((date) => {
    const classes = ['cal-day'];
    const inMonth = isSameMonth(date, new Date(viewYear, viewMonth, 1));
    if (!inMonth) classes.push('cal-day--other');
    if (isToday(date)) classes.push('cal-day--today');

    const dayOfWeek = date.getDay(); // 0=Sun, 6=Sat
    if (dayOfWeek === 0) classes.push('cal-day--sun');
    if (dayOfWeek === 6) classes.push('cal-day--sat');

    if (rangeStart && effectiveEnd) {
      if (isRangeStart(date, rangeStart, effectiveEnd)) classes.push('cal-day--range-start');
      else if (isRangeEnd(date, rangeStart, effectiveEnd)) classes.push('cal-day--range-end');
      else if (isBetween(date, rangeStart, effectiveEnd)) classes.push('cal-day--in-range');
    } else if (rangeStart && !effectiveEnd) {
      if (isSameDay(date, rangeStart)) classes.push('cal-day--range-start');
    }

    const holiday = getHoliday(date);
    if (holiday && inMonth) classes.push('cal-day--holiday');
    if (hasNote(formatDateKey(date)) && inMonth) classes.push('cal-day--has-note');

    return classes.join(' ');
  }, [viewYear, viewMonth, rangeStart, effectiveEnd, hoverDate, hasNote]);

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="cal-grid-wrapper">
      <div className="cal-grid-header">
        {DAYS_SHORT.map((d, i) => (
          <div key={d} className={`cal-grid-head ${i === 5 ? 'cal-grid-head--sat' : ''} ${i === 6 ? 'cal-grid-head--sun' : ''}`}>
            {d}
          </div>
        ))}
      </div>
      <div className="cal-grid">
        {weeks.map((week, wi) => (
          <div key={wi} className="cal-grid-row">
            {week.map((date, di) => {
              const inMonth = isSameMonth(date, new Date(viewYear, viewMonth, 1));
              const holiday = getHoliday(date);
              const dateKey = formatDateKey(date);
              const noteExists = hasNote(dateKey) && inMonth;

              // Range position for clipping
              let rangePos = '';
              if (rangeStart && effectiveEnd && inMonth) {
                const isStart = isRangeStart(date, rangeStart, effectiveEnd);
                const isEnd = isRangeEnd(date, rangeStart, effectiveEnd);
                const inRange = isBetween(date, rangeStart, effectiveEnd);
                if (isStart && isEnd) rangePos = 'single';
                else if (isStart) rangePos = 'start';
                else if (isEnd) rangePos = 'end';
                else if (inRange) rangePos = 'mid';
              }

              return (
                <button
                  key={dateKey}
                  className={getDayClass(date)}
                  data-range-pos={rangePos}
                  onClick={() => onDayClick(date)}
                  onMouseEnter={() => onDayHover(date)}
                  onMouseLeave={() => onDayHover(null)}
                  tabIndex={inMonth ? 0 : -1}
                  aria-label={`${date.toDateString()}${holiday ? ` — ${holiday.name}` : ''}`}
                  aria-pressed={!!(rangeStart && isSameDay(date, rangeStart))}
                >
                  <span className="cal-day__num">{date.getDate()}</span>
                  {holiday && inMonth && (
                    <span className="cal-day__holiday-emoji" title={holiday.name}>
                      {holiday.emoji}
                    </span>
                  )}
                  {noteExists && <span className="cal-day__note-dot" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
