import React from 'react';
import styled from 'styled-components';

import Seo from '../components/Seo';
import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';
import loginBg from '../assets/images/login-bg.jpg';
import logo from '../assets/images/logo.png';

const FormContainer = styled.div`
  margin-top: 10rem;
  padding: 0 3rem;
`;
const Logo = styled.img`
  width: 350px;
  height: auto;
  margin-bottom: 2rem;
`;

export default () => (
  <Layout>
    <Seo title="Login" description="Some description here." />
    <div className="columns">
      <div className="column">
        <img src={loginBg} alt="login banner" />
      </div>
      <div className="column">
        <FormContainer>
          <Logo src={logo} alt="logo banner" />
          <LoginForm />
        </FormContainer>
      </div>
    </div>
  </Layout>
);
