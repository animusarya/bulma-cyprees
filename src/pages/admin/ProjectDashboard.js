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

const projectQuery = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      name
      slug
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

  return (
    <Layout>
      <Seo title="Dashboard Admin" description="Page description" />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <AdminHeader project={project} />
          <MainColumn>
            <div className="content">
              <div className="hero-body">
                <div className="has-text-centered has-text-weight-medium">
                  <p className="title is-size-2 has-text-weight-normal">
                    Welcome to{' '}
                    <strong className="has-text-weight-bold">Intelli</strong>
                    <span>Share</span>
                  </p>
                  <div className="steps-title">
                    <strong className="subtitle has-text-weight-bold is-size-4">
                      Getting Started
                    </strong>
                  </div>
                  <div className="subtitle is-6">
                    <p>
                      1. Insert your{' '}
                      <span className="has-text-weight-bold">
                        Logo/Branding Colour
                      </span>
                    </p>
                    <p>
                      2. Click the{' '}
                      <strong className="has-text-weight-bold">Add Page</strong>
                    </p>
                    <p>
                      3. Set your outgoing email messages under{' '}
                      <strong className="has-text-weight-bold">
                        Manage Emails
                      </strong>
                    </p>
                    <p>
                      4. Add your Clients under{' '}
                      <strong className="has-text-weight-bold">
                        Manage Clients
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default ProjectDashboard;
