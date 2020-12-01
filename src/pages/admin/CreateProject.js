import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { find, toString } from 'lodash';
import { useStoreActions } from 'easy-peasy';

import Seo from '../../components/Seo';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';
import PaymentForm from '../../components/PaymentForm';
import PaymentConfirmation from '../../components/PaymentConfirmation';
import ProgressBar from '../../components/ProgressBar';
import MainColumn from '../../components/MainColumn';
import ProjectSetupForm from '../../components/ProjectSetupForm';
import { Title, Message, Loading } from '../../components/elements';

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

const createProjectMutation = gql`
  mutation createProject(
    $name: String!
    $slug: String!
    $customDomain: String!
    $subscriptionPlanId: String!
    $billingAddress: Address!
    $card: Card!
    $couponCode: String
  ) {
    createProject(
      input: {
        name: $name
        slug: $slug
        customDomain: $customDomain
        subscriptionPlanId: $subscriptionPlanId
        billingAddress: $billingAddress
        card: $card
        couponCode: $couponCode
      }
    ) {
      id
      name
    }
  }
`;

const CreateProject = () => {
  const [activeStep, setActiveStep] = useState({
    stepOne: true,
    stepTwo: false,
    stepThree: false,
  });
  const [project, setProject] = useState({});
  const [subscription, setSubscription] = useState({});

  const packagesData = useQuery(packagesQuery, {
    fetchPolicy: 'network-only',
  });
  const { packages } = packagesData.data || {};
  const [executeMutationAdd, resAdd] = useMutation(createProjectMutation);
  const updateProject = useStoreActions(
    actions => actions.active.updateProject,
  );

  useEffect(() => {
    updateProject(null);
  }, []);

  return (
    <Layout noContainer>
      <Seo title="Create Project" description="Create New Project" />
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <MainColumn>
            <ProgressBar activeStep={activeStep} />
            {activeStep.stepOne &&
              !activeStep.stepTwo &&
              !activeStep.stepThree && (
                <div className="column is-half">
                  <Title>01 Project Setup</Title>
                  <ProjectSetupForm
                    packages={packages}
                    onSubmit={data => {
                      setProject(data);
                      const selectedSubscription = find(packages, {
                        subscriptionPlanId: data.subscriptionPlanId,
                      });
                      setSubscription(selectedSubscription);
                      setActiveStep({ ...activeStep, stepTwo: true });
                    }}
                  />
                </div>
              )}
            {activeStep.stepOne && activeStep.stepTwo && !activeStep.stepThree && (
              <div className="column">
                <Title>02 Payment</Title>
                <PaymentForm
                  enableReinitialize
                  initialValues={project}
                  subscription={subscription}
                  onSubmit={async data => {
                    const card = {
                      number: toString(data.paymentCardNumber),
                      expMonth: toString(data.paymentCardExpiryMonth),
                      expYear: toString(data.paymentCardExpiryYear),
                      cvc: toString(data.paymentCardCvv),
                    };

                    const inputData = {
                      ...project,
                      card,
                      billingAddress: {
                        country: data.country,
                        addressLine1: data.addressLine1,
                        addressLine2: data.addressLine2,
                        city: data.city,
                        state: data.state,
                        postcode: toString(data.postcode),
                      },
                    };

                    // send success data to server
                    const projectCreated = await executeMutationAdd({
                      variables: inputData,
                    });
                    if (projectCreated.data.createProject) {
                      setProject(projectCreated.data.createProject);
                      setActiveStep({ ...activeStep, stepThree: true });
                    }
                  }}
                />
              </div>
            )}
            {activeStep.stepOne &&
              activeStep.stepTwo &&
              activeStep.stepThree && <PaymentConfirmation project={project} />}
            {resAdd.error && (
              <Message type="error">{resAdd.error.message}</Message>
            )}
            {resAdd.loading ? <Loading /> : null}
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default CreateProject;
