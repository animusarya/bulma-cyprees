import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import config from '../utils/config';

import { Sidebar } from './sidebar';

const Container = styled.div``;

const Layout = ({ children, sidebar }) => (
  <Container>
    <Helmet title={config.siteName} />
    <div className="columns">
      {sidebar && (
        <div className="column is-2 px-0 left-column">
          <Sidebar />
        </div>
      )}
      <div className="column is-10 right-column">{children}</div>
    </div>
  </Container>
);

export default Layout;
