import React from 'react';
import Layout from '../components/Layout';

import Seo from '../components/Seo';

const Home = () => (
  <Layout>
    <Seo title="Home" description="Some description here." />
    <section className="section">
      <div className="container">
        <div className="columns is-multiline is-centered">
          <div className="column is-half">
            <h1 className="is-size-1 has-text-centered">login</h1>
            <form>
              <div>
                <label className="label">Name</label>
                <input
                  className="input is-first-input"
                  required
                  name="name"
                  id="email"
                />
              </div>
              <div>
                <label className="label">Email</label>
                <input
                  className="input is-second-input"
                  required
                  name="email"
                  id="email"
                />
              </div>
              <div className="mt-4">
                <a href="/about" className="button login-button" type="submit">
                  sign in
                </a>
                <a
                  href="/create-account"
                  className="button  signup-button ml-2"
                  type="submit">
                  sign up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default Home;
