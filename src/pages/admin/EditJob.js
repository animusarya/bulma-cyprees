import React from 'react';

import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import { JobTable } from '../../components/jobs';
import DashboardMenu from '../../components/global/DashboardMenu';

const EditJobs = () => {
  const { status } = useParams();

  const heading = status === 'revisit' ? 'Jobs that need Revisit' : 'Jobs';

  return (
    <Layout>
      <DashboardMenu hasSearchMenu heading={heading}>
        <JobTable status={status} />
      </DashboardMenu>
    </Layout>
  );
};
export default EditJobs;
