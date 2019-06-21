import React from 'react';
import styled from 'styled-components';

const Container = styled.h2`
  margin-bottom: 1.3rem;
`;

const Title = ({ children }) => (
  <Container className="is-size-5 has-text-weight-semibold">
    {children}
  </Container>
);

export default Title;
