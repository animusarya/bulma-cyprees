/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as RiIcons from 'react-icons/ri';

const SidebarLink = styled(Link)`
  display: flex;
  color: red;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-size: 14px;
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  display: flex;
  align-items: center;
  color: #f5f5f5;
  font-size: 12px;
`;

const SubMenu = ({ item }) => {
  const [subNav, setSubNav] = useState(false);

  const showSubNav = () => setSubNav(!subNav);

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubNav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subNav ? (
            <RiIcons.RiArrowDownSFill />
          ) : item.subNav ? (
            <RiIcons.RiArrowRightSFill />
          ) : null}
        </div>
      </SidebarLink>
      {subNav &&
        item.subNav.map((item1) => (
          <DropdownLink to={item1.path} key={item1.title}>
            {item1.icon}
            <SidebarLabel>{item1.title}</SidebarLabel>
          </DropdownLink>
        ))}
    </>
  );
};

export default SubMenu;
