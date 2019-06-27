import React from 'react';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

export default () => (
  <Layout>
    <Seo title="About" description="Some description here." />
    <div className="container">About page</div>
  </Layout>
);
