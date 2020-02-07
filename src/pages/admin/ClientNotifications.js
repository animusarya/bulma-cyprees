import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import useProjectDetails from '../../hooks/useProjectDetails';
import useProjectUpdate from '../../hooks/useProjectUpdate';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import { Heading, Title, Message, Button } from '../../components/elements';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import ClientNotificationEmailForm from '../../components/ClientNotificationEmailForm';
import AdminHeader from '../../components/AdminHeader';
import AdminSubHeader from '../../components/AdminSubHeader';

const sendNotificationMutation = gql`
  mutation sendNotification($projectId: ID!) {
    sendNotification(projectId: $projectId) {
      success
    }
  }
`;

const ClientNotifications = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const projectId = match.params.id;
  const [project] = useProjectDetails(projectId);
  const [executeMutation, res] = useProjectUpdate();
  const [sendNotification, { error }] = useMutation(sendNotificationMutation);

  useEffect(() => {
    if (error) {
      swal(error.message);
      setLoading(false);
    }
  }, [error]);

  const handleSendNotification = () => {
    setLoading(true);
    swal({
      title: 'Do you confirm to send emails to all of your clients?',
      buttons: ['Cancel', 'Send!'],
    }).then(async value => {
      if (value) {
        await sendNotification({ variables: { projectId } });
        swal('Notifications sent successfully!');
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

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
          <AdminSubHeader />
          <MainColumn paddingtop="1rem">
            <Heading>Notifications</Heading>
            <div>
              <Title>
                Notify your clients by email for any recent activity
              </Title>
              {/* <Button loading={loading} onClick={handleSendNotification}>
                Notify All Clients
              </Button> */}
            </div>
            <div>
              <Title>Notification Email Message</Title>
              <ClientNotificationEmailForm
                enableReinitialize
                initialValues={project}
                handleSendNotification={handleSendNotification}
                loading={loading}
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

export default ClientNotifications;
