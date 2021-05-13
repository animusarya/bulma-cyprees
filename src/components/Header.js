import React, { useState } from 'react';
import styled from 'styled-components';

import theme from '../utils/theme';
import Logo from '../assets/images/logo.png';

const Section = styled.div`
  nav {
    background: transparent;
    padding: 0rem 2rem 0rem 2rem;
  }
  font-family: ${theme.primaryFontFamily};
  .navbar-brand {
    margin-left: -1.5rem !important;
    .navbar-item img {
    }
  }
  .navbar-item {
    :hover {
      background-color: transparent;
    }
  }
  .navbar-menu {
    margin-right: -1.5rem !important;
  }
  .navbar-burger {
    background: ${theme.mainBrandColor};
    color: ${theme.darkAccent};
    border-radius: 4px;
  }
  .navbar-end {
    a {
      font-family: ${theme.primaryFontFamily};
      color: ${theme.textColorLite};
      :focus {
        background-color: transparent;
      }
    }
  }
  .animated-line {
    position: relative;
    padding: 0;
    &::before {
      transition: 300ms ease-out;
      height: 0.1rem;
      content: '';
      position: absolute;
      background-color: ${theme.mainBrandColor} !important;
      width: 0%;
      bottom: 1.5rem;
    }
    &:hover::before {
      width: 65%;
    }
  }
  button.is-secondary.is-normal {
    background: transparent !important;
  }
  @media screen and (max-width: 700px) {
    .navbar-menu {
      background: transparent;
      background-color: ${theme.darkAccent} !important;
      position: absolute;
      width: 100%;
      transition: 0.6s;
    }
    .navbar-brand {
      margin-left: -1.5rem !important;
    }
  }
`;

const Header = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Section className="my-4">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item">
              <img src={Logo} alt="site-log" />
            </a>
            <button
              type="button"
              href="/"
              className={
                isActive
                  ? 'is-active navbar-burger  mt-5'
                  : 'navbar-burger  mt-5'
              }
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
              onClick={() => setIsActive(!isActive)}>
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>

          <div className={isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
            <div className="navbar-end">
              <a
                href="/"
                className="navbar-item has-text-weight-normal is-size-4 p-5 animated-line">
                Home
              </a>
              <a
                href="/about"
                className="navbar-item has-text-weight-normal is-size-4  p-5 animated-line">
                About
              </a>
              <a
                href="/"
                className="navbar-item has-text-weight-normal is-size-4  p-5 animated-line">
                Services
              </a>
              <a
                href="/"
                className="navbar-item has-text-weight-normal is-size-4 p-5 animated-line">
                Gallery
              </a>
              <a
                href="/"
                className="navbar-item has-text-weight-normal is-size-4  p-5 animated-line">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>
    </Section>
  );
};

export default Header;
