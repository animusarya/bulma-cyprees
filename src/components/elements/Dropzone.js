import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from 'urql';
import gql from 'graphql-tag';
import fetch from 'isomorphic-fetch';
import styled from 'styled-components';

import Loading from './Loading';

const signedUploadUrlMutation = gql`
  mutation signedUploadUrl($fileName: String!) {
    signedUploadUrl(fileName: $fileName) {
      signedUrl
    }
  }
`;

// const uploadFileMutation = gql`
//   mutation uploadFile($input: FileInput!) {
//     uploadFile(input: $input) {
//       id
//       name
//       url
//     }
//   }
// `;

const getColor = props => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  margin-bottom: 20px;
`;

const MyDropzone = ({ onUpload }) => {
  const [loading, setLoading] = useState(false);
  const [signedUrlResult, executeUploadMutation] = useMutation(
    signedUploadUrlMutation,
  );

  const onDrop = useCallback(async acceptedFiles => {
    setLoading(true);
    const file = acceptedFiles[0];

    // get signed url from aws s3
    const signedUploadUrl = await executeUploadMutation({
      fileName: file.name,
    });
    const { signedUrl, fileUrl } = signedUploadUrl.data.signedUploadUrl;

    // upload to aws s3
    const formData = new FormData();
    await fetch(signedUrl, {
      method: 'POST',
      body: formData,
    });

    // send to aws s3
    onUpload({ ...file, url: fileUrl });
    setLoading(false);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  return (
    <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      <p>Drag n drop some files here, or click to select files</p>
      {loading && <Loading />}
    </Container>
  );
};

export default MyDropzone;
