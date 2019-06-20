import React from 'react';
import styled from 'styled-components';
import Seo from '../components/Seo';

import Layout from '../components/Layout';
import { Button } from '../components/elements';
import Footer from '../components/Footer';
import PageHeading from '../components/elements/PageHeading';

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
.login {
  display: flex;
  align-items: center;
  margin-left:5%;
}
.input {
    border-top: hidden;
    border-left: hidden;
    border-right: hidden;
    border-radius: 3px;
    -webkit-box-shadow: none;
    :focus {
      border-color: #dbdbdb;
    }
  }
  .form {
    width: 90%;
  }
  .media {
    margin-bottom: 10%;
  }
  .forgetpassword {
    color: ${props => props.theme.primaryColor};
    border : none;
  }
  .button-field {
    margin-top: 3%;
  }
  .loginfooter {
    margin: 6% 0% 4% 0%;
  }
  h5 {
    line-height: 0.5;
  }
`;

export default () => (
  <Layout>
    <Seo title="Login" description="Some description here." />
    <PageHeading title="Login Super Admin"/>
    <Container className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <figure className="image is-4by2">
              <img src="/images/black.jpg" alt="logo" />
            </figure>
          </div>
          <div className="column login">
            <div className="form">
              <div className="media">
                <div className="">
                  <figure className="image is-32x32">
                    <img src="/images/favicon.ico" className="logo" alt="logo" />
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
                <div className="button-field">
                  <a className="forgetpassword" href="#">forgot Password</a>
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
