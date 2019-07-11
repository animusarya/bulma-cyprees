import React from 'react';
import { useQuery } from 'urql';
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import AdminHeader from '../../components/AdminHeader';
import PageFiles from '../../components/PageFiles';
import PageContent from '../../components/PageContent';

const projectQuery = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      name
      slug
    }
  }
`;

const ManagePage = ({ match }) => {
  // fetch project data from api
  const [resultProject] = useQuery({
    query: projectQuery,
    variables: { id: match.params.id },
  });
  const project =
    resultProject.data && resultProject.data.project
      ? resultProject.data.project
      : {};
  // console.log('resultProject', project);

  return (
    <Layout>
      <Seo title="Dashboard Admin" description="Page description" />
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <AdminHeader project={project} />
          <MainColumn>
            <h1>IF FILES PAGE</h1>
            <PageFiles />
            <h1>IF CONTENT PAGE</h1>
            <PageContent />
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default ManagePage;
