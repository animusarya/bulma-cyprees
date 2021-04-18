import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { isEmpty } from 'lodash';

import useProjectGuestDetails from '../../hooks/useProjectGuestDetails';
import Seo from '../../components/Seo';
import Layout from '../../components/Layout';
import { Message, Loading } from '../../components/elements';
import { RegisterForm } from '../../components/forms';
import DashboardMenu from '../../components/global/DashboardMenu';
import { AddCustomerModel } from '../../components/modal';

const registerMutation = gql`
  mutation register($input: RegisterInput) {
    register(input: $input) {
      jwt
      user {
        id
        email
        type
        profile {
          fullName
          companyName
          telephone
          websiteAddress
        }
      }
    }
  }
`;

const Register = ({ match }) => {
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
        isAdminRegister ? '/user/create/website' : '/client/dashboard',
      );
    }, 1000);
  }
  const [openModel, setOpenModel] = useState(false);
  return (
    <Layout>
      <DashboardMenu heading="Add Job">
        <Seo title="Registration" description="Register Job Here" />
        <button
          className="button is-small is-primary mb-4"
          type="submit"
          onClick={() => setOpenModel(!openModel)}>
          New Customer
        </button>
        <AddCustomerModel
          isActive={openModel}
          onSubmit={() => setOpenModel(!openModel)}
          onClose={() => setOpenModel(!openModel)}
        />

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
                  websiteAddress: data.websiteAddress,
                },
              },
            })
          }
          project={activeProject}
          isAdminRegister={isAdminRegister}
        />
        {res.error && <Message type="error">{res.error.message}</Message>}
        {res.loading ? <Loading /> : null}
      </DashboardMenu>
    </Layout>
  );
};

export default Register;
