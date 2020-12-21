import React from 'react';
import styled from 'styled-components';

const Container = styled.h2`
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  color: ${(props) => props.theme.fontDark};
`;

const Subtitle = ({ children }) => (
  <Container className="is-size-6 has-text-weight-bold">{children}</Container>
);

export default Subtitle;
