import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Seo from '../components/Seo';

const Container = styled.section`
  .title {
    font-size: 23px;
  }
  .subtitle {
    font-size: 17px;
  }
`;

export default () => (
  <Layout>
    <Seo title="Login" description="Some description here." />
    <Container className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <figure className="image is-4by3">
              <img src="/images/flat.jpg" alt="logo" />
            </figure>
          </div>
          <div className="column">
            <div>
              <h1 className="title has-text-weight-semibold has-text-black is-size-3">
                itelliShere
              </h1>
              <h2 className="subtitle has-text-weight-semibold  has-text-black is-size-4">
                Super Admin
              </h2>
              <div>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="e.g Alex Smith"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      placeholder="e.g. alexsmith@gmail.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </Layout>
);
