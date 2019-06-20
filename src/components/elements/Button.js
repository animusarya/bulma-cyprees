import React from 'react';
import styled from 'styled-components';

const Container = styled.button`
  &&& {
    border-color: ${props => props.theme.primaryColor};
    color: ${props => props.theme.primaryColor};
    padding-left: 1.45em;
    padding-right: 1.45em;
  }
`;

const Button = ({ children, ...otherProps}) => (
  <Container
    type="submit"
    className="button is-primary is-outlined is-medium"
    {...otherProps}
  >
    {children}
  </Container>
);

export default Button;
