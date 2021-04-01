import React from 'react';
import { Link } from 'react-router-dom';

import Seo from '../components/Seo';

const Home = () => (
  <>
    <Seo title="Home" description="Some description here." />
    <section className="section">
      <div className="container">
        <Link to="/login">Login</Link>
        <br />
        <Link to="/register">Register</Link>
        <br />
        <Link to="/forgot-password">Forgot Password</Link>
      </div>
    </section>
  </>
);

export default Home;
