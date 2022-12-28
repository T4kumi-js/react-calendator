import React, { useContext } from 'react';
import { CalendatorSettingsContext } from '../../context/CalendatorSettings';
import { toShortISOString, getToday } from '../../utils';

export default function Month(props) {
    const { state, setters } = useContext(CalendatorSettingsContext);
    const { currentDateView, selectedDate } = state;
    const { setCurrentDateView, setInMonthSelection } = setters;
    const month = new Date(currentDateView.getFullYear(), props.monthIndex, 1);

    const handleClick = (event) => {
        setCurrentDateView(month);
        setInMonthSelection(false);
    };

    const classList = ['month'];

    if (toShortISOString(month).slice(0, 7) === toShortISOString(getToday()).slice(0, 7)) {
        classList.push('today');
    }

    if (toShortISOString(month).slice(0, 7) === toShortISOString(selectedDate).slice(0, 7)) {
        classList.push('selected');
    }

    return (
        <div className={classList.join(' ')} onClick={handleClick}>
            <span>{props.monthName}</span>
        </div>
    );
};
