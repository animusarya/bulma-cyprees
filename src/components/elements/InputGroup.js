import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  box-shadow: none;
  border-top: ${props =>
    props.isTop ? '1px solid theme.borderColor' : 'none'};
  border-left: ${props =>
    props.isLeft ? '1px solid theme.borderColor' : 'none'};
  border-right: ${props =>
    props.isRight ? '1px solid theme.borderColor' : 'none'};
  border-radius: ${props => (props.hasRadius ? '5px' : '0')};
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
`;

const InputGroup = ({ label, errors, isHorizontal, ...otherProps }) => (
  <div className={`field ${isHorizontal ? 'is-horizontal' : ''}`}>
    {label && <label className="label">{label}</label>}
    <div className="control">
      <Input className="input" {...otherProps} />
      {errors && <p className="help is-danger">{errors}</p>}
    </div>
  </div>
);

export default InputGroup;
