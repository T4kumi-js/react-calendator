/**
 * @param {Date} date
 * @param {number} week
 * @param {boolean} [startOnMonday=true]
 * @returns {Date[]}
 */
function generateWeekData(date, week, startOnMonday = true) {
    // Current month
    let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1),
        lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // Last month and next month
    let daysFromNextMonth = 1,
        lastDayOfLastMonth = (date.getMonth() === 0)
            ? new Date(date.getFullYear() - 1, 12, 0)
            : new Date(date.getFullYear(), date.getMonth(), 0),
        daysFromLastMonth = firstDayOfMonth.getDay();

    if (startOnMonday) {
        daysFromLastMonth -= 1;
    }

    // Days container
    let days = [];

    if (week === 1) {
        let dayFromLastMonth = (daysFromLastMonth <= 0)
            ? 6 + daysFromLastMonth
            : daysFromLastMonth - 1;

        if (dayFromLastMonth < 6) {
            while (dayFromLastMonth >= 0) {
                let dateObj = new Date(date.getFullYear(),
                                       date.getMonth() - 1,
                                       lastDayOfLastMonth.getDate() - dayFromLastMonth);

                days.push(dateObj);
                dayFromLastMonth--;
            }
        }

        let daysRemaining = 7 - days.length;

        for (let i = 0; i < daysRemaining; i++) {
            let dateObj = new Date(firstDayOfMonth.getFullYear(),
                                   firstDayOfMonth.getMonth(),
                                   firstDayOfMonth.getDate() + i);

            days.push(dateObj);
        }
    } else {
        let startWeekFrom = (week - ((daysFromLastMonth < 0) ? 2 : 1)) * 7 - daysFromLastMonth;

        for (let i = 1; i <= 7; i++) {
            let month, day;

            if (startWeekFrom + i <= lastDayOfMonth) {
                month = date.getMonth();
                day = startWeekFrom + i;
            } else {
                month = date.getMonth() + 1;
                day = daysFromNextMonth++;
            }

            days.push(new Date(date.getFullYear(), month, day));
        }
    }

    return days;
}

/**
 * @param {Date} date
 * @param {boolean} [startOnMonday=true]
 * @returns {Date[][]}
 */
export function generateMonthData(date, startOnMonday = true) {
    let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0),
    //    weeks = parseInt(lastDayOfMonth.getDate() / 7) + 1,
        monthData = [];

    for (let week = 1; week <= 6; week++) {
        monthData.push(generateWeekData(date, week, startOnMonday));
    }

    return monthData;
}
