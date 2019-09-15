import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import swal from 'sweetalert';
import dayjs from 'dayjs';

import { Title, Button, Message, Loading, Dropzone } from './elements';
import DeletePageBtn from './DeletePageBtn';

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
const fileQuery = gql`
  query file($fileKey: String!) {
    file(fileKey: $fileKey) {
      url
    }
  }
`;

const removeFileMutation = gql`
  mutation removeFile($id: ID!) {
    removeFile(id: $id) {
      success
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

const PageFiles = ({ project, page }) => {
  const resultFiles = useQuery(filesQuery, {
    variables: { pageId: page.id },
    fetchPolicy: 'cache-and-network',
  });
  const [getFile, { loading: fileLoading, data: fileData }] = useLazyQuery(
    fileQuery,
    {
      fetchPolicy: 'network-only',
    },
  );
  const [executeFileUploadMutation, resFileUpload] = useMutation(
    createFileMutation,
  );
  const [executeMutationDelete, resDel] = useMutation(removeFileMutation);

  const files =
    resultFiles.data && resultFiles.data.files ? resultFiles.data.files : {};

  useEffect(() => {
    if (fileData && !fileLoading) {
      const win = window.open(fileData.file.url, '_blank');
      win.focus();
    }
  }, [fileData]);

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
      <Dropzone
        onUpload={async data => {
          await executeFileUploadMutation({
            variables: {
              input: {
                name: data.fileName,
                fileType: data.fileType,
                project: project.id,
                page: page.id,
                url: data.url,
              },
            },
          });
          resultFiles.refetch();
        }}
      />
      {resFileUpload.error && (
        <Message type="error">{resFileUpload.error.message}</Message>
      )}
      {resDel.error && <Message type="error">{resDel.error.message}</Message>}
      {resultFiles.loading || resFileUpload.loading || resDel.loading ? (
        <Loading />
      ) : null}
      {files.length > 0 && (
        <table className="table is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th className="has-text-centered">Sort</th>
              <th>Name</th>
              <th className="has-text-centered">File Type</th>
              <th className="has-text-centered">Section</th>
              <th className="has-text-centered">Uploaded</th>
              <th className="has-text-centered">Replace</th>
              <th className="has-text-centered">Delete</th>
            </tr>
          </thead>
          <tbody>
            {files.map(file => (
              <tr key={file.id}>
                <td className="has-text-centered">
                  <Button secondary paddingless>
                    <i className="far fa-hand-pointer"></i>
                  </Button>
                </td>
                <td>
                  <a
                    onClick={() =>
                      getFile({ variables: { fileKey: file.name } })
                    }>
                    {file.name}
                  </a>
                </td>
                <td className="has-text-centered is-uppercase">
                  {file.fileType}
                </td>
                <td className="has-text-centered">{file.section || '-'}</td>
                <td className="has-text-centered">
                  {dayjs(file.createdAt).format('DD-MM-YYYY')}
                </td>
                <td className="has-text-centered">
                  <Button
                    secondary
                    paddingless
                    onClick={() => {
                      swal('Are you confirm to delete this item?', {
                        buttons: ['Cancel', 'Confirm'],
                      }).then(async value => {
                        if (value) {
                          // await executeMutationSync();
                        }
                      });
                    }}>
                    <i className="fas fa-sync-alt"></i>
                  </Button>
                </td>
                <td className="has-text-centered">
                  <Button
                    secondary
                    paddingless
                    onClick={() => {
                      swal('Are you confirm to delete this item?', {
                        buttons: ['Cancel', 'Confirm'],
                      }).then(async value => {
                        if (value) {
                          await executeMutationDelete({
                            variables: { id: file.id },
                          });
                          resultFiles.refetch();
                        }
                      });
                    }}>
                    <i className="far fa-trash-alt"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Container>
  );
};

export default PageFiles;
