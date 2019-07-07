import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

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

const Icon = styled.i`
  margin-right: 5%;
`;

const Sidebar = () => {
  const userData = useStoreState(state => state.user.data);
  const [isToggledOn, setToggle] = useState(false);
  const toggle = () => setToggle(!isToggledOn);

  return (
    <Container className="menu">
      {userData.type === 'superAdmin' && (
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
      )}
      {userData.type === 'admin' && (
        <ul className="menu-list">
          <li>
            <Link to="/admin/project/create">
              <Icon className="fas fa-plus-circle"></Icon>Create Project
            </Link>
          </li>
          <li>
            <Link to="/admin/dashboard" onClick={toggle}>
              <Icon className="fas fa-folder-open"></Icon>Manage Projects
            </Link>
            {isToggledOn ? (
              <React.Fragment>
                <Link to="/">
                  <Icon className="fas fa-plus-circle"></Icon>Dashboard
                </Link>
                <Link to="/">
                  <Icon className="fas fa-plus-circle"></Icon>Manage Pages
                </Link>
                <Link to="/">
                  <Icon className="fas fa-plus-circle"></Icon>Manage Emails
                </Link>
                <Link to="/">
                  <Icon className="fas fa-plus-circle"></Icon>Manage Clients
                </Link>
                <Link to="/">
                  <Icon className="fas fa-plus-circle"></Icon>Project Settings
                </Link>
                <Link to="/">
                  <Icon className="fas fa-plus-circle"></Icon>Help
                </Link>
              </React.Fragment>
            ) : null}
          </li>
        </ul>
      )}
      {userData.type === 'client' && (
        <ul className="menu-list">
          <li>
            <Link to="/client/dashboard">Files</Link>
          </li>
        </ul>
      )}
    </Container>
  );
};

export default Sidebar;
