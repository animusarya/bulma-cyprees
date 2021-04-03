import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import config from '../utils/config';

import { Sidebar } from './sidebar';

const Container = styled.div`
  .right-column {
    background: ${(props) => props.theme.primaryBackgroundColor};
  }
`;

const Navbar = styled.nav`
  background: transparent;
  h2 {
    ::before {
      padding-right: 0.5rem;
      content: '>';
    }
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
          <div className="is-flex">
            <a
              href="/hello"
              className="subtitle is-6 has-text-grey-lighter ha-text-weight-bold">
              Jobs
            </a>
            <h2 className=" has-text-weight-normal has-text-grey-lighter">
              All
            </h2>
          </div>
        </Navbar>
        {children}
      </div>
    </div>
  </Container>
);

export default Layout;
