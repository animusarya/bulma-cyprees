import React from 'react';

import Layout from '../../components/Layout';
import DashboardMenu from '../../components/global/DashboardMenu';
import { EditContractorForm } from '../../components/forms';

const EditContractor = () => (
  <Layout>
    <DashboardMenu heading="Edit Contractor">
      <EditContractorForm />
    </DashboardMenu>
  </Layout>
);

export default EditContractor;
