import React from 'react';

import Layout from '../../components/Layout';
import DashboardMenu from '../../components/global/DashboardMenu';
import AddCustomerForm from '../../components/forms/AddCustomerForm';

const AddCustomer = () => (
  <Layout>
    <DashboardMenu>
      <AddCustomerForm onSubmit={(formData) => console.log(formData)} />
    </DashboardMenu>
  </Layout>
);
export default AddCustomer;
