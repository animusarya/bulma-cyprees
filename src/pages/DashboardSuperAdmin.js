import React from 'react';
import { Link } from "react-router-dom";

import Layout from '../components/Layout';
import Seo from '../components/Seo';

const DashboardSuperAdmin = () => {
  return (
    <Layout>
      <Seo title="Dashboard Super Admin" description="Page description" />
      <div className="section">
        <div className="container">
          <h2 className="title">Dashboard Super Admin</h2>
        <br />
        <Link to="/super-admin/clients">Clients</Link>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardSuperAdmin;
