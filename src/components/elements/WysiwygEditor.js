import React, { useState } from 'react';
import styled from 'styled-components';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Container = styled.div`
  .rdw-editor-main {
    border: 1px solid #f1f1f1;
    padding: 0 15px;
    min-height: 250px;
  }
`;

const WysiwygEditor = ({ onChange, value }) => {
  const contentBlock = htmlToDraft(value);

  let [editor, setEditor] = useState();
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks,
    );
    const editorState = EditorState.createWithContent(contentState);
    [editor, setEditor] = useState(editorState);
  }
  const htmlContent = draftToHtml(convertToRaw(editor.getCurrentContent()));
  onChange(htmlContent);

  return (
    <Container>
      <Editor
        editorState={editor}
        onEditorStateChange={editorState => setEditor(editorState)}
      />
    </Container>
  );
};

export default WysiwygEditor;
