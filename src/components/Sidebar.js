import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { IconContext } from 'react-icons/lib';
import SubMenu from './sidebar/SubMenu';

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  color: red;
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: black;
  top: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  transition: 350ms;
  z-index: 10;
  @media only screen and (max-width: 768px) {
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  }
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const ImageWrapper = styled.div`
  height: 70px;
  margin: 1rem 1rem 1rem 1rem;
  align-items: center;
  display: flex;
`;

const sidebarData = [
  {
    title: 'Overview',
    path: '#',
    icon: <AiIcons.AiFillHome />,

    subNav: [
      {
        title: 'Revenue',
        path: '/super-admin/dashboard',
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: 'Reports',
    path: '#',
    icon: <IoIcons.IoIosPaper />,

    subNav: [
      {
        title: 'Reports 2',
        path: '/',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav',
      },
      {
        title: 'Reports 3',
        path: '/super-admin/dashboard',
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
];

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider className="love" value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>{' '}
        </Nav>

        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon className="is-hidden-desktop" to="#">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            <ImageWrapper>
              <img
                src="https://rdglazing.app/assets/images/logo-light.png"
                alt="logo"
              />
            </ImageWrapper>

            {sidebarData.map((item) => (
              <SubMenu item={item} key={item} />
            ))}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
