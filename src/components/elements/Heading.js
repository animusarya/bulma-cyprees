import React from 'react';
import styled from 'styled-components';

const Container = styled.h2`
  color: ${(props) => props.theme.fontDark};
  border-bottom: 2px solid ${(props) => props.theme.borderColor};
  font-size: ${(props) =>
    props.small ? props.theme.fontSizeLarge : props.theme.fontSizeExtraLarge};
`;

const Line = styled.div`
  height: 3px;
  width: 80px;
  background-color: ${(props) => props.theme.mainBrandColor};
  margin: 0.5rem auto 0.5rem auto;
`;

const Heading = ({ children, small, centered, ...otherProps }) => (
  <Container
    small={small}
    className={`title has-text-black pb-3 has-text-weight-semibold ${
      centered ? 'has-text-centered' : ''
    }  `}
    {...otherProps}>
    {children}
    {centered && <Line />}
  </Container>
);

export default Heading;
