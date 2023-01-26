import React from 'react';
import './App.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { Monitor } from '../Monitor';
import { CalendarGrid } from '../CalendarGrid';
import { Header } from '../Header';

export const App: React.FC = () => {
  // window.moment = moment;

  moment.updateLocale('en', { week: { dow: 1 } });
  const startDay = moment().startOf('month').startOf('week');
  // const endDay = moment().endOf('month').endOf('week');

  // const calendar = [];

  // while (!day.isAfter(endDay)) {
  //   calendar.push(day.clone());
  //   day.add(1, 'day');
  // }

  return (
    <div>
      <Header />
      <Monitor />
      <CalendarGrid startDay={startDay} />
    </div>
  );
};

export default App;
