import React from 'react';
import { useMutation } from 'urql';
import gql from 'graphql-tag';
import swal from 'sweetalert';

import { Heading, Button, Message, Loading } from './elements';

const cancelSubscriptionMutation = gql`
  mutation cancelSubscription($id: ID!) {
    cancelSubscription(id: $id) {
      success
    }
  }
`;

const Subscription = ({ project }) => {
  const [res, executeMutation] = useMutation(cancelSubscriptionMutation);
  return (
    <div>
      <Heading>Current Subscription</Heading>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{project.subscriptionName}</td>
            <td>{project.subscriptionDurationInMonths}</td>
            <td>{project.subscriptionAmount}</td>
          </tr>
        </tbody>
      </table>
      <Button
        onClick={() => {
          swal({
            title: 'Are you sure to cancel this subscription?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
          }).then(willDelete => {
            if (willDelete) {
              executeMutation({ id: project.id });
            }
          });
        }}>
        Cancel Subscription
      </Button>
      {res.error && <Message type="error">{res.error.message}</Message>}
      {res.fetching ? <Loading /> : null}
    </div>
  );
};

export default Subscription;
