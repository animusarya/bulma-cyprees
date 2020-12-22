import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const ReactDropdown = ({ onChange }) => {
  const options = [
    '10',
    '12',
    '14',
    '16',
    '20',
    '22',
    '24',
    '26',
    '28',
    '30',
    '32',
    '34',
    '36',
  ];
  const defaultOption = options[3];

  return (
    <Dropdown
      options={options}
      onChange={onChange}
      value={defaultOption}
      placeholder=""
    />
  );
};

export default ReactDropdown;
