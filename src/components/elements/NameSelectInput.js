import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const SelectInput = styled.div`
  margin-bottom: 34px !important;
  label {
    font-size: ${(props) => props.theme.fontSizeSmall};
  }

  .css-yk16xz-control {
    box-shadow: none;
  }
  .css-1pahdxg-control {
    box-shadow: none;
    border-color: ${(props) => props.theme.lightAccent}!important;
  }
  .css-1pahdxg-control:hover {
    border-color: ${(props) => props.theme.lightAccent}!important;
  }
  .css-g1d714-ValueContainer {
    background-color: ${(props) => props.theme.lightAccent}!important;
  }
`;

const NameSelectInput = ({ errors, options, label, ...otherProps }) => (
  <SelectInput className="field">
    {label && (
      <label className="label has-text-weight-semibold has-text-black">
        {label}
      </label>
    )}
    <div className="control">
      <Select isClearable options={options} {...otherProps} />
    </div>
    {errors && <p className="help is-danger">{errors}</p>}
  </SelectInput>
);

export default NameSelectInput;
