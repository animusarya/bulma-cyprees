import React from 'react';
import { useMutation } from 'urql';
import gql from 'graphql-tag';

import Seo from '../../components/Seo';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';
import ProjectSetup from '../../components/ProjectSetup';
import Payments from '../../components/Payments';
import PaymentConfirmation from '../../components/PaymentConfirmation';

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

const CreateProject = () => {
  const [resAdd, executeMutationAdd] = useMutation(ProjectSetupMutation);

  return (
    <Layout>
      <Seo title="Dashboard Admin" description="Page description" />
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <ProjectSetup />
          <Payments />
          <PaymentConfirmation />
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default CreateProject;
