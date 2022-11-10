/**
 * @returns {Date}
 */
export function getToday() {
    const now = new Date();
    return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );
}
