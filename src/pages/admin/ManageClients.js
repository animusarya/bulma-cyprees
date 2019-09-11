import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from 'urql';
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
import {
  Heading,
  Subtitle,
  Button,
  Message,
  Loading,
} from '../../components/elements';
import ManageAdminClientForm from '../../components/ManageAdminClientForm';

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

const noftifyMutation = gql`
  mutation notify($email: String!) {
    notify(email: $email) {
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
  const [resultProject, executeQuery] = useQuery({
    query: projectQuery,
    variables: { id: match.params.id },
    requestPolicy: 'network-only',
  });
  // console.log('resultProject', project);
  const [res, executeAddClientMutation] = useMutation(addClientMutation);
  const [resCsv, executeMutationCsv] = useMutation(importCsvMutation);
  const [resNotify, executeMutationNotify] = useMutation(noftifyMutation);
  const [resResendEmail, executeMutationResendEmail] = useMutation(
    resendEmailMutation,
  );
  const [resCheck, executeMutationCheck] = useMutation(checkMutation);
  const [resTrash, executeRemoveClientMutation] = useMutation(
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
                onSubmit={data =>
                  executeAddClientMutation({ id: project.id, input: data })
                }
              />
              {res.error && <Message type="error">{res.error.message}</Message>}
              {resCsv.error && (
                <Message type="error">{resCsv.error.message}</Message>
              )}
              {resNotify.error && (
                <Message type="error">{resNotify.error.message}</Message>
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
              {res.fetching ||
              resCsv.fetching ||
              resNotify.fetching ||
              resResendEmail.fetching ||
              resCheck.fetching ||
              resTrash.fetching ? (
                <Loading />
              ) : null}
              <p className="import-button">
                <Button
                  secondary
                  paddingless
                  onClick={async () => {
                    // TODO: show file picker then send data
                    alert('Show file picker');
                    await executeMutationCsv();
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
                                    projectId: project.id,
                                    email: item.email,
                                  });
                                  executeQuery({
                                    requestPolicy: 'network-only',
                                  });
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
                                  await executeMutationCheck({ id: item.id });
                                  executeQuery({
                                    requestPolicy: 'network-only',
                                  });
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
                                    id: project.id,
                                    clientId: item.id,
                                  });
                                  executeQuery({
                                    requestPolicy: 'network-only',
                                  });
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
            {/* <div className="notify-title">
              <Subtitle>Clients Tools</Subtitle>
              <Button
                onClick={() => {
                  swal('Are you sure to notify all clients?', {
                    buttons: ['Cancel', 'Confirm'],
                  }).then(async value => {
                    if (value) {
                      await executeMutationNotify();
                    }
                  });
                }}>
                Notify All Clients
              </Button>
            </div> */}
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};
export default ManageClients;
