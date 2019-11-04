import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { filter } from 'lodash';

const pagesQuery = gql`
  query pages($projectId: ID!) {
    pages(projectId: $projectId) {
      id
      slug
      name
      content
      type
      status
      createdAt
    }
  }
`;

const useProjectPages = projectId => {
  // fetch pages
  const [getPages, resultPages] = useLazyQuery(pagesQuery, {
    variables: { projectId },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (projectId) {
      getPages();
    }
  }, [projectId]);

  const pages =
    resultPages.data && resultPages.data.pages ? resultPages.data.pages : [];
  const contentPages = filter(pages, { type: 'content' });
  const dataRoomPages = filter(pages, { type: 'dataroom' });

  return [{ pages, contentPages, dataRoomPages }, resultPages];
};

export default useProjectPages;
