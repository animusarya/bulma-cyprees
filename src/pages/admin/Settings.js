import React from 'react';
import swal from 'sweetalert';

import useProjectDetails from '../../hooks/useProjectDetails';
import useProjectUpdate from '../../hooks/useProjectUpdate';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';
import MainColumn from '../../components/MainColumn';
import { Heading, Message, Loading } from '../../components/elements';
import {
  AutoReviewsForm,
  ReviewStartSettingForm,
} from '../../components/forms';

const Settings = ({ match }) => {
  const projectId = match.params.id;
  const [project] = useProjectDetails(projectId);
  const [executeMutation, res] = useProjectUpdate();
  // console.log(project, 'project');

  return (
    <Layout noContainer>
      <Seo
        title="Project Subscription"
        description="Manage Subscription of Projects"
      />
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <MainColumn>
            <Heading>Settings</Heading>
            <AutoReviewsForm project={project} />
            <ReviewStartSettingForm
              initialValues={project}
              onSubmit={async (data) => {
                await executeMutation({
                  variables: { id: project.id, input: data },
                });
                swal('Settings updated').then(() => window.location.reload());
              }}
            />
          </MainColumn>

          {res.error && <Message type="error">{res.error.message}</Message>}
          {res.loading ? <Loading /> : null}
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default Settings;
