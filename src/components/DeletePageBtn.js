import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import swal from 'sweetalert';
import { withRouter } from 'react-router';

import { Button, Message, Loading } from './elements';

const removePageMutation = gql`
  mutation removePage($id: ID!) {
    removePage(id: $id) {
      success
    }
  }
`;

const DeletePageBtn = ({ history, match }) => {
  const [executePageRemoveMutation, resRemove] = useMutation(
    removePageMutation,
  );

  const { id, pageId } = match.params;

  return (
    <div className="is-pulled-right	">
      {resRemove.error && (
        <Message type="error">{resRemove.error.message}</Message>
      )}
      {resRemove.loading ? <Loading /> : null}
      <Button
        onClick={() => {
          swal('Are you confirm to delete this item?', {
            buttons: ['Cancel', 'Confirm'],
          }).then(async value => {
            if (value) {
              await executePageRemoveMutation({
                variables: {
                  id: pageId,
                },
              });
              // redirect back to project page
              history.push(`/admin/project/${id}`);
            }
          });
        }}>
        Delete Page
      </Button>
    </div>
  );
};

export default withRouter(DeletePageBtn);
