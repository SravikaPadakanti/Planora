// US Holidays + notable days
const FIXED_HOLIDAYS = {
  '01-01': { name: "New Year's Day", emoji: '🎆' },
  '02-14': { name: "Valentine's Day", emoji: '💝' },
  '03-17': { name: "St. Patrick's Day", emoji: '☘️' },
  '04-01': { name: "April Fools'", emoji: '🃏' },
  '04-22': { name: 'Earth Day', emoji: '🌍' },
  '05-05': { name: 'Cinco de Mayo', emoji: '🎉' },
  '06-19': { name: 'Juneteenth', emoji: '✊' },
  '07-04': { name: 'Independence Day', emoji: '🇺🇸' },
  '08-12': { name: 'International Youth Day', emoji: '🌟' },
  '09-21': { name: 'World Peace Day', emoji: '☮️' },
  '10-31': { name: 'Halloween', emoji: '🎃' },
  '11-11': { name: "Veterans Day", emoji: '🎖️' },
  '12-24': { name: 'Christmas Eve', emoji: '🎁' },
  '12-25': { name: 'Christmas Day', emoji: '🎄' },
  '12-31': { name: "New Year's Eve", emoji: '🥂' },
};

// Floating holidays (approximate, for display purposes)
const FLOATING_HOLIDAYS = {
  2024: {
    '01-15': { name: 'MLK Day', emoji: '✊' },
    '05-27': { name: 'Memorial Day', emoji: '🎗️' },
    '09-02': { name: 'Labor Day', emoji: '⚙️' },
    '11-28': { name: 'Thanksgiving', emoji: '🦃' },
    '11-29': { name: 'Black Friday', emoji: '🛍️' },
  },
  2025: {
    '01-20': { name: 'MLK Day', emoji: '✊' },
    '05-26': { name: 'Memorial Day', emoji: '🎗️' },
    '09-01': { name: 'Labor Day', emoji: '⚙️' },
    '11-27': { name: 'Thanksgiving', emoji: '🦃' },
    '11-28': { name: 'Black Friday', emoji: '🛍️' },
  },
  2026: {
    '01-19': { name: 'MLK Day', emoji: '✊' },
    '05-25': { name: 'Memorial Day', emoji: '🎗️' },
    '09-07': { name: 'Labor Day', emoji: '⚙️' },
    '11-26': { name: 'Thanksgiving', emoji: '🦃' },
    '11-27': { name: 'Black Friday', emoji: '🛍️' },
  },
};

export function getHoliday(date) {
  const mmdd = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const year = date.getFullYear();

  if (FIXED_HOLIDAYS[mmdd]) return FIXED_HOLIDAYS[mmdd];
  if (FLOATING_HOLIDAYS[year]?.[mmdd]) return FLOATING_HOLIDAYS[year][mmdd];
  return null;
}
