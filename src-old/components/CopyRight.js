import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: -1.6rem;
  background-color: #f4f4f6;
  padding: 1%;
  color: ${(props) => props.theme.secondaryColor};
`;

export default () => (
  <Container className="has-text-right is-size-7">
    <i className="far fa-copyright" /> {new Date().getFullYear()} Review Our
    Services All Rights Reserved
  </Container>
);
