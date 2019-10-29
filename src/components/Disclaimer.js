import React from 'react';
import styled from 'styled-components';

const Text = styled.p`
  font-size: 14px;
  line-height: 15px;
`;

const Disclaimer = ({ data }) => <Text>{data}</Text>;

export default Disclaimer;
