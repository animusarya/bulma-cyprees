import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
import randomstring from 'randomstring';

import { uploadFile } from '../../utils/upload';
import Loading from './Loading';

const signedUploadUrlMutation = gql`
  mutation signedUploadUrl(
    $fileName: String!
    $fileType: String!
    $isPublic: Boolean
  ) {
    signedUploadUrl(
      fileName: $fileName
      fileType: $fileType
      isPublic: $isPublic
    ) {
      signedUrl
      fileUrl
    }
  }
`;

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

const MyDropzone = ({ onUpload, isPublic }) => {
  const [loading, setLoading] = useState(false);
  const [executeUploadMutation] = useMutation(signedUploadUrlMutation);

  const onDrop = async acceptedFiles => {
    setLoading(true);

    try {
      const file = acceptedFiles[0];
      const variables = {
        fileName: `${randomstring.generate(3)}-${file.name}`,
        fileType: file.type,
      };

      // get signed url from aws s3
      const signedUploadUrl = await executeUploadMutation({
        variables: {
          ...variables,
          isPublic: isPublic || false,
        },
      });
      if (signedUploadUrl.data.error) {
        console.log('upload error', signedUploadUrl.data.error);
        return;
      }

      const { signedUrl, fileUrl } = await signedUploadUrl.data.signedUploadUrl;

      // return;
      const options = {
        headers: {
          'Content-Type': file.type,
        },
      };

      const result = await uploadFile(signedUrl, file, options);
      console.log('upload success', result);

      // upload success
      onUpload({ ...variables, url: fileUrl });
      setLoading(false);
    } catch (error) {
      console.log('upload error', error);
      setLoading(false);
    }
  };

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
