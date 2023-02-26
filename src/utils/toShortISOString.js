/**
 * @param {Date} date
 * @returns {string}
 */
export function toShortISOString(date) {
  const trailZero = (number) => {
    return ((number < 10) ? '0' : '') + number;
  };

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${trailZero(month)}-${trailZero(day)}`;
}
