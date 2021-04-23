// import React, { useEffect } from 'react';
import React from 'react';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
// import Swal from 'sweetalert2';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';

import DashboardMenu from '../../components/global/DashboardMenu';
import { EditContractorForm } from '../../components/forms';
import { Loading } from '../../components/elements';

const userQuery = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      email
      telephone
      status
      type
      profile {
        fullName
      }
      account {
        registrationNumber
        vatNumber
        accountNumber
        accountEmail
        accountAddress
        accountTelephone
      }
    }
  }
`;

// const updateUserMutation = gql`
//   mutation updateUser($input: UserInput!) {
//     updateUser(input: $input) {
//       id
//     }
//   }
// `;

const EditContractor = ({ match }) => {
  const { id } = match.params;
  const { data, loading } = useQuery(userQuery, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id,
    },
  });
  const userData = data && data.user ? data.user : {};
  console.log(userData, 'userData');
  // const [executeMutation, res] = useMutation(updateUserMutation);

  // useEffect(() => {
  //   if (res.error)
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: res.error.message,
  //     });
  //   if (error)
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: error.message,
  //     });
  // }, [res.error, error]);

  // if (res.data && res.data.updateUser) {
  //   history.push('/contractors');
  // }

  // const handleSubmit = async (formData) => {
  //   const resp = await executeMutation({
  //     variables: { input: formData },
  //   });
  //   if (resp) {
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Customer added successfully',
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //   }
  // };
  return (
    <Layout>
      <Seo title="Edit Contractor Page" description="Edit Contractor data" />
      <DashboardMenu heading="Edit Contractor">
        {loading ? (
          <Loading />
        ) : (
          <EditContractorForm initialValues={userData} />
        )}
        {/* onSubmit={handleSubmit} */}
      </DashboardMenu>
    </Layout>
  );
};

export default EditContractor;
