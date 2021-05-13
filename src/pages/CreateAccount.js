import React from 'react';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

const CreateAccount = () => (
  <Layout>
    <Seo title="about" description="Some description here." />
    <div className="section">
      <div className="container">
        <section className="hero">
          <div className="hero-body">
            <div className="columns is-multiline is-centered">
              <div className="column is-half">
                <div className="field">
                  <label className="label">First Name</label>
                  <div className="control">
                    <input
                      className="input first-name"
                      type="text"
                      placeholder="Text input"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Last Name</label>
                  <div className="control">
                    <input
                      className="input last-name"
                      type="text"
                      placeholder="Text input"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input email"
                      type="email"
                      placeholder="Email input"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope" />
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-exclamation-triangle" />
                    </span>
                  </div>
                  <p className="help">This email is recurred</p>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input password"
                      type="password"
                      placeholder="Email input"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope" />
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-exclamation-triangle" />
                    </span>
                  </div>
                  <p className="help">This Password is recurred</p>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="radio">
                      <input type="radio" name="question" className="mr-2" />
                      Male
                    </label>
                    <label className="radio">
                      <input type="radio" name="question" className="mr-2" />
                      Female
                    </label>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="checkbox">
                      <input type="checkbox" className="mr-2" /> I am not a
                      robot
                    </label>
                  </div>
                </div>
                <div className="field is-grouped">
                  <div className="control">
                    <a
                      className="button signup-button"
                      href="/contact"
                      type="submit">
                      sign in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </Layout>
);

export default CreateAccount;
