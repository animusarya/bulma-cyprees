import React from 'react';
import { useMutation } from 'urql';
import gql from 'graphql-tag';
import swal from 'sweetalert';

import { Button, Title, Message, Loading } from './elements';
import AdminUsersForm from './AdminUsersForm';

const addProjectClientMutation = gql`
  mutation addProjectClient($id: ID!, $input: ProjectClientInput!) {
    addProjectClient(id: $id, input: $input) {
      id
      clients {
        email
      }
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

const AdminUsers = ({ result, executeQuery }) => {
  const [resAdd, executeMutationAdd] = useMutation(addProjectClientMutation);
  const [resRemove, executeMutationRemove] = useMutation(
    removeProjectClientMutation,
  );
  const project = result.data ? result.data.project : {};
  // console.log('AdminUsers', result);

  return (
    <div>
      <Title>Admin Users</Title>
      {resRemove.error && (
        <Message type="error">{resRemove.error.message}</Message>
      )}
      {result.error && <Message type="error">{result.error.message}</Message>}
      <table className="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th className="has-text-left">User</th>
            <th className="has-text-right">Delete</th>
          </tr>
        </thead>
        {result.data && project.clients.length > 0 && (
          <tbody>
            {project.clients.map(item => (
              <tr key={item.id}>
                <td>{item.email}</td>
                <td className="has-text-right">
                  <Button
                    secondary
                    paddingless
                    onClick={() => {
                      swal('Are you sure you want to delete this user?', {
                        buttons: ['Cancel', 'Confirm'],
                      }).then(async value => {
                        if (value) {
                          console.log('item', item);
                          await executeMutationRemove({
                            id: project.id,
                            clientId: item.id,
                          });
                          executeQuery({ requestPolicy: 'network-only' });
                        }
                      });
                    }}>
                    DELETE
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <AdminUsersForm
        onSubmit={async data => {
          await executeMutationAdd({ id: project.id, input: data });
          executeQuery({ requestPolicy: 'network-only' });
        }}
      />
      {resAdd.error && <Message type="error">{resAdd.error.message}</Message>}
      {resAdd.fetching || resRemove.fetching || result.fetching ? (
        <Loading />
      ) : null}
    </div>
  );
};

export default AdminUsers;
