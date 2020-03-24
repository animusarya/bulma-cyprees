import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { useStoreActions, useStoreState } from 'easy-peasy';
import gql from 'graphql-tag';
import swal from 'sweetalert';
import { isEmpty } from 'lodash';

import useProjectGuestDetails from '../hooks/useProjectGuestDetails';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import { Message } from '../components/elements';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import logo from '../assets/images/logo.png';

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

const Logo = styled.img`
  max-height: 70px;
  width: auto;
  margin-bottom: 2rem;
`;

const ContentContainer = styled.div`
  h2 {
    font-size: ${props => props.theme.fontSizeSuperLarge};
  }
  p {
    margin: 2rem 0;
  }
  a {
    :hover {
      color: ${props => props.theme.primaryColor};
    }
  }
`;
const ForgotPassword = ({ match }) => {
  const [executeMutation, res] = useMutation(forgotPasswordMutation);
  const togggleLoggedIn = useStoreActions(
    actions => actions.isLoggedIn.togggle,
  );
  const updateUser = useStoreActions(actions => actions.user.update);
  const updateProject = useStoreActions(
    actions => actions.origin.updateProject,
  );
  const activeProject = useStoreState(state => state.origin.project);
  const { projectId, email } = match.params;
  const isAdminRegister = !projectId;

  // fetch project data from api
  const [project] = useProjectGuestDetails({ projectId });

  useEffect(() => {
    if (!isEmpty(project)) {
      updateProject(project);
    }
  }, [project]);

  if (res.data && res.data.register) {
    const { jwt, user } = res.data.register;
    window.localStorage.setItem('token', jwt);
    togggleLoggedIn(true);
    updateUser(user);
    setTimeout(() => {
      window.location.replace(
        isAdminRegister ? '/admin/dashboard' : '/client/dashboard',
      );
    }, 1000);
  }

  return (
    <Layout noContainer>
      <Container>
        <div className="forgot-password-page">
          <Seo title="Forgot Password" description="Register Yourself Here" />
          <section className="hero is-fullheight">
            <div className="hero-body">
              <div className="container">
                <FormContainer>
                  <div>
                    <nav
                      className="navbar"
                      role="navigation"
                      aria-label="main navigation"
                    >
                      <div className="navbar-brand">
                        {activeProject.logo ? (
                          <Logo
                            src={activeProject.logo}
                            alt={activeProject.name}
                          />
                        ) : (
                          <Logo src={logo} alt="logo banner" />
                        )}
                      </div>
                      <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-end">
                          <div className="navbar-item has-text-black-bis has-text-right">
                            {activeProject.name && (
                              <h3 className="has-text-weight-bold is-size-3">
                                {activeProject.name}
                              </h3>
                            )}
                          </div>
                        </div>
                      </div>
                    </nav>
                    <ContentContainer>
                      <h2 className="has-text-weight-semibold is-size-5-mobile">
                        Reset Password
                      </h2>
                      <p className="is-size-6">
                        Enter the email address associated with your account and
                        we&apos;ll send you a link to reset your password.
                      </p>
                    </ContentContainer>
                  </div>
                  <ForgotPasswordForm
                    onSubmit={async data => {
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
