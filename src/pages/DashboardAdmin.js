import React from 'react';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

const DashboardAdmin = () => {
  return (
    <Layout>
      <Seo title="Dashboard Admin" description="Page description" />
      <div className="section">
        <div className="container">
          <h2 className="title">Dashboard Admin</h2>
          <p>some data here...</p>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardAdmin;
