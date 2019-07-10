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
            <Link to="/super-admin/dashboard">Users</Link>
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
            <Link to="/admin/create/account">
              <Icon className="fas fa-plus-circle"></Icon>Create Project
            </Link>
          </li>
          <li>
            <Link to="/admin/manage/project" onClick={toggle}>
              <Icon className="fas fa-folder-open"></Icon>Manage Projects
            </Link>
            {isToggledOn ? (
              <React.Fragment>
                <Link to="/admin/dashboard">
                  <Icon className="fas fa-th-large"></Icon>Dashboard
                </Link>
                <Link to="/admin/project/{id}">
                  <Icon className="far fa-file"></Icon>Manage Pages
                </Link>
                <Link to="/admin/manage/emails">
                  <Icon className="far fa-envelope"></Icon>Manage Emails
                </Link>
                <Link to="/admin/manage/clients">
                  <Icon className="fas fa-user-friends"></Icon>Manage Clients
                </Link>
                <Link to="/">
                  <Icon className="fas fa-cogs"></Icon>Project Settings
                </Link>
                <Link to="/admin/help">
                  <Icon className="far fa-question-circle"></Icon>Help
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
