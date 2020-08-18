import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import swal from 'sweetalert';
import dayjs from 'dayjs';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useDrag, useDrop } from 'react-dnd';
import ContentEditable from 'react-contenteditable';
import { startCase } from 'lodash';
import { Link } from 'react-router-dom';

import { Button } from './elements';

const removeMutation = gql`
  mutation removePage($id: ID!) {
    removePage(id: $id) {
      success
    }
  }
`;

const LinkWrapper = styled(Link)`
  color: ${props => props.theme.primaryColor};
  :hover {
    color: ${props => props.theme.primaryColor};
  }
`;

const ButtonContainer = styled.div`
  margin-top: -2px;
`;

const PageListItem = ({
  index,
  page,
  project,
  id,
  refetch,
  moveItem,
  executeUpdate,
}) => {
  const ref = useRef(null);
  // const [loading, setLoading] = useState(false);
  const [pageName, setPageName] = useState(page.name);
  const [executeMutationRemove] = useMutation(removeMutation);

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

  useEffect(() => {
    executeUpdate({
      variables: {
        id,
        input: {
          name: pageName,
        },
      },
    });
  }, [id, pageName, executeUpdate]);

  return (
    <tr ref={ref} style={{ opacity }}>
      <td className="has-text-centered">
        <Button secondary paddingless>
          <i className="far fa-hand-pointer"></i>
        </Button>
      </td>
      <td className="has-text-weight-semibold">
        <ContentEditable
          html={pageName}
          onChange={e => setPageName(e.target.value)}
          tagName="span"
        />
        {/* <LinkWrapper to={`/admin/project/${project.id}/pages/${page.id}`}>
          {startCase(page.name)}
        </LinkWrapper> */}
      </td>
      <td className="has-text-centered">{startCase(page.type)}</td>
      <td className="has-text-centered">{startCase(page.status)}</td>
      <td className="has-text-centered">
        {dayjs(page.createdAt).isValid()
          ? dayjs(page.createdAt).format('DD MMM YYYY')
          : null}
      </td>
      <td>
        <LinkWrapper to={`/admin/project/${project.id}/pages/${page.id}`}>
          Manage
        </LinkWrapper>
      </td>
      <td>
        <ButtonContainer>
          <Button
            secondary
            paddingless
            fontWeight="400"
            onClick={() => {
              swal('Are you confirm to remove this page?', {
                buttons: ['Cancel', 'Confirm'],
              }).then(async value => {
                if (value) {
                  await executeMutationRemove({
                    variables: { id: page.id },
                  });
                  refetch();
                }
              });
            }}>
            Remove
          </Button>
        </ButtonContainer>
      </td>
    </tr>
  );
};

export default PageListItem;
