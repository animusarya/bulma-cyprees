import React from 'react';

import Seo from '../../components/Seo';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';

const InstructionGuide = () => (
  <Layout noContainer>
    <Seo title="User Guide" />
    <Header />
    <div className="columns">
      <div className="column is-one-fifth">
        <Sidebar />
      </div>
      <div className="column">
        <h1 className="is-size-3">Welcome to Review Our Services.com</h1>
        <p>
          Step 1. Add this code snippet to your website where you want your
          customer reviews to be displayed.
        </p>
      </div>
    </div>
    <CopyRight />
  </Layout>
);

export default InstructionGuide;
