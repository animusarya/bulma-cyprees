import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  border: 1px solid #c1d625;
  padding: 0px 30px;
  margin-top: 21px;
  color: ${props => props.theme.primaryColor};
  :hover {
    border-color: ${props => props.theme.primaryColor};
    color: ${props => props.theme.primaryColor};
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
