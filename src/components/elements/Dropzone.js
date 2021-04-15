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
  }
`;

function Dropzone() {
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
      <label className="label has-text-weight-semibold mb-2 has-text-black">
        Before Picture
      </label>
      <div
        {...getRootProps({
          className: 'dropzone p-5 is-flex is-justify-content-center',
        })}>
        <input {...getInputProps()} />
        <p>Drag & drop some files here, or click to select files</p>
      </div>
      <aside className="mt-4">{thumbs}</aside>
    </DropzoneWrapper>
  );
}

export default Dropzone;
