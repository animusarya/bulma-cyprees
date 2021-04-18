import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import config from '../utils/config';

import { Sidebar } from './sidebar';

const Container = styled.div`
  .right-column {
    background: ${(props) => props.theme.lightAccent};
  }
`;

const Layout = ({ children }) => (
  <Container>
    <Helmet title={config.siteName} />
    <div className="columns mr-0">
      <div className="column is-one-fifth is-paddingless">
        <Sidebar />
      </div>
      <div className="column right-column pb-0 p-5">{children}</div>
    </div>
  </Container>
);

export default Layout;
