import React from 'react';
import { useMutation } from 'urql';
import gql from 'graphql-tag';

import MainColumn from './MainColumn';
import PaymentForm from './PaymentForm';
import { Title, Message, Loading } from './elements';

const ProjectPaymentMutation = gql`
  mutation createProject(
    $id: ID!
    $name: String!
    $customDomain: String
    $subscriptionAmount: Float
  ) {
    createProject(
      input: {
        id: $id
        name: $name
        customDomain: $customDomain
        subscriptionAmount: $subscriptionAmount
      }
    ) {
      id
      name
      customDomain
      subscriptionAmount
    }
  }
`;

const Payments = () => {
  const [resAdd, executeMutationAdd] = useMutation(ProjectPaymentMutation);
  return (
    <MainColumn>
      <div className="column">
        <Title>02 Payment</Title>
        <PaymentForm onSubmit={data => executeMutationAdd(data)} />
        {resAdd.error && <Message type="error">{resAdd.error.message}</Message>}
        {resAdd.fetching ? <Loading /> : null}
      </div>
    </MainColumn>
  );
};
export default Payments;
