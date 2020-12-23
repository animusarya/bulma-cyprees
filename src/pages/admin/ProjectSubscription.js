import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
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
// import Subscription from '../../components/Subscription';

const removeProjectMutation = gql`
  mutation removeProject($id: ID!) {
    removeProject(id: $id) {
      success
    }
  }
`;

const Wrapper = styled.p`
  margin-bottom: 50px;
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
          <MainColumn>
            <Heading>Subscriptions</Heading>
            {/* <Subscription project={project} /> */}
            {/* <Heading>Cancel subscription?</Heading> */}
            <p className="is-size-5">
              To cancel your subscription please click the &apos;
              <span className="has-text-weight-semibold">Delete Project</span>
              &rsquo; button below
            </p>
            <Wrapper className="is-size-5">
              This will permanently delete your project.
            </Wrapper>
            <Button
              onClick={() => {
                swal(
                  'Are you confirm to cancel subscription of this project?',
                  {
                    buttons: ['Cancel', 'Confirm'],
                  },
                ).then(async (value) => {
                  if (value) {
                    const response = await executeMutationRemove({
                      variables: { id: project.id },
                    });
                    if (response.data.removeProject || !resRemove.loading) {
                      history.push('/user/dashboard');
                    }
                  }
                });
              }}>
              Delete Project
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
