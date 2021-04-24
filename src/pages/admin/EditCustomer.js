import React, { useEffect } from 'react';

import Swal from 'sweetalert2';
import gql from 'graphql-tag';

import { useQuery, useMutation } from '@apollo/client';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import { Loading } from '../../components/elements';

import DashboardMenu from '../../components/global/DashboardMenu';
import { EditCustomerForm } from '../../components/forms';

const userQuery = gql`
  query customer($id: ID!) {
    customer(id: $id) {
      id
      name
      accountsEmail
      jobsEmail
      paymentTerms
      internalNotes
      status
    }
  }
`;

const updateCustomerMutation = gql`
  mutation updateCustomer($id: ID!, $input: CustomerInput!) {
    updateCustomer(id: $id, input: $input) {
      id
    }
  }
`;

const EditCustomer = ({ match, history }) => {
  const { id } = match.params;
  const { data, loading, error } = useQuery(userQuery, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id,
    },
  });

  const customerData = data && data.customer ? data.customer : {};
  const [executeMutation, res] = useMutation(updateCustomerMutation);

  useEffect(() => {
    if (res.error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: res.error.message,
      });
    if (error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
  }, [res.error, error]);

  if (res.data && res.data.updateCustomer) {
    history.push('/customers');
  }

  const handleSubmit = async (formData) => {
    const resp = await executeMutation({
      variables: {
        id,
        input: formData,
      },
    });
    if (resp) {
      Swal.fire({
        icon: 'success',
        title: 'Update successful!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <Layout>
      <Seo title="Edit Customer Page" description="Edit Customer data" />

      <DashboardMenu heading="Edit Customer">
        {loading ? (
          <Loading />
        ) : (
          <EditCustomerForm
            onSubmit={handleSubmit}
            initialValues={customerData}
          />
        )}
      </DashboardMenu>
    </Layout>
  );
};

export default EditCustomer;
