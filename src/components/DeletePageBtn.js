import React from 'react';
import { useMutation } from 'urql';
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

const DeletePageBtn = ({ pageId, projectId, history }) => {
  const [resRemove, executePageRemoveMutation] = useMutation(
    removePageMutation,
  );

  return (
    <React.Fragment>
      {resRemove.error && (
        <Message type="error">{resRemove.error.message}</Message>
      )}
      {resRemove.fetching ? <Loading /> : null}
      <Button
        onClick={() => {
          swal('Are you confirm to delete this item?', {
            buttons: ['Cancel', 'Confirm'],
          }).then(async value => {
            if (value) {
              await executePageRemoveMutation({
                id: pageId,
              });
              // redirect back to project page
              history.push(`/admin/project/${projectId}/pages`);
            }
          });
        }}>
        Delete Page
      </Button>
    </React.Fragment>
  );
};

export default withRouter(DeletePageBtn);
