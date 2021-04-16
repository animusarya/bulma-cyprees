import React, { useState } from 'react';

import Layout from '../../components/Layout';
import DashboardMenu from '../../components/global/DashboardMenu';

import { GoogleMap } from '../../components/elements';
import { EditJobForm } from '../../components/forms';
import { SurveyModal } from '../../components/modal';

const EditJobs = () => {
  const [openModel, setOpenModel] = useState(false);

  return (
    <Layout>
      <DashboardMenu>
        <GoogleMap />
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
    </Layout>
  );
};

export default EditJobs;
