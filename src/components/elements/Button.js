/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

// import theme from '../../utils/theme';

const Container = styled.button`
  &&& {
    ${(props) => props.style};
    margin-top: ${(props) => (props.marginTop ? '2rem' : '')};
    margin-bottom: ${(props) => (props.marginBottom ? '2rem' : '')};
  }
`;

const Button = ({
  children,
  secondary,
  loading,
  buttonsTextColor,
  fullWidth,
  primary,
  ...otherProps
}) => (
  <Container
    type="submit"
    className={`button has-text-weight-semibold is-size-8 ${
      secondary ? 'is-secondary' : ''
    }
    ${primary ? 'is-primary ' : ''}
    ${loading ? 'is-loading' : ''}
    ${fullWidth ? 'is-fullwidth' : ''}`}
    buttonsTextColor={buttonsTextColor}
    {...otherProps}>
    {children}
  </Container>
);

export default Button;
