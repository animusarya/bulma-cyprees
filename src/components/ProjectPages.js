import React, { useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import update from 'immutability-helper';

import { Heading } from './elements';
import PageListItem from './PageListItem';

const updatePageMutation = gql`
  mutation updatePage($id: ID!, $input: PageUpdateInput!) {
    updatePage(id: $id, input: $input) {
      id
    }
  }
`;

const ProjectPages = ({ pages: pagesItems, project, refetch }) => {
  const [pages, setPages] = useState(pagesItems);
  const [executeUpdate] = useMutation(updatePageMutation);

  const handleMoveItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = pages[dragIndex];
      const reorderdPages = update(pages, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
      });
      setPages(reorderdPages);
      // update db
      reorderdPages.forEach((rePage, index) => {
        executeUpdate({
          variables: { id: rePage.id, input: { order: index + 1 } },
        });
      });
    },
    [pages]
  );

  return (
    <div className="column">
      <Heading>Manage Pages</Heading>
      <table className="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th className="has-text-centered">Sort</th>
            <th>Name</th>
            <th className="has-text-centered">Type</th>
            <th className="has-text-centered">Status</th>
            <th className="has-text-centered">Created</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page, index) => (
            <PageListItem
              key={page.id}
              id={page.id}
              index={index}
              project={project}
              page={page}
              refetch={refetch}
              moveItem={handleMoveItem}
              executeUpdate={executeUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectPages;
