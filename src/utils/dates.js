import {
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, isSameMonth, isSameDay, isToday,
  isWithinInterval, addMonths, subMonths, getDay, getDaysInMonth,
  parseISO, isValid, startOfDay, endOfDay
} from 'date-fns';

export const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const DAYS_MIN = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

export const MONTHS_SHORT = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec'
];

/**
 * Build calendar grid: 6 rows × 7 cols (Mon–Sun)
 */
export function buildMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Monday-first: 0=Mon … 6=Sun
  let startOffset = getDay(firstDay) - 1;
  if (startOffset < 0) startOffset = 6;

  const gridStart = new Date(firstDay);
  gridStart.setDate(firstDay.getDate() - startOffset);

  const gridEnd = new Date(gridStart);
  gridEnd.setDate(gridStart.getDate() + 41); // 6 rows

  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });
  return days;
}

export function isBetween(date, start, end) {
  if (!start || !end) return false;
  const s = start <= end ? start : end;
  const e = start <= end ? end : start;
  return isWithinInterval(startOfDay(date), { start: startOfDay(s), end: startOfDay(e) });
}

export function isRangeStart(date, start, end) {
  if (!start) return false;
  const s = start <= end ? start : end;
  return isSameDay(date, s);
}

export function isRangeEnd(date, start, end) {
  if (!start || !end) return false;
  const e = start <= end ? end : start;
  return isSameDay(date, e);
}

export function formatDateKey(date) {
  return format(date, 'yyyy-MM-dd');
}

export function formatDisplayDate(date) {
  return format(date, 'MMM d, yyyy');
}

export function formatRangeLabel(start, end) {
  if (!start) return '';
  if (!end || isSameDay(start, end)) return formatDisplayDate(start);
  const s = start <= end ? start : end;
  const e = start <= end ? end : start;
  return `${format(s, 'MMM d')} – ${format(e, 'MMM d, yyyy')}`;
}

export function getDayCount(start, end) {
  if (!start || !end) return 0;
  const diff = Math.abs(endOfDay(end) - startOfDay(start));
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export { format, isSameMonth, isSameDay, isToday, addMonths, subMonths };
