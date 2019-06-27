import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'urql';
import gql from 'graphql-tag';
import { useStoreActions } from 'easy-peasy';

import Seo from '../components/Seo';
import Layout from '../components/Layout';
import { Message } from '../components/elements';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';
import loginBg from '../assets/images/login-bg.jpg';
import logo from '../assets/images/logo.png';

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

const FormContainer = styled.div`
  margin-top: 10rem;
  padding: 0 3rem;
`;
const Logo = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 2rem;
`;

const Login = () => {
  const [res, executeMutation] = useMutation(mutation);
  const togggleLoggedIn = useStoreActions(
    actions => actions.isLoggedIn.togggle,
  );
  const updateUser = useStoreActions(actions => actions.user.update);

  if (res.data) {
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
      <Seo title="Login" description="Some description here." />
      <div className="columns">
        <div className="column">
          <img src={loginBg} alt="login banner" />
        </div>
        <div className="column">
          <FormContainer>
            <Logo src={logo} alt="logo banner" />
            <LoginForm onSubmit={data => executeMutation(data)} />
            {res.error && <Message type="error">{res.error.message}</Message>}
          </FormContainer>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Login;
