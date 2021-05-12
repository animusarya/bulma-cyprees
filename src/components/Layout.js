import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import config from '../utils/config';

const Container = styled.div`
  .right-column {
    background: ${(props) => props.theme.lightAccent};
  }
  .column.is-one-fifth {
    /* min-height: 80vh; */
  }
`;

const Layout = ({ children, hideSidebar }) => (
  <Container>
    <Helmet title={config.siteName} />

    <div className="columns mr-0">
      {!hideSidebar && (
        <div className="column is-one-fifth is-paddingless">helllo </div>
      )}
      <div className="column right-column pb-0 p-5">{children}</div>
    </div>
  </Container>
);

export default Layout;
