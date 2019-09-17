import React from 'react';
import styled from 'styled-components';

const Text = styled.p`
  font-size: 14px;
  line-height: 15px;
`;

const Disclaimer = ({ data }) => (
  <Text>
    {data ||
      'Colliers International give notice that these particulars are set out as a general outline only for the guidance of intending Purchasers or Lessees and do not constitute any part of an offer or contract. Details are given without any responsibility and any intending Purchasers, Lessees or Third Party should not rely on them as statements or representations of fact, but must satisfy themselves by inspection or otherwise as to the correctness of each of them. No person employed or engaged by Colliers International has any authority to make any representation or warranty whatsoever in relation to this property. Colliers registered office is at 50 George Street, London W1U 7GA.'}
  </Text>
);

export default Disclaimer;
