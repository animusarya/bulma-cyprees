import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

import Seo from '../../components/Seo';
import Layout from '../../components/Layout';
import DashboardMenu from '../../components/global/DashboardMenu';
import AddCustomerForm from '../../components/forms/AddCustomerForm';

const insertCustomerMutation = gql`
  mutation insertCustomer($input: CustomerInput!) {
    insertCustomer(input: $input) {
      id
      name
      accountsEmail
      jobsEmail
      locations {
        name
        number
      }
      paymentTerms
      internalNotes
      status
    }
  }
`;

const AddCustomer = ({ history }) => {
  const [executeMutation, res] = useMutation(insertCustomerMutation);
  useEffect(() => {
    if (res.error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: res.error.message,
      });
  }, [res.error]);

  if (res.data && res.data.insertCustomer) {
    history.push(`/customer/edit/${res.data.insertCustomer.id}`);
  }

  const handleSubmit = async (formData) => {
    const resp = await executeMutation({
      variables: { input: formData },
    });
    if (resp) {
      Swal.fire({
        icon: 'success',
        title: 'Customer added successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Layout>
      <Seo title="Add New Customer" description="Add new customers page" />

      <DashboardMenu heading="Add New Customer">
        <AddCustomerForm onSubmit={handleSubmit} />
      </DashboardMenu>
    </Layout>
  );
};

export default AddCustomer;
