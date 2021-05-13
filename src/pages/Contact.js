import React from 'react';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

const Contact = () => (
  <Layout>
    <Seo title="about" description="Some description here." />
    <div className="section">
      <div className="container">
        <section className="hero">
          <div className="hero-body">
            <h1>welcome contact page</h1>
          </div>
        </section>
      </div>
    </div>
  </Layout>
);

export default Contact;
