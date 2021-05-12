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
            <input className="input" required name="name" id="email" />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input" required name="email" id="email" />
          </div>
          <div>
            <label className="label">Your message</label>
            <textarea
              className="textarea"
              id="message"
              name="message"
              required
            />
          </div>
          <div>
            <button className="button" type="submit">
              SEND
            </button>
          </div>
        </form>
      </div>{' '}
    </section>
  </>
);

export default Home;
