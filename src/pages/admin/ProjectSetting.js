import React from 'react';
import swal from 'sweetalert';
import styled from 'styled-components';

import useProjectDetails from '../../hooks/useProjectDetails';
import useProjectUpdate from '../../hooks/useProjectUpdate';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';
import MainColumn from '../../components/MainColumn';
import { Heading, Message, Loading } from '../../components/elements';
import AdminHeader from '../../components/AdminHeader';
import AdminSubHeader from '../../components/AdminSubHeader';
import ProjectSettingForm from '../../components/ProjectSettingForm';

const FormContainer = styled.div`
  margin-top: -70px;
`;

const ProjectSetting = ({ match }) => {
  const projectId = match.params.id;
  const [project] = useProjectDetails(projectId);
  const [executeMutation, res] = useProjectUpdate();

  return (
    <Layout noContainer>
      <Seo title="Project Settings" description="Update Existing Projects" />
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <AdminHeader />
          <AdminSubHeader />
          <MainColumn paddingtop="1rem">
            <Heading>Project Settings</Heading>
            <FormContainer>
              <ProjectSettingForm
                enableReinitialize
                initialValues={project}
                onSubmit={async data => {
                  await executeMutation({
                    variables: { id: project.id, input: data },
                  });
                  swal('Project info updated').then(() =>
                    window.location.reload(),
                  );
                }}
              />
            </FormContainer>
            {res.error && <Message type="error">{res.error.message}</Message>}
            {res.loading ? <Loading /> : null}
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default ProjectSetting;
