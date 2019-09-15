import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { startCase } from 'lodash';

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
  height: 10rem;
  width: auto;
  object-fit: cover;
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

const ClientHeader = ({ me, pages, project }) => {
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload(true);
    window.location.replace('/');
  };

  return (
    <Container>
      <div className="columns">
        <div className="column">
          <div>
            <Link to="/client/dashboard">
              {project ? (
                <Logo src={project.logo || logo} alt="logo" />
              ) : (
                <span>Dashboard</span>
              )}
            </Link>
          </div>
          <div>
            <Button>
              <Link to="/client/settings" className="button is-text is-size-7">
                Welcome {me.profile ? me.profile.fullName : ''}
              </Link>
            </Button>
            <Button className="button is-text" onClick={() => handleLogout()}>
              <i className="fas fa-power-off icon"></i>
            </Button>
            {project && (
              <div className="has-text-right">
                <Title marginbottom="0px">{project.name || ''}</Title>
              </div>
            )}
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
            <Link to="/client/dashboard" className="navbar-item has-text-white">
              Overview
            </Link>
            {pages.map(page => (
              <Link
                key={page.id}
                to={`/client/page/${page.id}`}
                className="navbar-item has-text-white">
                {startCase(page.name)}
              </Link>
            ))}
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

ClientHeader.defaultProps = {
  pages: [],
};

ClientHeader.propTypes = {
  pages: PropTypes.array,
};

export default ClientHeader;
