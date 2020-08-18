import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const projectQuery = gql`
  query projectGuest($id: ID, $domain: String) {
    projectGuest(id: $id, domain: $domain) {
      id
      name
      slug
      logo
      heroImage
      customDomain
      disclaimer
      nda
    }
  }
`;

const useProjectGuestDetails = ({ projectId, domain }) => {
  let objFind;
  if (projectId) {
    objFind = { id: projectId };
  } else if (domain) {
    objFind = { domain };
  }

  // fetch project data from api
  const resultProject = useQuery(projectQuery, {
    variables: objFind,
    fetchPolicy: 'cache-and-network',
  });

  const project =
    resultProject.data && resultProject.data.projectGuest
      ? resultProject.data.projectGuest
      : {};

  return [project, resultProject];
};

export default useProjectGuestDetails;
