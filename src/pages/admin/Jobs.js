import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Swal from 'sweetalert2';

// import Fuse from 'fuse.js';

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
  const { status } = useParams();

  const heading = status === 'revisit' ? 'Jobs that need Revisit' : 'Jobs';

  // const [query, setUpdateQuery] = useState('');
  // const fuse = new Fuse(tableData, {
  //   keys: ['jobNumber', 'site', 'dueDate', 'assigned'],
  //   includeScore: true,
  // });

  // const results = fuse.search(query);

  // const allJobs = query
  //   ? results.map((character) => character.item)
  //   : tableData;

  // const onSearch = ({ currentTarget }) => {
  //   setUpdateQuery(currentTarget.value);
  // };
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

  const allJobs = data && data.allJobs ? data.allJobs : {};

  return (
    <Layout>
      <Seo title="Job page" description="View All Jobs" />

      <DashboardMenu
        // value={query}
        // onChange={onSearch}
        // onChange={(filters) => onSearch(filters, tableData)}
        hasSearchMenu
        heading={heading}>
        {loading && !data && <Loading />}
        <div className="has-text-centered mb-5">
          {allJobs.length === 0 && !loading && <EmptyState />}
        </div>
        {allJobs && allJobs.length > 0 && (
          <JobTable tableData={allJobs} status={status} />
        )}
      </DashboardMenu>
    </Layout>
  );
};
export default Jobs;
