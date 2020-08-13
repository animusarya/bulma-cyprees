import React from 'react';
import styled from 'styled-components';

const Container = styled.h2`
  margin-bottom: ${(props) =>
    props.marginbottom ? props.marginbottom : '1.3rem'};
  color: ${(props) => props.theme.secondaryColor};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : 'auto')};
`;

const Title = ({ children, marginTop, marginbottom, fontSize }) => (
  <Container
    className={`is-size-${fontSize ||
      5} is-size-7-mobile has-text-weight-semibold`}
    marginTop={marginTop}
    marginbottom={marginbottom}
  >
    {children}
  </Container>
);

export default Title;
