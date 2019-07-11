import React from 'react';
import { useQuery, useMutation } from 'urql';
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

const clientWelcomeEmailMutation = gql`
  mutation welcomeEmailTemplate($subject: String!, $body: String!) {
    welcomeEmailTemplate(subject: $subject, body: $body) {
      subject
      body
    }
  }
`;

const clientNotificationEmailMutation = gql`
  mutation clientEmailTemplate($subject: String!, $body: String!) {
    clientEmailTemplate(subject: $subject, body: $body) {
      subject
      body
    }
  }
`;

const ManageEmail = ({ match }) => {
  // fetch project data from api
  const [resultProject] = useQuery({
    query: projectQuery,
    variables: { id: match.params.id },
  });
  const project =
    resultProject.data && resultProject.data.project
      ? resultProject.data.project
      : {};
  const [res, executeMutation] = useMutation(clientWelcomeEmailMutation);
  const [resNotification, executeMutationNotification] = useMutation(
    clientNotificationEmailMutation,
  );
  // console.log('resultProject', project);

  return (
    <Layout>
      <Seo title="Dashboard Super Admin" description="Page description" />
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
                onSubmit={async data => {
                  await executeMutation(data);
                }}
              />
            </div>
            <div>
              <Title>Client Notification Email</Title>
              <ClientNotificationEmailForm
                onSubmit={async data => {
                  await executeMutationNotification(data);
                }}
              />
              {res.error && <Message type="error">{res.error.message}</Message>}
              {resNotification.error && (
                <Message type="error">{resNotification.error.message}</Message>
              )}
            </div>
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default ManageEmail;
