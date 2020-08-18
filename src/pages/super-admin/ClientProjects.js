import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import { Heading, Message, Loading, Button } from '../../components/elements';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';

const userQuery = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      email
    }
  }
`;

const clientProjectsQuery = gql`
  query projects($clientId: ID!) {
    projects(clientId: $clientId) {
      id
      name
      subscriptionAmount
      subscriptionDurationInMonths
      subscriptionStartsAt
      subscriptionEndsAt
      subscriptionPlanId
      status
    }
  }
`;

const removeProjectMutation = gql`
  mutation removeProject($id: ID!) {
    removeProject(id: $id) {
      success
    }
  }
`;

const renewSubscriptionMutation = gql`
  mutation renewSubscription($id: ID!, $subscriptionPlanId: String!) {
    renewSubscription(id: $id, subscriptionPlanId: $subscriptionPlanId) {
      success
    }
  }
`;

const Container = styled.div`
  .pound-icon {
    font-size: 0.85rem !important;
  }
`;

const LinkWrapper = styled(Link)`
  color: ${props => props.theme.primaryColor};
  :hover {
    color: ${props => props.theme.primaryColor};
  }
`;

const ProjectsClient = ({ match }) => {
  const resultUser = useQuery(userQuery, {
    variables: { id: match.params.clientId },
    fetchPolicy: 'cache-and-network',
  });
  const result = useQuery(clientProjectsQuery, {
    variables: { clientId: match.params.clientId },
    fetchPolicy: 'cache-and-network',
  });
  const [executeMutationRemove, resRemove] = useMutation(removeProjectMutation);
  const [executeMutationRenew, resRenew] = useMutation(
    renewSubscriptionMutation,
  );
  const user = resultUser.data ? resultUser.data.user : {};
  // console.log('clientId', resultUser);

  return (
    <Layout>
      <Seo title="Client Projects" description="Manage User's Project" />
      <Header />
      <Container className="columns">
        <div className="column">
          <Sidebar />
        </div>
        <div className="column is-four-fifths">
          <MainColumn>
            <Heading>Users &gt; {user.email}</Heading>
            {result.error && (
              <Message type="error">{result.error.message}</Message>
            )}
            {result.loading && <Loading />}
            {result.data && result.data.projects && (
              <table className="table is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th>Projects</th>
                    <th>Plan</th>
                    <th>Duration</th>
                    <th>Started on</th>
                    <th>Manage</th>
                    <th>Renew</th>
                    <th>Delete</th>
                    <th>Export</th>
                  </tr>
                </thead>
                <tbody>
                  {result.data.projects.map(project => (
                    <tr key={project.id}>
                      <td>
                        <strong>{project.name}</strong>
                      </td>
                      <td>£{project.subscriptionAmount}</td>
                      <td>{project.subscriptionDurationInMonths} months</td>
                      <td>
                        {dayjs(project.subscriptionStartsAt).isValid()
                          ? dayjs(project.subscriptionStartsAt).format(
                              'DD-MM-YYYY',
                            )
                          : null}
                      </td>
                      <td className="is-uppercase actions">
                        <LinkWrapper
                          to={`/super-admin/client/${match.params.clientId}/project/${project.id}/info`}>
                          manage{' '}
                        </LinkWrapper>
                      </td>
                      <td className="is-uppercase actions">
                        <Button
                          secondary
                          disabled={project.disabled !== 'active'}
                          paddingless
                          onClick={() => {
                            swal(
                              'Are you sure you want to renew this client?',
                              {
                                buttons: ['Cancel', 'Confirm'],
                              },
                            ).then(async value => {
                              if (value) {
                                await executeMutationRenew({
                                  id: project.id,
                                  subscriptionPlanId:
                                    project.subscriptionPlanId,
                                });
                              }
                            });
                          }}>
                          RENEW
                        </Button>
                      </td>
                      <td className="is-uppercase actions">
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
                                result.refetch();
                              }
                            });
                          }}>
                          DELETE
                        </Button>
                      </td>
                      <td className="is-uppercase actions">
                        <Button
                          secondary
                          paddingless
                          onClick={() => {
                            // swal('Are you confirm to delete this item?', {
                            //   buttons: ['Cancel', 'Confirm'],
                            // }).then(async value => {
                            //   if (value) {
                            //     await executeMutationRemove({ id: project.id });
                            //   }
                            // });
                          }}>
                          EXPORT
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
            {resRemove.loading || resRenew.loading ? <Loading /> : null}
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default ProjectsClient;
