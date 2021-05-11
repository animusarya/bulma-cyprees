import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Swal from 'sweetalert2';

import useSearchFilter from '../../hooks/useSearchFilter';

import Seo from '../../components/Seo';
import Layout from '../../components/Layout';
import { JobTable } from '../../components/jobs';
import DashboardMenu from '../../components/global/DashboardMenu';
import { Loading, EmptyState } from '../../components/elements';

const allJobsQuery = gql`
  query allJobs($filters: JobFilters) {
    allJobs(filters: $filters) {
      id
      code
      dueDate
      status
      customer {
        id
        name
      }
    }
  }
`;

const Jobs = () => {
  const [filteredData, { onSearch, setAllData }] = useSearchFilter([
    'code',
    'dueDate',
    'customer.name',
  ]);

  const { status } = useParams();

  const heading = status === 'revisit' ? 'Jobs that need Revisit' : 'Jobs';

  const { data, error, loading } = useQuery(allJobsQuery, {
    fetchPolicy: 'cache-and-network',
    variables: {
      filters: {
        status,
      },
    },
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
    if (data && !loading) setAllData(data.allJobs);
  }, [data]);

  return (
    <Layout>
      <Seo title="Job page" description="View All Jobs" />
      <DashboardMenu onChange={onSearch} hasSearchMenu heading={heading}>
        {loading && !data && <Loading />}
        <div className="has-text-centered mb-5">
          {filteredData.length === 0 && !loading && <EmptyState />}
        </div>
        {filteredData && filteredData.length > 0 && (
          <JobTable tableData={filteredData} status={status} />
        )}
      </DashboardMenu>
    </Layout>
  );
};
export default Jobs;
