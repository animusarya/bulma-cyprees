import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

import Layout from '../../components/Layout';
import DashboardMenu from '../../components/global/DashboardMenu';
import { AddContractorForm } from '../../components/forms';

const insertUserMutation = gql`
  mutation insertUser($input: UserInput!) {
    insertUser(input: $input) {
      id
      email
      telephone
      status
      account {
        registrationNumber
        vatNumber
        accountNumber
        accountEmail
        accountAddress
        accountTelephone
      }
      profile {
        fullName
      }
    }
  }
`;
const AddContractor = ({ history }) => {
  const [executeMutation, res] = useMutation(insertUserMutation);
  useEffect(() => {
    if (res.error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: res.error.message,
      });
  }, [res.error]);

  if (res.data && res.data.insertUser) {
    history.push(`/contractor/edit:${res.data.insertUser.id}`);
  }

  const handleSubmit = async (formData) => {
    const resp = await executeMutation({
      variables: { input: formData },
    });
    if (resp) {
      Swal.fire({
        icon: 'success',
        title: 'User added successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Layout>
      <DashboardMenu heading="Add New Contractor">
        <AddContractorForm onSubmit={handleSubmit} />
      </DashboardMenu>
    </Layout>
  );
};

export default AddContractor;
