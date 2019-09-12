import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from 'urql';
import gql from 'graphql-tag';
import swal from 'sweetalert';

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
  const [resultFile, executeQuery] = useQuery({
    query: filesQuery,
    variables: { pageId: page.id },
    requestPolicy: 'network-only',
  });
  const [resFileUpload, executeFileUploadMutation] = useMutation(
    createFileMutation,
  );

  const [resDel, executeMutationDelete] = useMutation(removeFileMutation);
  const files =
    resultFile.data && resultFile.data.files ? resultFile.data.files : {};
  console.log('resultFile', resultFile);

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
        onUpload={async ({ url }) => {
          console.log('onUpload', url);
          await executeFileUploadMutation({
            input: {
              name: 'abc',
              fileType: 'image',
              project: project.id,
              page: page.id,
              url,
            },
          });
          await executeQuery({
            requestPolicy: 'network-only',
          });
        }}
      />
      {resFileUpload.error && (
        <Message type="error">{resFileUpload.error.message}</Message>
      )}
      {resDel.error && <Message type="error">{resDel.error.message}</Message>}
      {resultFile.fetching || resFileUpload.fetching || resDel.fetching ? (
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
                <td>{file.name}</td>
                <td className="has-text-centered is-uppercase">
                  {file.fileType}
                </td>
                <td className="has-text-centered">{file.section}</td>
                <td className="has-text-centered">{file.createdAt}</td>
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
                            id: file.id,
                          });
                          executeQuery();
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
