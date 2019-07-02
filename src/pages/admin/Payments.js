import React from 'react';

import Title from '../../components/elements/Title';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';
import MainColumn from '../../components/MainColumn';
import PaymentForm from '../../components/PaymentForm';

const Payments = () => {
  return (
    <Layout>
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <MainColumn>
            <div className="column">
              <Title>02 Payment</Title>
              <PaymentForm />
            </div>
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};
export default Payments;
