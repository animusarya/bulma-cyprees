import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import AdminHeader from '../../components/AdminHeader';
import PageFiles from '../../components/PageFiles';
import PageContent from '../../components/PageContent';

const Container = styled.div``;

const ManagePage = () => {
  return (
    <Layout>
      <Seo title="Dashboard Admin" description="Page description" />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <AdminHeader />
          <MainColumn>
            <h1>IF FILES PAGE</h1>
            <PageFiles />
            <h1>IF CONTENT PAGE</h1>
            <PageContent />
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default ManagePage;
