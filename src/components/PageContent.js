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

const PageContent = () => {
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
      <p>TODO: SHOW BIG CONTENT TEXT AREA HERE</p>
    </Container>
  );
};

export default PageContent;
