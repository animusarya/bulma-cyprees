import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
  &&& {
    border-color: ${props =>
      props.paddingless ? 'transparent' : props.theme.primaryColor};
    color: ${props => props.theme.primaryColor};
    padding-left: ${props => (props.paddingless ? '0px' : '1.45em')};
    padding-right: ${props => (props.paddingless ? '0px' : '1.45em')};
    margin-bottom: ${props => (props.paddingless ? '0px' : '2rem')};
    padding-top: ${props => (props.paddingless ? 'calc(0px)' : '')};
    height: ${props => (props.paddingless ? '2em' : '')};
    background-color: transparent;
    :hover {
      border-color: ${props =>
        props.paddingless ? '#transparent' : props.theme.primaryColor};
      color: ${props => props.theme.primaryColor};
      background: transparent;
    }
  }
`;

const Button = ({ children, secondary, ...otherProps }) => (
  <Container
    type="submit"
    className={`button ${secondary ? '' : 'is-primary is-outlined is-medium'}`}
    {...otherProps}>
    {children}
  </Container>
);

export default Button;
