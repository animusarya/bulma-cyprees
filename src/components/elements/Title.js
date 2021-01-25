import React from 'react';
import styled from 'styled-components';

const Container = styled.h2`
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : '1.3rem'};
  color: ${(props) => props.theme.fontDark};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : 'auto')};
`;

const Title = ({ children, marginTop, marginBottom, fontSize }) => (
  <Container
    className={`is-size-${
      fontSize || 5
    } is-size-7-mobile has-text-weight-semibold`}
    marginTop={marginTop}
    marginBottom={marginBottom}>
    {children}
  </Container>
);

export default Title;
