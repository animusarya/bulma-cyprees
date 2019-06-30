import React from 'react';
import styled from 'styled-components';
import { useMutation } from 'urql';
import gql from 'graphql-tag';
import { useStoreActions } from 'easy-peasy';

import Seo from '../components/Seo';
import Layout from '../components/Layout';
import { Message } from '../components/elements';
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

const FormContainer = styled.div`
  margin-top: 10rem;
  padding: 0 3rem;
`;
const Logo = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 2rem;
`;

const Register = () => {
  const [res, executeMutation] = useMutation(registerMutation);
  const togggleRegister = useStoreActions(
    actions => actions.isRegister.togggle,
  );
  const updateUser = useStoreActions(actions => actions.user.update);

  if (res.data) {
    const { jwt, user } = res.data.login;
    window.localStorage.setItem('token', jwt);
    togggleRegister(true);
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
            <RegisterForm onSubmit={data => executeMutation(data)} />
            {res.error && <Message type="error">{res.error.message}</Message>}
          </FormContainer>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Register;
