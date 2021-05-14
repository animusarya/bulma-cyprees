import React, { useState } from 'react';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

const Contact = () => {
  const [value, setValue] = useState('');

  return (
    <Layout>
      <Seo title="about" description="Some description here." />
      <div className="section">
        <div className="container">
          <section className="hero">
            <div className="hero-body">
              <h1 className="is-size-1 title">welcome contact page</h1>
            </div>
            <div className="field">
              <div className="control">
                <label className="label"> What is your name?</label>
                <input
                  className="input is-second-input"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  name="email"
                />
              </div>
              <div className="answer mt-4">hello {value} </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
