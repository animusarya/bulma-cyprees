import React from 'react';
import styled from 'styled-components';
import { Link, useRouteMatch } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
// import { isNull } from 'lodash';

const Container = styled.aside`
  background-color: #f4f4f6;
  height: 100%;
  min-height: ${(props) => (props.showOnMobile ? '' : '100vh')};
  margin-bottom: 0px !important;
  li {
    cursor: pointer;
    :hover {
      background-color: #e2e4e6;
    }
    a,
    .logout-button {
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
        <IconContainer>{icon && <Icon className={icon} />}</IconContainer>
        {title}
      </Link>
      <ul className="has-children">
        <li>
          <a>Members</a>
        </li>
      </ul>
    </li>
  );
};

const Sidebar = ({ showOnMobile }) => {
  const userData = useStoreState((state) => state.user.data);
  const activeProject = useStoreState((state) => state.active.project);

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload(true);
    window.location.replace('/');
  };
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
            icon="fas fa-bars"
            title="Jobs"
            to={`/admin/project/${activeProject}/pages`}
          />
          <LinkWrapper
            icon="far fa-calendar-times"
            title="Reviews"
            to={`/admin/project/${activeProject}/reviews`}
          />

          <LinkWrapper
            icon="fas fa-bars"
            title="Style Reviews"
            to={`/admin/project/${activeProject}/styles`}
          />
          <LinkWrapper
            icon="fas fa-bars"
            title="Settings"
            to={`/admin/project-settings/${activeProject}`}
          />
          <LinkWrapper
            icon="fas fa-sync"
            title="Subscriptions"
            to={`/admin/project/${activeProject}/subscription`}
          />

          <li>
            <div
              className="has-text-weight-bold is-active is-flex logout-button"
              onClick={() => handleLogout()}>
              <IconContainer>
                <Icon className="fas fa-power-off" />
              </IconContainer>
              Log Out
            </div>
          </li>
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
