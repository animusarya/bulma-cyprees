import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

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

  const allUsers = data && data.allUsers ? data.allUsers : {};
  return (
    <Layout>
      <Seo title="Contractors" description="View all contractors" />

      <DashboardMenu hasSearchMenu heading="Contractor">
        {loading && !data && <Loading />}
        <div className="has-text-centered mb-5">
          {allUsers.length === 0 && !loading && <EmptyState />}
        </div>
        {allUsers && allUsers.length > 0 && <ContractorTable data={allUsers} />}
      </DashboardMenu>
    </Layout>
  );
};
export default Contractor;
