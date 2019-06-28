import React from 'react';
import styled from 'styled-components';

const Container = styled.h2`
  margin-bottom: ${props =>
    props.marginbottom ? props.marginbottom : '1.3rem'};
  color: ${props => props.theme.secondaryColor};
  margin-top: ${props => (props.margintop ? props.margintop : 'auto')};
`;

const Title = ({ children, margintop, marginbottom }) => (
  <Container
    className="is-size-5 has-text-weight-semibold"
    margintop={margintop}
    marginbottom={marginbottom}>
    {children}
  </Container>
);

export default Title;
