import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import { Heading, Title, Message } from '../../components/elements';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import ClientWelcomeEmailForm from '../../components/ClientWelcomeEmailForm';
import ClientNotificationEmailForm from '../../components/ClientNotificationEmailForm';
import AdminHeader from '../../components/AdminHeader';

const projectQuery = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      name
      slug
      logo
      heroImage
      welcomeEmailTemplate {
        subject
        body
      }
      clientEmailTemplate {
        subject
        body
      }
    }
  }
`;

const updateProjectMutation = gql`
  mutation updateProject($id: ID!, $input: ProjectUpdateInput!) {
    updateProject(id: $id, input: $input) {
      id
      name
    }
  }
`;

const ManageEmail = ({ match }) => {
  // fetch project data from api
  const resultProject = useQuery(projectQuery, {
    variables: { id: match.params.id },
    fetchPolicy: 'cache-and-network',
  });
  const [executeMutation, res] = useMutation(updateProjectMutation);

  const project =
    resultProject.data && resultProject.data.project
      ? resultProject.data.project
      : {};

  return (
    <Layout>
      <Seo title="Manage Email" description="Manage Email Content" />
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <AdminHeader project={project} />
          <MainColumn paddingtop="1rem">
            <Heading>Manage Outgoing Email Content</Heading>
            <Title>Client Welcome Email (For Unregistered clients)</Title>
            <div>
              <ClientWelcomeEmailForm
                enableReinitialize
                initialValues={project}
                onSubmit={async data => {
                  await executeMutation({
                    variables: {
                      id: project.id,
                      input: {
                        welcomeEmailTemplate: data,
                      },
                    },
                  });
                }}
              />
            </div>
            <div>
              <Title>Client Notification Email</Title>
              <ClientNotificationEmailForm
                enableReinitialize
                initialValues={project}
                onSubmit={async data => {
                  await executeMutation({
                    variables: {
                      id: project.id,
                      input: {
                        clientEmailTemplate: data,
                      },
                    },
                  });
                }}
              />
              {res.error && <Message type="error">{res.error.message}</Message>}
            </div>
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default ManageEmail;
