import React from 'react';
import { useMutation } from 'urql';
import gql from 'graphql-tag';

import Title from '../../components/elements/Title';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';
import MainColumn from '../../components/MainColumn';
import ProjectSetupForm from '../../components/ProjectSetupForm';

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
    <Layout>
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <MainColumn>
            <div className="column is-half">
              <Title>01 Project Setup</Title>
              <ProjectSetupForm />
            </div>
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default ProjectSetup;
