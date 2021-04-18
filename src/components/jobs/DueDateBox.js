import React from 'react';
import { DatePicker, Heading } from '../elements';

const DueDateBox = () => (
  <div className="box box-wrapper">
    <Heading>Due Date</Heading>
    <div className="columns">
      <div className="column is-6">
        <DatePicker label="Starts" />
      </div>
      <div className="column is-6">
        <DatePicker label="Ends" />
      </div>
    </div>
  </div>
);

export default DueDateBox;
