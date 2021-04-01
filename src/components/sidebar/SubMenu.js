/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as RiIcons from 'react-icons/ri';

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #414757;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
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
