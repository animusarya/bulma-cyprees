import React from 'react';
import { useQuery } from '@apollo/react-hooks';
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
import { Message, Loading, Heading } from '../../components/elements';

const projectQuery = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      name
      slug
    }
  }
`;

const pageQuery = gql`
  query page($id: ID!) {
    page(id: $id) {
      id
      name
      slug
      type
      content
    }
  }
`;

const ManagePage = ({ match }) => {
  // fetch project data from api
  const resultProject = useQuery(projectQuery, {
    variables: { id: match.params.id },
    fetchPolicy: 'cache-and-network',
  });
  const resultPage = useQuery(pageQuery, {
    variables: { id: match.params.pageId },
    fetchPolicy: 'cache-and-network',
  });

  const project =
    resultProject.data && resultProject.data.project
      ? resultProject.data.project
      : {};
  const page =
    resultPage.data && resultPage.data.page ? resultPage.data.page : {};
  // console.log('resultProject', project, page);

  return (
    <Layout>
      <Seo title="Manage Page" description="Manage Page Type Content Here" />
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <AdminHeader project={project} />
          <MainColumn>
            <Heading>{page.name}</Heading>
            {resultProject.error && (
              <Message type="error">{resultProject.error.message}</Message>
            )}
            {resultPage.error && (
              <Message type="error">{resultPage.error.message}</Message>
            )}
            {(resultPage.loading || resultProject.loading) && <Loading />}
            <PageFiles
              project={project}
              page={page}
              isPublic={page.type === 'content'}
            />
            {page.type === 'content' && (
              <PageContent project={project} page={page} />
            )}
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default ManagePage;
