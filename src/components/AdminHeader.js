import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logoBg from '../assets/images/login-bg.jpg';
import logo from '../assets/images/logo.png';
import { Title, Button } from './elements';

import Modal from './Modal';
import useModal from './UseModal';

const Container = styled.div`
  margin-top: 1rem;
  .column {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .column .logo-edit {
    display: flex;
  }
  .column .edit {
    align-self: center;
    font-weight: 500;
  }
  .is-text {
    padding: 0px;
  }
  .icon {
    margin-left: 1rem !important;
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
`;
const HeroImg = styled.img`
  height: 10rem;
  width: inherit;
`;
const Hero = styled.section`
  .hero-body {
    position: absolute;
    align-self: center;
  }
  .title {
    color: ${props => props.theme.primaryColor};
  }
  .edit-banner {
    background: white;
    height: 4.5rem;
    width: 11rem;
    padding-top: 10%;
  }
`;

const ClientHeader = () => {
  const { isShowing, toggle } = useModal();

  return (
    <Container>
      <div className="columns">
        <div className="column is-8 is-offset-2">
          <div className="logo-edit">
            <Link to="/client/dashboard" className="navbar-item">
              <Logo src={logo} alt="logo" />
            </Link>
            <Button paddingless secondary className="edit">
              Edit
            </Button>
          </div>
          <div>
            <div className="has-text-right">
              <Title marginbottom="0px">[ Project Name here ]</Title>
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
            <Link to="/" className="navbar-item has-text-white">
              Property
            </Link>
            <Link to="/" className="navbar-item has-text-white">
              Property Details
            </Link>
            <Link to="/" className="navbar-item has-text-white">
              + Add Page
            </Link>
          </div>
        </div>
      </NavbarMenu>
      <Hero className="hero">
        <HeroImg src={logoBg} alt="logo-bg" />
        <div className="hero-body has-text-centered">
          <Button paddingless secondary onClick={toggle}>
            <div className="edit-banner">
              <h6 className="title is-6 has-text-weight-semibold">
                Change banner
              </h6>
              <h6 className="subtitle is-size-7 is-italic">
                image size 1600 x 400px
              </h6>
            </div>
          </Button>
          <Modal isShowing={isShowing} hide={toggle} />
        </div>
      </Hero>
    </Container>
  );
};

export default ClientHeader;
