import React from 'react';

import Title from './elements/Title';
import MainColumn from './MainColumn';
import PaymentForm from './PaymentForm';

const Payments = () => {
  return (
    <MainColumn>
      <div className="column">
        <Title>02 Payment</Title>
        <PaymentForm />
      </div>
    </MainColumn>
  );
};
export default Payments;
