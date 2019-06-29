import React from 'react';
import { useQuery, useMutation } from 'urql';
import gql from 'graphql-tag';
import swal from 'sweetalert';

import { Button, Title, Message, Loading } from './elements';
import AdminUsersForm from './AdminUsersForm';

const adminUserQuery = gql`
  query AdminUsers {
    project {
      id
      clients {
        email
      }
    }
  }
`;

const adminUserMutation = gql`
  mutation addProjectClient($email: String!) {
    addProjectClient(input: { email: $email }) {
      id
      clients {
        email
      }
    }
  }
`;

const removeUserMutation = gql`
  mutation removeUser($id: ID!) {
    removeUser(id: $id) {
      success
    }
  }
`;

const AdminUsers = () => {
  const [resAdd, executeMutationAdd] = useMutation(adminUserMutation);
  const [resRemove, executeMutationRemove] = useMutation(removeUserMutation);
  const [result, executeQuery] = useQuery({
    query: adminUserQuery,
  });
  return (
    <div>
      <Title>Admin Users</Title>
      <table className="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th className="has-text-left">User</th>
            <th className="has-text-right">Delete</th>
          </tr>
        </thead>
        {resRemove.error && (
          <Message type="error">{resRemove.error.message}</Message>
        )}
        {result.error && <Message type="error">{result.error.message}</Message>}
        {result.data && result.data.project.length > 0 && (
          <tbody>
            {result.data.project.map(item => (
              <tr key={item.id}>
                <td>{item.email}</td>
                <td>{}</td>
                <td className="has-text-right">
                  <Button
                    secondary
                    paddingless
                    onClick={() => {
                      swal('Are you sure you want to delete this user?', {
                        buttons: ['Cancel', 'Confirm'],
                      }).then(async value => {
                        if (value) {
                          await executeMutationRemove({ id: item.id });
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
          await executeMutationAdd(data);
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
