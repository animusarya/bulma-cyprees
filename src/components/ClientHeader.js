import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { startCase } from 'lodash';

import useProjectPages from '../hooks/useProjectPages';
import { Title } from './elements';
import theme from '../utils/theme';
import logoBg from '../assets/images/login-bg.jpg';
// import logo from '../assets/images/logo2.png';

const Container = styled.section`
  .container {
    max-width: 1100px;
  }
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
  h2 {
    @media only screen and (max-width: 768px) {
      font-size: 22px !important;
    }
  }
`;

const BurgerMenu = styled.div`
  justify-content: center;
  .navbar-burger {
    margin-left: 0 !important;
  }
`;

const Top = styled.div`
  padding: 1rem 1rem;
  .project-logo {
    padding: 5px 0;
  }
`;

const NavbarMenu = styled.nav`
  padding: 0 2rem !important;
  background-color: ${props => (props.brandColor ? props.brandColor : '#000')};
  color: #fff;

  @media only screen and (max-width: 768px) {
  padding: 0 !important;
  }
  /* .navbar-item {
    color: ${props => (props.data ? '#000' : '#fff')};
    :hover {
      background: #fff;
      opacity: 0.7;
      color: #000 !important;
    }
  } */
  .navbar-menu {
    background-color: ${props => props.brandColor};
  }
`;

const LinkStyle = styled(({ brandColor, ...props }) => <Link {...props} />)`
  color: #fff;
  background-color: ${props =>
    props.data ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  :hover {
    background: rgba(255, 255, 255, 0.2) !important;
    color: #fff !important;
  }
`;

const Logo = styled.img`
  width: auto;
  max-height: 70px;
  margin-top: 10px;
`;

const HeroImg = styled.img`
  height: 250px;
  width: auto;
  object-fit: cover;
  background-color: #eeeeee;
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
  font-size: ${props => props.theme.fontSizeSmall};
  color: ${props => props.theme.fontDark} !important;
`;

const LogoutButton = styled(Button)`
  margin-top: -2px;
  svg:not(:root).svg-inline--fa {
    color: ${props => props.brandColor} !important;
  }
`;

const TitleContainer = styled.div`
  margin-bottom: 2rem;
`;
const Hero = styled.section`
  .hero-body {
    position: absolute;
    align-self: center;
  }
  .title {
    color: ${props => props.brandColor};
  }
  .edit-banner {
    height: auto;
    width: 210px;
  }
  button {
    height: auto !important;
    border: none;
  }
`;

const ClientHeader = ({ me, project }) => {
  const [{ pages }] = useProjectPages(project.id);
  const [isActive, setIsActive] = useState(false);
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  // const activeSlug = pages[0] ? pages[0].slug : '';

  const [active, setActive] = useState('/client/dashboard');
  const brandColor = project.brandColor
    ? project.brandColor
    : theme.primaryColor;

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload(true);
    window.location.replace('/');
  };

  // if (!project.logo) {
  //   return null;
  // }

  return (
    <Container className="">
      <div className="container">
        <div className="columns">
          <Top className="column">
            <div className="project-logo">
              <Link to="/client/dashboard">
                {project.logo ? (
                  <Logo src={project.logo} alt="logo" />
                ) : (
                  <span></span>
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
                brandColor={brandColor}>
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
            <TitleContainer className="has-text-centered is-hidden-desktop is-hidden-tablet">
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
        brandColor={brandColor}>
        <div className="container">
          <BurgerMenu className="is-flex">
            <a
              className={`navbar-burger burger has-text-white ${
                isActive ? 'is-active' : ''
              }`}
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
              onClick={toggleMenu}>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </BurgerMenu>
          <div
            id="navbarBasicExample"
            className={isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
            <div className="navbar-start">
              {/* <LinkStyle
                to="/client/dashboard"
                className="navbar-item has-text-weight-bold"
                data={active == '/client/dashboard'}
                brandColor={brandColor}>
                Overview
              </LinkStyle> */}

              {pages.map(page => (
                <LinkStyle
                  key={page.id}
                  to={`/client/page/${page.id}`}
                  className="navbar-item has-text-weight-bold"
                  activelink={page.slug}
                  brandColor={brandColor}
                  onClick={() => setActive(page.slug)}
                  data={active == page.slug}>
                  {startCase(page.name)}
                </LinkStyle>
              ))}
            </div>
          </div>
        </div>
      </NavbarMenu>
      {project && (
        <Hero className="hero">
          <HeroImg src={project.heroImage || logoBg} alt="logo-bg" />
        </Hero>
      )}
    </Container>
  );
};

export default ClientHeader;
