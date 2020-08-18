import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import randomstring from 'randomstring';

import { uploadFile } from '../../utils/upload';
import Loading from './Loading';
import theme from '../../utils/theme';

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
  return theme.primaryColor;
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
  color: ${props => props.theme.primaryColor};
  outline: none;
  transition: border 0.24s ease-in-out;
  margin-bottom: 20px;
  cursor: pointer;
`;

const MyDropzone = ({ onUpload, isPublic, children, handleLoading }) => {
  const [loading, setLoading] = useState(false);
  const [executeUploadMutation] = useMutation(signedUploadUrlMutation);

  useEffect(() => {
    if (handleLoading) {
      handleLoading(loading);
    }
  }, [loading]);

  const onDrop = acceptedFiles => {
    setLoading(true);

    if (acceptedFiles.length > 0) {
      acceptedFiles.map(async file => {
        try {
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

          const { signedUrl, fileUrl } = await signedUploadUrl.data
            .signedUploadUrl;

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
      });
    }
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  if (children) {
    return (
      <span {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        {children}
      </span>
    );
  }

  return (
    <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      <p>+ Drag n drop some files here</p>
      <small>or click to select files</small>
      {loading && <Loading />}
    </Container>
  );
};

export default MyDropzone;
