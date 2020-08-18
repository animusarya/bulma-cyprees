import React from 'react';
import styled from 'styled-components';
import { Link, useRouteMatch } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { isNull } from 'lodash';

const Container = styled.aside`
  background-color: #f4f4f6;
  height: 100%;
  min-height: 100vh;
  margin-bottom: 0px !important;
  li {
    cursor: pointer;
    :hover {
      background-color: #e2e4e6;
    }
    a {
      padding: 0.8em 1em;
      font-weight: 500;
    }
  }
  .sub-items {
    margin-left: 15px;
    a {
      :hover {
        background-color: #e1e1e4;
      }
    }
  }
  .menu-list a.is-active {
    background-color: #e2e4e6 !important;
    color: #4a4a4a;
  }
`;

const Icon = styled.i`
  margin-right: 5%;
`;

const Sidebar = () => {
  const userData = useStoreState(state => state.user.data);
  const activeProject = useStoreState(state => state.active.project);
  // const [isToggledOn, setToggle] = useState(false);
  // const toggle = () => setToggle(!isToggledOn);
  const isCurrentRoute = routeName => {
    // const route = useRouteMatch(routeName);
    // return !isNull(route) ? (route.isExact ? 'is-active' : '') : '';
    return '';
  };

  return (
    <Container className="menu is-hidden-mobile">
      {userData.type === 'superAdmin' && (
        <ul className="menu-list">
          <li>
            <Link
              className={isCurrentRoute('/super-admin/dashboard')}
              to="/super-admin/dashboard">
              Users
            </Link>
          </li>
          <li>
            <Link
              className={isCurrentRoute('/super-admin/pricing')}
              to="/super-admin/pricing">
              Set Pricing
            </Link>
          </li>
          <li>
            <Link
              className={isCurrentRoute('/super-admin/discounts')}
              to="/super-admin/discounts">
              Discount Codes
            </Link>
          </li>
          <li>
            <Link
              className={isCurrentRoute('/super-admin/help')}
              to="/super-admin/help">
              Manage Help
            </Link>
          </li>
        </ul>
      )}
      {userData.type === 'admin' && (
        <ul className="menu-list">
          <li>
            <Link
              className={isCurrentRoute('/admin/project/create')}
              to="/admin/project/create">
              <Icon className="fas fa-plus-circle"></Icon>Create Project
            </Link>
          </li>
          <li>
            <Link
              className={isCurrentRoute('/admin/dashboard')}
              to="/admin/dashboard">
              <Icon className="fas fa-folder-open"></Icon>Manage Projects
            </Link>
          </li>
          {!isNull(activeProject) ? (
            <div className="sub-items">
              <Link
                className={isCurrentRoute('/admin/project/:id')}
                to={`/admin/project/${activeProject}`}>
                <Icon className="fas fa-th-large"></Icon>Manage Pages
              </Link>
              <Link
                className={isCurrentRoute('/admin/project/:id/emails')}
                to={`/admin/project/${activeProject}/emails`}>
                <Icon className="far fa-envelope"></Icon>Manage Emails
              </Link>
              <Link
                className={isCurrentRoute('/admin/project/:id/clients')}
                to={`/admin/project/${activeProject}/clients`}>
                <Icon className="fas fa-user-friends"></Icon>Manage Clients
              </Link>
              <Link
                className={isCurrentRoute('/admin/project/:id/notifications')}
                to={`/admin/project/${activeProject}/notifications`}>
                <Icon className="fas fa-bell"></Icon> Notifications
              </Link>
              <Link
                className={isCurrentRoute('/admin/project/:id/settings')}
                to={`/admin/project/${activeProject}/settings`}>
                <Icon className="fas fa-cogs"></Icon>Project Settings
              </Link>
              <Link
                className={isCurrentRoute('/admin/project/:id/subscription')}
                to={`/admin/project/${activeProject}/subscription`}>
                <Icon className="fas fa-sync"></Icon>Subscriptions
              </Link>
              <Link className={isCurrentRoute('/admin/help')} to="/admin/help">
                <Icon className="far fa-question-circle"></Icon>Help
              </Link>
            </div>
          ) : null}
        </ul>
      )}
      {userData.type === 'client' && (
        <ul className="menu-list">
          <li>
            <Link
              className={isCurrentRoute('/client/dashboard')}
              to="/client/dashboard">
              Files
            </Link>
          </li>
        </ul>
      )}
    </Container>
  );
};

export default Sidebar;
