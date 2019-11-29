import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import swal from 'sweetalert';

import useProjectDetails from '../../hooks/useProjectDetails';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';
import MainColumn from '../../components/MainColumn';
import { Message, Loading, Button, Heading } from '../../components/elements';
import AdminHeader from '../../components/AdminHeader';
import AdminSubHeader from '../../components/AdminSubHeader';
import Subscription from '../../components/Subscription';

const removeProjectMutation = gql`
  mutation removeProject($id: ID!) {
    removeProject(id: $id) {
      success
    }
  }
`;

const ProjectSubscription = ({ match, history }) => {
  const projectId = match.params.id;
  const [project] = useProjectDetails(projectId);
  const [executeMutationRemove, resRemove] = useMutation(removeProjectMutation);

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
          <AdminHeader />
          <AdminSubHeader />
          <MainColumn>
            <Heading>Subscriptions</Heading>
            <Subscription project={project} />
            <Heading>Delete subscription</Heading>
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

export default ProjectSubscription;
