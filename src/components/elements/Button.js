/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

import theme from '../../utils/theme';

const Container = styled.button`
  &&& {
    ${(props) => props.style};
    margin-top: ${(props) => (props.marginTop ? '2rem' : '')};
    margin-bottom: ${(props) =>
      props.paddingless || props.marginBottomNone ? '0px' : '2rem'};
    transition: 0.6s;
  }
`;

const Button = ({
  children,
  secondary,
  primary,
  loading,
  buttonsTextColor,
  hasBorder,
  hasNoBackground,
  hasBgColor,
  fullWidth,
  ...otherProps
}) => {
  let bgColor = theme.buttonColor;
  if (primary) {
    bgColor = theme.primaryColor;
  } else if (hasBorder) {
    bgColor = 'transparent';
  } else if (hasNoBackground) {
    bgColor = 'transparent';
  } else if (hasBgColor) {
    bgColor = hasBgColor;
  }

  return (
    <Container
      type="submit"
      className={`button has-text-weight-semibold is-size-8 ${
        secondary ? '' : 'is-primary'
      } ${loading ? 'is-loading' : ''} ${fullWidth ? 'is-fullwidth' : ''}`}
      bgColor={bgColor}
      hasBorder={hasBorder}
      buttonsTextColor={buttonsTextColor}
      {...otherProps}>
      {children}
    </Container>
  );
};

export default Button;
