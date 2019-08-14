import React from 'react';
import styled from 'styled-components';
import { useStoreActions } from 'easy-peasy';
import { useQuery } from 'urql';
import gql from 'graphql-tag';

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

const projectQuery = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      name
      slug
    }
  }
`;

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
  // set sidebar active project
  const updateProject = useStoreActions(
    actions => actions.active.updateProject,
  );
  updateProject(match.params.id);

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

  // fetch pages
  const [resultPages, refetchPages] = useQuery({
    query: pagesQuery,
    variables: { projectId: project.id },
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
          <AdminHeader project={project} />
          <AdminSubHeader
            project={project}
            refetch={() => {
              refetchPages();
            }}
          />
          <MainColumn>
            <div className="content">
              {pages.length === 0 ? (
                <ProjectDashboardHero />
              ) : (
                <React.Fragment>
                  {resultPages.error && (
                    <Message type="error">{resultPages.error.message}</Message>
                  )}
                  {resultPages.fetching && <Loading />}
                  <ProjectPages project={project} pages={pages} />
                </React.Fragment>
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
