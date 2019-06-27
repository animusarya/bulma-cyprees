import React from 'react';
import styled from 'styled-components';

const Container = styled.h2`
  margin-bottom: 1.4rem;
`;

const Heading = ({ children }) => (
  <Container className="is-size-4 has-text-weight-semibold">
    {children}
  </Container>
);

export default Heading;
