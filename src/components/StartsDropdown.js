import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const StartsDropdown = ({ onChange, value }) => {
  const options = ['1', '2', '3', '4', '5'];
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
