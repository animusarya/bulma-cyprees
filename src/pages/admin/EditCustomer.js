import React from 'react';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';

import DashboardMenu from '../../components/global/DashboardMenu';
import { EditCustomerForm } from '../../components/forms';

const EditCustomer = () => (
  <Layout>
    <Seo title="Edit Customer Page" description="Edit Customer data" />

    <DashboardMenu heading="Edit Customer">
      <EditCustomerForm />
    </DashboardMenu>
  </Layout>
);

export default EditCustomer;
