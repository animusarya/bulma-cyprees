/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

const Group = styled.div`
  width: ${(props) => (props.groupWidth ? '100%' : '')};
  .control {
    width: ${(props) => (props.fullWidth ? '100%' : '')} !important;
  }
  label {
    width: ${(props) => (props.isWidth ? '12rem' : '')} !important;
    align-self: flex-end;
  }
`;

const Input = styled.input`
  box-shadow: none;
  border-top: ${(props) =>
    props.border ? '1px solid theme.borderColor' : 'none'};
  border-left: ${(props) =>
    props.border ? '1px solid theme.borderColor' : 'none'};
  border-right: ${(props) =>
    props.border ? '1px solid theme.borderColor' : 'none'};
  border-radius: ${(props) => (props.hasRadius ? '5px' : '0')};
  border-bottom: ${(props) => `1px solid ${props.theme.borderColor}`};
`;

const IconContainer = styled.div`
  margin-left: 15px;
  .tooltiptext {
    visibility: hidden;
    width: 180px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
  }
  :hover .tooltiptext {
    visibility: visible;
  }
`;

const InputGroup = ({
  label,
  errors,
  fullWidth,
  isWidth,
  isHorizontal,
  hasAddons,
  children,
  infoIcon,
  iconLabel,
  groupWidth,
  labelInfo,
  ...otherProps
}) => (
  <Group
    className={`field ${isHorizontal ? 'is-horizontal' : ''} ${
      hasAddons ? 'has-addons' : ''
    }`}
    groupWidth={groupWidth}
    fullWidth={fullWidth}
    isWidth={isWidth}>
    <div className="is-flex">
      {label && <label className="label">{label}</label>}{' '}
      {labelInfo && <p>{labelInfo}</p>}
      {infoIcon && (
        <IconContainer>
          {infoIcon}
          <span className="tooltiptext is-size-7">{iconLabel}</span>
        </IconContainer>
      )}
    </div>
    {hasAddons && (
      <p className="control">
        <span className="button is-static">@gmail.com</span>
      </p>
    )}
    <div className="control">
      {children || <Input className="input" {...otherProps} />}
      {errors && <p className="help is-danger">{errors}</p>}
    </div>
  </Group>
);

export default InputGroup;
