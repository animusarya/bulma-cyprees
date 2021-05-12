import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useSearchFilter from '../../hooks/useSearchFilter';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import { Loading, EmptyState } from '../../components/elements';
import ContractorTable from '../../components/contractor/ContractorTable';
import DashboardMenu from '../../components/global/DashboardMenu';

const allUserQuery = gql`
  query allUsers {
    allUsers {
      id
      email
      telephone
      status
      type
      profile {
        fullName
      }
      account {
        accountAddress
      }
    }
  }
`;

const Contractor = () => {
  const [filteredData, { onSearch, setAllData }] = useSearchFilter([
    'profile.fullName',
    'email',
    'telephone',
    'status',
    'account.accountAddress',
  ]);

  const { data, error, loading } = useQuery(allUserQuery, {
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
    if (data && !loading) setAllData(data.allUsers);
  }, [data]);

  return (
    <Layout>
      <Seo title="Contractors" description="View all contractors" />

      <DashboardMenu hasSearchMenu heading="Contractor" onChange={onSearch}>
        {loading && !data && <Loading />}
        <div className="has-text-centered mb-5">
          {filteredData.length === 0 && !loading && <EmptyState />}
        </div>
        {filteredData && filteredData.length > 0 && (
          <ContractorTable data={filteredData} />
        )}
      </DashboardMenu>
    </Layout>
  );
};
export default Contractor;
