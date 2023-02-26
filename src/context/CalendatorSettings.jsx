import React, { createContext, useReducer } from 'react';
import { getToday } from '../utils';

const today = getToday();

const initialState = {
  selectedDate: today,
  currentDateView: today,
  inMonthSelection: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'SELECTED_DATE_VIEW':
      return {
        ...state,
        currentDateView: action.newDateView
      };
    case 'SELECTED_DATE':
      return {
        ...state,
        selectedDate: action.selectedDate,
        currentDateView: action.selectedDate
      };
    case 'SELECTED_MONTH':
      return {
        ...state,
        currentDateView: action.selectedMonth,
        inMonthSelection: false
      };
    case 'TOGGLE_MONTH_LABEL':
      return {
        ...state,
        inMonthSelection: !state.inMonthSelection
      };
    case 'TODAY':
      return {
        ...state,
        selectedDate: today,
        currentDateView: today,
        inMonthSelection: false
      };
  }
}

export const CalendatorSettingsContext = createContext({});

export function CalendatorSettingsProvider(props) {
  if (props.settings.selectedDate) {
    initialState.selectedDate = props.settings.selectedDate;
    initialState.currentDateView = props.settings.selectedDate;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const context = {
    state,
    dispatch,
    settings: props.settings
  };

  return (
    <CalendatorSettingsContext.Provider value={context}>
      {props.children}
    </CalendatorSettingsContext.Provider>
  );
}
