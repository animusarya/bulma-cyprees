import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'urql';
import gql from 'graphql-tag';

import Seo from '../components/Seo';
import Layout from '../components/Layout';
import { Message } from '../components/elements';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import Footer from '../components/Footer';
import loginBg from '../assets/images/login-bg.jpg';
import logo from '../assets/images/logo.png';

const forgotPasswordMutation = gql`
  mutation forgotPassword($email: String!) {
    login(input: { email: $email }) {
      success
    }
  }
`;

const FormContainer = styled.div`
  margin-top: 10rem;
  padding: 0 3rem;
`;
const Logo = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 2rem;
`;

const ForgotPassword = () => {
  const [res, executeMutation] = useMutation(forgotPasswordMutation);

  return (
    <Layout>
      <Seo title="Login" description="Some description here." />
      <div className="columns">
        <div className="column">
          <img src={loginBg} alt="login banner" />
        </div>
        <div className="column">
          <FormContainer>
            <Logo src={logo} alt="logo banner" />
            <ForgotPasswordForm onSubmit={data => executeMutation(data)} />
            {res.error && <Message type="error">{res.error.message}</Message>}
          </FormContainer>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default ForgotPassword;
