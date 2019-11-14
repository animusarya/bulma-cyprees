import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import swal from 'sweetalert';

import useProjectDetails from '../../hooks/useProjectDetails';
import useProjectUpdate from '../../hooks/useProjectUpdate';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';
import MainColumn from '../../components/MainColumn';
import { Heading, Message, Loading, Button } from '../../components/elements';
import AdminHeader from '../../components/AdminHeader';
import ProjectSettingForm from '../../components/ProjectSettingForm';
import Subscription from '../../components/Subscription';

const removeProjectMutation = gql`
  mutation removeProject($id: ID!) {
    removeProject(id: $id) {
      success
    }
  }
`;

const ProjectSetting = ({ match, history }) => {
  const projectId = match.params.id;
  const [project] = useProjectDetails(projectId);
  const [executeMutation, res] = useProjectUpdate();
  const [executeMutationRemove, resRemove] = useMutation(removeProjectMutation);

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
          <MainColumn paddingtop="1rem">
            <Heading>Project Setting</Heading>
            <div>
              <ProjectSettingForm
                enableReinitialize
                initialValues={project}
                onSubmit={async data => {
                  await executeMutation({
                    variables: { id: project.id, input: data },
                  });
                  swal('Project info updated');
                }}
              />
            </div>
            {res.error && <Message type="error">{res.error.message}</Message>}
            {res.loading ? <Loading /> : null}
          </MainColumn>
          <MainColumn>
            <Subscription project={project} />
            <Button
              onClick={() => {
                swal('Are you confirm to delete this item?', {
                  buttons: ['Cancel', 'Confirm'],
                }).then(async value => {
                  if (value) {
                    const response = await executeMutationRemove({
                      variables: {
                        id: project.id,
                        clientId: project.clientId,
                      },
                    });
                    if (response.data.removeProject || !resRemove.loading) {
                      history.push('/admin/project/create');
                    }
                  }
                });
              }}>
              Remove Project
            </Button>
            {resRemove.error && (
              <Message type="error">{resRemove.error.message}</Message>
            )}
            {resRemove.loading ? <Loading /> : null}
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default ProjectSetting;
