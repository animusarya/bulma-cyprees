import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from 'urql';
import gql from 'graphql-tag';
import swal from 'sweetalert';

import { Title, Button, Message, Loading } from './elements';

// TODO: fix these mutations and queries when available

const Query = gql`
  {
    discounts {
      id
      name
      code
      percentage
    }
  }
`;

const removeMutation = gql`
  mutation removeDiscount($id: ID!) {
    removeDiscount(id: $id) {
      success
    }
  }
`;

const delMutation = gql`
  mutation removeDiscount($id: ID!) {
    removeDiscount(id: $id) {
      success
    }
  }
`;

const syncMutation = gql`
  mutation removeDiscount($id: ID!) {
    removeDiscount(id: $id) {
      success
    }
  }
`;

const sortMutation = gql`
  mutation removeDiscount($id: ID!) {
    removeDiscount(id: $id) {
      success
    }
  }
`;

const Container = styled.div`
  .columns {
    display: flex;
  }
`;
const ProjectsProperty = () => {
  const [resRemove, executeMutationRemove] = useMutation(removeMutation);
  const [resDel, executeMutationDel] = useMutation(delMutation);
  const [resSync, executeMutationSync] = useMutation(syncMutation);
  const [resSort, executeMutationSort] = useMutation(sortMutation);
  const [result, executeQuery] = useQuery({
    query: Query,
  });

  return (
    <Container>
      <div className="columns">
        <div className="column">
          <Title>Property</Title>
        </div>
        <div className="column is-one-fifth">
          <Button
            onClick={() => {
              swal('Are you confirm to delete this item?', {
                buttons: ['Cancel', 'Confirm'],
              }).then(async value => {
                if (value) {
                  await executeMutationRemove();
                  executeQuery({ requestPolicy: 'network-only' });
                }
              });
            }}>
            Delete Tab
          </Button>
        </div>
      </div>
      <div>Drag and drop</div>
      {resDel.error && <Message type="error">{resDel.error.message}</Message>}
      {resRemove.error && (
        <Message type="error">{resRemove.error.message}</Message>
      )}
      {result.error && <Message type="error">{result.error.message}</Message>}
      {resSync.error && <Message type="error">{resSync.error.message}</Message>}
      {resSort.error && <Message type="error">{resSort.error.message}</Message>}
      {resDel.fetching ||
        resRemove.fetching ||
        result.fetching ||
        resSync.fetching ||
        resSort.fetching ? (
          <Loading />
        ) : null}
      {result.data && result.data.discounts.length > 0 && (
        <table className="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th className="has-text-centered">Sort</th>
              <th>Name</th>
              <th className="has-text-centered">File Type</th>
              <th className="has-text-centered">Section</th>
              <th className="has-text-centered">Uploaded</th>
              <th className="has-text-centered">Replace</th>
              <th className="has-text-centered">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="has-text-centered">
                <Button
                  secondary
                  paddingless
                  onClick={() => {
                    swal('Are you confirm to delete this item?', {
                      buttons: ['Cancel', 'Confirm'],
                    }).then(async value => {
                      if (value) {
                        await executeMutationSort();
                        executeQuery({ requestPolicy: 'network-only' });
                      }
                    });
                  }}>
                  <i className="far fa-hand-pointer"></i>
                </Button>
              </td>
              <td>Sale details</td>
              <td className="has-text-centered is-uppercase">pdf</td>
              <td className="has-text-centered">3 days ago</td>
              <td className="has-text-centered"> 5 June 2019 - 12:30pm</td>
              <td className="has-text-centered">
                <Button
                  secondary
                  paddingless
                  onClick={() => {
                    swal('Are you confirm to delete this item?', {
                      buttons: ['Cancel', 'Confirm'],
                    }).then(async value => {
                      if (value) {
                        await executeMutationSync();
                        executeQuery({ requestPolicy: 'network-only' });
                      }
                    });
                  }}>
                  <i className="fas fa-sync-alt"></i>
                </Button>
              </td>
              <td className="has-text-centered">
                <Button
                  secondary
                  paddingless
                  onClick={() => {
                    swal('Are you confirm to delete this item?', {
                      buttons: ['Cancel', 'Confirm'],
                    }).then(async value => {
                      if (value) {
                        await executeMutationDel();
                        executeQuery({ requestPolicy: 'network-only' });
                      }
                    });
                  }}>
                  <i className="far fa-trash-alt"></i>
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </Container>
  );
};

export default ProjectsProperty;
