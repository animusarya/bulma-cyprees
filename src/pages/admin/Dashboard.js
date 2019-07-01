import React from 'react';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Button from '../../components/elements/Button';

const Dashboard = () => {
  return (
    <Layout>
      <Seo title="Dashboard Admin" description="Page description" />
      <div className="section">
        <div className="container">
          <section className="hero is-large">
            <div className="hero-body">
              <div className="container has-text-centered">
                <p className="title">Account Created</p>
                <p className="subtitle">
                  Thank you for registering, you are now signed in.
                </p>
                <Button>Create a new project</Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
