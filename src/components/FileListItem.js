import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import swal from 'sweetalert';
import dayjs from 'dayjs';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useDrag, useDrop } from 'react-dnd';

import { Button, Dropzone } from './elements';
import loadingImg from '../assets/images/loading.png';

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

const SyncIcon = styled.img`
  width: 20px;
  height: auto;
  animation-name: ${props => (props.isLoading ? 'spin' : 'none')};
  animation-duration: 4000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const FileListItem = ({
  index,
  file,
  id,
  isAdmin,
  refetch,
  moveItem,
  executeUpdate,
}) => {
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [getFile, { loading: fileLoading, data: fileData }] = useLazyQuery(
    fileQuery,
    {
      fetchPolicy: 'network-only',
    },
  );
  const [executeMutationDelete] = useMutation(removeFileMutation);

  useEffect(() => {
    if (fileData && !fileLoading) {
      const win = window.open(fileData.file.url, '_blank');
      win.focus();
    }
  }, [fileData]);

  // drag n drop
  const [, drop] = useDrop({
    accept: 'card',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'card', id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  // drag n drop

  const handleFileReplace = useCallback(data => {
    executeUpdate({
      variables: {
        id,
        input: {
          name: data.fileName,
          fileType: data.fileType,
          url: data.url,
        },
      },
    }).then(() => {
      refetch();
    });
  }, []);

  return (
    <tr ref={ref} style={{ opacity }}>
      {isAdmin && (
        <td className="has-text-centered">
          <Button secondary paddingless>
            <i className="far fa-hand-pointer"></i>
          </Button>
        </td>
      )}
      <td>
        <a onClick={() => getFile({ variables: { fileKey: file.name } })}>
          {file.name}
        </a>
      </td>
      <td className="has-text-centered">{file.fileType}</td>
      <td className="has-text-centered">{file.section || '-'}</td>
      <td className="has-text-centered">
        {dayjs(file.createdAt).format('DD MMM YYYY')}
      </td>
      {isAdmin && (
        <td className="has-text-centered">
          <Dropzone
            onUpload={handleFileReplace}
            handleLoading={isLoading => setLoading(isLoading)}>
            <SyncIcon src={loadingImg} isLoading={loading} />
          </Dropzone>
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
  );
};

export default FileListItem;
