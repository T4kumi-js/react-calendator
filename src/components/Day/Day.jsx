import React, { useContext } from 'react';
import { CalendatorSettingsContext } from '../../context/CalendatorSettings';
import { getToday, toShortISOString, isHoliday } from '../../utils';

export default function Day(props) {
    const { state, dispatch, settings } = useContext(CalendatorSettingsContext);
    const { selectedDate, currentDateView } = state;
    const { minDate, maxDate, holidays, customColorizeDay } = settings;
    const holiday = isHoliday(props.day, holidays);

    const handleClick = (event) => {
        const { preventClickOnHoliday, onClickDay } = settings;

        if (preventClickOnHoliday && holiday) {
            return;
        }

        if (
            (minDate && minDate > props.day) ||
            (maxDate && maxDate < props.day)
        ) {
            return;
        }

        if (onClickDay && !Boolean(onClickDay(event, props.day, holiday))) {
            return;
        }

        dispatch({ type: 'SELECTED_DATE', selectedDate: props.day });
    };

    const handleMouseOver = (event) => {
        const { onMouseOverDay } = settings;

        if (onMouseOverDay) {
            onMouseOverDay(event, props.day, holiday);
        }
    };

    const handleMouseLeave = (event) => {
        const { onMouseLeaveDay } = settings;

        if (onMouseLeaveDay) {
            onMouseLeaveDay(event, props.day, holiday);
        }
    };

    const classList = ['day'];

    if (toShortISOString(getToday()) === toShortISOString(props.day)) {
        classList.push('today');
    }

    if (toShortISOString(selectedDate) === toShortISOString(props.day)) {
        classList.push('selected');
    } else if (
        (minDate && minDate > props.day) ||
        (maxDate && maxDate < props.day)
    ) {
        classList.push('out-of-range');
    } else if (currentDateView.getMonth() !== props.day.getMonth()) {
        classList.push('out-of-month');
    } else if (holiday || props.day.getDay() === 0) {
        classList.push('holiday');
    }

    if (customColorizeDay) {
        if (currentDateView.getMonth() === props.day.getMonth()) {
            if (!((minDate && minDate > props.day) || (maxDate && maxDate < props.day))) {
                let customClass = customColorizeDay(props.day, holiday);
                if (customClass) {
                    classList.push(customClass);
                }
            }
        }
    }

    return (
        <div
            className={classList.join(' ')}
            onClick={handleClick}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        >
            <span>{props.day.getDate()}</span>
        </div>
    );
};
