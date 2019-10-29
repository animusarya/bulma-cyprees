import React, { useCallback, useState, useEffect } from 'react';
import update from 'immutability-helper';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import FileListItem from './FileListItem';

const updateFileMutation = gql`
  mutation updateFile($id: ID!, $input: FileInput!) {
    updateFile(id: $id, input: $input) {
      id
    }
  }
`;

const FilesList = ({ files: items, isAdmin, refetch }) => {
  const [files, setFiles] = useState(items);
  const [executeUpdate] = useMutation(updateFileMutation);

  // if files updated
  useEffect(() => {
    setFiles(items);
  }, [items]);

  const handleMoveItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = files[dragIndex];
      const reorderdFiles = update(files, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
      });
      setFiles(reorderdFiles);
      // update db
      reorderdFiles.forEach((reFile, index) => {
        executeUpdate({
          variables: { id: reFile.id, input: { order: index + 1 } },
        });
      });
    },
    [files],
  );

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
          {files.map((file, index) => (
            <FileListItem
              key={file.id}
              index={index}
              id={file.id}
              file={file}
              isAdmin={isAdmin}
              refetch={refetch}
              moveItem={handleMoveItem}
              executeUpdate={executeUpdate}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FilesList;