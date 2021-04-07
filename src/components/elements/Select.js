import React from 'react';
import styled from 'styled-components';

const Group = styled.div`
  width: ${(props) => (props.groupWidth ? '100%' : '')};
  .control {
    width: ${(props) => (props.fullWidth ? '100%' : '')} !important;
  }
`;

const Input = styled.input`
  padding: 0.45rem 0.9rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: ${(props) => (props.hasRadius ? '0.4rem' : '0.2rem')};
  background-color: ${(props) => props.theme.secondaryBackground};
  ::placeholder {
    color: ${(props) => props.theme.textColorLight};
  }
`;

const Label = styled.label`
  font-size: ${(props) => props.theme.fontSizeSmall};
`;

const InputGroup = ({
  label,
  errors,
  fullWidth,
  isHorizontal,
  darkLabel,
  hasAddons,
  children,
  groupWidth,
  maxLength,
  smallInput,
  ...otherProps
}) => (
  <Group
    className={`field ${isHorizontal ? 'is-horizontal' : ''} ${
      hasAddons ? 'has-addons' : ''
    }`}
    groupWidth={groupWidth}
    fullWidth={fullWidth}>
    <div
      className={`${isHorizontal ? 'field-label is-align-self-center' : ''}`}>
      {label && (
        <Label
          className={`label has-text-weight-semibold ${
            darkLabel ? 'has-text-black' : 'has-text-grey-lighter'
          }`}>
          {label}
        </Label>
      )}
    </div>
    <div className="control">
      {children || (
        <Input
          className={`input is-size-8 has-text-grey-lighter ${
            smallInput ? 'is-small' : ''
          }`}
          {...otherProps}
          maxLength={maxLength}
        />
      )}
      {errors && <p className="help is-danger">{errors}</p>}
    </div>{' '}
  </Group>
);

export default InputGroup;
