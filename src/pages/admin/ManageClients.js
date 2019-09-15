import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import swal from 'sweetalert';
import dayjs from 'dayjs';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import AdminHeader from '../../components/AdminHeader';
import ManageAdminClientForm from '../../components/ManageAdminClientForm';
import {
  Heading,
  Subtitle,
  Button,
  Message,
  Loading,
} from '../../components/elements';

const projectQuery = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      name
      slug
      updatedAt
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

const checkMutation = gql`
  mutation check($email: String!) {
    check(email: $email) {
      success
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
  button {
    color: ${props => props.theme.primaryColor};
    border-color: ${props => props.theme.primaryColor};
    :hover {
      color: ${props => props.theme.primaryColor};
      border-color: ${props => props.theme.primaryColor};
    }
  }
  input {
    border-color: ${props => props.theme.primaryColor};
    border-radius: 0px;
    :hover {
      border-color: ${props => props.theme.primaryColor};
    }
  }
  .kzCdMG {
    margin-bottom: 3%;
  }
  .notify-title {
    margin-top: 5%;
  }
`;

const ManageClients = ({ match }) => {
  // fetch project data from api
  const resultProject = useQuery(projectQuery, {
    variables: { id: match.params.id },
    fetchPolicy: 'cache-and-network',
  });
  const [executeAddClientMutation, res] = useMutation(addClientMutation);
  const [executeMutationCsv, resCsv] = useMutation(importCsvMutation);
  const [executeMutationResendEmail, resResendEmail] = useMutation(
    resendEmailMutation,
  );
  const [executeMutationCheck, resCheck] = useMutation(checkMutation);
  const [executeRemoveClientMutation, resTrash] = useMutation(
    removeClientMutation,
  );

  const project =
    resultProject.data && resultProject.data.project
      ? resultProject.data.project
      : {};
  // console.log("resultProject clients", project);

  return (
    <Layout>
      <Seo title="Manage Clients" description="Invite Your Clients" />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <AdminHeader project={project} />
          <MainColumn>
            <Heading>Project Clients</Heading>
            <Subtitle className="subtitle">Add Client</Subtitle>
            <div className="field is-grouped">
              <ManageAdminClientForm
                onSubmit={async data => {
                  await executeAddClientMutation({
                    variables: { id: project.id, input: data },
                  });
                  resultProject.refetch();
                }}
              />
              {res.error && <Message type="error">{res.error.message}</Message>}
              {resCsv.error && (
                <Message type="error">{resCsv.error.message}</Message>
              )}
              {resResendEmail.error && (
                <Message type="error">{resResendEmail.error.message}</Message>
              )}
              {resCheck.error && (
                <Message type="error">{resCheck.error.message}</Message>
              )}
              {resTrash.error && (
                <Message type="error">{resTrash.error.message}</Message>
              )}
              {res.loading ||
              resCsv.loading ||
              resResendEmail.loading ||
              resCheck.loading ||
              resTrash.loading ? (
                <Loading />
              ) : null}
              <p className="import-button">
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
              </p>
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
                      <th className="has-text-centered">Notify Status </th>
                      <th className="has-text-centered">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.clients.map(item => (
                      <tr key={item.id}>
                        <td>{item.email}</td>
                        <td>{item.status}</td>
                        <td className="has-text-centered">
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
                            }}>
                            Resend Register Email
                          </Button>
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
                                  await executeMutationCheck({
                                    variables: { id: item.id },
                                  });
                                  resultProject.refetch();
                                }
                              });
                            }}>
                            <i className="far fa-check-square"></i>
                          </Button>
                        </td>
                        <td className="has-text-centered">
                          {item.notifyStatus}
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
                            }}>
                            <i className="far fa-trash-alt"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
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
