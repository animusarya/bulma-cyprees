import React, { useState } from "react";
import { useQuery, useMutation } from "urql";
import gql from "graphql-tag";
import { find, toString } from "lodash";
import { useStoreActions } from "easy-peasy";

import stripe from "../../utils/stripe";
import Seo from "../../components/Seo";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import CopyRight from "../../components/CopyRight";
import PaymentForm from "../../components/PaymentForm";
import PaymentConfirmation from "../../components/PaymentConfirmation";
import ProgressBar from "../../components/ProgressBar";
import MainColumn from "../../components/MainColumn";
import ProjectSetupForm from "../../components/ProjectSetupForm";
import { Title, Message, Loading } from "../../components/elements";

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
  ) {
    createProject(
      input: {
        name: $name
        slug: $slug
        customDomain: $customDomain
        subscriptionPlanId: $subscriptionPlanId
        billingAddress: $billingAddress
        card: $card
      }
    ) {
      id
      name
    }
  }
`;

const CreateProject = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [project, setProject] = useState({});
  const [subscription, setSubscription] = useState({});
  const [packagesData] = useQuery({
    query: packagesQuery
  });
  const { packages } = packagesData.data || {};
  const [resAdd, executeMutationAdd] = useMutation(createProjectMutation);
  const updateProject = useStoreActions(
    actions => actions.active.updateProject
  );
  updateProject(null);
  console.log("CreateProject", packages, subscription);

  return (
    <Layout>
      <Seo title="Create Project" description="Create New Project" />
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <MainColumn>
            <ProgressBar activeStep={activeStep} />
            {activeStep === 1 && (
              <div className="column is-half">
                <Title>01 Project Setup</Title>
                <ProjectSetupForm
                  packages={packages}
                  onSubmit={data => {
                    setProject({ ...data });
                    setSubscription(
                      find(packages, {
                        subscriptionPlanId: data.subscriptionPlanId
                      })
                    );
                    setActiveStep(2);
                  }}
                />
              </div>
            )}
            {activeStep === 2 && (
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
                      cvc: toString(data.paymentCardCvv)
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
                        postcode: data.postcode
                      }
                    };

                    // send success data to server
                    const projectCreated = await executeMutationAdd(inputData);
                    console.log("projectCreated", projectCreated);
                    if (projectCreated.data.createProject) {
                      setActiveStep(3);
                      setProject(projectCreated);
                    }
                  }}
                />
              </div>
            )}
            {activeStep === 3 && <PaymentConfirmation project={project} />}
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

export default CreateProject;
