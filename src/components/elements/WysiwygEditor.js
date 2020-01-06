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
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 1.2rem;
  }
  h1 {
    font-size: 3rem;
  }
  h2 {
    font-size: 2.6rem;
  }
  h3 {
    font-size: 2.2rem;
  }
  h4 {
    font-size: 1.7rem;
  }
  h5 {
    font-size: 1.4rem;
  }
  h6 {
    font-size: 1.1rem;
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

  return (
    <Container>
      <Editor
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'fontFamily',
            'list',
            'textAlign',
            'colorPicker',
            'link',
            'emoji',
            'image',
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
        editorState={editor}
        onEditorStateChange={editorState => {
          setEditor(editorState);
          const htmlContent = draftToHtml(
            convertToRaw(editorState.getCurrentContent()),
          );
          onChange(htmlContent);
        }}
      />
    </Container>
  );
};

export default WysiwygEditor;
