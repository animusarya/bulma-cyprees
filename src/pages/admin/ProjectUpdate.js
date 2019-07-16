import React, { useState } from 'react';
import { useQuery, useMutation } from 'urql';
import gql from 'graphql-tag';
import { find } from 'lodash';
import { useStoreActions } from 'easy-peasy';

import Seo from '../../components/Seo';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';
import PaymentForm from '../../components/PaymentForm';
import PaymentConfirmation from '../../components/PaymentConfirmation';
import MainColumn from '../../components/MainColumn';
import ProjectSetupForm from '../../components/ProjectSetupForm';
import { Title, Message, Loading } from '../../components/elements';

const packagesQuery = gql`
  query packages {
    packages {
      id
      name
      durationInMonths
      price
    }
  }
`;

const createProjectMutation = gql`
  mutation createProject(
    $name: String!
    $slug: String!
    $customDomain: String!
    $subscriptionId: String!
    $billingAddress: Address!
  ) {
    createProject(
      input: {
        name: $name
        slug: $slug
        customDomain: $customDomain
        subscriptionId: $subscriptionId
        billingAddress: $billingAddress
      }
    ) {
      id
      name
    }
  }
`;

const ProjectUpdate = () => {
  const [setActiveStep] = useState(1);
  const [project, setProject] = useState({});
  const [subscription, setSubscription] = useState({});
  const [packagesData] = useQuery({
    query: packagesQuery,
  });
  const { packages } = packagesData.data || {};
  const [resAdd, executeMutationAdd] = useMutation(createProjectMutation);
  const updateProject = useStoreActions(
    actions => actions.active.updateProject,
  );
  updateProject(null);
  // console.log('CreateProject', subscription);

  return (
    <Layout>
      <Seo title="Project Update" description="Update Your Projects" />
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <MainColumn>
            <div className="column is-half">
              <Title>01 Project Update</Title>
              <ProjectSetupForm
                packages={packages}
                onSubmit={data => {
                  setProject({ ...data });
                  setSubscription(find(packages, { id: data.subscriptionId }));
                  setActiveStep(2);
                }}
              />
            </div>
            <div className="column">
              <Title>02 Payment</Title>
              <PaymentForm
                enableReinitialize
                initialValues={project}
                subscription={subscription}
                onSubmit={async data => {
                  const inputData = {
                    ...project,
                    billingAddress: {
                      country: data.country,
                      addressLine1: data.addressLine1,
                      addressLine2: data.addressLine2,
                      city: data.city,
                      state: data.state,
                      postcode: data.postcode,
                    },
                  };
                  // console.log('newData', inputData);

                  // TODO: send card details to stripe

                  // send success data to server
                  const projectCreated = await executeMutationAdd(inputData);

                  setActiveStep(3);
                  setProject(projectCreated);
                }}
              />
            </div>
            <PaymentConfirmation project={project} />
            {resAdd.error && (
              <Message type="error">{resAdd.error.message}</Message>
            )}
            {resAdd.fetching ? <Loading /> : null}
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default ProjectUpdate;
