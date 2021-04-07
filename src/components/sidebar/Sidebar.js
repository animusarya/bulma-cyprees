import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import { IconContext } from 'react-icons/lib';
import Logo from '../../assets/images/logo.png';

import SubMenu from './SubMenu';

const Nav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: ${(props) => props.theme.primaryBackgroundColor};
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 1rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: ${(props) => props.theme.sidebarBackground};
  height: 100%;
  overflow: auto;
  transition: 500ms;
  @media only screen and (max-width: 768px) {
    left: ${({ sidebar }) => (sidebar ? '0' : '100%')};
    position: fixed;
    width: 220px;
  }
`;

const ImageWrapper = styled.figure`
  width: auto !important;
  padding: 1.2rem;
`;

const sidebarData = [
  {
    title: 'Jobs',
    path: '#',
    icon: <AiIcons.AiOutlineMenu />,
    test: true,
    subNav: [
      {
        title: 'Add jobs',
        path: '/job/register',
      },
      {
        title: 'View Open Jobs',
        path: '/jobs/open',
      },
      {
        title: 'View Revisit Jobs',
        path: '/jobs/revisit',
      },
      {
        title: 'View Closed Jobs',
        path: '/jobs/closed',
      },
      {
        title: 'View Archived Jobs',
        path: '/job/5656565565',
      },
    ],
  },
  {
    title: 'Reports',
    path: '#',
    icon: <AiIcons.AiOutlineMenu />,
    test: false,
    subNav: [
      {
        title: 'Reports 2',
        path: '/',
        cName: 'sub-nav',
      },
      {
        title: 'Reports 3',
        path: '/super-admin/dashboard',
      },
    ],
  },
];

const Sidebar = () => (
  <IconContext.Provider value={{ color: '#fff' }}>
    <Nav className="is-hidden-desktop">
      <NavIcon className="has-text-primary-light" to="#">
        <FaIcons.FaBars />
      </NavIcon>
    </Nav>
    <SidebarNav>
      <div>
        <ImageWrapper className="is-hidden-mobile">
          <img src={Logo} alt="logo" />
        </ImageWrapper>
        {sidebarData.map((item) => (
          <SubMenu item={item} key={item.title} test={item.test} />
        ))}
      </div>
    </SidebarNav>
  </IconContext.Provider>
);

export default Sidebar;
