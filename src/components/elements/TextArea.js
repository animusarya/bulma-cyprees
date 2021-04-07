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

const LabelWrapper = styled.div`
  justify-content: space-between;
`;

const LabelInfo = styled.p`
  margin-left: 8px;
`;

const TextAreaGroup = ({
  label,
  errors,
  fullWidth,
  isWidth,
  isHorizontal,
  labelInfo,
  readOnly,
  maxLength,
  ...otherProps
}) => (
  <Group
    className={`field ${isHorizontal ? 'is-horizontal' : ''}`}
    fullWidth={fullWidth}
    isWidth={isWidth}>
    <LabelWrapper className="is-flex">
      {label && (
        <div className="is-flex">
          <label className="label">{label}</label>
          {labelInfo && <LabelInfo>{labelInfo}</LabelInfo>}
        </div>
      )}
    </LabelWrapper>
    <div className="control">
      <TextArea
        className="textarea"
        {...otherProps}
        readOnly={readOnly}
        maxLength={maxLength}
      />
      {errors && <p className="help is-danger">{errors}</p>}
    </div>
  </Group>
);

export default TextAreaGroup;
