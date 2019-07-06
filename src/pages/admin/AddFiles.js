import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import AdminHeader from '../../components/AdminHeader';
import ProjectsProperty from '../../components/ProjectsProperty';

const Container = styled.div`
  input {
    border-color: ${props => props.theme.primaryColor};
    border-radius: 0px;
    :hover {
      border-color: ${props => props.theme.primaryColor};
    }
  }
`;
const AddFiles = () => {
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
            <ProjectsProperty />
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default AddFiles;
