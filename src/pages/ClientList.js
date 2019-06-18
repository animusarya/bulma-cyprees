import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Header from '../components/Header';

const Container = styled.section`
  
.logo {
  width: 28px;
  height: 28px;
}
 span {
  color: ${props => props.theme.primaryColor};
 }
 .subtitle {
  margin-top: 20px !important;
  margin-bottom: 19px;
 }
.form {
  margin: 19% 4%;
}
.input {
    border-top: hidden;
    border-left: hidden;
    border-right: hidden;
    border-radius: 3px
    -webkit-box-shadow: none;
    :focus {
      border-color: #dbdbdb;
    }
  }
`;

export default () => (
  <Layout>
    <Seo title="ClientList" description="Some description here." />
    <Header />
    <Container className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-one-third">First column</div>
          <div className="column">Second column</div>
        </div>
      </div>
    </Container>
  </Layout>
);
