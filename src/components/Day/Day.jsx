import React, { useContext } from 'react';
import { CalendatorSettingsContext } from '../../context/CalendatorSettings';
import { getToday, toShortISOString, isHoliday } from '../../utils';

export default function Day(props) {
    const { state, setters, settings } = useContext(CalendatorSettingsContext);
    const { selectedDate, currentDateView } = state;
    const { setSelectedDate, setCurrentDateView } = setters;
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

        setSelectedDate(props.day);
        setCurrentDateView(props.day);
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

    let classNameString = 'day';

    if (toShortISOString(getToday()) === toShortISOString(props.day)) {
        classNameString += ' today';
    }

    if (toShortISOString(selectedDate) === toShortISOString(props.day)) {
        classNameString += ' selected';
    } else if (
        (minDate && minDate > props.day) ||
        (maxDate && maxDate < props.day)
    ) {
        classNameString += ' out-of-range';
    } else if (currentDateView.getMonth() !== props.day.getMonth()) {
        classNameString += ' out-of-month';
    } else if (holiday || props.day.getDay() === 0) {
        classNameString += ' holiday';
    }

    if (customColorizeDay) {
        if (currentDateView.getMonth() === props.day.getMonth()) {
            if (!((minDate && minDate > props.day) || (maxDate && maxDate < props.day))) {
                let customClass = customColorizeDay(props.day, holiday);
                if (customClass) {
                    classNameString += ` ${customClass}`;
                }
            }
        }
    }

    return (
        <div
            className={classNameString}
            onClick={handleClick}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        >
            <span>{props.day.getDate()}</span>
        </div>
    );
};
