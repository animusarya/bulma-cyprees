import React from 'react';
import styled from 'styled-components';
import Rating from '../components/Rating';

import SliderCarousal from '../components/SliderCarousal';
// create this screen with fully custom css using styled components

const ScoreReview = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  p {
    font-size: 14px;
    font-weight: bold;
  }
  .space {
    padding: 0 1rem;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ReviewsFrame = () => (
  <div>
    <ScoreReview>
      <p>4.9 Score</p>
      <p className="space">|</p>
      <p>11 Reviews</p>
    </ScoreReview>
    <RatingContainer>
      <Rating size={40} />
    </RatingContainer>
    <SliderCarousal />
  </div>
);

export default ReviewsFrame;
