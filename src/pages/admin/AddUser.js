import React from 'react';

import Layout from '../../components/Layout';
import DashboardMenu from '../../components/global/DashboardMenu';
import { AddUserForm } from '../../components/forms';

const AddUser = () => (
  <Layout>
    <DashboardMenu heading="Add User">
      <AddUserForm />{' '}
    </DashboardMenu>
  </Layout>
);
export default AddUser;
