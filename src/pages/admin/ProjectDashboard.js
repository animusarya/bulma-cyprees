import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStoreActions } from 'easy-peasy';
import { useQuery, useMutation } from '@apollo/react-hooks';
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
      logo
      heroImage
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

const updateProjectMutation = gql`
  mutation updateProject($id: ID!, $input: ProjectUpdateInput!) {
    updateProject(id: $id, input: $input) {
      id
      name
      slug
      status
      customDomain
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

  // fetch project data from api
  const resultProject = useQuery(projectQuery, {
    variables: { id: match.params.id },
    fetchPolicy: 'cache-and-network',
  });
  const project =
    resultProject.data && resultProject.data.project
      ? resultProject.data.project
      : {};
  // console.log('resultProject', project);

  // fetch pages
  const resultPages = useQuery(pagesQuery, {
    variables: { projectId: project.id },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    updateProject(match.params.id);
  }, [match.params.id]);

  const pages =
    resultPages.data && resultPages.data.pages ? resultPages.data.pages : [];

  const [executeUpdateProjectMutation, resUpdateProject] = useMutation(
    updateProjectMutation,
  );

  return (
    <Layout>
      <Seo title="Project Dashboard" />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <AdminHeader
            project={project}
            executeUpdateProjectMutation={executeUpdateProjectMutation}
          />
          <AdminSubHeader
            project={project}
            executeUpdateProjectMutation={executeUpdateProjectMutation}
            refetch={() => {
              resultPages.refetch();
            }}
          />
          {resUpdateProject.error && (
            <Message type="error">{resUpdateProject.error.message} </Message>
          )}
          <MainColumn>
            <div className="content">
              {pages.length === 0 ? (
                <ProjectDashboardHero />
              ) : (
                <React.Fragment>
                  {resultPages.error && (
                    <Message type="error">{resultPages.error.message}</Message>
                  )}
                  {resultPages.loading && <Loading />}
                  <ProjectPages
                    project={project}
                    pages={pages}
                    refetch={resultPages.refetch}
                  />
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
