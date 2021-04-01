import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';

import { formatCurrency } from '../utils/helpers';
import { Heading, Button, Message, Loading } from './elements';

const packagesQuery = gql`
  query packages {
    packages {
      id
      subscriptionPlanId
      name
      durationInMonths
      price
    }
  }
`;

const cancelSubscriptionMutation = gql`
  mutation cancelSubscription($id: ID!) {
    cancelSubscription(id: $id) {
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

const Subscription = ({ project, history }) => {
  const [subscriptionPlanId, setSubscriptionPlanId] = useState('');

  const packagesData = useQuery(packagesQuery, {
    fetchPolicy: 'cache-and-network',
  });
  const [executeCancelMutation, resCancel] = useMutation(
    cancelSubscriptionMutation,
  );
  const [executeRenewMutation, resRenew] = useMutation(
    renewSubscriptionMutation,
  );

  const { packages } = packagesData.data || {};

  return (
    <div>
      {project.status === 'active' ? (
        <>
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
                <td>{formatCurrency(project.subscriptionAmount)}</td>
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
              }).then(async (willDelete) => {
                if (willDelete) {
                  const { data } = await executeCancelMutation({
                    variables: { id: project.id },
                  });

                  if (data.cancelSubscription.success) {
                    history.push('/admin/dashboard');
                  }
                }
              });
            }}>
            Cancel Subscription
          </Button>
        </>
      ) : (
        <>
          <Heading>Renew subscription for {project.name}</Heading>

          <Button
            secondary
            disabled={subscriptionPlanId === ''}
            onClick={() => {
              swal({
                title: 'Are you sure to renew this subscription?',
                icon: 'confirm',
                buttons: true,
                dangerMode: true,
              }).then(async (willDelete) => {
                if (willDelete) {
                  const { data } = await executeRenewMutation({
                    variables: { id: project.id, subscriptionPlanId },
                  });
                  if (data.renewSubscription.success) {
                    history.push('/admin/dashboard');
                  }
                }
              });
            }}>
            Renew Subscription
          </Button>
        </>
      )}

      {resCancel.error && (
        <Message type="error">{resCancel.error.message}</Message>
      )}
      {resRenew.error && (
        <Message type="error">{resRenew.error.message}</Message>
      )}
      {resCancel.loading || resRenew.loading ? <Loading /> : null}
    </div>
  );
};

export default withRouter(Subscription);
