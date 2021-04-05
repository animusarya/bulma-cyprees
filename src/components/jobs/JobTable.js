import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  .right-column {
    background: ${(props) => props.theme.primaryBackgroundColor};
  }
`;

const JobTable = () => (
  <Container>
    <div className="columns">
      <div className="column is-10 right-column pb-0">Jobs</div>
    </div>
  </Container>
);

export default JobTable;
