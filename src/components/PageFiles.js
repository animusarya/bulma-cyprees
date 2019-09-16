import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Title, Message, Loading, Dropzone } from './elements';
import DeletePageBtn from './DeletePageBtn';
import FilesList from './FilesList';

const filesQuery = gql`
  query files($pageId: ID!) {
    files(pageId: $pageId) {
      id
      name
      fileType
      section
      url
      order
      createdAt
    }
  }
`;

const createFileMutation = gql`
  mutation createFile($input: FileInput!) {
    createFile(input: $input) {
      id
      name
    }
  }
`;

const Container = styled.div`
  .columns {
    display: flex;
  }
`;

const PageFiles = ({ project, page, isPublic }) => {
  const resultFiles = useQuery(filesQuery, {
    variables: { pageId: page.id },
    fetchPolicy: 'cache-and-network',
  });
  const [executeFileUploadMutation, resFileUpload] = useMutation(
    createFileMutation,
  );

  const files =
    resultFiles.data && resultFiles.data.files ? resultFiles.data.files : {};

  const handleFileUpload = useCallback(data => {
    executeFileUploadMutation({
      variables: {
        input: {
          name: data.fileName,
          fileType: data.fileType,
          project: project.id,
          page: page.id,
          url: data.url,
        },
      },
    }).then(() => {
      resultFiles.refetch();
    });
  }, []);

  return (
    <Container>
      <div className="columns">
        <div className="column">
          <Title>{page.title}</Title>
        </div>
        <div className="column is-one-fifth">
          <DeletePageBtn />
        </div>
      </div>
      <Dropzone isPublic={isPublic} onUpload={handleFileUpload} />
      {resFileUpload.error && (
        <Message type="error">{resFileUpload.error.message}</Message>
      )}
      {resultFiles.loading || resFileUpload.loading ? <Loading /> : null}
      {files.length > 0 && (
        <FilesList files={files} isAdmin refetch={resultFiles.refetch} />
      )}
    </Container>
  );
};

export default PageFiles;
