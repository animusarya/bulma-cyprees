import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import styled from 'styled-components';

const Thumb = styled.div`
  width: 100%;
  height: 100%;
`;

const ThumbInner = styled.div`
  overflow: hidden;
`;

const Image = styled.img`
  width: auto;
  height: 120px;
`;

const DropzoneWrapper = styled.section`
  .dropzone {
    border: ${(props) => props.theme.borderColor};
    border-style: dashed;
    background-color: ${(props) => props.theme.background};
    outline: none;
    cursor: pointer;
  }
`;

const Label = styled.label`
  font-size: ${(props) => props.theme.fontSizeSmall};
`;

function Dropzone(props) {
  const { label } = props;
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = files.map((file) => (
    <Thumb key={file.name}>
      <ThumbInner>
        <Image src={file.preview} alt="images" />
      </ThumbInner>
    </Thumb>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  return (
    <DropzoneWrapper className="container">
      <Label className="label has-text-weight-semibold mb-2 has-text-black">
        {label}
      </Label>
      <div
        {...getRootProps({
          className: 'dropzone p-5',
        })}>
        <input {...getInputProps()} />
        <div className="has-text-centered">
          <p>Drag & Drop your file or Browse</p>
          <small className="is-size-7 has-text-grey">
            Make sure your documents visible and clear
          </small>
        </div>
      </div>
      <aside className="mt-4">{thumbs}</aside>
    </DropzoneWrapper>
  );
}

export default Dropzone;
