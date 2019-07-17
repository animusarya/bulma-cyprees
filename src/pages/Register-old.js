import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'urql';
import gql from 'graphql-tag';

import Seo from '../components/Seo';
import Layout from '../components/Layout';
import { Message, Loading } from '../components/elements';
import RegisterForm from '../components/RegisterForm';
import Footer from '../components/Footer';
import loginBg from '../assets/images/login-bg.jpg';
import logo from '../assets/images/logo.png';

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
  .column:last-child {
    align-self: center;
  }
`;

const FormContainer = styled.div`
  padding: 0 3rem;
  @media only screen and (max-width: 768px) {
    padding: 2rem;
  }
`;

const Logo = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 2rem;
`;

const Register = () => {
  const [res, executeMutation] = useMutation(registerMutation);

  return (
    <Layout>
      <Seo title="Register" description="Some description here." />
      <Container className="columns">
        <div className="column">
          <img src={loginBg} alt="Register banner" />
        </div>
        <div className="column">
          <FormContainer>
            <Logo src={logo} alt="logo banner" />
            <RegisterForm onSubmit={data => executeMutation(data)} />
            {res.error && <Message type="error">{res.error.message}</Message>}
            {res.fetching ? <Loading /> : null}
          </FormContainer>
        </div>
      </Container>
      <Footer />
    </Layout>
  );
};

export default Register;
