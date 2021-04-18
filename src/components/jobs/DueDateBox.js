import React, { useState } from 'react';
import { DatePicker, Heading } from '../elements';

const DueDateBox = () => {
  const [value, onChange] = useState(new Date());
  // console.log(value, 'start');
  return (
    <div className="box box-wrapper">
      <Heading>Due Date</Heading>
      <div className="columns">
        <div className="column is-6">
          <DatePicker onChange={onChange} value={value} label="Starts" />
        </div>
        <div className="column is-6">
          <DatePicker onChange={onChange} value={value} label="Ends" />
        </div>
      </div>
    </div>
  );
};

export default DueDateBox;
