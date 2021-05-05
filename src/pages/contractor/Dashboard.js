import React, { useState } from 'react';

import Layout from '../../components/Layout';
import DashboardMenu from '../../components/global/DashboardMenu';
import Seo from '../../components/Seo';

import { GoogleMap, Heading } from '../../components/elements';
import { EditJobForm } from '../../components/forms';
import { SurveyModal } from '../../components/modal';

const Dashboard = () => {
  const [openModel, setOpenModel] = useState(false);

  return (
    <Layout hideSidebar>
      <Seo title="contractor" description="Contractor Dashboard" />
      <div className="section">
        <div className="container">
          <Heading centered>Contractor Dashboard</Heading>
          <DashboardMenu>
            <GoogleMap label="Location" />
            <button
              className="button is-primary mb-4"
              type="submit"
              onClick={() => setOpenModel(!openModel)}>
              Survey
            </button>
            <SurveyModal
              isActive={openModel}
              onSubmit={() => setOpenModel(!openModel)}
              onClose={() => setOpenModel(!openModel)}
            />
            <EditJobForm />
          </DashboardMenu>
        </div>{' '}
      </div>
    </Layout>
  );
};

export default Dashboard;
