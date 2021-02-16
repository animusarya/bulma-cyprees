import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { useStoreActions, useStoreState } from 'easy-peasy';
import gql from 'graphql-tag';
import swal from 'sweetalert';
import { isEmpty } from 'lodash';

import useProjectGuestDetails from '../hooks/useProjectGuestDetails';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import { Message } from '../components/elements';
import { ForgotPasswordForm } from '../components/forms';
// import logo from '../assets/images/logo2.png';

const forgotPasswordMutation = gql`
  mutation forgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      success
    }
  }
`;

const Container = styled.div`
  .forgot-password-page {
    width: 52%;
    margin-right: auto;
    margin-left: auto;
    @media only screen and (max-width: 768px) {
      width: 100%;
    }
  }
  .hero-body {
    align-items: flex-start !important;
    padding: 0 !important;
  }
  .navbar {
    min-height: 1.25rem;
  }
`;

const FormContainer = styled.div`
  padding: 0 3rem;
  margin-top: 2rem;
  .navbar-item {
    display: grid;
  }
  h1 {
    font-size: 2.3rem;
    margin-top: -1rem;
  }
`;

const ContentContainer = styled.div`
  margin-bottom: 32px;
  h2 {
    font-size: ${(props) => props.theme.fontSizeSuperLarge};
    color: ${(props) => props.theme.primaryColor};
  }
  p {
    margin: 2rem 0;
  }
  a {
    :hover {
      color: ${(props) => props.theme.primaryColor};
    }
  }
  .project {
    padding-right: 5px;
  }
`;

const Logo = styled.img`
  max-height: 60px;
  width: auto;
  padding-bottom: 1rem;
`;

const ForgotPassword = ({ match }) => {
  const [executeMutation, res] = useMutation(forgotPasswordMutation);
  const updateProject = useStoreActions(
    (actions) => actions.origin.updateProject,
  );
  const activeProject = useStoreState((state) => state.origin.project);
  const { projectId } = match.params;

  // fetch project data from api
  const [project] = useProjectGuestDetails({ projectId });

  useEffect(() => {
    if (!isEmpty(project)) {
      updateProject(project);
    }
  }, [project]);

  // console.log(activeProject, 'activeProject');

  return (
    <Layout noContainer hasAuthNav activeProject={activeProject}>
      <Container>
        <div className="forgot-password-page">
          <Seo title="Forgot Password" />
          <section className="hero is-fullheight">
            <div className="hero-body">
              <div className="container">
                <FormContainer>
                  <div>
                    <nav
                      className="navbar"
                      role="navigation"
                      aria-label="main navigation">
                      <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-end">
                          {/* <div className="navbar-item has-text-black-bis has-text-right">
                            {activeProject.name && (
                              <h3 className="has-text-weight-bold is-size-3">
                                {activeProject.name}
                              </h3>
                            )}
                          </div> */}
                        </div>
                      </div>
                    </nav>

                    {/* <Logo src={logo} alt="Website Reviews" /> */}
                    {activeProject.logo ? (
                      <Logo src={activeProject.logo} alt={activeProject.name} />
                    ) : (
                      ''
                    )}
                    <ContentContainer className="is-flex">
                      {activeProject.name && (
                        <h2 className="has-text-weight-semibold is-size-5-mobile project">
                          {activeProject.name}
                        </h2>
                      )}{' '}
                      <h2 className="has-text-weight-semibold is-size-5-mobile">
                        Reset Password
                      </h2>
                      {/* <p className="is-size-6">
                        Enter the email address associated with your account and
                        we&apos;ll send you a link to reset your password.
                      </p> */}
                    </ContentContainer>
                  </div>
                  <ForgotPasswordForm
                    onSubmit={async (data) => {
                      await executeMutation({ variables: { input: data } });
                      swal('An email has been sent, please check your Inbox');
                    }}
                  />
                  {res.error && (
                    <Message type="error">{res.error.message}</Message>
                  )}
                </FormContainer>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </Layout>
  );
};

export default ForgotPassword;
