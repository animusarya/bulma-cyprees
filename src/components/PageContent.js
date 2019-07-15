import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from 'urql';
import gql from 'graphql-tag';
import { isNull } from 'lodash';

import { Title, Message, Loading, WysiwygEditor, Button } from './elements';
import DeletePageBtn from './DeletePageBtn';

const updateMutation = gql`
  mutation updatePage($id: ID!, $input: PageUpdateInput!) {
    updatePage(id: $id, input: $input) {
      name
      slug
      content
    }
  }
`;

const Container = styled.div`
  .columns {
    display: flex;
  }
`;

const PageContent = ({ project, page }) => {
  const [input, setInput] = useState({});
  const [updateResult, executeUpdateMutation] = useMutation(updateMutation);
  // console.log('input', page);

  return (
    <Container>
      <div className="columns">
        <div className="column">
          <Title>{page.title}</Title>
        </div>
        <div className="column is-one-fifth">
          <DeletePageBtn project={project.id} pageId={page.id} />
        </div>
      </div>
      <WysiwygEditor
        value={!isNull(page.content) ? page.content : ''}
        onChange={data => setInput({ content: data })}
      />
      <Button onClick={() => executeUpdateMutation({ id: page.id, input })}>
        Update
      </Button>
      {updateResult.error && (
        <Message type="error">{updateResult.error.message}</Message>
      )}
      {updateResult.fetching ? <Loading /> : null}
    </Container>
  );
};

export default PageContent;
