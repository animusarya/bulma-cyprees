import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
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

const ImageGallery = ({ page }) => {
  // fetch files for page
  const resultFiles = useQuery(filesQuery, {
    variables: { pageId: page.id || 0 },
    fetchPolicy: 'cache-and-network',
  });
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
          <div key={file.id}>
            <img src={file.url} alt={file.name} />
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default ImageGallery;
