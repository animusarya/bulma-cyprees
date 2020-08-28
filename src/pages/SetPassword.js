import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import Seo from '../components/Seo';
import Layout from '../components/Layout';
import { Message, Loading } from '../components/elements';
import SetPasswordForm from '../components/SetPasswordForm';
import Footer from '../components/Footer';
import loginBg from '../assets/images/login-bg.jpg';
import logo from '../assets/images/logo.png';

const setPasswordMutation = gql`
  mutation setNewPassword($token: String!, $password: String!) {
    setNewPassword(input: { token: $token, password: $password }) {
      success
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

const SetPassword = ({ match }) => {
  const { token } = match.params;
  const [executeMutation, res] = useMutation(setPasswordMutation);

  return (
    <Layout>
      <Seo title="SetPassword" description="Some description here." />
      <Container className="columns">
        <div className="column">
          <img src={loginBg} alt="SetPassword banner" />
        </div>
        <div className="column">
          <FormContainer>
            <Logo src={logo} alt="logo banner" />
            <SetPasswordForm
              onSubmit={data =>
                executeMutation({
                  variables: { password: data.password, token },
                })
              }
            />
            {res.error && <Message type="error">{res.error.message}</Message>}
            {res.loading ? <Loading /> : null}
          </FormContainer>
        </div>
      </Container>
      <Footer />
    </Layout>
  );
};

export default SetPassword;
