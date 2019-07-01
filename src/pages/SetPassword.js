import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'urql';
import gql from 'graphql-tag';

import Seo from '../components/Seo';
import Layout from '../components/Layout';
import { Message, Loading } from '../components/elements';
import SetPasswordForm from '../components/SetPasswordForm';
import Footer from '../components/Footer';
import loginBg from '../assets/images/login-bg.jpg';
import logo from '../assets/images/logo.png';

const setPasswordMutation = gql`
  mutation setPassword($password: String!, $confirmPassword: String!) {
    setPassword(
      input: { password: $password, confirmPassword: $confirmPassword }
    ) {
      jwt
      user {
        id
        # email
        # type
      }
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

const SetPassword = () => {
  const [res, executeMutation] = useMutation(setPasswordMutation);

  return (
    <Layout>
      <Seo title="SetPassword" description="Some description here." />
      <div className="columns">
        <div className="column">
          <img src={loginBg} alt="SetPassword banner" />
        </div>
        <div className="column">
          <FormContainer>
            <Logo src={logo} alt="logo banner" />
            <SetPasswordForm onSubmit={data => executeMutation(data)} />
            {res.error && <Message type="error">{res.error.message}</Message>}
            {res.fetching ? <Loading /> : null}
          </FormContainer>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default SetPassword;
