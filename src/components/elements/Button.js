/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';

import theme from '../../utils/theme';

const Container = styled.button`
  &&& {
    ${(props) => props.style};
    margin-top: ${(props) => (props.marginTop ? '2rem' : '')};
    border-color: transparent !important;
    color: ${(props) =>
      props.buttonsTextColor
        ? props.theme.primaryColor
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
  brandColor,
  buttonsTextColor,
  ...otherProps
}) => {
  let bgColor = theme.secondaryColor;
  if (primary) {
    bgColor = brandColor;
  }

  return (
    <Container
      type="submit"
      className={`button has-text-weight-bold ${
        secondary ? '' : 'is-primary is-outlined is-medium'
      } ${loading ? 'is-loading' : ''}`}
      bgColor={bgColor}
      buttonsTextColor={buttonsTextColor}
      {...otherProps}>
      {children}
    </Container>
  );
};

export default Button;
