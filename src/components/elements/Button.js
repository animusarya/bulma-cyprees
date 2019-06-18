import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  border: 1px solid #c1d625;
  padding: 0px 30px;
  color: #c1d625;
  :hover {
    border-color: #c1d625;
    color: #c1d625;
  }
`;

const MyButton = ({ children }) => (
  <Container className="button">{children}</Container>
);

MyButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default MyButton;
