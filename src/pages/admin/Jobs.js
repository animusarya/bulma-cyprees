import React from 'react';

import Layout from '../../components/Layout';
import { JobTable } from '../../components/jobs';
import DashboardMenu from '../../components/global/DashboardMenu';

const Jobs = () => (
  <Layout>
    <DashboardMenu hasSearchMenu heading="Jobs">
      <JobTable />
    </DashboardMenu>
  </Layout>
);
export default Jobs;
