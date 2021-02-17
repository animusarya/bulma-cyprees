import { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';

const projectQuery = gql`
  query project($id: ID, $slug: String) {
    project(id: $id, slug: $slug) {
      id
      name
      slug
      logo
      customDomain
      subscriptionName
      subscriptionDurationInMonths
      subscriptionAmount
      disclaimer
      starsColor
      buttonsColor
      buttonsTextColor
      reviewTitleSize
      reviewTitleColor
      reviewBodySize
      reviewBodyColor
      reviewAuthorSize
      reviewAuthorColor
      autoReviewApproval
      displayRating
      createdBy {
        id
        profile {
          companyName
        }
      }
    }
  }
`;

const useProjectDetails = (projectId, slug) => {
  // set sidebar active project
  const updateProject = useStoreActions(
    (actions) => actions.active.updateProject,
  );

  // fetch project data from api
  const [getProject, resultProject] = useLazyQuery(projectQuery, {
    variables: { id: projectId, slug },
    fetchPolicy: 'cache-and-network',
  });

  const project =
    resultProject.data && resultProject.data.project
      ? resultProject.data.project
      : {};

  useEffect(() => {
    if (projectId || slug) {
      getProject();
    }
  }, [projectId, slug, getProject]);

  useEffect(() => {
    updateProject(projectId);
  }, [projectId, updateProject]);

  return [project, resultProject];
};

export default useProjectDetails;
