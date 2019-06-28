import React from 'react';
import { useMutation } from 'urql';
import gql from 'graphql-tag';

const ProjectSetupMutation = gql`
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

const AccountCreated = () => {
  const [resAdd, executeMutationAdd] = useMutation(ProjectSetupMutation);

  return (
    <div>
      <p>project fields here</p>
    </div>
  );
};

export default AccountCreated;
