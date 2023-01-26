/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled from 'styled-components';

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 1px;
  background-color: #404040;
`;

const CellWrapper = styled.div`
  min-width: 130px;
  min-height: 100px;
  background-color: #1e1f21;
  color: #dddcdd;
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
`;

type Props = {
  startDay: moment.Moment,
};

export const CalendarGrid: React.FC<Props> = ({ startDay }) => {
  // const totalDays = 42;
  const day = startDay.clone().subtract();
  const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone());

  return (
    <GridWrapper>
      {
        daysArray.map((dayItem) => (
          <CellWrapper
            key={dayItem.format('DDMMYYYY')}
          >
            <RowInCell>
              <DayWrapper>
                {dayItem.format('D')}
              </DayWrapper>
            </RowInCell>
          </CellWrapper>
        ))
      }
    </GridWrapper>
  );
};

export default CalendarGrid;
