import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { isNull } from 'lodash';
import swal from 'sweetalert';

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

const EditorContainer = styled.div`
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div``;

const PageContent = ({ page, brandColor }) => {
  const [input, setInput] = useState({});
  const [executeUpdateMutation, updateResult] = useMutation(updateMutation);

  return (
    <Container>
      <EditorContainer>
        <WysiwygEditor
          value={!isNull(page.content) ? page.content : ''}
          onChange={data => setInput({ content: data })}
          brandColor={brandColor}
        />
      </EditorContainer>
      <ButtonContainer className="has-text-right">
        <Button
          onClick={async () => {
            await executeUpdateMutation({ variables: { id: page.id, input } });
            swal('Page updated successfully');
          }}>
          Update
        </Button>
      </ButtonContainer>
      {updateResult.error && (
        <Message type="error">{updateResult.error.message}</Message>
      )}
      {updateResult.loading ? <Loading /> : null}
    </Container>
  );
};

export default PageContent;
