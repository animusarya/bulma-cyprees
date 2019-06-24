import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  box-shadow: none;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0;
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
`;

const InputGroup = ({ label, errors, isHorizontal, ...otherProps}) => (
  <div className={`field ${isHorizontal ? 'is-horizontal' : ''}`}>
    {label && <label className="label">{label}</label>}
    <div className="control">
      <Input
        className="input"
        {...otherProps}
      />
      {errors && (
        <p className="help is-danger">{errors}</p>
      )}
    </div>
  </div>
);

export default InputGroup;
