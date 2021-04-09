import React from 'react';

import Layout from '../../components/Layout';
import ViewAllCustomer from '../../components/customers/ViewAllCustomer';
import DashboardMenu from '../../components/global/DashboardMenu';

const Customer = () => (
  <Layout>
    <DashboardMenu hasSearchMenu heading="Customer">
      <ViewAllCustomer />
    </DashboardMenu>
  </Layout>
);
export default Customer;
