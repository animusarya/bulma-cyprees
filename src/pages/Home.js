import React from 'react';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

export default () => (
  <Layout>
    <Seo title="Home" description="Some description here." />
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column">First column</div>
          <div className="column">Second column</div>
        </div>
      </div>
    </section>
  </Layout>
);
