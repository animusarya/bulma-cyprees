import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import CustomerTable from '../../components/customers/CustomerTable';
import DashboardMenu from '../../components/global/DashboardMenu';
import { Loading, EmptyState } from '../../components/elements';
import useSearchFilter from '../../hooks/useSearchFilter';

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
  const [filteredData, { onSearch, setAllData }] = useSearchFilter(['name']);
  // const [searchQuery, setSearchQuery] = useState('');

  // console.log(searchQuery, 'searchQuery');

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

  useEffect(() => {
    if (data && !loading) setAllData(data.allCustomers);
  }, [data]);

  return (
    <Layout>
      <Seo title="Customers" description="View all customers" />
      <DashboardMenu hasSearchMenu heading="Customer" onChange={onSearch}>
        {loading && !data && <Loading />}
        <div className="has-text-centered mb-5">
          {filteredData.length === 0 && !loading && <EmptyState />}
        </div>
        {filteredData && filteredData.length > 0 && (
          <CustomerTable data={filteredData} />
        )}
      </DashboardMenu>
    </Layout>
  );
};

export default Customer;
