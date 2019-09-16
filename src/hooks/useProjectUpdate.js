import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const updateProjectMutation = gql`
  mutation updateProject($id: ID!, $input: ProjectUpdateInput!) {
    updateProject(id: $id, input: $input) {
      id
    }
  }
`;

const useProjectDetails = () => {
  const [execute, result] = useMutation(updateProjectMutation);

  return [execute, result];
};

export default useProjectDetails;
