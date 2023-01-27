import React, { useState } from 'react';
import './App.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import styled from 'styled-components';
import { Monitor } from '../Monitor';
import { CalendarGrid } from '../CalendarGrid';
import { Title } from '../Title';

const ShadowWrapper = styled('div')`
  overflow: hidden;
  border-top: 1px solid #737374;
  border-right: 1px solid #464648;
  border-left: 1px solid #464648;
  border-bottom: 2px solid #464648;
  box-shadow: 0 0 0 1px #1a1a1a, 0 8px 20px 6px #000;
  border-radius: 8px;
`;

export const App: React.FC = () => {
  moment.updateLocale('en', { week: { dow: 1 } });
  // const today = moment();
  const [today, setToday] = useState(moment());
  const startDay: moment.Moment = today
    .clone()
    .startOf('month')
    .startOf('week');

  // window.moment = moment;

  const prevHandler = () => {
    setToday(prev => prev.clone().subtract(1, 'month'));
  };

  const todayHandler = () => {
    setToday(moment());
  };

  const nextHandler = () => {
    setToday(prev => prev.clone().add(1, 'month'));
  };

  return (
    <ShadowWrapper>
      <Title />
      <Monitor
        today={today}
        prevHandler={prevHandler}
        todayHandler={todayHandler}
        nextHandler={nextHandler}
      />
      <CalendarGrid
        startDay={startDay}
        today={today}
      />
    </ShadowWrapper>
  );
};
