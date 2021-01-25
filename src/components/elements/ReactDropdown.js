import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const ReactDropdown = ({ onChange, value }) => {
  const options = [
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
  ];
  return (
    <Dropdown
      options={options}
      onChange={onChange}
      value={value}
      placeholder=""
    />
  );
};

export default ReactDropdown;
