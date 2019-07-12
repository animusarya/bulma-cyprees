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

const projectPageQuery = gql`
  query page($id: ID!) {
    page(id: $id) {
      id
      name
      slug
      type
      status
      createdAt
    }
  }
`;

const removeMutation = gql`
  mutation removePage($id: ID!) {
    removePage(id: $id) {
      success
    }
  }
`;

const updatePageMutation = gql`
  mutation updatePage($id: ID!, $input: PageInput!) {
    updatePage(id: $id, input: $input) {
      id
      name
      slug
      type
      status
      createdAt
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
    query: projectPageQuery,
    variables: { id: match.params.id },
  });
  const [resRemove, executeMutationRemove] = useMutation(removeMutation);
  const [resUpdate, executeMutationUpdate] = useMutation(updatePageMutation);

  return (
    <Layout>
      <Seo title="Manage Project" description="Page description" />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <MainColumn>
            <Heading>Manage Project</Heading>
            {result.error && (
              <Message type="error">{result.error.message}</Message>
            )}
            {result.fetching && <Loading />}
            {result.data && result.data.page && (
              <table className="table is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className="has-text-centered">Type</th>
                    <th className="has-text-centered">Status</th>
                    <th className="has-text-centered">Created At</th>
                    <th>edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {result.data.page.map(pageData => (
                    <tr key={pageData.id}>
                      <td className="has-text-weight-semibold">
                        {pageData.name}
                      </td>
                      <td className="has-text-centered">
                        <i className="fas fa-pound-sign pound-icon"></i>
                        {pageData.type}
                      </td>
                      <td className="has-text-centered">{pageData.status}</td>
                      <td className="has-text-centered">
                        {dayjs(pageData.createdAt).isValid()
                          ? dayjs(pageData.createdAt).format('DD-MM-YYYY')
                          : null}
                      </td>
                      <td>
                        <Button
                          secondary
                          paddingless
                          onClick={() => {
                            executeMutationUpdate();
                          }}>
                          EDIT
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
                                  id: pageData.id,
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
            {resUpdate.error && (
              <Message type="error">{resUpdate.error.message}</Message>
            )}
            {resRemove.fetching || resUpdate.fetching ? <Loading /> : null}
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default ManageProject;
