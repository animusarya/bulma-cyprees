import React from 'react';
import styled from 'styled-components';

const Container = styled.h2`
  color: ${(props) => props.theme.fontDark};
  border-bottom: 1px solid ${(props) => props.theme.secondaryBorderColor};
`;

const Heading = ({ children }) => (
  <Container className="title is-3 has-text-grey-lighter pb-3 has-text-weight-semibold">
    {children}
  </Container>
);

export default Heading;
