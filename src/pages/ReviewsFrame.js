import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import Rating from '../components/Rating';
import SliderCarousal from '../components/SliderCarousal';
import useProjectDetails from '../hooks/useProjectDetails';
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

const reviewsQuery = gql`
  query reviews($projectId: ID!) {
    reviews(projectId: $projectId) {
      id
      personName
      location
      reviewTitle
      comment
      rating
      status
      createdAt
    }
  }
`;

const ReviewsFrame = ({ match }) => {
  const projectId = match.params.id;
  const [project] = useProjectDetails(projectId);
  const reviews = useQuery(reviewsQuery, {
    fetchPolicy: 'network-only',
    variables: {
      projectId: project.id,
    },
  });

  const reviewsData =
    reviews && reviews.data && reviews.data.reviews ? reviews.data.reviews : [];

  return (
    <div>
      <ScoreReview>
        <p>4.9 Score</p>
        <p className="space">|</p>
        <p>{reviewsData.length} Reviews</p>
      </ScoreReview>
      <RatingContainer>
        <Rating
          size={40}
          disabled
          count={5}
          value={5}
          activeColor={project.starsColor}
        />
      </RatingContainer>
      <SliderCarousal reviews={reviewsData} project={project} />
    </div>
  );
};

export default ReviewsFrame;
