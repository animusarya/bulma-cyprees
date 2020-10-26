import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Container = styled.div`
  .rdw-editor-main {
    border: 1px solid #f1f1f1;
    /* padding: 0 15px; */
    min-height: 250px;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 15px !important;
  }
  h1 {
    font-size: 36px;
  }
  h2 {
    font-size: 30px;
  }
  h3 {
    font-size: 24px;
  }
  h4 {
    font-size: 20px;
  }
  h5 {
    font-size: 18px;
  }
  h6 {
    font-size: 16px;
  }
`;

const WysiwygEditor = ({ onChange, value }) => {
  const [editor, setEditor] = useState(undefined);
  const contentBlock = htmlToDraft(value);

  useEffect(() => {
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditor(editorState);
      // [editor, setEditor] = useState(editorState);
    }
  }, []);

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
