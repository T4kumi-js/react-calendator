import { toShortISOString } from './toShortISOString'; 

/**
 * @param {Date} date
 * @param {object} holidays
 * @returns {boolean}
 */
export function isHoliday(date, holidays) {
  if (!holidays) {
    return false;
  }

  const [year, month, day] = toShortISOString(date).split('-');
  let isHolidayFlag = false;

  if (holidays['*'] && holidays['*'][month]) {
    isHolidayFlag = holidays['*'][month].includes(day);
  }

  if (holidays[year] && holidays[year][month]) {
    isHolidayFlag = holidays[year][month].includes(day);
  }

  return isHolidayFlag;
}
