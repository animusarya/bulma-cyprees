import React from 'react';
import { Link } from 'react-router-dom';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

const Home = () => {
  return (
    <Layout>
      <Seo title="Home" description="Some description here." />
      <section className="section">
        <div className="container">
          <h1 className="header">Intellishare</h1>
          <br />
          <Link to="/login">Login</Link>
          <br />
          <Link to="/register">Register</Link>
          {/* <br />
          <Link to="/super-admin/dashboard">Super Admin Area</Link>
          <br />
          <Link to="/admin/dashboard">Admin Area</Link>
          <br />
          <Link to="/client/dashboard">Client Area</Link> */}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
