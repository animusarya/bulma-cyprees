import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { isNull } from 'lodash';

import { Message, Loading, WysiwygEditor, Button } from './elements';

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

const PageContent = ({ page }) => {
  const [input, setInput] = useState({});
  const [executeUpdateMutation, updateResult] = useMutation(updateMutation);

  return (
    <Container>
      <WysiwygEditor
        value={!isNull(page.content) ? page.content : ''}
        onChange={data => setInput({ content: data })}
      />
      <Button
        onClick={() =>
          executeUpdateMutation({ variables: { id: page.id, input } })
        }>
        Update
      </Button>
      {updateResult.error && (
        <Message type="error">{updateResult.error.message}</Message>
      )}
      {updateResult.loading ? <Loading /> : null}
    </Container>
  );
};

export default PageContent;
