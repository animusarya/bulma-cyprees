import React from 'react';
import { startCase } from 'lodash';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import { Title, Message, Loading } from './elements';
import FilesList from './FilesList';

const filesQuery = gql`
  query files($projectId: ID!) {
    files(projectId: $projectId) {
      id
      name
      section
      fileType
      createdAt
      url
      order
    }
  }
`;

const PageRow = ({ project, page }) => {
  // fetch files for page
  const resultFiles = useQuery(filesQuery, {
    variables: { projectId: project.id || 0 },
    fetchPolicy: 'cache-and-network',
  });
  const files = resultFiles.data ? resultFiles.data.files : [];

  return (
    <React.Fragment>
      <Title marginbottom="0rem">
        <Link to={`/client/page/${page.id}`}>{startCase(page.name)}</Link>
      </Title>
      {resultFiles.error && (
        <Message type="error">{resultFiles.error.message}</Message>
      )}
      {resultFiles.loading && <Loading />}
      {files.length > 0 ? (
        <FilesList files={files} isAdmin={false} />
      ) : (
        <Message>No files added yet.</Message>
      )}
    </React.Fragment>
  );
};

export default PageRow;
