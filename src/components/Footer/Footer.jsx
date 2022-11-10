import React, { useContext } from 'react';
import { CalendatorSettingsContext } from '../../context/CalendatorSettings';
import { getToday } from '../../utils';
import * as translations from '../../translations';

export default function Footer(props) {
    const { setters, settings } = useContext(CalendatorSettingsContext);
    const { setSelectedDate, setCurrentDateView, setInMonthSelection } = setters;
    const languageStrings = translations[settings.lang];

    const handleClickToday = () => {
        const today = getToday();
        setSelectedDate(today);
        setCurrentDateView(today);
        setInMonthSelection(false);
    };

    return (
        <div className="calendar-footer">
            <button type="button" className="today-button" onClick={handleClickToday}>{languageStrings.today}</button>
        </div>
    );
};
