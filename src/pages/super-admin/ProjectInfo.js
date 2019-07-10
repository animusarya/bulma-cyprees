import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from 'urql';
import gql from 'graphql-tag';
import AdminUsers from '../../components/AdminUsers';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import ProjectInfoForm from '../../components/ProjectInfoForm';
import { Heading, Title, Message, Loading } from '../../components/elements';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';

const userQuery = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      email
    }
  }
`;

const projectQuery = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      name
      slug
      customDomain
      clients {
        id
        email
        status
        hasAccess
        notifyStatus
      }
    }
  }
`;

const updateProjectMutation = gql`
  mutation updateProject($id: ID!, $input: ProjectUpdateInput!) {
    updateProject(id: $id, input: $input) {
      id
      name
      slug
      customDomain
    }
  }
`;

const Container = styled.div`
  .project-info {
    margin-bottom: 3rem;
  }
  .modules {
    margin-top: 4rem;
  }
  label {
    color: ${props => props.theme.secondaryColor};
  }
`;

const ProjectInfo = ({ match }) => {
  const [resultUser] = useQuery({
    query: userQuery,
    variables: { id: match.params.clientId },
  });
  const [resultProject, executeQuery] = useQuery({
    query: projectQuery,
    variables: { id: match.params.projectId },
  });
  const [res, executeMutation] = useMutation(updateProjectMutation);
  const user = resultUser.data ? resultUser.data.user : {};
  const project = resultProject.data ? resultProject.data.project : {};
  console.log('ProjectInfo', project);

  return (
    <Layout>
      <Seo
        title="Information Projects Clients"
        description="Page description"
      />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <MainColumn>
            <Heading>Users &gt; {user.email} &gt; Project Arden</Heading>
            <Title>Project Information</Title>
            <div className="project-info">
              <ProjectInfoForm
                enableReinitialize
                initialValues={project}
                onSubmit={data =>
                  executeMutation({
                    id: project.id,
                    input: {
                      name: data.name,
                      slug: data.slug,
                      customDomain: data.customDomain,
                    },
                  })
                }
              />
              {res.error && <Message type="error">{res.error.message}</Message>}
              {res.fetching ? <Loading /> : null}
            </div>
            <AdminUsers result={resultProject} executeQuery={executeQuery} />
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default ProjectInfo;
