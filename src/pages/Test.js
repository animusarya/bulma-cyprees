import React from 'react';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

import emailLogo from '../assets/images/email-logo.png';
import emailBanner from '../assets/images/email-banner.png';

const Test = () => {
  return (
    <Layout>
      <Seo title="Test" description="Some description here." />
      <div className="container">
        <h1>Test page</h1>
        <div>
          <img src={emailLogo} alt="email logo" />
        </div>
        <img src={emailBanner} alt="email banner" />
      </div>
    </Layout>
  );
};

export default Test;
