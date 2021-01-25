/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

const Group = styled.div`
  .control {
    width: ${(props) => (props.fullWidth ? '100%' : '')} !important;
  }
  label {
    width: ${(props) => (props.isWidth ? '10rem' : '')} !important;
  }
`;

const TextArea = styled.textarea`
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

const TextAreaGroup = ({
  label,
  errors,
  fullWidth,
  isWidth,
  isHorizontal,
  labelInfo,
  ...otherProps
}) => (
  <Group
    className={`field ${isHorizontal ? 'is-horizontal' : ''}`}
    fullWidth={fullWidth}
    isWidth={isWidth}>
    {label && (
      <div className="is-flex">
        <label className="label">{label}</label>
        {labelInfo && <p>{labelInfo}</p>}
      </div>
    )}
    <div className="control">
      <TextArea className="textarea" {...otherProps} />
      {errors && <p className="help is-danger">{errors}</p>}
    </div>
  </Group>
);

export default TextAreaGroup;
