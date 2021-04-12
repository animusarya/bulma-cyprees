import React from 'react';

import Layout from '../../components/Layout';
import CustomerTable from '../../components/customers/CustomerTable';
import DashboardMenu from '../../components/global/DashboardMenu';

const customerData = [
  {
    customer: 'BandM',
    name: 'Stables',
    address: '1 CHURCH CLOSE, MARCHINGTON, UTTOXETER, ST148NQ	',
    storeNumber: 300,
  },
  {
    customer: 'Cambian',
    name: 'Stables',
    address: '1 CHURCH CLOSE, MARCHINGTON, UTTOXETER, ST148NQ	',
    storeNumber: 301,
  },
  {
    customer: 'Cambian',
    name: 'Stables',
    address: '1 CHURCH CLOSE, MARCHINGTON, UTTOXETER, ST148NQ	',
    storeNumber: 302,
  },
  {
    customer: 'Cambian',
    name: 'Stables',
    address: '1 CHURCH CLOSE, MARCHINGTON, UTTOXETER, ST148NQ	',
    storeNumber: 303,
  },
  {
    customer: 'Cambian',
    name: 'Stables',
    address: '1 CHURCH CLOSE, MARCHINGTON, UTTOXETER, ST148NQ	',
    storeNumber: 304,
  },
  {
    customer: 'Cambian',
    name: 'Stables',
    address: '1 CHURCH CLOSE, MARCHINGTON, UTTOXETER, ST148NQ	',
    storeNumber: 305,
  },
];

const Customer = () => (
  <Layout>
    <DashboardMenu hasSearchMenu heading="Customer">
      <CustomerTable customerData={customerData} />
    </DashboardMenu>
  </Layout>
);
export default Customer;
