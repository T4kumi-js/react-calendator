import React from 'react';
import { Calendator } from '../components';
import './styles.css';

export default {
    title: 'Calendator/Calendar',
    component: Calendator,
    argTypes: {
        lang: {
            control: 'select',
            table: {
                category: 'Localization'
            }
        },
        startOnMonday: {
            table: {
                category: 'Localization'
            }
        },
        selectedDate: {
            table: {
                category: 'Dates'
            }
        },
        minDate: {
            table: {
                category: 'Dates'
            }
        },
        maxDate: {
            table: {
                category: 'Dates'
            }
        },
        onClickDay: {
            table: {
                category: 'Events'
            }
        },
        onMouseOverDay: {
            table: {
                category: 'Events'
            }
        },
        onMouseLeaveDay: {
            table: {
                category: 'Events'
            }
        }
    }
};

const Template = (args) => <Calendator {...args} />;

const Primary = Template.bind({});
Primary.args = {
    lang: 'en',
    startOnMonday: true
};

export {
    Primary
};

/*const stories = storiesOf('Calendator', module);

stories.add('Calendar', () => {
    return (
        <Calendator lang="en" startOnMonday={true} />
    );
});*/
