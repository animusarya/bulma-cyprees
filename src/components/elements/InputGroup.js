import React from 'react';
import styled from 'styled-components';

const Group = styled.div`
  .control {
    width: ${props => (props.width ? '100%' : '')} !important;
  }
`;

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

const InputGroup = ({ label, errors, width, isHorizontal, ...otherProps }) => (
  <Group
    className={`field ${isHorizontal ? 'is-horizontal' : ''}`}
    width={width}>
    {label && <label className="label">{label}</label>}
    <div className="control">
      <Input className="input" {...otherProps} />
      {errors && <p className="help is-danger">{errors}</p>}
    </div>
  </Group>
);

export default InputGroup;
