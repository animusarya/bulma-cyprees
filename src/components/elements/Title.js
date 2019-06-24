import React from 'react';
import styled from 'styled-components';

const Container = styled.h2`
  margin-bottom: 1.3rem;
  color:  ${props => props.theme.secondaryColor};
  margin-top: ${props=>props.margin}
  `;

const Title = ({ children, margin }) => (
  <Container className="is-size-5 has-text-weight-semibold" margin={margin}>
    {children}
  </Container>
);

export default Title;
