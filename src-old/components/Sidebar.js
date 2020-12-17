import React from 'react';
import styled from 'styled-components';
import { Link, useRouteMatch } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { isNull } from 'lodash';

const Container = styled.aside`
  background-color: #f4f4f6;
  height: 100%;
  min-height: ${props => (props.showOnMobile ? '' : '100vh')};
  margin-bottom: 0px !important;
  li {
    cursor: pointer;
    :hover {
      background-color: #e2e4e6;
    }
    a {
      padding: 0.8em 1em;
    }
  }
  .sub-items {
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

const IconContainer = styled.div`
  width: 30px;
  margin-left: 10px;
`;

const Icon = styled.i``;

const LinkWrapper = ({ to, title, icon }) => {
  const route = useRouteMatch(to);
  return (
    <li>
      <Link
        className={
          route
            ? 'has-text-weight-bold is-active is-flex'
            : 'has-text-weight-medium is-flex'
        }
        to={to}>
        <IconContainer>{icon && <Icon className={icon}></Icon>}</IconContainer>
        {title}
      </Link>
    </li>
  );
};

const Sidebar = ({ showOnMobile }) => {
  const userData = useStoreState(state => state.user.data);
  const activeProject = useStoreState(state => state.active.project);
  // const [isToggledOn, setToggle] = useState(false);
  // const toggle = () => setToggle(!isToggledOn);
  // const isCurrentRoute = routeName => {
  //   // const route = useRouteMatch(routeName);
  //   // return !isNull(route) ? (route.isExact ? 'is-active' : '') : '';
  //   return '';
  // };
  // const route = useRouteMatch('/admin/help');

  return (
    <Container
      showOnMobile={showOnMobile}
      className={!showOnMobile ? 'menu is-hidden-mobile' : 'menu'}>
      {userData.type === 'superAdmin' && (
        <ul className="menu-list">
          <LinkWrapper title="Users" to="/super-admin/dashboard" />
          <LinkWrapper title="Set Pricing" to="/super-admin/pricing" />
          <LinkWrapper title="Discount Codes" to="/super-admin/discounts" />
          <LinkWrapper title="Manage Help" to="/super-admin/help" />
        </ul>
      )}
      {userData.type === 'admin' && (
        <ul className="menu-list">
          <LinkWrapper
            icon="fas fa-plus-circle"
            title="Create Project"
            to="/admin/project/create"
          />
          <LinkWrapper
            icon="fas fa-folder-open"
            title="Manage Projects"
            to="/admin/dashboard"
          />

          {!isNull(activeProject) ? (
            <div className="sub-items">
              <LinkWrapper
                icon="fas fa-th-large"
                title="Manage Pages"
                to={`/admin/project/${activeProject}/pages`}
              />
              <LinkWrapper
                icon="far fa-envelope"
                title="Manage Emails"
                to={`/admin/project/${activeProject}/emails`}
              />
              <LinkWrapper
                icon="fas fa-user-friends"
                title="Manage Clients"
                to={`/admin/project/${activeProject}/clients`}
              />
              <LinkWrapper
                icon="fas fa-bell"
                title="Notifications"
                to={`/admin/project/${activeProject}/notifications`}
              />
              <LinkWrapper
                icon="fas fa-chart-pie"
                title="Analytics"
                to={`/admin/project/${activeProject}/analytics`}
              />
              <LinkWrapper
                icon="fas fa-cogs"
                title="Project Settings"
                to={`/admin/project/${activeProject}/settings`}
              />
              <LinkWrapper
                icon="fas fa-sync"
                title="Subscriptions"
                to={`/admin/project/${activeProject}/subscription`}
              />
              <LinkWrapper
                icon="far fa-question-circle"
                title="Help"
                to="/admin/help"
              />
            </div>
          ) : null}
        </ul>
      )}
      {userData.type === 'client' && (
        <ul className="menu-list">
          <LinkWrapper title="Files" to="/client/dashboard" />
        </ul>
      )}
    </Container>
  );
};

export default Sidebar;
