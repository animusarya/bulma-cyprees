import React from 'react';
import styled from 'styled-components';
import Seo from '../components/Seo';

import Layout from '../components/Layout';

const Container = styled.div``;

export default () => (
  <Layout>
    <Seo title="Login" description="Some description here." />
    <Container>
      login
    </Container>
  </Layout>
);
