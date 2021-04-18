import React from 'react';

import Layout from '../../components/Layout';
import ContractorTable from '../../components/contractor/ContractorTable';
import DashboardMenu from '../../components/global/DashboardMenu';

const contractorData = [
  {
    name: 'Obama',
    accountName: 'Stables',
    address: '1 CHURCH CLOSE, MARCHINGTON, UTTOXETER, ST148NQ	',
    telephone: '12345678301',
  },
  {
    name: 'Dan',
    accountName: 'Stables',
    address: '1 CHURCH CLOSE, MARCHINGTON, UTTOXETER, ST148NQ	',
    telephone: '12345678302',
  },
  {
    name: 'Julia',
    accountName: 'Stables',
    address: '1 CHURCH CLOSE, MARCHINGTON, UTTOXETER, ST148NQ	',
    telephone: '12345678303',
  },
  {
    name: 'Richard',
    accountName: 'Stables',
    address: '1 CHURCH, MARCHINGTON, UTTOXETER, ST148NQ	',
    telephone: '12345678304',
  },
  {
    name: 'Mark',
    accountName: 'Stables',
    address: '1 CHURCH CLOSE, MARCHINGTON, UTTOXETER, ST148NQ	',
    telephone: '12345678305',
  },
  {
    name: 'Steve',
    accountName: 'Stables',
    address: '1 CHURCH CLOSE, MARCHINGTON, UTTOXETER, ST148NQ	',
    telephone: '12345678306',
  },
  {
    name: 'Maxwell',
    accountName: 'Stables',
    address: '1 CHURCH CLOSE, MARCHINGTON, UTTOXETER, ST148NQ	',
    telephone: '12345678307',
  },
  {
    name: 'Kel',
    accountName: 'Stables',
    address: '1 CHURCH CLOSE, MARCHINGTON, UTTOXETER, ST148NQ	',
    telephone: '1234567838',
  },
];

const Contractor = () => (
  <Layout>
    <DashboardMenu hasSearchMenu heading="Contractor">
      <ContractorTable contractorData={contractorData} />
    </DashboardMenu>
  </Layout>
);
export default Contractor;
