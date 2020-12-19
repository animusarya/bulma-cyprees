import React from 'react';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

const NotAllowed = () => (
  <Layout>
    <Seo title="Not Allowed" description="You don't have permission" />
    <div className="section">
      <div className="container">
        <h2 className="title">Not Allowed</h2>
        <p>
          The page you are looking for, is not allowed to be accessed by you.
        </p>
      </div>
    </div>
  </Layout>
);

export default NotAllowed;
