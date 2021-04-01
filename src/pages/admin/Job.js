import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';

const Container = styled.div``;

const Job = ({ match }) => (
  // console.log(match.params);
  <Layout>
    <Container>
      <h1> {match.params ? match.params.id : 'hello wolrd'}</h1>
    </Container>
  </Layout>
);
export default Job;
