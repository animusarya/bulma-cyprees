import React from 'react';
import styled from 'styled-components';

const Group = styled.div`
  .control {
    width: ${props => (props.fullWidth ? '100%' : '')} !important;
  }
  label {
    width: ${props => (props.isWidth ? '10rem' : '')} !important;
  }
`;

const Input = styled.div`
  box-shadow: none;
  border-top: ${props =>
    props.border ? '1px solid theme.borderColor' : 'none'};
  border-left: ${props =>
    props.border ? '1px solid theme.borderColor' : 'none'};
  border-right: ${props =>
    props.border ? '1px solid theme.borderColor' : 'none'};
  border-radius: ${props => (props.hasRadius ? '5px' : '0')};
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
  width: 100%;
  select {
    width: 100%;
  }
`;

const SelectGroup = ({
  label,
  errors,
  fullWidth,
  isWidth,
  isHorizontal,
  options,
  border,
  placeholder,
  ...otherProps
}) => (
  <Group
    className={`field ${isHorizontal ? 'is-horizontal' : ''}`}
    fullWidth={fullWidth}
    isWidth={isWidth}>
    {label && <label className="label">{label}</label>}
    <div className="control">
      <Input className="select">
        <select {...otherProps}>
          <option>{placeholder}...</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          ))}
        </select>
      </Input>
      {errors && <p className="help is-danger">{errors}</p>}
    </div>
  </Group>
);

export default SelectGroup;
