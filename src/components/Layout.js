import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import config from '../utils/config';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import MainColumn from './MainColumn';

const Container = styled.div``;

const Wrapper = styled.div``;
const Layout = ({ children, showFooter }) => (
  <Container>
    <Helmet title={config.siteName} />
    <Header />

    <Wrapper className="columns">
      <div className="column px-0 left-column is-2">
        <Sidebar />
      </div>
      <div className="column is-10 right-column">
        <MainColumn>
          {children}
          {showFooter && <Footer />}
        </MainColumn>
      </div>
    </Wrapper>
  </Container>
);

export default Layout;
