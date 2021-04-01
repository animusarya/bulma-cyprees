import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';

const Container = styled.div``;

const Jobs = ({ match }) => {
  console.log(match.params);
  return (
    <Layout>
      <Container>
        <h1> {match.params ? match.params.status : 'hello wolrd'}</h1>
      </Container>
    </Layout>
  );
};

export default Jobs;
