import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import swal from 'sweetalert';
import dayjs from 'dayjs';
import { startCase } from 'lodash';

import useProjectDetails from '../../hooks/useProjectDetails';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import AdminHeader from '../../components/AdminHeader';
import AdminSubHeader from '../../components/AdminSubHeader';
import ManageAdminClientForm from '../../components/ManageAdminClientForm';
import {
  Heading,
  Subtitle,
  Button,
  Message,
  Loading,
} from '../../components/elements';

const addClientMutation = gql`
  mutation addProjectClient($id: ID!, $input: ProjectClientInput!) {
    addProjectClient(id: $id, input: $input) {
      id
    }
  }
`;

const importCsvMutation = gql`
  mutation importCsv($email: String!) {
    importCsv(email: $email) {
      id
      email
    }
  }
`;

const resendEmailMutation = gql`
  mutation resendEmail($projectId: ID!, $email: String!) {
    resendEmail(projectId: $projectId, email: $email) {
      success
    }
  }
`;

const updateProjectClientMutation = gql`
  mutation updateProjectClient($id: ID!, $input: ProjectClientInput!) {
    updateProjectClient(id: $id, input: $input) {
      name
    }
  }
`;

const removeClientMutation = gql`
  mutation removeProjectClient($id: ID!, $clientId: ID!) {
    removeProjectClient(id: $id, clientId: $clientId) {
      success
    }
  }
`;

const Container = styled.div`
  .add-client {
    display: flex;
  }
  .label {
    font-size: 12px;
  }
  .control {
    align-self: flex-end;
  }
  .import-button {
    margin: 26px;
  }
  .kzCdMG {
    margin-bottom: 3%;
  }
  .notify-title {
    margin-top: 5%;
  }
`;

const ManageClients = ({ match }) => {
  const projectId = match.params.id;
  const [project, resultProject] = useProjectDetails(projectId);
  const [executeAddClientMutation, res] = useMutation(addClientMutation);
  const [executeMutationCsv, resCsv] = useMutation(importCsvMutation);
  const [executeMutationResendEmail, resResendEmail] = useMutation(
    resendEmailMutation,
  );
  const [executeUpdateProjectClient, resUpdateProjectClient] = useMutation(
    updateProjectClientMutation,
  );
  const [executeRemoveClientMutation, resTrash] = useMutation(
    removeClientMutation,
  );
  // console.log('project', project);

  return (
    <Layout noContainer>
      <Seo title="Manage Clients" description="Invite Your Clients" />
      <Header />
      <Container className="columns">
        <div className="column">
          <Sidebar />
        </div>
        <div className="column is-four-fifths">
          <AdminHeader />
          <AdminSubHeader />
          <MainColumn>
            <Heading>Manage Clients</Heading>
            <Subtitle className="subtitle">Add Client</Subtitle>
            <div>
              <ManageAdminClientForm
                onSubmit={async data => {
                  await executeAddClientMutation({
                    variables: { id: project.id, input: data },
                  });
                  resultProject.refetch();
                }}
              />
              <br />
              {res.error && <Message type="error">{res.error.message}</Message>}
              {resCsv.error && (
                <Message type="error">{resCsv.error.message}</Message>
              )}
              {resResendEmail.error && (
                <Message type="error">{resResendEmail.error.message}</Message>
              )}
              {resUpdateProjectClient.error && (
                <Message type="error">
                  {resUpdateProjectClient.error.message}
                </Message>
              )}
              {resTrash.error && (
                <Message type="error">{resTrash.error.message}</Message>
              )}
              {res.loading ||
              resCsv.loading ||
              resResendEmail.loading ||
              resUpdateProjectClient.loading ||
              resTrash.loading ? (
                <Loading />
              ) : null}

              {/* <p className="import-button">
                <Button
                  secondary
                  paddingless
                  onClick={async () => {
                    // TODO: show file picker then send data
                    alert('Show file picker');
                    // await executeMutationCsv({ variables: {} });
                  }}>
                  Import CSV
                </Button>
              </p> */}
            </div>
            {project.clients && project.clients.length > 0 && (
              <React.Fragment>
                <Subtitle>
                  Manage Clients{' '}
                  <span className="has-text-weight-normal">
                    (Last update {dayjs(project.updatedAt).format('DD-MM-YYYY')}
                    )
                  </span>
                </Subtitle>
                <table className="table is-fullwidth is-hoverable">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Status</th>
                      <th className="has-text-centered">Resend</th>
                      <th className="has-text-centered">Access</th>
                      <th className="has-text-centered">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.clients.map(item => {
                      const clientAccessClass = item.hasAccess
                        ? 'far fa-check-square'
                        : 'far fa-square';

                      return (
                        <tr key={item.id}>
                          <td>{item.email}</td>
                          <td>{startCase(item.status)}</td>
                          <td className="has-text-centered">
                            {item.status === 'accepted' ? (
                              '-'
                            ) : (
                              <Button
                                secondary
                                paddingless
                                onClick={() => {
                                  swal('You want to resend email?', {
                                    buttons: ['Cancel', 'Confirm'],
                                  }).then(async value => {
                                    if (value) {
                                      await executeMutationResendEmail({
                                        variables: {
                                          projectId: project.id,
                                          email: item.email,
                                        },
                                      });
                                      resultProject.refetch();
                                    }
                                  });
                                }}
                              >
                                Resend register email
                              </Button>
                            )}
                          </td>
                          <td className="has-text-centered">
                            <Button
                              secondary
                              paddingless
                              onClick={() => {
                                swal('Are you sure to change client access?', {
                                  buttons: ['Cancel', 'Confirm'],
                                }).then(async value => {
                                  if (value) {
                                    await executeUpdateProjectClient({
                                      variables: {
                                        id: project.id,
                                        input: {
                                          email: item.email,
                                          hasAccess: !item.hasAccess,
                                        },
                                      },
                                    });
                                    resultProject.refetch();
                                  }
                                });
                              }}
                            >
                              <div key={clientAccessClass}>
                                <i className={clientAccessClass}></i>
                              </div>
                            </Button>
                          </td>
                          <td className="has-text-centered">
                            <Button
                              secondary
                              paddingless
                              onClick={() => {
                                swal('Are you confirm to remove this client?', {
                                  buttons: ['Cancel', 'Confirm'],
                                }).then(async value => {
                                  if (value) {
                                    await executeRemoveClientMutation({
                                      variables: {
                                        id: project.id,
                                        clientId: item.id,
                                      },
                                    });
                                    resultProject.refetch();
                                  }
                                });
                              }}
                            >
                              <i className="far fa-trash-alt"></i>
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </React.Fragment>
            )}
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default ManageClients;
