import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 2rem;
`;

const ScrollArea = styled.div`
  overflow: scroll;
  height: 200px;
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  margin-top: 1rem;
  padding: 1rem;
`;

const Title = styled.h2`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const NDAScroller = ({ data }) => (
  <Container>
    <Title>
      <span className="has-text-weight-semibold">Please read our</span>{' '}
      <strong>&apos;Non Disclosure Agreement&apos;</strong>
    </Title>
    <ScrollArea>{data}</ScrollArea>
  </Container>
);

export default NDAScroller;
