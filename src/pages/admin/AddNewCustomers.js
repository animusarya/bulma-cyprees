import React from 'react';

import Layout from '../../components/Layout';
import { InputGroup, Button } from '../../components/elements';
import DashboardMenu from '../../components/global/DashboardMenu';

const AddNewCustomers = () => (
  <Layout>
    <DashboardMenu>
      <InputGroup fullWidth label="Company Name" name="fullName" type="text" />
      <hr />
      <div className="mb-3 is-flex is-justify-content-flex-end">
        <Button primary type="submit">
          <span className="has-text-weight-bold">Submit</span>
        </Button>
      </div>
    </DashboardMenu>
  </Layout>
);
export default AddNewCustomers;
