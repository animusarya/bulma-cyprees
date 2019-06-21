import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
background-color: #f4f4f6;
padding: 1%;
color: ${props => props.theme.secondaryColor};
`;

export default () => (
  <Container className="has-text-right is-size-7">
    <i className="far fa-copyright"></i> 2019 InteliShare All Rights Reserved
  </Container>
);
