import React, { useContext } from 'react';
import { CalendatorSettingsContext } from '../../context/CalendatorSettings';
import * as translations from '../../translations';

export default function Footer(props) {
    const { dispatch, settings } = useContext(CalendatorSettingsContext);
    const languageStrings = translations[settings.lang];

    const handleClickToday = () => {
        dispatch({ type: 'TODAY' });
    };

    return (
        <div className="calendar-footer">
            <button type="button" className="today-button" onClick={handleClickToday}>{languageStrings.today}</button>
        </div>
    );
};
