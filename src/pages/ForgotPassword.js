import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useStoreActions } from 'easy-peasy';
import gql from 'graphql-tag';
import swal from 'sweetalert';
import { isEmpty } from 'lodash';

import useProjectGuestDetails from '../hooks/useProjectGuestDetails';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import { Message } from '../components/elements';
import { ForgotPasswordForm } from '../components/forms';

const forgotPasswordMutation = gql`
  mutation forgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      success
    }
  }
`;

const TopNavigation = styled.h1`
  padding: 0 27px;
  background: ${(props) => props.theme.backgroundColor};
  line-height: 52px;
`;

const BottomNavigation = styled.h2`
  background: ${(props) => props.theme.tertiaryBackground};
  padding: 5px 27px;
`;

const LinkStyled = styled(Link)`
  color: ${(props) => props.theme.fontDark};
  font-size: ${(props) => props.theme.fontSizeExtraSmall};
  :hover {
    transition: 0.5s;
    color: ${(props) => props.theme.dangerColor};
    text-decoration: underline;
    background-color: transparent;
  }
`;

const CardHeader = styled.header`
  :first-child {
    border-top-left-radius: 0.9rem;
    border-top-right-radius: 0.9rem;
  }
`;

const ForgotPassword = ({ match }) => {
  const [executeMutation, res] = useMutation(forgotPasswordMutation);
  const updateProject = useStoreActions(
    (actions) => actions.origin.updateProject,
  );
  const { projectId } = match.params;

  // fetch project data from api
  const [project] = useProjectGuestDetails({ projectId });

  useEffect(() => {
    if (!isEmpty(project)) {
      updateProject(project);
    }
  }, [project]);

  return (
    <Layout>
      <Seo title="Forgot Password" />
      <TopNavigation className="title is-4 has-text-white">
        Request password reset
      </TopNavigation>
      <BottomNavigation className="subtitle is-7 has-text-black is-flex">
        <LinkStyled to="/">RD Glazing</LinkStyled>
        <span>&nbsp;&nbsp;&gt;&nbsp;&nbsp;</span>{' '}
        <p className="has-text-weight-bold">Request password reset</p>
      </BottomNavigation>
      <div className="section pt-0">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-6">
              <div className="card">
                <CardHeader className="card-header has-background-grey-light">
                  <p className="title is-5 card-header-title has-text-white">
                    Request password reset
                  </p>
                </CardHeader>
                <div className="card-content has-background-white-ter">
                  <ForgotPasswordForm
                    onSubmit={async (data) => {
                      await executeMutation({ variables: { input: data } });
                      swal('An email has been sent, please check your Inbox');
                    }}
                  />
                  {res.error && (
                    <Message type="error">{res.error.message}</Message>
                  )}
                  <LinkStyled to="/login">Back to Login</LinkStyled>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="content has-text-centered p-2 has-background-grey-dark is-size-7 has-text-white">
        Script Executed in 0.0398 seconds
      </footer>
    </Layout>
  );
};

export default ForgotPassword;
