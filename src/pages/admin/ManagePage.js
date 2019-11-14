import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import useProjectDetails from '../../hooks/useProjectDetails';
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
  const { pageId, id: projectId } = match.params;
  const [project, resultProject] = useProjectDetails(projectId);

  const resultPage = useQuery(pageQuery, {
    variables: { id: pageId },
    fetchPolicy: 'cache-and-network',
  });

  const page =
    resultPage.data && resultPage.data.page ? resultPage.data.page : {};

  return (
    <Layout noContainer>
      <Seo title="Manage Page" description="Manage Page Type Content Here" />
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <AdminHeader />
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
              project={{ ...project, id: projectId }}
              page={{ ...page, id: pageId }}
              isPublic={page.type === 'content'}
            />
            {page.type === 'content' && (
              <PageContent page={{ ...page, id: pageId }} />
            )}
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default ManagePage;
