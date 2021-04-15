import React from 'react';

import Layout from '../../components/Layout';
import DashboardMenu from '../../components/global/DashboardMenu';

import { GoogleMap } from '../../components/elements';
import { EditJobForm } from '../../components/forms';

const EditJobs = () => (
  <Layout>
    <DashboardMenu>
      <GoogleMap />
      <EditJobForm />
    </DashboardMenu>
  </Layout>
);
export default EditJobs;
