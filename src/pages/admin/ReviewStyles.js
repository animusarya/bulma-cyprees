import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';

const Container = styled.div`
  .subtitle {
    margin-bottom: 2rem !important;
  }
  .image img {
    width: 25% !important;
  }
  figure {
    justify-content: center;
    padding-bottom: 30px;
  }
`;

const ReviewStyles = () => (
  <Layout noContainer>
    <Seo title="Dashboard Admin" description="List of Projects Here" />
    <Header />
    <Container className="columns">
      <div className="column">
        <Sidebar />
      </div>
      <div className="column is-four-fifths">
        <h1 className="is-size-1">Style your website reviews</h1>
      </div>
    </Container>
    <CopyRight />
  </Layout>
);

export default ReviewStyles;
