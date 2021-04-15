import React from 'react';
import styled from 'styled-components';

const SelectInput = styled.div`
  select {
    padding: 0.45rem 0.9rem;
    border: 1px solid ${(props) => props.theme.borderColor};
    border-radius: ${(props) => (props.hasRadius ? '0.4rem' : '0.2rem')};
    background-color: ${(props) => props.theme.secondaryColor};
    ::placeholder {
      color: ${(props) => props.theme.fontDark};
    }
    :focus {
      border-color: ${(props) => props.theme.secondaryColor} !important;
      box-shadow: none !important;
    }
  }
`;

const Label = styled.label`
  font-size: ${(props) => props.theme.fontSizeSmall} !important;
`;

const Select = ({ placeholder, options, errors, label, ...otherProps }) => (
  <SelectInput className="field">
    {label && (
      <Label className="label has-text-weight-semibold has-text-black mb-2">
        {label}
      </Label>
    )}
    <div className="control">
      <div className="select is-fullwidth  is-expanded has-text-grey-lighter">
        <select {...otherProps}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option
              key={option.id ? option.id : option.value}
              value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
      </div>
    </div>
    {errors && <p className="help is-danger">{errors}</p>}
  </SelectInput>
);

export default Select;
