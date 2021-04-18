import React, { useState } from 'react';
import styled from 'styled-components';

import DateTimePicker from 'react-datetime-picker';

const DatePickerWrapper = styled.div`
  .react-datetime-picker__wrapper {
    padding: 0.45rem 0.9rem;
    border: 1px solid ${(props) => props.theme.borderColor};
    background-color: ${(props) => props.theme.lightAccent};
  }
`;

function DatePicker(props) {
  const { label } = props;
  const [value, onChange] = useState(new Date());

  return (
    <>
      {label && (
        <label className="label has-text-weight-semibold has-text-black">
          {label}
        </label>
      )}
      <DatePickerWrapper>
        <DateTimePicker disableClock onChange={onChange} value={value} />
      </DatePickerWrapper>
    </>
  );
}
export default DatePicker;
