import React from 'react';
import swal from 'sweetalert';

import useProjectDetails from '../../hooks/useProjectDetails';
import useProjectUpdate from '../../hooks/useProjectUpdate';
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

const ManageEmail = ({ match }) => {
  const projectId = match.params.id;
  const [project] = useProjectDetails(projectId);
  const [executeMutation, res] = useProjectUpdate();

  return (
    <Layout noContainer>
      <Seo title="Manage Emails" description="Manage Email Content" />
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <AdminHeader />
          <MainColumn paddingtop="1rem">
            <Heading>Manage Emails</Heading>
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
                  swal('Email data updated');
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
                  swal('Email data updated');
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
