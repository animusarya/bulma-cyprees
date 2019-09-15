import React, { useEffect } from 'react';
import swal from 'sweetalert';
import dayjs from 'dayjs';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Button, Loading, Message } from './elements';

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

const FilesList = ({ files, isAdmin, refetch }) => {
  const [getFile, { loading: fileLoading, data: fileData }] = useLazyQuery(
    fileQuery,
    {
      fetchPolicy: 'network-only',
    },
  );
  const [executeMutationDelete, resDel] = useMutation(removeFileMutation);

  useEffect(() => {
    if (fileData && !fileLoading) {
      const win = window.open(fileData.file.url, '_blank');
      win.focus();
    }
  }, [fileData]);

  return (
    <>
      <table className="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            {isAdmin && <th className="has-text-centered">Sort</th>}
            <th>Name</th>
            <th className="has-text-centered">File Type</th>
            <th className="has-text-centered">Section</th>
            <th className="has-text-centered">Uploaded</th>
            {isAdmin && <th className="has-text-centered">Replace</th>}
            {isAdmin && <th className="has-text-centered">Delete</th>}
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr key={file.id}>
              {isAdmin && (
                <td className="has-text-centered">
                  <Button secondary paddingless>
                    <i className="far fa-hand-pointer"></i>
                  </Button>
                </td>
              )}
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
              {isAdmin && (
                <td className="has-text-centered">
                  <Button
                    secondary
                    paddingless
                    onClick={() => {
                      swal('Are you confirm to replace this item?', {
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
              )}
              {isAdmin && (
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
                          refetch();
                        }
                      });
                    }}>
                    <i className="far fa-trash-alt"></i>
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {resDel.loading ? <Loading /> : null}
      {resDel.error && <Message type="error">{resDel.error.message}</Message>}
    </>
  );
};

export default FilesList;
