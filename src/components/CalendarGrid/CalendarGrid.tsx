/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { CellProps } from '../../types/CellProps/CellProps';

const GridWrapper = styled.div<CellProps>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  /* grid-template-rows: repeat(6, 1fr); */
  grid-gap: 1px;
  background-color: ${props => (props.isHeader ? '#1e1f21' : '#4d4c4d')};
  ${props => (props.isHeader && 'border-bottom: 1px solid #4d4c4d')};
`;

const CellWrapper = styled.div<CellProps>`
  min-height: ${props => (props.isHeader ? 24 : 100)}px;
  min-width: 130px;
  background-color: #1e1f21;
  color: ${props => (props.isSelectedMonth ? '#ddd' : '#555759')};
  cursor: ${props => (props.isHeader ? 'default' : 'pointer')};

  &:hover {
    background-color: ${props => (props.isHeader ? '#1e1f21' : '#585858')};
  }
`;

const RowInCell = styled.div<CellProps>`
  display: flex;
  justify-content: flex-end;
  ${props => (props.pr && `padding-right: ${props.pr * 8}px`)};
`;

const DayWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 33px;
  width: 33px;
  margin: 2px;
`;

const CurrentDay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: red;
  border-radius: 50%;
`;

type Props = {
  startDay: moment.Moment,
  today: moment.Moment,
};

export const CalendarGrid: React.FC<Props> = ({ startDay, today }) => {
  const totalDays = 42;
  const myDay = startDay.clone().subtract(1, 'day');
  const daysMap = [...Array(totalDays)].map(() => myDay.add(1, 'day').clone());

  const isCurrentDay = (day: moment.Moment) => moment().isSame(day, 'day');

  const isSelectedMonth = (day: moment.Moment) => (
    today.isSame(day, 'month')
  );

  return (
    <>
      <GridWrapper isHeader>
        {[...Array(7)].map((_, i) => (
          <CellWrapper isHeader isSelectedMonth>
            <RowInCell pr={1}>
              {moment().day(i + 1).format('ddd')}
            </RowInCell>
          </CellWrapper>
        ))}
      </GridWrapper>

      <GridWrapper>
        {
          daysMap.map((dayItem) => (
            <CellWrapper
              key={dayItem.unix()}
              isSelectedMonth={isSelectedMonth(dayItem)}
            >
              <RowInCell>
                <DayWrapper>
                  {!isCurrentDay(dayItem) && dayItem.format('D')}
                  {isCurrentDay(dayItem)
                    && <CurrentDay>{dayItem.format('D')}</CurrentDay>}
                </DayWrapper>
              </RowInCell>
            </CellWrapper>
          ))
        }
      </GridWrapper>
    </>
  );
};

export default CalendarGrid;
