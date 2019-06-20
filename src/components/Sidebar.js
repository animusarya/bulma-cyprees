import React from 'react';
import styled from 'styled-components';

const Container = styled.aside`
  background-color: #f4f4f6;
  min-height: 100vh;
  li {
    background-color: #e2e4e6;
    cursor: pointer;
    a {
      padding: .8em 1em;
    }
  }
`;

const Sidebar = () => (
  <Container className="menu">
    <ul className="menu-list">
      <li><a href="#">Clients</a></li>
      <li><a href="#">Set Pricing</a></li>
      <li><a href="#">Discount Codes</a></li>
    </ul>
  </Container>
);

export default Sidebar;
