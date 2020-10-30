import React from 'react';
import styled from 'styled-components';

// import logo from '../assets/images/logo2.png';

const Container = styled.section`
  background-color: #0a253e;
  padding: 1rem 1.5rem;
  .navbar-item {
    background-color: transparent !important;
  }
  .navbar {
    background-color: #0a253e;
  }
  .button {
    border-radius: 30px;
  }
`;

// const Logo = styled.img`
//   max-height: 60px;
//   width: auto;
// `;

const AuthHeader = ({ activeProject }) => (
  <Container className="section">
    <div className="container">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            {/* {activeProject.logo ? (
              <Logo src={activeProject.logo} alt={activeProject.name} />
            ) : (
              <Logo src={logo} alt="Intellishare" />
            )} */}
          </a>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start"></div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">
                  <strong>Request Demo</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </Container>
);

export default AuthHeader;
