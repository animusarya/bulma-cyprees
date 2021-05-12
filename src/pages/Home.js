import React from 'react';

import Seo from '../components/Seo';

const Home = () => (
  <>
    <Seo title="Home" description="Some description here." />
    <section className="section">
      <div className="container">
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
          <div>
            <a href="/test" className="button login-button" type="submit">
              SEND
            </a>
          </div>
        </form>
      </div>{' '}
    </section>
  </>
);

export default Home;
