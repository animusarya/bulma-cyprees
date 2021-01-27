import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { CheckBox } from '../elements';

const updateProjectMutation = gql`
  mutation updateProject($id: ID!, $input: ProjectUpdateInput!) {
    updateProject(id: $id, input: $input) {
      id
      autoReviewApproval
    }
  }
`;

const AutoReviewsForm = ({ project }) => {
  const [checked, setChecked] = useState(project.autoReviewApproval);

  const [executeMutation] = useMutation(updateProjectMutation);

  const handleSubmit = async () => {
    const result = await executeMutation({
      variables: {
        id: project.id,
        input: { autoReviewApproval: !checked },
      },
    });
    if (result.data) {
      setChecked(result.data.updateProject.autoReviewApproval);
    }
  };

  return (
    <CheckBox
      text="Turn on Auto Reviews"
      checked={checked}
      onClick={() => handleSubmit()}
    />
  );
};

export default AutoReviewsForm;
