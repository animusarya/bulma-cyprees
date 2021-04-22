import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import CustomerTable from '../../components/customers/CustomerTable';
import DashboardMenu from '../../components/global/DashboardMenu';
import { Loading, EmptyState } from '../../components/elements';

const allCustomersQuery = gql`
  query allCustomers {
    allCustomers {
      id
      name
      accountsEmail
      locations {
        number
        address {
          addressLine1
        }
      }
    }
  }
`;

const Customer = () => {
  const { data, error, loading } = useQuery(allCustomersQuery, {
    fetchPolicy: 'cache-and-network',
  });
  useEffect(() => {
    if (error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
  }, [error]);

  const allCustomers = data && data.allCustomers ? data.allCustomers : {};
  return (
    <Layout>
      <DashboardMenu hasSearchMenu heading="Customer">
        {loading && !data && <Loading />}
        <div className="has-text-centered mb-5">
          {allCustomers.length === 0 && !loading && <EmptyState />}
        </div>
        {allCustomers && allCustomers.length > 0 && (
          <CustomerTable data={allCustomers} />
        )}
      </DashboardMenu>
    </Layout>
  );
};

export default Customer;
