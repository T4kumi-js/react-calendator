import React, { useContext } from 'react';
import { CalendatorSettingsContext } from '../../context/CalendatorSettings';
import * as translations from '../../translations';

export default function Header(props) {
    const { state, setters, settings } = useContext(CalendatorSettingsContext);
    const { inMonthSelection, currentDateView } = state;
    const { setInMonthSelection, setCurrentDateView } = setters;
    const languageStrings = translations[settings.lang];

    const handleClickPrevious = () => {
        let newDateView;

        if (inMonthSelection) {
            newDateView = new Date(currentDateView.getFullYear() - 1, 0, 1);
        } else {
            let year = currentDateView.getFullYear();
            let month = currentDateView.getMonth();

            if (month === 0) {
                year -= 1;
                month = 11;
            } else {
                month -= 1;
            }

            newDateView = new Date(year, month, 1)
        }

        setCurrentDateView(newDateView);
    };

    const handleClickNext = () => {
        let newDateView;

        if (inMonthSelection) {
            newDateView = new Date(currentDateView.getFullYear() + 1, 0, 1);
        } else {
            let year = currentDateView.getFullYear();
            let month = currentDateView.getMonth();

            if (month === 11) {
                year += 1;
                month = 0;
            } else {
                month += 1;
            }

            newDateView = new Date(year, month, 1);
        }

        setCurrentDateView(newDateView);
    };

    const handleClickLabel = () => {
        setInMonthSelection(true); 
    };

    return (
        <div className="calendar-header">
            <button type="button" className="prev-button" onClick={handleClickPrevious}></button>

            <div className="date-label" onClick={handleClickLabel}>
                <span className={(inMonthSelection) ? 'month-label hidden' : 'month-label'}>{languageStrings.months[currentDateView.getMonth()]}</span>
                {' '}
                <span className="year-label">{currentDateView.getFullYear()}</span>
            </div>

            <button type="button" className="next-button" onClick={handleClickNext}></button>
        </div>
    );
};
