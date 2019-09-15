import React from 'react';
import styled from 'styled-components';

const Group = styled.div`
  .control {
    width: ${props => (props.fullWidth ? '100%' : '')} !important;
  }
  label {
    width: ${props => (props.isWidth ? '10rem' : '')} !important;
    align-self: flex-end;
  }
`;

const Input = styled.input`
  box-shadow: none;
  border-top: ${props =>
    props.border ? '1px solid theme.borderColor' : 'none'};
  border-left: ${props =>
    props.border ? '1px solid theme.borderColor' : 'none'};
  border-right: ${props =>
    props.border ? '1px solid theme.borderColor' : 'none'};
  border-radius: ${props => (props.hasRadius ? '5px' : '0')};
  border-bottom: ${props => `1px solid ${props.theme.borderColor}`};
`;

const InputGroup = ({
  label,
  errors,
  fullWidth,
  isWidth,
  isHorizontal,
  hasAddons,
  ...otherProps
}) => (
  <Group
    className={`field ${isHorizontal ? 'is-horizontal' : ''} ${
      hasAddons ? 'has-addons' : ''
    }`}
    fullWidth={fullWidth}
    isWidth={isWidth}>
    {label && <label className="label">{label}</label>}
    {hasAddons && (
      <p className="control">
        <div className="button is-static">@gmail.com</div>
      </p>
    )}
    <div className="control">
      <Input className="input" {...otherProps} />
      {errors && <p className="help is-danger">{errors}</p>}
    </div>
  </Group>
);

export default InputGroup;
