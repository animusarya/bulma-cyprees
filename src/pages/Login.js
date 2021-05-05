import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useStoreActions } from 'easy-peasy';

import Seo from '../components/Seo';

import { LoginForm } from '../components/forms';
import Logo from '../assets/images/logo.png';

const Container = styled.section`
  background-color: ${(props) => props.theme.mainBrandColor};
`;

const ImageWrapper = styled.img`
  width: 100%;
`;

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

const Login = ({ history }) => {
  const [executeMutation, res] = useMutation(mutation);
  const toggleLoggedIn = useStoreActions(
    (actions) => actions.isLoggedIn.togggle,
  );
  const updateUser = useStoreActions((actions) => actions.user.update);

  if (res.data && res.data.login) {
    const { jwt, user } = res.data.login;
    window.localStorage.setItem('token', jwt);
    toggleLoggedIn(true);
    updateUser(user);
    setTimeout(() => {
      history.push('/jobs/open');
    }, 1000);
  }

  useEffect(() => {
    if (res.error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: res.error.message,
      });
  }, [res.error]);

  return (
    <div className="login-page">
      <Seo title="Login" description="Admin login" />
      <Container className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="column is-4 is-offset-4">
              <div className="box p-5">
                <div className="p-4 mt-2">
                  <Link to="/login">
                    <ImageWrapper
                      className="pb-3 mt-1"
                      src={Logo}
                      alt="login"
                    />
                  </Link>
                  <LoginForm
                    onSubmit={(data) => executeMutation({ variables: data })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
