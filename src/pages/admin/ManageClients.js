import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from 'urql';
import gql from 'graphql-tag';
import swal from 'sweetalert';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import AdminHeader from '../../components/AdminHeader';
import {
  Title,
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

// TODO: fix these queries when available with API

const addClientMutation = gql`
  mutation addClient($email: String!) {
    addClient(email: $email) {
      id
      email
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
  mutation resendEmail($email: String!) {
    resendEmail(email: $email) {
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

const trashMutation = gql`
  mutation trashMutation($email: String!) {
    trashMutation(email: $email) {
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
  });
  // console.log('resultProject', project);
  const [res, executeMutation] = useMutation(addClientMutation);
  const [resCsv, executeMutationCsv] = useMutation(importCsvMutation);
  const [resNotify, executeMutationNotify] = useMutation(noftifyMutation);
  const [resResendEmail, executeMutationResendEmail] = useMutation(
    resendEmailMutation,
  );
  const [resCheck, executeMutationCheck] = useMutation(checkMutation);
  const [resTrash, executeMutationTrash] = useMutation(trashMutation);

  const project =
    resultProject.data && resultProject.data.project
      ? resultProject.data.project
      : {};
  console.log('resultProject clients', project);

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
            <Title>Clients</Title>
            <Subtitle className="subtitle">Add Client</Subtitle>
            <div className="field is-grouped">
              <ManageAdminClientForm onSubmit={data => executeMutation(data)} />
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
                  onClick={() => {
                    swal('Are you want to import details?', {
                      buttons: ['Cancel', 'Confirm'],
                    }).then(async value => {
                      if (value) {
                        await executeMutationCsv();
                      }
                    });
                  }}>
                  Import CSV
                </Button>
              </p>
            </div>
            <div className="notify-title">
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
            </div>
            <Subtitle>
              Manage Clients{' '}
              <span className="has-text-weight-normal">
                (Last update 12 Feb 2019)
              </span>
            </Subtitle>
            {project.clients && project.clients.length > 0 && (
              <table className="table is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th>Name</th>
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
                      <td>Janathan</td>
                      <td>j@designcity.co.uk</td>
                      <td>Pending</td>
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
                                  id: item.id,
                                });
                                executeQuery({ requestPolicy: 'network-only' });
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
                                executeQuery({ requestPolicy: 'network-only' });
                              }
                            });
                          }}>
                          <i className="far fa-check-square"></i>
                        </Button>
                      </td>
                      <td className="has-text-centered">Opted Out</td>
                      <td className="has-text-centered">
                        <Button
                          secondary
                          paddingless
                          onClick={() => {
                            swal('Are you confirm to delete this item?', {
                              buttons: ['Cancel', 'Confirm'],
                            }).then(async value => {
                              if (value) {
                                await executeMutationTrash({ id: item.id });
                                executeQuery({ requestPolicy: 'network-only' });
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
            )}
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};
export default ManageClients;
