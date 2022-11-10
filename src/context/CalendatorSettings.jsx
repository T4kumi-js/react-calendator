import React, { createContext, useState } from 'react';

export const CalendatorSettingsContext = createContext({});

export function CalendatorSettingsProvider(props) {
    const now = new Date();
    const [selectedDate, setSelectedDate] = useState(now);
    const [currentDateView, setCurrentDateView] = useState(now);
    const [inMonthSelection, setInMonthSelection] = useState(false);

    const state = {
        selectedDate,
        currentDateView,
        inMonthSelection
    };

    const setters = {
        setSelectedDate,
        setCurrentDateView,
        setInMonthSelection
    };

    const context = {
        state,
        setters,
        settings: props.settings
    };

    return (
        <CalendatorSettingsContext.Provider value={context}>
            {props.children}
        </CalendatorSettingsContext.Provider>
    );
}
