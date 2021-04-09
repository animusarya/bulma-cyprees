import React from 'react';

import Layout from '../../components/Layout';
import DashboardMenu from '../../components/global/DashboardMenu';
import AddSiteForm from '../../components/forms/AddSiteForm';

const AddNewSite = () => (
  <Layout>
    <DashboardMenu>
      <AddSiteForm onSubmit={(formData) => console.log(formData)} />
    </DashboardMenu>
  </Layout>
);
export default AddNewSite;
