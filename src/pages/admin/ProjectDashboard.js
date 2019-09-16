import React from 'react';
import styled from 'styled-components';
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
import AdminSubHeader from '../../components/AdminSubHeader';
import ProjectDashboardHero from '../../components/ProjectDashboardHero';
import ProjectPages from '../../components/ProjectPages';
import { Message, Loading } from '../../components/elements';

const pagesQuery = gql`
  query pages($projectId: ID!) {
    pages(projectId: $projectId) {
      id
      name
      slug
      type
      status
      createdAt
    }
  }
`;

const Container = styled.div`
  .content {
    align-self: center;
  }
  span {
    color: ${props => props.theme.primaryColor};
  }
  p {
    line-height: 1;
  }
  .steps-title {
    margin-bottom: 2%;
  }
`;

const ProjectDashboard = ({ match }) => {
  const projectId = match.params.id;
  const [project] = useProjectDetails(projectId);

  // fetch pages
  const resultPages = useQuery(pagesQuery, {
    variables: { projectId },
    fetchPolicy: 'cache-and-network',
  });

  const pages =
    resultPages.data && resultPages.data.pages ? resultPages.data.pages : [];

  return (
    <Layout>
      <Seo title="Project Dashboard" />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <AdminHeader />
          <AdminSubHeader
            refetch={() => {
              resultPages.refetch();
            }}
          />
          <MainColumn>
            {resultPages.error && (
              <Message type="error">{resultPages.error.message}</Message>
            )}
            {resultPages.loading && <Loading />}
            <div className="content">
              {pages.length === 0 ? (
                <ProjectDashboardHero />
              ) : (
                <ProjectPages
                  project={project}
                  pages={pages}
                  refetch={resultPages.refetch}
                />
              )}
            </div>
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default ProjectDashboard;
