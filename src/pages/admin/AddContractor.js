import React from 'react';

import Layout from '../../components/Layout';
import DashboardMenu from '../../components/global/DashboardMenu';
import { AddContractorForm } from '../../components/forms';

const AddContractor = () => (
  <Layout>
    <DashboardMenu heading="Add New Contractor">
      <AddContractorForm />
    </DashboardMenu>
  </Layout>
);
export default AddContractor;
