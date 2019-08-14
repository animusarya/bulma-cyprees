import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'urql';
import gql from 'graphql-tag';
import { useStoreActions } from 'easy-peasy';

import Seo from '../components/Seo';
import { Message, Loading } from '../components/elements';
import RegisterForm from '../components/RegisterForm';
import logo from '../assets/images/logo1.png';
import background from '../assets/images/intelliback.jpg';

const registerMutation = gql`
  mutation register($email: String!, $password: String!) {
    register(input: { email: $email, password: $password }) {
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
  .register-page {
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

const Register = () => {
  const [res, executeMutation] = useMutation(registerMutation);
  const togggleLoggedIn = useStoreActions(
    actions => actions.isLoggedIn.togggle,
  );
  const updateUser = useStoreActions(actions => actions.user.update);

  if (res.data && res.data.login) {
    const { jwt, user } = res.data.register;
    window.localStorage.setItem('token', jwt);
    togggleLoggedIn(true);
    updateUser(user);
    setTimeout(() => {
      window.location.replace('/client/dashboard');
    }, 1000);
  }

  return (
    <Container>
      <div className="register-page">
        <Seo title="Register" description="Register Yourself Here" />
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
                      <Logo src={logo} alt="logo banner" />
                    </div>
                    <div id="navbarBasicExample" className="navbar-menu">
                      <div className="navbar-end">
                        <div className="navbar-item has-text-black-bis has-text-right">
                          <h2 className="has-text-weight-bold is-size-5">
                            Registration
                          </h2>
                          <h1 className="has-text-weight-bold">
                            Project Arden
                          </h1>
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>
                <RegisterForm
                  onSubmit={data => {
                    return executeMutation({
                      email: data.email,
                      password: data.password,
                    });
                  }}
                />
                {res.error && (
                  <Message type="error">{res.error.message}</Message>
                )}
                {res.fetching ? <Loading /> : null}
              </FormContainer>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
};

export default Register;
