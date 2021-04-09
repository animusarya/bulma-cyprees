import React from 'react';
import styled from 'styled-components';

const Group = styled.div`
  .control {
    width: ${(props) => (props.fullWidth ? '100%' : '')} !important;
  }
`;

const TextArea = styled.textarea`
  padding: 0.45rem 0.9rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: ${(props) => (props.hasRadius ? '0.4rem' : '0.2rem')};
  background-color: ${(props) => props.theme.secondaryColor};
  ::placeholder {
    color: ${(props) => props.theme.fontDark};
  }
`;

const LabelWrapper = styled.div`
  justify-content: space-between;
`;

const LabelInfo = styled.p`
  margin-left: 8px;
`;

const Label = styled.label`
  font-size: ${(props) => props.theme.fontSizeSmall};
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
          <Label className="label has-text-weight-semibold has-text-black mb-2">
            {label}
          </Label>
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
