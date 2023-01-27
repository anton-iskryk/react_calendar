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
  color: #dddcdd;
  cursor: ${props => (props.isHeader ? 'default' : 'pointer')};

  &:hover {
    background-color: ${props => (props.isHeader ? '#1e1f21' : '#585858')};
  }
`;

const RowInCell = styled.div`
  display: flex;
  justify-content: flex-end;
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
};

export const CalendarGrid: React.FC<Props> = ({ startDay }) => {
  const totalDays = 42;
  const day = startDay.clone().subtract(1, 'day');
  const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone());

  const isCurrentDay = (dayy: moment.Moment) => moment().isSame(dayy, 'day');

  return (
    <>
      <GridWrapper isHeader>
        {[...Array(7)].map((_, i) => (
          <CellWrapper isHeader>
            <RowInCell>
              {moment().day(i + 1).format('ddd')}
            </RowInCell>
          </CellWrapper>
        ))}
      </GridWrapper>

      <GridWrapper>
        {
          daysArray.map((dayItem) => (
            <CellWrapper
              key={dayItem.unix()}
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
