import React from 'react';

import Layout from '../../components/Layout';
import DashboardMenu from '../../components/global/DashboardMenu';

import { EditCustomerForm } from '../../components/forms';

const EditCustomer = () => (
  <Layout>
    <DashboardMenu heading="Edit Customer">
      <EditCustomerForm />
    </DashboardMenu>
  </Layout>
);

export default EditCustomer;
