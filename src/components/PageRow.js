import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';

import { Title, Message, Loading } from './elements';
import FilesList from './FilesList';

const filesQuery = gql`
  query files($pageId: ID!) {
    files(pageId: $pageId) {
      id
      name
      displayName
      section
      fileType
      createdAt
      url
      order
    }
  }
`;

const PageRow = ({ page }) => {
  // fetch files for page
  const [getFiles, resultFiles] = useLazyQuery(filesQuery, {
    variables: { pageId: page.id },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (page.id) {
      getFiles();
    }
  }, [page.id, getFiles]);

  const files = resultFiles.data ? resultFiles.data.files : [];
  // console.log('files', files);

  return (
    <React.Fragment>
      <Title marginbottom="0rem">
        {/* <Link to={`/client/page/${page.id}`}>{startCase(page.name)}</Link> */}
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
