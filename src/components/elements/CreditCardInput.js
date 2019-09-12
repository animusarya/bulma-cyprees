import React from 'react';
import Cleave from 'cleave.js/react';

const CreditCardInput = ({ onCreditCardFocus, onCreditCardChange }) => (
  <Cleave
    placeholder="Enter your credit card number"
    options={{ creditCard: true }}
    onFocus={onCreditCardFocus}
    onChange={onCreditCardChange}
  />
);

export default CreditCardInput;
