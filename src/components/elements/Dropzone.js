import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from 'urql';
import gql from 'graphql-tag';
import fetch from 'isomorphic-fetch';
import styled from 'styled-components';
import { uploadFile } from '../../utils/upload';

import Loading from './Loading';

const signedUploadUrlMutation = gql`
  mutation signedUploadUrl($fileName: String!, $fileType: String!) {
    signedUploadUrl(fileName: $fileName, fileType: $fileType) {
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
    onUpload('https://source.unsplash.com/random');
    // try {
    //   const file = acceptedFiles[0];

    //   // get signed url from aws s3
    //   const signedUploadUrl = await executeUploadMutation({
    //     fileName: file.name,
    //     fileType: file.type,
    //   });
    //   const { signedUrl, fileUrl } = await signedUploadUrl.data.signedUploadUrl;
    //   console.log('signedUrl', signedUrl);
    //   const options = {
    //     headers: {
    //       'Content-Type': file.type,
    //     },
    //   };

    //   const result = await uploadFile(signedUrl, file, options);
    //   console.log('result', result);

    // return;

    // upload to aws s3
    // const xhr = new window.XMLHttpRequest();
    // xhr.open('POST', signedUrl, true);
    // xhr.onload = function(e) {
    //   console.log('eonload', e);
    // };
    // // Listen to the upload progress.
    // xhr.upload.onprogress = function(e) {
    //   console.log('onprogress', e);
    // };
    // xhr.send(file);
    // return;
    // const formData = new FormData();
    // formData.append('file', file, file.name);
    // await fetch(signedUrl, {
    //   method: 'POST',
    //   body: formData,
    // });

    // upload success
    //   onUpload({ ...file, url: fileUrl });
    //   setLoading(false);
    // } catch (error) {
    //   console.log('upload error', error);
    //   setLoading(false);
    // }
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
