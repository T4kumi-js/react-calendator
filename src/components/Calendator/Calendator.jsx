import React from 'react';
import PropTypes from 'prop-types';
import { CalendatorSettingsProvider } from '../../context/CalendatorSettings';
import { Header } from '../Header';
import { Body } from '../Body';
import { Footer } from '../Footer';
import './Calendator.css';

function Calendator(props) {
    return (
        <CalendatorSettingsProvider settings={{...props}}>
            <div className="calendator">
                <Header />
                <Body />
                <Footer />
            </div>
        </CalendatorSettingsProvider>
    );
}

Calendator.propTypes = {
    lang: PropTypes.oneOf(['en', 'es', 'fr']),
    startOnMonday: PropTypes.bool,
    selectedDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    onClickDay: PropTypes.func,
    onMouseOverDay: PropTypes.func,
    onMouseLeaveDay: PropTypes.func
};

Calendator.defaultProps = {
    lang: 'en',
    startOnMonday: false,
    selectedDate: new Date()
};

export default Calendator;
