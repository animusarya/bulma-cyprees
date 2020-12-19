import React from 'react';
import { Link } from 'react-router-dom';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

const Home = () => (
  <Layout>
    <Seo title="Home" description="Some description here." />
    <section className="section">
      <div className="container">
        <h1 className="header">Intellishare</h1>
        <br />
        <Link to="/login">Login</Link>
        <br />
        <Link to="/register">Register</Link>
        <br />
        <Link to="/forgot-password">Forgot Password</Link>
      </div>
    </section>
  </Layout>
);

export default Home;
