import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useStoreActions, useStoreState } from 'easy-peasy';

import Seo from '../components/Seo';
import Layout from '../components/Layout';
import { Message, Loading } from '../components/elements';
import LoginForm from '../components/LoginForm';
import logo from '../assets/images/logo1.png';
import background from '../assets/images/intelliback.jpg';

const mutation = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      jwt
      user {
        id
        email
        type
      }
    }
  }
`;

const Container = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat, repeat;
  background-size: cover;
  background-position: center center;
  height: auto;
  .login-page {
    width: 52%;
    margin-right: auto;
    margin-left: auto;
    color: #333;
    background: rgba(255, 255, 255, 0.8);
  }
  .hero-body {
    align-items: flex-start !important;
  }
`;

const FormContainer = styled.div`
  padding: 0 3rem;
  margin-top: 2rem;
  @media only screen and (max-width: 768px) {
    padding: 2rem;
  }
  .navbar-item {
    display: grid;
  }
  h1 {
    font-size: 2.3rem;
    margin-top: -1rem;
  }
`;

const Logo = styled.img`
  width: 117px;
  height: auto;
  margin-bottom: 2rem;
`;

const Login = () => {
  const [executeMutation, res] = useMutation(mutation);
  const togggleLoggedIn = useStoreActions(
    actions => actions.isLoggedIn.togggle,
  );
  const updateUser = useStoreActions(actions => actions.user.update);
  const activeProject = useStoreState(state => state.origin.project);

  if (res.data && res.data.login) {
    const { jwt, user } = res.data.login;
    window.localStorage.setItem('token', jwt);
    togggleLoggedIn(true);
    updateUser(user);
    setTimeout(() => {
      let sendTo = '/client/dashboard';
      if (user.type === 'superAdmin') {
        sendTo = '/super-admin/dashboard';
      } else if (user.type === 'admin') {
        sendTo = '/admin/dashboard';
      }
      window.location.replace(sendTo);
    }, 1000);
  }

  return (
    <Layout>
      <Container>
        <div className="login-page">
          <Seo title="Login" description="Some description here." />
          <section className="hero is-fullheight">
            <div className="hero-body">
              <div className="container">
                <FormContainer>
                  <div>
                    <nav
                      className="navbar"
                      role="navigation"
                      aria-label="main navigation">
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
                            <h2 className="has-text-weight-bold is-size-5">
                              Login
                            </h2>
                            {activeProject.name && (
                              <h1 className="has-text-weight-bold">
                                {activeProject.name}
                              </h1>
                            )}
                          </div>
                        </div>
                      </div>
                    </nav>
                  </div>
                  <LoginForm
                    onSubmit={data => executeMutation({ variables: data })}
                  />
                  {res.error && (
                    <Message type="error">{res.error.message}</Message>
                  )}
                  {res.loading ? <Loading /> : null}
                </FormContainer>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </Layout>
  );
};

export default Login;
