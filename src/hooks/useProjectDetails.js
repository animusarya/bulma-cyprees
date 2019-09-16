import { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const projectQuery = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      name
      slug
      logo
      heroImage
      customDomain
      subscriptionName
      subscriptionDurationInMonths
      subscriptionAmount
      welcomeEmailTemplate {
        subject
        body
      }
      clientEmailTemplate {
        subject
        body
      }
      clients {
        id
        email
        status
        hasAccess
        notifyStatus
      }
    }
  }
`;

const useProjectDetails = projectId => {
  // set sidebar active project
  const updateProject = useStoreActions(
    actions => actions.active.updateProject,
  );

  // fetch project data from api
  const resultProject = useQuery(projectQuery, {
    variables: { id: projectId || 0 },
    fetchPolicy: 'cache-and-network',
  });

  const project =
    resultProject.data && resultProject.data.project
      ? resultProject.data.project
      : {};

  useEffect(() => {
    updateProject(projectId);
  }, [projectId]);

  return [project, resultProject];
};

export default useProjectDetails;
