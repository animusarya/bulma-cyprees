/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as RiIcons from 'react-icons/ri';

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

const SubMenu = ({ item, test }) => {
  const [subNav, setSubNav] = useState(test);
  const showSubNav = () => setSubNav(!subNav);

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubNav}>
        <div className="has-text-black is-align-items-center is-flex">
          {item.icon}
          <SidebarLabel className="has-text-black">{item.title}</SidebarLabel>
        </div>
        {item.subNav && subNav ? (
          <RiIcons.RiArrowDownSFill />
        ) : item.subNav ? (
          <RiIcons.RiArrowRightSFill />
        ) : null}
      </SidebarLink>
      {subNav &&
        item.subNav.map((item1) => (
          <DropdownLink
            className="has-text-black child pl-6"
            to={item1.path}
            key={item1.title}>
            <SidebarLabel>{item1.title}</SidebarLabel>
          </DropdownLink>
        ))}
    </>
  );
};

export default SubMenu;
