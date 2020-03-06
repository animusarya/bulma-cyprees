import { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import { useLazyQuery } from '@apollo/react-hooks';
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
      disclaimer
      nda
      brandColor
      contactName
      contactTelephone
      contactEmail
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
        user {
          id
          profile {
            fullName
          }
        }
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
  const [getProject, resultProject] = useLazyQuery(projectQuery, {
    variables: { id: projectId },
    fetchPolicy: 'cache-and-network',
  });

  const project =
    resultProject.data && resultProject.data.project
      ? resultProject.data.project
      : {};

  useEffect(() => {
    if (projectId) {
      getProject();
    }
  }, [projectId]);

  useEffect(() => {
    updateProject(projectId);
  }, [projectId]);

  return [project, resultProject];
};

export default useProjectDetails;
