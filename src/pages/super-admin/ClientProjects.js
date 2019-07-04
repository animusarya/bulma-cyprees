import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from 'urql';
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

const LinkWrapper = styled(Link)`
  color: ${props => props.theme.primaryColor};
  :hover {
    color: ${props => props.theme.primaryColor};
  }
`;

const ProjectsClient = ({ match }) => {
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
  // console.log('clientId', match.params.clientId);

  return (
    <Layout>
      <Seo title="Projects Clients " description="Page description" />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <MainColumn>
            <Heading>Clients &gt; rob@colliers.com</Heading>
            {result.error && (
              <Message type="error">{result.error.message}</Message>
            )}
            {result.fetching && <Loading />}
            {result.data && result.data.projects && (
              <table className="table is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th>Projects</th>
                    <th>Plan</th>
                    <th>Duration</th>
                    <th>Start</th>
                    <th>Expires</th>
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
                      <td>
                        <i className="fas fa-pound-sign pound-icon"></i>
                        {project.subscriptionAmount}
                      </td>
                      <td>{project.subscriptionDurationInMonths}</td>
                      <td>
                        {dayjs(project.subscriptionStartsAt).isValid()
                          ? dayjs(project.subscriptionStartsAt).format(
                              'DD-MM-YYYY',
                            )
                          : null}
                      </td>
                      <td>
                        {dayjs(project.subscriptionEndsAt).isValid()
                          ? dayjs(project.subscriptionEndsAt).format(
                              'DD-MM-YYYY',
                            )
                          : '-'}
                      </td>
                      <td className="is-uppercase actions">
                        <LinkWrapper
                          to={`/super-admin/project/info/${project.id}`}>
                          manage{' '}
                        </LinkWrapper>
                      </td>
                      <td className="is-uppercase actions">
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
            {resRemove.fetching || resRenew.fetching ? <Loading /> : null}
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default ProjectsClient;
