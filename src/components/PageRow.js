import React from 'react';
import { startCase } from 'lodash';
import gql from 'graphql-tag';
import { useQuery } from 'urql';

import { Title, Button, Message, Loading } from './elements';

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
  const [resultFiles] = useQuery({
    query: filesQuery,
    variables: { projectId: project.id || 0 },
  });
  const files = resultFiles.data ? resultFiles.data.files : [];

  return (
    <React.Fragment>
      <Title marginbottom="0rem">{startCase(page.name)}</Title>
      {resultFiles.error && (
        <Message type="error">{resultFiles.error.message}</Message>
      )}
      {resultFiles.fetching && <Loading />}
      {files.length > 0 && (
        <table className="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Document</th>
              <th>Section</th>
              <th>Uploaded</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map(file => (
              <tr key={file.id}>
                <td>{file.name}</td>
                <td>{file.section}</td>
                <td>{file.createdAt}</td>
                <td>
                  <Button
                    secondary
                    paddingless
                    onClick={() => console.log('start download')}>
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </React.Fragment>
  );
};

export default PageRow;
