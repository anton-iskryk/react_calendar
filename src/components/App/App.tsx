import React, { useState, useEffect } from 'react';
import './App.css';
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

const url = 'http://localhost:5000';
const totalDays = 42;

export const App: React.FC = () => {
  moment.updateLocale('en', { week: { dow: 1 } });

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

  const [events, setEvents] = useState([]);

  const startDateQuery = startDay.clone().format('X');
  const endDateQuery = startDay
    .clone()
    .add(totalDays)
    .format('X');

  useEffect(() => {
    fetch(`${url}/events?date_gte=${startDateQuery}&date_lte=${endDateQuery}`)
      .then(res => res.json())
      .then(res => {
        setEvents(res);
      });
  }, [today]);

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
        totalDays={totalDays}
        events={events}
      />
    </ShadowWrapper>
  );
};
