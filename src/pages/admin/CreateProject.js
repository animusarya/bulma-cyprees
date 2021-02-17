import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { find, toString } from 'lodash';
import { useStoreActions } from 'easy-peasy';

import Seo from '../../components/Seo';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
// import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';
import { PaymentForm, ProjectSetupForm } from '../../components/forms';
import PaymentConfirmation from '../../components/PaymentConfirmation';
import ProgressBar from '../../components/ProgressBar';
import MainColumn from '../../components/MainColumn';
import { Message, Loading } from '../../components/elements';

const Section = styled.section`
  padding: 0rem 1.5rem;
`;

const Container = styled.div`
  height: 100vh;
  .title {
    color: ${(props) => props.theme.primaryColor};
    margin-bottom: 0.6rem !important;
  }
`;

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
    $slug: String
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

const meQuery = gql`
  query me {
    me {
      id
      profile {
        websiteAddress
      }
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

  console.log(project, 'project');

  const packagesData = useQuery(packagesQuery, {
    fetchPolicy: 'network-only',
  });
  const { packages } = packagesData.data || {};
  const [executeMutationAdd, resAdd] = useMutation(createProjectMutation);
  const updateProject = useStoreActions(
    (actions) => actions.active.updateProject,
  );
  const meData = useQuery(meQuery, { fetchPolicy: 'cache-and-network' });

  const me =
    meData &&
    meData.data &&
    meData.data.me &&
    meData.data.me.profile &&
    meData.data.me.profile.websiteAddress
      ? meData.data.me.profile.websiteAddress
      : '';

  useEffect(() => {
    updateProject(null);
  }, []);

  return (
    <Layout noContainer>
      <Seo title="Create Project" description="Create New Project" />
      <Header />
      <Section className="section">
        <div className="container">
          <div className="columns">
            {/* <div className="column is-one-fifth">
          <Sidebar />
        </div> */}
            <Container className="column">
              <MainColumn>
                <ProgressBar activeStep={activeStep} />
                {activeStep.stepOne &&
                  !activeStep.stepTwo &&
                  !activeStep.stepThree && (
                    <div className="column">
                      <h2 className="has-text-weight-semibold is-size-4 title">
                        Website Details
                      </h2>
                      <ProjectSetupForm
                        me={me}
                        packages={packages}
                        onSubmit={(data) => {
                          setProject({
                            ...data,
                            customDomain: me,
                          });
                          const selectedSubscription = find(packages, {
                            subscriptionPlanId: data.subscriptionPlanId,
                          });
                          setSubscription(selectedSubscription);
                          setActiveStep({ ...activeStep, stepTwo: true });
                        }}
                      />
                    </div>
                  )}
                {activeStep.stepOne &&
                  activeStep.stepTwo &&
                  !activeStep.stepThree && (
                    <div className="column">
                      <h2 className="has-text-weight-semibold is-size-4 title">
                        Make Payment
                      </h2>
                      <PaymentForm
                        me={me}
                        enableReinitialize
                        initialValues={project}
                        subscription={subscription}
                        onSubmit={async (data) => {
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
                  activeStep.stepThree && (
                    <PaymentConfirmation project={project} />
                  )}
                {resAdd.error && (
                  <Message type="error">{resAdd.error.message}</Message>
                )}
                {resAdd.loading ? <Loading /> : null}
              </MainColumn>
            </Container>
          </div>
        </div>
      </Section>
      <CopyRight />
    </Layout>
  );
};

export default CreateProject;
