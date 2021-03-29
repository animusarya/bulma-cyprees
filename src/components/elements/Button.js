/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

// import theme from '../../utils/theme';

const Container = styled.button`
  border-radius: ${(props) => (props.danger ? '4px' : '')} !important;
  padding: 3px 6px;
  &&& {
    ${(props) => props.style};
    margin-top: ${(props) => (props.marginTop ? '2rem' : '')};
    margin-bottom: ${(props) => (props.marginBottom ? '2rem' : '')};
    transition: 0.6s;
  }
  :not(.is-rounded) {
    border-radius: 6px;
  }
`;

const Button = ({
  children,
  secondary,
  loading,
  buttonsTextColor,
  fullWidth,
  danger,
  primary,
  ...otherProps
}) => (
  <Container
    type="submit"
    className={`button has-text-weight-semibold is-size-8 ${
      secondary ? 'is-secondary' : ''
    }
    ${primary ? 'is-primary ' : ''}
    ${danger ? 'is-danger is-small' : ''}
    ${loading ? 'is-loading' : ''}
    ${fullWidth ? 'is-fullwidth' : ''}`}
    danger={danger}
    buttonsTextColor={buttonsTextColor}
    {...otherProps}>
    {children}
  </Container>
);

export default Button;
