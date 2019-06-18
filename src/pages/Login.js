import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { Button } from '../components/elements';
import Footer from '../components/Footer';

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
    <Seo title="Login" description="Some description here." />
    <Container className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <figure className="image is-4by2">
              <img src="/images/black.jpg" alt="logo" />
            </figure>
          </div>
          <div className="column">
            <div className="form">
              <div className="media">
                <div className="">
                  <figure className="image is-32x32">
                    <img src="/images/favicon.ico" className="logo" />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title has-text-weight-normal has-text-black is-size-3">
                    Intelli
                    <span className="has-text-weight-normal is-size-3">
                      Share
                    </span>
                  </p>
                </div>
              </div>
              <h2 className="subtitle has-text-weight-semibold  has-text-black is-size-5">
                Super Admin
              </h2>
              <div>
                <div className="field">
                  <label className="label">Username:</label>
                  <div className="control">
                    <input className="input" type="text" />
                  </div>
                </div>
                <div className="field">
                  <label className="label">password:</label>
                  <div className="control">
                    <input className="input" type="text" />
                  </div>
                </div>
              </div>
              <div>
                <div className="field">
                  <p className="control">
                    <Button>Login</Button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  </Layout>
);
