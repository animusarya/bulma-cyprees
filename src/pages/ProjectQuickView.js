import React, { useEffect } from 'react';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

const ProjectQuickView = () => {
  useEffect(() => {
    // JS redirect to:
    // /cleint/dashboard/:ID
  }, []);

  return (
    <Layout>
      <Seo title="Loading" description="Some description here." />
      <div className="container">
        <h1>Redirecting to project page...</h1>
      </div>
    </Layout>
  );
};

export default ProjectQuickView;
