/* eslint no-nested-ternary: 0 */
import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import swal from 'sweetalert';
import dayjs from 'dayjs';
import { useMutation, useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useDrag, useDrop } from 'react-dnd';
import ContentEditable from 'react-contenteditable';
import { useStoreState } from 'easy-peasy';

import { Button, Dropzone } from './elements';
import theme from '../utils/theme';
import loadingImg from '../assets/images/exchange.png';

const fileQuery = gql`
  query file($fileKey: String!) {
    file(fileKey: $fileKey) {
      url
    }
  }
`;

const logDownloadMutation = gql`
  mutation logDownload($fileId: ID!, $projectId: ID!) {
    logDownload(fileId: $fileId, projectId: $projectId) {
      success
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

const TitleClientFiles = styled.span`
  color: ${(props) => props.brandColor}!important;
  @media only screen and (max-width: 768px) {
    word-break: break-all;
    width: 35%;
  }
`;

const SyncIcon = styled.img`
  width: 17px;
  height: auto;
  margin-top: 2px;
  animation-name: ${(props) => (props.isLoading ? 'spin' : 'none')};
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

const NewTag = styled.p`
  background: #780000;
  width: 50px;
  align-self: center;
  margin-left: 8px;
`;

const ButtonContainer = styled.td`
  margin: 5px 0;
`;

const FileListItem = ({
  index,
  file,
  id,
  isAdmin,
  refetch,
  moveItem,
  executeUpdate,
  project,
}) => {
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(file.displayName);
  const me = useStoreState((state) => state.user.data);
  const [getFile, { loading: fileLoading, data: fileData }] = useLazyQuery(
    fileQuery,
    {
      fetchPolicy: 'network-only',
    },
  );
  const [executeMutationDelete] = useMutation(removeFileMutation);
  const [executeLogDownloadMutation] = useMutation(logDownloadMutation);
  // console.log(project, 'project');
  const brandColor = isAdmin
    ? ''
    : project.brandColor
    ? project.brandColor
    : theme.primaryColor;

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
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  // drag n drop

  const handleFileReplace = useCallback((data) => {
    executeUpdate({
      variables: {
        id,
        input: {
          name: data.fileName,
          displayName: data.fileName,
          fileType: data.fileType,
          url: data.url,
        },
      },
    }).then(() => {
      refetch();
    });

    window.location.reload(true);
  }, []);

  useEffect(() => {
    if (me.type !== 'client') {
      executeUpdate({
        variables: {
          id,
          input: {
            displayName: fileName.replace('(-)', ''),
          },
        },
      });
    }
  }, [fileName]);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 2);
  const differece = today - yesterday;
  const diffDays = Math.ceil(differece / (1000 * 60 * 60 * 24));
  const newFileTag = () => {
    if (diffDays === 2) {
      return (
        <NewTag className="has-text-ceneterd has-text-white has-text-centered is-size-7">
          New
        </NewTag>
      );
    }
  };

  return (
    <tr ref={ref} style={{ opacity }}>
      {isAdmin && (
        <td className="has-text-centered">
          <Button primary paddingless>
            <i className="far fa-hand-pointer" />
          </Button>
        </td>
      )}
      <td>
        {isAdmin ? (
          <ContentEditable
            html={fileName}
            onChange={(e) => setFileName(e.target.value)}
            tagName="span"
            onKeyDown={(event) => {
              // eslint-disable-next-line no-unused-expressions
              event.key === 'Enter' && event.preventDefault();
            }}
          />
        ) : (
          <div className="is-flex">
            <TitleClientFiles brandColor={brandColor}>
              {fileName}
            </TitleClientFiles>
            {newFileTag()}
          </div>
        )}
      </td>
      {isAdmin ? (
        <td className="has-text-centered">{file.fileType}</td>
      ) : (
        <td className="has-text-centered">{file.fileType}</td>
      )}
      {/* <td className="has-text-centered is-hidden-mobile">
        {file.section || '-'}
      </td> */}
      <td className="has-text-centered">
        {dayjs(file.createdAt).format('DD MMM YYYY')}
      </td>
      {isAdmin ? (
        <td className="has-text-centered">
          <a onClick={() => getFile({ variables: { fileKey: file.name } })}>
            Download
          </a>
        </td>
      ) : (
        <ButtonContainer className="has-text-centered is-hidden-mobile">
          <Button
            marginBottomNone
            secondary
            primary
            brandColor={brandColor}
            onClick={async () => {
              const result = await executeLogDownloadMutation({
                variables: { fileId: file.id, projectId: project.id },
              });
              if (result) {
                getFile({ variables: { fileKey: file.name } });
              }
            }}>
            Download
          </Button>
        </ButtonContainer>
      )}
      {/* {isAdmin && (
        <td className="has-text-centered">
          <Dropzone
            onUpload={handleFileReplace}
            handleLoading={isLoading => setLoading(isLoading)}>
            <SyncIcon src={loadingImg} isLoading={loading} />
          </Dropzone>
        </td>
      )} */}
      {isAdmin && (
        <td className="has-text-centered">
          <Button
            primary
            paddingless
            onClick={() => {
              swal('Are you confirm to delete this item?', {
                buttons: ['Cancel', 'Confirm'],
              }).then(async (value) => {
                if (value) {
                  await executeMutationDelete({
                    variables: { id: file.id },
                  });
                  refetch();
                }
              });
            }}>
            <i className="far fa-trash-alt" />
          </Button>
        </td>
      )}
    </tr>
  );
};

export default FileListItem;
