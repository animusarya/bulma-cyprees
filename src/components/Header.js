import React from 'react';
import styled from 'styled-components';
import { useStoreState } from 'easy-peasy';
import { Link } from 'react-router-dom';

import logoAlt from '../assets/images/logo-alt.png';

const Container = styled.div`
  background-color: ${(props) => props.theme.secondaryColor};
  .navbar {
    background-color: ${(props) => props.theme.secondaryColor};
  }
  .name {
    color: #e8e9ea;
  }
  .navbar-item {
    background: transparent !important;
  }
`;

const LinkLogo = styled(Link)`
  :hover {
    background: transparent !important;
  }
`;

const LinkWrapper = styled(Link)`
  color: #e8e9ea;
  :hover {
    color: #e8e9ea;
  }
`;

const Logo = styled.img`
  width: 140px;
  height: auto;
`;

const Button = styled.button`
  background-color: transparent;
  border: transparent;
  color: #e8e9ea;
  margin-right: 0px !important;
  :hover {
    color: #e8e9ea;
  }
`;

const Header = () => {
  const userData = useStoreState((state) => state.user.data);
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload(true);
    window.location.replace('/');
  };

  return (
    <div>
      {userData.type === 'superAdmin' && (
        <Container>
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <LinkLogo className="navbar-item" to="/super-admin/dashboard">
                <Logo src={logoAlt} alt="logo" />
              </LinkLogo>
              <a
                role="button"
                className="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>
            <div className="navbar-menu">
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <Button className="button" onClick={() => handleLogout()}>
                      <i className="fas fa-power-off"></i>
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
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <Link className="navbar-item" to="/admin/dashboard">
                <Logo src={logoAlt} alt="logo" />
              </Link>
              <a
                role="button"
                className="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>
            <div className="navbar-menu">
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="name">{userData.email}</div>
                  <div className="buttons">
                    <Button className="button">
                      <LinkWrapper to="/admin/settings">
                        <i className="fas fa-cog"></i>
                      </LinkWrapper>
                    </Button>
                    <Button className="button" onClick={() => handleLogout()}>
                      <i className="fas fa-power-off"></i>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </Container>
      )}
    </div>
  );
};
export default Header;
