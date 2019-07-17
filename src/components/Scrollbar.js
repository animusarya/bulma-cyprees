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

const ScrollBar = () => (
  <Container>
    <Title>
      <span className="has-text-weight-semibold">Please read our</span>{' '}
      <strong>&apos;Non Disclosure Agreement&apos;</strong>
    </Title>
    <ScrollArea>
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt.
      </p>
      <br />
      <p>
        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
        consectetur, adipisci velit, sed quia non numquam eius modi tempora
        incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim
        ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
        laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel
        eum iure reprehenderit qui in ea voluptate velit esse quam nihil
        molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
        nulla pariatur.
      </p>
    </ScrollArea>
  </Container>
);

export default ScrollBar;
