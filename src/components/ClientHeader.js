import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { startCase } from 'lodash';

import useProjectPages from '../hooks/useProjectPages';
import { Title } from './elements';
import theme from '../utils/theme';
import logoBg from '../assets/images/login-bg.jpg';
import logo from '../assets/images/logo2.png';

const Container = styled.section`
  padding: 0rem 1.5rem;
  .column {
    display: flex;
    justify-content: space-between;
    @media only screen and (max-width: 768px) {
      justify-content: center;
    }
  }
  .is-text {
    padding: 0px;
  }
  .icon {
    margin-left: 0.5rem !important;
    font-size: 8px !important;
  }
`;

const Top = styled.div`
  padding: 1rem 1rem;
`;

const NavbarMenu = styled.nav`
  padding: 0 2rem !important;
  background-color: ${(props) => props.brandColor};
  font-size: ${(props) => props.theme.fontSizeMedium};
  .navbar-item {
    :hover {
      background-color: rgb(255, 255, 255, 0.2);
    }
  }
  .navbar-menu {
    background-color: #000000;
  }
`;
const Logo = styled.img`
  width: auto;
  height: 70px;
  margin-top: 10px;
`;
const HeroImg = styled.img`
  height: 250px;
  width: auto;
  position: center center;
  background-size: cover;
  @media only screen and (max-width: 768px) {
    height: 150px;
  }
`;

const Button = styled.button`
  background-color: #fff;
  border: transparent;
  margin-right: 0px !important;
  text-decoration: none !important;
  :hover {
    background-color: #fff !important;
  }
  a {
    :hover {
      background-color: #fff !important;
    }
  }
`;

const ClientName = styled(Button)`
  font-size: ${(props) => props.theme.fontSizeSmall};
  color: ${(props) => props.theme.fontDark} !important;
`;

const LogoutButton = styled(Button)`
  margin-top: -2px;
`;

const TitleContainer = styled.div`
  margin-bottom: 2rem;
`;

const ClientHeader = ({ me, project }) => {
  const [{ pages }] = useProjectPages(project.id);
  const [isActive, setIsActive] = useState(false);
  const toggleMenu = () => {
    setIsActive(!isActive);
  };
  const brandColor = project.brandColor
    ? project.brandColor
    : theme.primaryColor;

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload(true);
    window.location.replace('/');
  };

  return (
    <Container className="section">
      <div className="container">
        <div className="columns">
          <Top className="column">
            <div>
              <Link to="/client/dashboard">
                {project ? (
                  <Logo src={project.logo || logo} alt="logo" />
                ) : (
                  <span>Dashboard</span>
                )}
              </Link>
            </div>
            <div className="is-hidden-mobile">
              <ClientName className="button is-text">
                Welcome {me.profile ? me.profile.fullName : ''}
              </ClientName>
              <LogoutButton
                className="button is-text"
                onClick={() => handleLogout()}
              >
                <i className="fas fa-power-off icon"></i>
              </LogoutButton>
              {project && (
                <div className="has-text-right">
                  <Title marginbottom="0px" fontSize={4}>
                    {startCase(project.name) || ''}
                  </Title>
                </div>
              )}
            </div>
          </Top>
          {project && (
            <TitleContainer className="has-text-centered is-hidden-desktop">
              <Title marginbottom="0px" fontSize={4}>
                {startCase(project.name) || ''}
              </Title>
            </TitleContainer>
          )}
        </div>
      </div>
      <NavbarMenu
        className="navbar"
        role="navigation"
        aria-label="main navigation"
        brandColor={brandColor}
      >
        <div className="container">
          <div className="navbar-brand">
            <a
              className={`navbar-burger burger has-text-white ${
                isActive ? 'is-active' : ''
              }`}
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
              onClick={toggleMenu}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div
            id="navbarBasicExample"
            className={isActive ? 'navbar-menu is-active' : 'navbar-menu'}
          >
            <div className="navbar-start">
              <Link
                to="/client/dashboard"
                className="navbar-item has-text-white"
              >
                Overview
              </Link>
              {pages.map((page) => (
                <Link
                  key={page.id}
                  to={`/client/page/${page.id}`}
                  className="navbar-item has-text-white"
                >
                  {startCase(page.name)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </NavbarMenu>
      {project && (
        <section className="hero is-primary">
          <HeroImg src={project.heroImage || logoBg} alt="logo-bg" />
        </section>
      )}
    </Container>
  );
};

export default ClientHeader;
