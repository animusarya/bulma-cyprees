import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import config from '../utils/config';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Container = styled.div``;

const Wrapper = styled.div``;
const Layout = ({ children, showFooter }) => (
  <Container>
    <Helmet title={config.siteName} />

    <Wrapper className="columns">
      <div className="column is-2 px-0 left-column">
        <Sidebar />
      </div>
      <div className="column is-10 right-column">
        {children}
        {showFooter && <Footer />}
      </div>
    </Wrapper>
  </Container>
);

export default Layout;
