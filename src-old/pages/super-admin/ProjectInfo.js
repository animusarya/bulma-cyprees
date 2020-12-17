import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import ProjectInfoForm from '../../components/ProjectInfoForm';
import { Heading, Title, Message, Loading } from '../../components/elements';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import AdminUsers from '../../components/AdminUsers';

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
    color: ${(props) => props.theme.secondaryColor};
  }
`;

const ProjectInfo = ({ match }) => {
  const resultUser = useQuery(userQuery, {
    variables: { id: match.params.clientId },
  });
  const resultProject = useQuery(projectQuery, {
    variables: { id: match.params.projectId },
    fetchPolicy: 'cache-and-network',
  });
  const [executeMutation, res] = useMutation(updateProjectMutation);
  const user = resultUser.data ? resultUser.data.user : {};
  const project = resultProject.data ? resultProject.data.project : {};
  // console.log('ProjectInfo', project);

  return (
    <Layout noContainer>
      <Seo title="Project info" description="Update User Project Info" />
      <Header />
      <Container className="columns">
        <div className="column">
          <Sidebar />
        </div>
        <div className="column is-four-fifths">
          <MainColumn>
            <Heading>
              Users &gt; {user.email} &gt; {project.name}
            </Heading>
            <Title>Project Information</Title>
            <div className="project-info">
              <ProjectInfoForm
                enableReinitialize
                initialValues={project}
                onSubmit={(data) =>
                  executeMutation({
                    variables: {
                      id: project.id,
                      input: {
                        name: data.name,
                        slug: data.slug,
                        customDomain: data.customDomain,
                      },
                    },
                  })
                }
              />
              {res.error && <Message type="error">{res.error.message}</Message>}
              {res.loading ? <Loading /> : null}
            </div>
            <AdminUsers
              result={resultProject}
              executeQuery={resultProject.refetch}
            />
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default ProjectInfo;
