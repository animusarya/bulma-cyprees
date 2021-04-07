import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import config from '../utils/config';

import { Sidebar } from './sidebar';

const Container = styled.div`
  .right-column {
    background: ${(props) => props.theme.lightAccent};
  }
`;

const Navbar = styled.nav`
  background: transparent;
  .icons {
    color: ${(props) => props.theme.fontDark};
  }
`;

const Layout = ({ children }) => (
  <Container>
    <Helmet title={config.siteName} />
    <div className="columns mr-0">
      <div className="column is-one-fifth is-paddingless">
        <Sidebar />
      </div>
      <div className="column right-column pb-0 p-5">
        <Navbar className="py-4">
          <h1 className="title is-5 mb-1 has-text-black ha-text-weight-bold">
            Dashboard
          </h1>
          <div className="is-flex">
            <Link
              to="#"
              className="is-size-6 has-text-black ha-text-weight-bold">
              Jobs
            </Link>
            <span>&nbsp;&nbsp;&gt;&nbsp;&nbsp;</span>
            <p className="icons">All</p>
          </div>
        </Navbar>
        {children}
      </div>
    </div>
  </Container>
);

export default Layout;
