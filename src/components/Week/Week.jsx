import React from 'react';
import { Day } from '../Day';

export default function Week(props) {
    return (
        <div className="week">
            {props.week.map((day, index) => (
                <Day key={index} day={day} />
            ))}
        </div>
    );
};
