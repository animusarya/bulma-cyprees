import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Container = styled.aside`
  background-color: #f4f4f6;
  min-height: 100vh;
  margin-bottom: 0px !important;
  li {
    background-color: #e2e4e6;
    cursor: pointer;
    a {
      padding: 0.8em 1em;
    }
  }
`;

const Sidebar = () => (
  <Container className="menu">
    <ul className="menu-list">
      <li>
        <Link to="/super-admin/dashboard">Clients</Link>
      </li>
      <li>
        <Link to="/super-admin/pricing">Set Pricing</Link>
      </li>
      <li>
        <Link to="/super-admin/discounts">Discount Codes</Link>
      </li>
    </ul>
  </Container>
);

export default Sidebar;
