import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useStoreActions } from 'easy-peasy';

import Seo from '../components/Seo';
import Layout from '../components/Layout';
import { Message, Loading } from '../components/elements';
import { LoginForm } from '../components/forms';

// images
import Image from '../assets/images/rd-glazing-login.jpg';
import Logo from '../assets/images/logo.png';

const Container = styled.section`
  position: absolute;
  background-size: cover;
  height: 100%;
  width: 100%;
  top: 0;
  background-image: url(${Image});
  background-position: center;

  .card-content {
    position: absolute;
    right: 0;
    width: 540px;
    height: 100%;
    margin: 0;
    background-color: ${(props) => props.theme.backgroundColor};
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

const ImageWrapper = styled.img`
  width: 100%;
`;

const Bottom = styled.p`
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-bottom: 2rem;
`;

const mutation = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      jwt
      user {
        id
        email
        type
        profile {
          companyName
        }
      }
    }
  }
`;

const Login = () => {
  const [executeMutation, res] = useMutation(mutation);
  const togggleLoggedIn = useStoreActions(
    (actions) => actions.isLoggedIn.togggle,
  );
  const updateUser = useStoreActions((actions) => actions.user.update);

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
        sendTo = '/user/dashboard';
      }
      window.location.replace(sendTo);
    }, 1000);
  }

  return (
    <Layout noContainer>
      <div className="login-page">
        <Seo title="Login" description="Some description here." />
        <Container>
          <div className="card-content p-5">
            <div className="account-box card-box shadow-none p-4 mt-2">
              <Link to="/login">
                <ImageWrapper className="pb-3 mt-1" src={Logo} alt="login" />
              </Link>
              <LoginForm
                onSubmit={(data) => executeMutation({ variables: data })}
              />
              {res.error && <Message type="error">{res.error.message}</Message>}
              {res.loading ? <Loading /> : null}
            </div>
            <Bottom className="has-text-grey-lighter has-text-centered is-size-8">
              Version 1.01 : 2020 © All rights reserved
            </Bottom>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Login;
