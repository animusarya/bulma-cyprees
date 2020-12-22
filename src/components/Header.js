import React, { useState } from 'react';
import styled from 'styled-components';
import { useStoreState } from 'easy-peasy';
import { Link } from 'react-router-dom';

// import logoAlt from '../assets/images/logo.svg';
import Sidebar from './Sidebar';

const Container = styled.div`
  background-color: ${(props) => props.theme.primaryColor};
  .navbar {
    background-color: ${(props) => props.theme.primaryColor};
  }
  .navbar-item {
    background: transparent !important;
  }
  .navbar-end {
    background-color: ${(props) => props.theme.primaryColor};
  }
  @media screen and (max-width: 1023px) {
    .navbar-menu {
      padding: 0;
    }
  }
`;

// const AdminNav = styled.nav`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   @media screen and (max-width: 768px) {
//     flex-direction: column-reverse;
//   }
//   .navbar-end {
//     justify-content: space-between;
//   }
//   .navbar-item {
//     padding-right: 0.2rem;
//   }
// `;

const LinkLogo = styled(Link)`
  :hover {
    background: transparent !important;
  }
`;

const LinkWrapper = styled(Link)`
  color: ${(props) => props.theme.secondaryColor};
  :hover {
    color: ${(props) => props.theme.secondaryColor};
  }
`;

// const Logo = styled.img`
//   width: 140px;
//   height: auto;
// `;

const Button = styled.button`
  background-color: transparent;
  border: transparent;
  color: ${(props) => props.theme.secondaryColor};
  margin-right: 0px !important;
  :hover {
    color: ${(props) => props.theme.secondaryColor};
  }
`;

const AdminBurgerMenu = styled.div`
  /* background: ${(props) => props.theme.menuBackgroundColor}; */
  .admin-nav-mobile {
    align-items: center;
    justify-content: space-between;
    margin-bottom: -0.25rem;
    padding-bottom: 0.5rem;
  }
`;

const Header = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const userData = useStoreState((state) => state.user.data);
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload(true);
    window.location.replace('/');
  };

  // console.log(userData, 'userData');

  return (
    <div>
      {userData.type === 'superAdmin' && (
        <Container>
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation">
            <div className="navbar-brand">
              <LinkLogo className="navbar-item" to="/super-admin/dashboard">
                <h1 className="has-text-white">Review our Services</h1>
              </LinkLogo>
              <a
                role="button"
                className="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample">
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </a>
            </div>
            <div className="navbar-menu">
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <Button className="button" onClick={() => handleLogout()}>
                      <i className="fas fa-power-off" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </Container>
      )}
      {userData.type === 'admin' && (
        <Container>
          <AdminBurgerMenu
            id="navbarBasicExample"
            className="navbar-menu is-active is-hidden-desktop">
            <div className="navbar-end is-flex admin-nav-mobile">
              <span className="navbar-item has-text-white is-size-7">
                {userData && userData.profile && userData.profile.companyName}
              </span>
              <span className="navbar-item has-text-white">
                <div className="buttons">
                  <Button className="">
                    <LinkWrapper to="/admin/settings">
                      <i className="fas fa-cog" />
                    </LinkWrapper>
                  </Button>
                  <Button className="" onClick={() => handleLogout()}>
                    <i className="fas fa-power-off" />
                  </Button>
                </div>
              </span>
            </div>
          </AdminBurgerMenu>
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation">
            <div className="navbar-brand">
              <Link className="navbar-item" to="/user/dashboard">
                <h1 className="has-text-white">Review our Services Logo</h1>
              </Link>
              <a
                className={
                  showSideBar
                    ? 'is-active navbar-burger has-text-white'
                    : 'navbar-burger has-text-white'
                }
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
                onClick={() => setShowSideBar(!showSideBar)}>
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </a>
            </div>
            <AdminBurgerMenu id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-end">
                <span className="navbar-item has-text-white">
                  {userData && userData.profile && userData.profile.companyName}
                </span>
                <span className="navbar-item has-text-white">
                  <div className="buttons">
                    <Button className="button">
                      <LinkWrapper to="/admin/settings">
                        <i className="fas fa-cog" />
                      </LinkWrapper>
                    </Button>
                    <Button className="button" onClick={() => handleLogout()}>
                      <i className="fas fa-power-off" />
                    </Button>
                  </div>
                </span>
              </div>
            </AdminBurgerMenu>
          </nav>
          {showSideBar && (
            <div className="is-hidden-desktop">
              <Sidebar showOnMobile />
            </div>
          )}
        </Container>
      )}
    </div>
  );
};
export default Header;
