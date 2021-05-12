import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
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
      contractor {
        id
      }
    }
  }
`;

const updateJobMutation = gql`
  mutation updateJob($id: ID!, $input: JobInput!) {
    updateJob(id: $id, input: $input) {
      id
      status
    }
  }
`;

const Jobs = () => {
  const [filteredData, { onSearch, setAllData }] = useSearchFilter([
    'code',
    'dueDate',
    'customer.name',
  ]);

  const [executeMutation, res] = useMutation(updateJobMutation);

  const { status } = useParams();
  const heading = status === 'revisit' ? 'Jobs that need Revisit' : 'Jobs';

  const { data, error, loading, refetch } = useQuery(allJobsQuery, {
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

  const handleUpdateJob = async (formData) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4896FC',
      cancelButtonColor: '#e11842',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await executeMutation({
          variables: {
            id: formData.id,
            input: {
              customer: formData.customer,
              contractor: formData.contractor,
              startDate: formData.startDate,
              dueDate: formData.dueDate,
              status: formData.status,
            },
          },
        });
        if (resp) {
          refetch();
          Swal.fire('Deleted!', 'Job deleted successfully', 'success');
        }
      }
    });
  };

  return (
    <Layout>
      <Seo title="Job page" description="View All Jobs" />
      <DashboardMenu onChange={onSearch} hasSearchMenu heading={heading}>
        {loading && !data && <Loading />}
        <div className="has-text-centered mb-5">
          {filteredData.length === 0 && !loading && <EmptyState />}
        </div>
        {filteredData && filteredData.length > 0 && (
          <JobTable
            tableData={filteredData}
            status={status}
            handleRemove={handleUpdateJob}
          />
        )}
      </DashboardMenu>
    </Layout>
  );
};
export default Jobs;
