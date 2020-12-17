import React, { useCallback, useState, useEffect } from 'react';
import update from 'immutability-helper';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

import FileListItem from './FileListItem';

const Container = styled.table`
  th {
    color: ${props => props.theme.fontDark} !important;
    @media only screen and (max-width: 768px) {
      font-size: ${props => props.theme.fontSizeSmall};
    }
  }
  td {
    padding-top: 18px !important;
    :last-child {
      padding-top: 8px !important;
    }
  }
`;

const updateFileMutation = gql`
  mutation updateFile($id: ID!, $input: FileInput!) {
    updateFile(id: $id, input: $input) {
      id
    }
  }
`;

const FilesList = ({ files: items, isAdmin, refetch, project }) => {
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
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      });
      setFiles(reorderdFiles);
      // update db
      reorderdFiles.forEach((reFile, index) => {
        executeUpdate({
          variables: { id: reFile.id, input: { order: index + 1 } },
        });
      });
    },
    [files, executeUpdate],
  );

  return (
    <Container className="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          {isAdmin && <th className="has-text-centered">Sort</th>}
          <th>Name</th>
          <th className="has-text-centered">File Type</th>
          {/* <th className="has-text-centered is-hidden-mobile">Section</th> */}
          <th className="has-text-centered">Uploaded</th>
          <th className="has-text-centered is-hidden-mobile">View</th>
          {/* {isAdmin && <th className="has-text-centered">Replace</th>} */}
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
            project={project}
            moveItem={handleMoveItem}
            executeUpdate={executeUpdate}
          />
        ))}
      </tbody>
    </Container>
  );
};

export default FilesList;
