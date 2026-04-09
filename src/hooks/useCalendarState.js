import { useState, useCallback, useEffect } from 'react';
import { addMonths, subMonths, isSameDay, formatDateKey } from '../utils/dates';

export function useCalendarState() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [selectingEnd, setSelectingEnd] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const goNextMonth = useCallback(() => {
    setDirection(1);
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  }, [viewMonth]);

  const goPrevMonth = useCallback(() => {
    setDirection(-1);
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  }, [viewMonth]);

  const goToMonth = useCallback((year, month) => {
    const currentIndex = viewYear * 12 + viewMonth;
    const newIndex = year * 12 + month;
    setDirection(newIndex >= currentIndex ? 1 : -1);
    setViewYear(year);
    setViewMonth(month);
  }, [viewYear, viewMonth]);

  const goToToday = useCallback(() => {
    goToMonth(today.getFullYear(), today.getMonth());
  }, []);

  const handleDayClick = useCallback((date) => {
    if (!selectingEnd || !rangeStart) {
      // Start new selection
      setRangeStart(date);
      setRangeEnd(null);
      setSelectingEnd(true);
    } else {
      // Complete selection
      if (isSameDay(date, rangeStart)) {
        // Click same day — single day selection
        setRangeEnd(date);
        setSelectingEnd(false);
      } else {
        setRangeEnd(date);
        setSelectingEnd(false);
      }
    }
  }, [selectingEnd, rangeStart]);

  const clearSelection = useCallback(() => {
    setRangeStart(null);
    setRangeEnd(null);
    setSelectingEnd(false);
    setHoverDate(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' && (e.metaKey || e.ctrlKey)) goNextMonth();
      if (e.key === 'ArrowLeft' && (e.metaKey || e.ctrlKey)) goPrevMonth();
      if (e.key === 'Escape') clearSelection();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNextMonth, goPrevMonth, clearSelection]);

  // Effective range end (considering hover)
  const effectiveEnd = selectingEnd && hoverDate ? hoverDate : rangeEnd;

  return {
    viewYear,
    viewMonth,
    rangeStart,
    rangeEnd: effectiveEnd,
    rangeEndConfirmed: rangeEnd,
    hoverDate,
    setHoverDate,
    selectingEnd,
    direction,
    goNextMonth,
    goPrevMonth,
    goToMonth,
    goToToday,
    handleDayClick,
    clearSelection,
    today,
  };
}
