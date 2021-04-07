/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import * as RiIcons from 'react-icons/ri';
import { findIndex } from 'lodash';

const SidebarLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-size: 16px;
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 16px;
  background-color: ${(props) =>
    props.active
      ? `${props.theme.mainBrandColor}`
      : `${props.theme.secondaryColor}50`};
`;

const SubMenu = ({ item }) => {
  const [subNav, setSubNav] = useState(false);
  const currentPath = useLocation().pathname;

  useEffect(() => {
    const index = findIndex(item.subNav, { path: currentPath });
    if (index >= 0 || currentPath === '/jobs/all') {
      setSubNav(true);
    }
  }, [item]);

  return (
    <>
      <SidebarLink to={item.path} onClick={() => setSubNav(!subNav)}>
        <div className="has-text-white is-align-items-center is-flex">
          {item.icon}
          <SidebarLabel className="has-text-white">{item.title}</SidebarLabel>
        </div>
        {item.subNav && subNav ? (
          <RiIcons.RiArrowDownSFill className="hello" />
        ) : item.subNav ? (
          <RiIcons.RiArrowRightSFill />
        ) : null}
      </SidebarLink>
      {subNav &&
        item.subNav.map((item1) => (
          <DropdownLink
            className="has-text-white child pl-6"
            active={useRouteMatch(item1.path)}
            to={item1.path}
            key={item1.title}>
            <SidebarLabel>{item1.title}</SidebarLabel>
          </DropdownLink>
        ))}
    </>
  );
};

export default SubMenu;
