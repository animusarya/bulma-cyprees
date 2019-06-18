import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { Button } from '../components/elements';

const Container = styled.section`
  
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
              <h1 className="title has-text-weight-semibold has-text-black is-size-3">
                itelliShere
              </h1>
              <h2 className="subtitle has-text-weight-semibold  has-text-black is-size-4">
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
              <Button>Login</Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </Layout>
);
