import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import config from '../utils/config';

import { Sidebar } from './sidebar';

const Container = styled.div`
  .right-column {
    background: #f4f5f7;
  }
  .column.is-10 {
    padding: 22px 22px;
  }
`;

const Navbar = styled.nav`
  background: transparent;
  .icons {
    color: ${(props) => props.theme.fontExtraDark};
  }
`;

const Layout = ({ children }) => (
  <Container>
    <Helmet title={config.siteName} />
    <div className="columns">
      <div className="column is-2 px-0 left-column pb-0">
        <Sidebar />
      </div>
      <div className="column is-10 right-column pb-0">
        <Navbar className="py-3">
          <h1 className="title is-5 mb-1 has-text-grey-lighter ha-text-weight-bold">
            Dashboard
          </h1>
          <div className="is-flex has-text-grey-lighter">
            <Link
              to="/"
              className="is-size-6 has-text-grey-lighter ha-text-weight-bold">
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
