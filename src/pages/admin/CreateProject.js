import React, { useState } from 'react';

import Seo from '../../components/Seo';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';
import ProjectSetup from '../../components/ProjectSetup';
import Payments from '../../components/Payments';
import PaymentConfirmation from '../../components/PaymentConfirmation';
import ProgressBar from '../../components/ProgressBar';

const CreateProject = () => {
  const [activeStep] = useState(1);

  return (
    <Layout>
      <Seo title="Dashboard Admin" description="Page description" />
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <div>
            <ProgressBar activeStep={activeStep} />
          </div>
          <div>
            <ProjectSetup />
          </div>
          <div>
            <Payments />
          </div>
          <div>
            <PaymentConfirmation />
          </div>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default CreateProject;
