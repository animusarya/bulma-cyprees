import React from 'react';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

const Test = () => {
  return (
    <Layout>
      <Seo title="Test" description="Some description here." />
      <div className="container">
        <h1>Test page</h1>
      </div>
    </Layout>
  );
};

export default Test;
