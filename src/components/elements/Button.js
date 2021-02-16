/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

import theme from '../../utils/theme';

const Container = styled.button`
  &&& {
    ${(props) => props.style};
    margin-top: ${(props) => (props.marginTop ? '2rem' : '')};
    border: ${(props) =>
      props.hasBorder
        ? ` 1px solid ${props.theme.primaryColor}`
        : 'transparent'} !important;
    color: ${(props) =>
      props.buttonsTextColor
        ? props.buttonsTextColor
        : props.theme.primaryColor};
    padding-left: ${(props) => (props.paddingless ? '0px' : '1.4em')};
    padding-right: ${(props) => (props.paddingless ? '0px' : '1.4em')};
    padding-top: ${(props) => (props.paddingless ? '0px' : '1.4em')};
    padding-bottom: ${(props) => (props.paddingless ? '0px' : '1.4em')};
    margin-bottom: ${(props) =>
      props.paddingless || props.marginBottomNone ? '0px' : '2rem'};
    padding-top: ${(props) => (props.paddingless ? 'calc(0px)' : '')};
    height: ${(props) => (props.paddingless ? '2em' : '')};
    background-color: ${(props) =>
      props.bgColor ? props.bgColor : props.theme.secondaryColor};
    font-weight: ${(props) => props.fontWeight};
    font-family: 'Poppins', sans-serif !important;
    font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
    :hover {
      background: ${(props) =>
        props.bgColor ? props.bgColor : props.theme.secondaryColor};
      transition: 0.6s;
      color: ${(props) =>
        props.buttonsTextColor
          ? props.buttonsTextColor
          : props.theme.primaryColor};
    }
    :active {
      background: ${(props) =>
        props.bgColor ? props.bgColor : props.theme.secondaryColor};
    }
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
  ...otherProps
}) => {
  let bgColor = theme.secondaryColor;
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
      className={`button has-text-weight-bold ${
        secondary ? '' : 'is-primary  is-medium'
      } ${loading ? 'is-loading' : ''}`}
      bgColor={bgColor}
      hasBorder={hasBorder}
      buttonsTextColor={buttonsTextColor}
      {...otherProps}>
      {children}
    </Container>
  );
};

export default Button;
