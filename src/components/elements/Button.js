import React from 'react';
import styled from 'styled-components';

import theme from '../../utils/theme';

const Container = styled.button`
  &&& {
    ${props => props.style};
    margin-top: ${props => (props.marginTop ? '2rem' : '')};
    border-color: transparent !important;
    color: ${props => (props.paddingless ? props.theme.primaryColor : '#fff')};
    padding-left: ${props => (props.paddingless ? '0px' : '1.45em')};
    padding-right: ${props => (props.paddingless ? '0px' : '1.45em')};
    margin-bottom: ${props =>
      props.paddingless || props.marginBottomNone ? '0px' : '2rem'};
    padding-top: ${props => (props.paddingless ? 'calc(0px)' : '')};
    height: ${props => (props.paddingless ? '2em' : '')};
    background-color: ${props =>
      props.bgColor ? props.bgColor : props.theme.mainBrandColor};
    font-weight: ${props => props.fontWeight};
    font-family: 'Poppins', sans-serif !important;
    font-size: ${props => (props.fontSize ? props.fontSize : '16px')};
    :hover {
      background: ${props =>
        props.paddingless ? 'transparent' : props.theme.secondaryColor};
      transition: 0.6s;
      color: ${props =>
        props.paddingless ? props.theme.primaryColor : '#fff'};
    }
    :active {
      background: ${props => props.theme.primaryColor};
    }
  }
`;

const Button = ({
  className,
  children,
  secondary,
  primary,
  loading,
  brandColor,
  ...otherProps
}) => {
  let bgColor = theme.primaryColor;
  if (primary) {
    bgColor = brandColor;
  }

  return (
    <Container
      type="submit"
      className={`button ${
        secondary ? '' : 'is-primary is-outlined is-medium'
      } ${loading ? 'is-loading' : ''}`}
      bgColor={bgColor}
      {...otherProps}>
      {children}
    </Container>
  );
};

export default Button;
