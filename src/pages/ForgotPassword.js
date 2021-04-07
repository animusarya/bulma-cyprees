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
import { Message } from '../components/elements';
import { ForgotPasswordForm } from '../components/forms';

const forgotPasswordMutation = gql`
  mutation forgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      success
    }
  }
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
    <>
      <Seo title="Forgot Password" />
      <div className="section">
        <div className="container">
          <div className="section pt-0">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-6">
                  <div className="card">
                    <header className="card-header has-background-info-light">
                      <p className="title is-5 card-header-title has-text-white">
                        Request password reset
                      </p>
                    </header>
                    <div className="card-content">
                      <ForgotPasswordForm
                        onSubmit={async (data) => {
                          await executeMutation({ variables: { input: data } });
                          swal(
                            'An email has been sent, please check your Inbox',
                          );
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
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
