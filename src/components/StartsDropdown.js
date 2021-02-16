import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const StartsDropdown = ({ onChange, value }) => {
  const options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
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

export default StartsDropdown;
