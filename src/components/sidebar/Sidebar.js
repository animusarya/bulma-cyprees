import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';

import { IconContext } from 'react-icons/lib';
import Logo from '../../assets/images/logo.png';

import SubMenu from './SubMenu';

const Nav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: ${(props) => props.theme.mainBrandColor};
`;

const NavIcon = styled(Link)`
  margin-left: 2rem; //for mobile
  font-size: ${(props) => props.theme.fontSizeMedium};
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: ${(props) => props.theme.mainBrandColor};
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

const LogoutWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-size: ${(props) => props.theme.fontSize};
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const sidebarData = [
  {
    title: 'Jobs',
    path: '#',
    icon: <AiIcons.AiOutlineMenu />,
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
        path: '/jobs/close',
      },
      {
        title: 'View Archived Jobs',
        path: '/jobs/archived',
      },
    ],
  },
  {
    title: 'Customers',
    path: '#',
    icon: <AiIcons.AiOutlineMenu />,
    subNav: [
      {
        title: 'View All',
        path: '/customers',
      },
      {
        title: 'Add New Customer',
        path: '/customer/add-customer',
      },
    ],
  },
  {
    title: 'Contractors ',
    path: '#',
    icon: <AiIcons.AiOutlineMenu />,
    subNav: [
      {
        title: 'View All',
        path: '/contractors',
      },
      {
        title: 'Add New Contractor',
        path: '/contractor/new',
      },
    ],
  },
];

const Sidebar = () => {
  const toggleLoggedIn = useStoreActions(
    (actions) => actions.isLoggedIn.toggle,
  );

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <Nav className="is-hidden-desktop">
        <NavIcon className="has-text-black" to="#">
          <FaIcons.FaBars />
        </NavIcon>
      </Nav>
      <SidebarNav>
        <div>
          <ImageWrapper className="is-hidden-mobile">
            <img src={Logo} alt="logo" />
          </ImageWrapper>
          {sidebarData.map((item) => (
            <SubMenu item={item} key={item.title} />
          ))}
          <LogoutWrapper onClick={() => toggleLoggedIn(false)} className="ml-5">
            <div className="has-text-white is-align-items-center is-flex">
              <BiIcons.BiLogOutCircle />
              <SidebarLabel className="has-text-white">Logout</SidebarLabel>
            </div>
          </LogoutWrapper>
        </div>
      </SidebarNav>
    </IconContext.Provider>
  );
};
export default Sidebar;
