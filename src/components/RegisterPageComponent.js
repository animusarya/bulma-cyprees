import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { isEmpty } from 'lodash';

import useProjectGuestDetails from '../hooks/useProjectGuestDetails';
import { Message, Loading } from './elements';
import RegisterForm from './RegisterForm';
// import logo from '../assets/images/logo2.png';

const registerMutation = gql`
  mutation register($input: RegisterInput) {
    register(input: $input) {
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
  .hero-body {
    align-items: flex-start !important;
    padding: 0 !important;
  }
`;

const FormContainer = styled.div`
  padding: 0 3rem;
  margin-top: 2rem;
  .navbar-item {
    display: grid;
  }
  h1 {
    font-size: 2.3rem;
    margin-top: -1rem;
  }
  .navbar {
    min-height: 1.25rem;
  }
`;

const ContentContainer = styled.div`
  h2 {
    font-size: ${(props) => props.theme.fontSizeSuperLarge};
  }
  p {
    margin: 2rem 0;
  }
  a {
    :hover {
      color: ${(props) => props.theme.primaryColor};
    }
  }
`;

// const Logo = styled.img`
//   max-height: 60px;
//   width: auto;
//   padding-bottom: 1rem;
// `;

const RegisterPageComponent = ({ match }) => {
  const [executeMutation, res] = useMutation(registerMutation);
  const togggleLoggedIn = useStoreActions(
    (actions) => actions.isLoggedIn.togggle,
  );
  const updateUser = useStoreActions((actions) => actions.user.update);
  const updateProject = useStoreActions(
    (actions) => actions.origin.updateProject,
  );
  const activeProject = useStoreState((state) => state.origin.project);
  const { projectId, email } = match.params;
  const isAdminRegister = !projectId;

  // fetch project data from api
  const [project] = useProjectGuestDetails({ projectId });

  useEffect(() => {
    if (!isEmpty(project)) {
      updateProject(project);
    }
  }, [project]);

  if (res.data && res.data.register) {
    const { jwt, user } = res.data.register;
    window.localStorage.setItem('token', jwt);
    togggleLoggedIn(true);
    updateUser(user);
    setTimeout(() => {
      window.location.replace(
        isAdminRegister ? '/admin/dashboard' : '/client/dashboard',
      );
    }, 1000);
  }

  return (
    <Container>
      <FormContainer>
        <div>
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation">
            <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-end">
                {/* <div className="navbar-item has-text-black-bis has-text-right">
                  {activeProject.name && (
                    <h3 className="has-text-weight-bold is-size-3">
                      {activeProject.name}
                    </h3>
                  )}
                </div> */}
              </div>
            </div>
          </nav>
          <ContentContainer>
            <h2 className="has-text-weight-semibold is-size-5-mobile">
              Create an Account
            </h2>
          </ContentContainer>
        </div>
        <RegisterForm
          enableReinitialize
          initialValues={{
            email: email || '',
          }}
          onSubmit={(data) =>
            executeMutation({
              variables: {
                input: {
                  email: data.email,
                  password: data.password,
                  projectId: projectId || undefined,
                  fullName: data.fullName,
                  companyName: data.companyName,
                  telephone: data.telephone,
                },
              },
            })
          }
          project={activeProject}
          isAdminRegister={isAdminRegister}
        />
        {res.error && <Message type="error">{res.error.message}</Message>}
        {res.loading ? <Loading /> : null}
      </FormContainer>
    </Container>
  );
};

export default RegisterPageComponent;
