import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { startCase } from 'lodash';

import useProjectPages from '../hooks/useProjectPages';
import { Title } from './elements';
import theme from '../utils/theme';
import logoBg from '../assets/images/login-bg.jpg';
import logo from '../assets/images/logo.png';

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

const Top = styled.div`
  padding: 1rem 4rem;
`;

const NavbarMenu = styled.nav`
  padding: 0 2rem !important;
  background-color: ${props => props.brandColor};
  .navbar-item {
    :hover {
      background-color: ${props => props.brandColor};
    }
  }
`;
const Logo = styled.img`
  width: auto;
  max-height: 40px;
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

const ClientHeader = ({ me, project }) => {
  const [{ pages }] = useProjectPages(project.id);
  const brandColor = project.brandColor
    ? project.brandColor
    : theme.primaryColor;

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload(true);
    window.location.replace('/');
  };

  return (
    <Container>
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
                <Title marginbottom="0px">
                  {startCase(project.name) || ''}
                </Title>
              </div>
            )}
          </div>
        </Top>
      </div>
      <NavbarMenu
        className="navbar"
        role="navigation"
        aria-label="main navigation"
        brandColor={brandColor}>
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

export default ClientHeader;
