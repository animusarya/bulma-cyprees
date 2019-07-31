import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import MainColumn from './MainColumn';
import logoBg from '../assets/images/login-bg.jpg';
import logo from '../assets/images/logo.png';
import { Title } from './elements';

const Container = styled.div`
  .column {
    display: flex;
    justify-content: space-between;
  }
  .is-text {
    padding: 0px;
  }
  .icon {
    margin-left: 0.5rem !important;
    font-size: 8px !important;
  }
`;
const NavbarMenu = styled.nav`
  padding: 0px 16% !important;
  background-color: ${props => props.theme.primaryColor};
  .navbar-item {
    :hover {
      background-color: ${props => props.theme.primaryColor};
    }
  }
`;
const Logo = styled.img`
  width: 140px;
  height: auto;
  margin-top: 10px;
`;
const HeroImg = styled.img`
  height: 12rem;
  width: inherit;
`;
const Button = styled.button`
  background-color: #fff;
  border: transparent;
  margin-right: 0px !important;
  :hover {
    background-color: #fff !important;
  }
  a {
    :hover {
      background-color: #fff !important;
    }
  }
`;

const ClientHeader = () => {
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload(true);
    window.location.replace('/');
  };

  return (
    <Container>
      <MainColumn marginleft="8%" marginRight="8%" paddingless>
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <div>
              <Link to="/client/dashboard">
                <Logo src={logo} alt="logo" />
              </Link>
            </div>
            <div>
              <Button>
                <Link
                  to="/client/settings"
                  className="button is-text is-size-7">
                  Welcome Jonathan
                </Link>
              </Button>
              <Button className="button is-text" onClick={() => handleLogout()}>
                <i className="fas fa-power-off icon"></i>
              </Button>
              <div className="has-text-right">
                <Title marginbottom="0px">Project Arden</Title>
              </div>
            </div>
          </div>
        </div>
        <NavbarMenu
          className="navbar"
          role="navigation"
          aria-label="main navigation">
          <div className="navbar-brand">
            <Link
              to="/"
              role="button"
              className="navbar-burger burger has-text-white"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </Link>
          </div>
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link
                to="/client/dashboard"
                className="navbar-item has-text-white">
                Overview
              </Link>
              <Link to="/" className="navbar-item has-text-white">
                Information Memorandum
              </Link>
              <Link to="/" className="navbar-item has-text-white">
                Property
              </Link>
              <Link to="/" className="navbar-item has-text-white">
                Legal
              </Link>
              <Link to="/" className="navbar-item has-text-white">
                Operational
              </Link>
            </div>
          </div>
        </NavbarMenu>
        <section className="hero is-primary">
          <HeroImg src={logoBg} alt="logo-bg" />
        </section>
      </MainColumn>
    </Container>
  );
};

export default ClientHeader;
