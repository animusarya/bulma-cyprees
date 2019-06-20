import React from 'react';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

const ClientDashboard = () => {
  return (
    <Layout>
      <Seo title="Client Dashboard" description="Page description" />
      <div className="section">
        <div className="container">
          <h2 className="title">Client Dashboard</h2>
          <p>some data here...</p>
        </div>
      </div>
    </Layout>
  );
};

export default ClientDashboard;
