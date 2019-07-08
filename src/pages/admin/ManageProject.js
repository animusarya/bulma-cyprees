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
import CopyRight from '../../components/CopyRight';
import MainColumn from '../../components/MainColumn';
import { Heading, Button, Message, Loading } from '../../components/elements';

const clientProjectsQuery = gql`
  query projects($clientId: ID!) {
    projects(clientId: $clientId) {
      id
      name
      subscriptionAmount
      subscriptionDurationInMonths
      subscriptionStartsAt
      subscriptionEndsAt
    }
  }
`;

const removeProjectClientMutation = gql`
  mutation removeProjectClient($id: ID!, $clientId: ID!) {
    removeProjectClient(id: $id, clientId: $clientId) {
      success
    }
  }
`;

const renewProjectClientMutation = gql`
  mutation renewProjectClient($id: ID!) {
    renewProjectClient(id: $id) {
      id
      subscriptionlastRenewedAt
    }
  }
`;

const Container = styled.div`
  .pound-icon {
    font-size: 0.85rem !important;
  }
`;

const ManageProject = ({ match }) => {
  const [result] = useQuery({
    query: clientProjectsQuery,
    variables: { clientId: match.params.clientId },
  });
  const [resRemove, executeMutationRemove] = useMutation(
    removeProjectClientMutation,
  );
  const [resRenew, executeMutationRenew] = useMutation(
    renewProjectClientMutation,
  );

  return (
    <Layout>
      <Seo title="Dashboard Admin" description="Page description" />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <MainColumn>
            <Heading>Manage Projects</Heading>
            {result.error && (
              <Message type="error">{result.error.message}</Message>
            )}
            {result.fetching && <Loading />}
            {result.data && result.data.projects && (
              <table className="table is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th>Projects</th>
                    <th className="has-text-centered">Plan</th>
                    <th className="has-text-centered">Duration</th>
                    <th className="has-text-centered">Start</th>
                    <th className="has-text-centered">Expires</th>
                    <th>Manage</th>
                    <th>Renew</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {result.data.projects.map(project => (
                    <tr key={project.id}>
                      <td className="has-text-weight-semibold">
                        {project.name}
                      </td>
                      <td className="has-text-centered">
                        <i className="fas fa-pound-sign pound-icon"></i>
                        {project.subscriptionAmount}
                      </td>
                      <td className="has-text-centered">
                        {project.subscriptionDurationInMonths}
                      </td>
                      <td className="has-text-centered">
                        {dayjs(project.subscriptionStartsAt).isValid()
                          ? dayjs(project.subscriptionStartsAt).format(
                              'DD-MM-YYYY',
                            )
                          : null}
                      </td>
                      <td className="has-text-centered">
                        {dayjs(project.subscriptionEndsAt).isValid()
                          ? dayjs(project.subscriptionEndsAt).format(
                              'DD-MM-YYYY',
                            )
                          : '-'}
                      </td>
                      <td>
                        <Button secondary paddingless>
                          MANAGE
                        </Button>
                      </td>
                      <td>
                        <Button
                          secondary
                          paddingless
                          onClick={() => {
                            swal(
                              'Are you sure you want to renew this client?',
                              {
                                buttons: ['Cancel', 'Confirm'],
                              },
                            ).then(async value => {
                              if (value) {
                                await executeMutationRenew({ id: project.id });
                              }
                            });
                          }}>
                          RENEW
                        </Button>
                      </td>
                      <td>
                        <Button
                          secondary
                          paddingless
                          onClick={() => {
                            swal('Are you confirm to delete this item?', {
                              buttons: ['Cancel', 'Confirm'],
                            }).then(async value => {
                              if (value) {
                                await executeMutationRemove({
                                  id: project.id,
                                  clientId: project.clientId,
                                });
                              }
                            });
                          }}>
                          DELETE
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {resRemove.error && (
              <Message type="error">{resRemove.error.message}</Message>
            )}
            {resRenew.error && (
              <Message type="error">{resRenew.error.message}</Message>
            )}
            {resRemove.fetching || resRenew.fetching ? <Loading /> : null}
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default ManageProject;
