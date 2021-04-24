import React from 'react';
import styled from 'styled-components';

const Container = styled.h2`
  color: ${(props) => props.theme.fontDark};
  border-bottom: 2px solid ${(props) => props.theme.borderColor};
  font-size: ${(props) =>
    props.small ? props.theme.fontSizeLarge : props.theme.fontSizeExtraLarge};
`;

const Heading = ({ children, small }) => (
  <Container
    className="title has-text-black pb-3 has-text-weight-semibold"
    small={small}>
    {children}
  </Container>
);

export default Heading;
