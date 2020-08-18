import React, { useEffect } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/client';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const filesQuery = gql`
  query files($pageId: ID!) {
    files(pageId: $pageId) {
      id
      name
      section
      fileType
      createdAt
      url
      order
    }
  }
`;

const Container = styled.div`
  margin-bottom: 4rem;
  .slick-slide img {
    margin: 0 auto;
    max-height: 400px;
    width: auto;
    max-width: 100%;
  }
`;

const Wrapper = styled.div`
  :focus {
    outline: -webkit-focus-ring-color auto 0px;
  }
`;

const ImageGallery = ({ page }) => {
  // fetch files for page
  const [getFiles, resultFiles] = useLazyQuery(filesQuery, {
    variables: { pageId: page.id },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (page.id) {
      getFiles();
    }
  }, [page.id, getFiles]);

  const files = resultFiles.data ? resultFiles.data.files : [];

  if (files.length === 0) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Container>
      <Slider {...settings}>
        {files.map(file => (
          <Wrapper key={file.id}>
            <img src={file.url} alt={file.name} />
          </Wrapper>
        ))}
      </Slider>
    </Container>
  );
};

export default ImageGallery;
