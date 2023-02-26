import React, { useContext } from 'react';
import { CalendatorSettingsContext } from '../../context/CalendatorSettings';
import { Month } from '../Month';
import { Week } from '../Week';
import { generateMonthData } from '../../utils';
import * as translations from '../../translations';

export default function Body(props) {
  const { state, settings } = useContext(CalendatorSettingsContext);
  const { currentDateView, inMonthSelection } = state;
  const { lang, startOnMonday } = settings;
  const languageStrings = translations[lang];

  const monthData = generateMonthData(currentDateView, startOnMonday);
  const renderedWeekdays = languageStrings.weekdays.map((weekday, index) => (
    <div key={index} className={(index !== 0) ? 'day' : 'day holiday'}>
      <span>{weekday.charAt(0).toUpperCase()}</span>
    </div>
  ));

  if (startOnMonday) {
    renderedWeekdays.push(renderedWeekdays.splice(0, 1)[0]);
  }

  return (
    <div className="calendar-body">
      {(inMonthSelection) ? (
        <div className="months-container">
          {languageStrings.months.map((month, index) => (
            <Month key={index} monthIndex={index} monthName={month} />
          ))}
        </div>
      ) : (
        <div className="weeks-container">
          <div className="weekday">
            {renderedWeekdays}
          </div>
          <div className="weeks">
            {monthData.map((week, index) => (
              <Week key={index} week={week} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
