import React from 'react';
import { useQuery, useMutation } from 'urql';
import gql from 'graphql-tag';
import swal from 'sweetalert';

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

const projectQuery = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      name
      slug
      status
      customDomain
      subscriptionName
      subscriptionDurationInMonths
      subscriptionAmount
    }
  }
`;

const removeProjectMutation = gql`
  mutation removeProject($id: ID!) {
    removeProject(id: $id) {
      success
    }
  }
`;

const updateProjectMutation = gql`
  mutation updateProject($id: ID!, $input: ProjectUpdateInput!) {
    updateProject(id: $id, input: $input) {
      id
      name
      slug
      status
      customDomain
    }
  }
`;

const ProjectSetting = ({ match, history }) => {
  const [resultProject] = useQuery({
    query: projectQuery,
    variables: { id: match.params.id },
    requestPolicy: 'network-only',
  });
  const [resRemove, executeMutationRemove] = useMutation(removeProjectMutation);
  const project =
    resultProject.data && resultProject.data.project
      ? resultProject.data.project
      : {};

  const [res, executeMutation] = useMutation(updateProjectMutation);

  return (
    <Layout>
      <Seo title="Project Settings" description="Update Existing Projects" />
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <AdminHeader project={project} />
          <MainColumn paddingtop="1rem">
            <Heading>Project Setting</Heading>
            <div>
              <ProjectSettingForm
                enableReinitialize
                initialValues={project}
                onSubmit={data => {
                  executeMutation({ id: project.id, input: data });
                }}
              />
            </div>
            {res.error && <Message type="error">{res.error.message}</Message>}
            {res.fetching ? <Loading /> : null}
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
                      id: project.id,
                      clientId: project.clientId,
                    });
                    if (response.data.removeProject || !resRemove.fetching) {
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
            {resRemove.fetching ? <Loading /> : null}
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default ProjectSetting;
