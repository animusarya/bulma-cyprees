import React, { useState } from 'react';
import styled from 'styled-components';
import { find, toString } from 'lodash';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import Seo from '../components/Seo';
import Layout from '../components/Layout';
import PaymentForm from '../components/PaymentForm';
import PaymentConfirmation from '../components/PaymentConfirmation';
import ProgressBarRegister from '../components/ProgressBarRegister';
import MainColumn from '../components/MainColumn';
import { Message, Loading } from '../components/elements';
import RegisterForm from '../components/RegisterForm';
// import RegisterForm from '../components/RegisterForm';
// import logo from '../assets/images/logo2.png';

const Container = styled.div`
  .hero-body {
    align-items: flex-start !important;
    padding: 0 !important;
  }
`;

// const FormContainer = styled.div`
//   padding: 0 3rem;
//   margin-top: 2rem;
//   .navbar-item {
//     display: grid;
//   }
//   h1 {
//     font-size: 2.3rem;
//     margin-top: -1rem;
//   }
//   .navbar {
//     min-height: 1.25rem;
//   }
// `;

// const ContentContainer = styled.div`
//   h2 {
//     font-size: ${(props) => props.theme.fontSizeSuperLarge};
//   }
//   p {
//     margin: 2rem 0;
//   }
//   a {
//     :hover {
//       color: ${(props) => props.theme.primaryColor};
//     }
//   }
// `;

// const Logo = styled.img`
//   max-height: 60px;
//   width: auto;
//   padding-bottom: 1rem;
// `;

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

const registerMutation = gql`
  mutation register($input: RegisterInput) {
    register(input: $input) {
      jwt
      user {
        id
        email
        type
      }
    }
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

const Register = ({ match }) => {
  const [activeStep, setActiveStep] = useState({
    stepOne: true,
    stepTwo: false,
    stepThree: false,
  });

  const [project, setProject] = useState({});

  const [subscription, setSubscription] = useState({});

  const [executeMutationAdd, resAdd] = useMutation(createProjectMutation);
  const [executeMutation, res] = useMutation(registerMutation);
  const { projectId, email } = match.params;
  const isAdminRegister = !projectId;

  console.log(res);

  // const activeProject = useStoreState((state) => state.origin.project);
  const packagesData = useQuery(packagesQuery, {
    fetchPolicy: 'network-only',
  });

  const { packages } = packagesData.data || {};

  console.log(packagesData, 'packagesData');

  // if (res.data && res.data.register) {
  //   const { jwt, user } = res.data.register;
  //   window.localStorage.setItem('token', jwt);
  //   togggleLoggedIn(true);
  //   updateUser(user);
  //   setTimeout(() => {
  //     window.location.replace(
  //       isAdminRegister ? '/admin/dashboard' : '/client/dashboard',
  //     );
  //   }, 1000);
  // }

  return (
    <Layout noContainer>
      <Container>
        <div className="">
          <Seo title="Registration" description="Register Yourself Here" />
          <div className="columns">
            <div className="column">
              <MainColumn>
                <ProgressBarRegister activeStep={activeStep} />
                {activeStep.stepOne &&
                  !activeStep.stepTwo &&
                  !activeStep.stepThree && (
                    <div className="column">
                      <RegisterForm
                        enableReinitialize
                        initialValues={{
                          email: email || '',
                        }}
                        onSubmit={(data) => {
                          executeMutation({
                            variables: {
                              input: {
                                email: data.email,
                                password: data.password,
                                projectId: projectId || undefined,
                                fullName: data.fullName,
                                companyName: data.companyName,
                                telephone: data.telephone,
                              },
                            },
                          });
                          setActiveStep({ ...activeStep, stepTwo: true });
                        }}
                        isAdminRegister={isAdminRegister}
                      />
                    </div>
                  )}
                {activeStep.stepOne &&
                  activeStep.stepTwo &&
                  !activeStep.stepThree && (
                    <div className="column">
                      <PaymentForm
                        enableReinitialize
                        initialValues={project}
                        packages={packages}
                        subscription={subscription}
                        onSubmit={async (data) => {
                          setProject(data);
                          const selectedSubscription = find(packages, {
                            subscriptionPlanId: data.subscriptionPlanId,
                          });
                          setSubscription(selectedSubscription);
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
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Register;
