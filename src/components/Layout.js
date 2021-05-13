import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import config from '../utils/config';
import Header from './Header';

const Container = styled.div`
  .right-column {
    background: ${(props) => props.theme.lightAccent};
  }
  .column.is-one-fifth {
    /* min-height: 80vh; */
  }
`;

const Layout = ({ children }) => (
  <Container>
    <Helmet title={config.siteName} />
    <Header />
    <div className="">
      <div className="">{children}</div>
    </div>
  </Container>
);

export default Layout;
