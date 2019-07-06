import React from 'react';
import { useMutation } from 'urql';
import gql from 'graphql-tag';

import MainColumn from './MainColumn';
import ProjectSetupForm from './ProjectSetupForm';
import { Title, Message, Loading } from './elements';

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

const ProjectSetup = () => {
  const [resAdd, executeMutationAdd] = useMutation(ProjectSetupMutation);

  return (
    <MainColumn>
      <div className="column is-half">
        <Title>01 Project Setup</Title>
        <ProjectSetupForm onSubmit={data => executeMutationAdd(data)} />
        {resAdd.error && <Message type="error">{resAdd.error.message}</Message>}
        {resAdd.fetching ? <Loading /> : null}
      </div>
    </MainColumn>
  );
};

export default ProjectSetup;
