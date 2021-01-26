import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';
import MainColumn from '../../components/MainColumn';
import ReviewItem from '../../components/ReviewItem';
import useProjectDetails from '../../hooks/useProjectDetails';
import { CheckBox } from '../../components/elements';

const Container = styled.div`
  .subtitle {
    margin-bottom: 2rem !important;
  }
  .image img {
    width: 25% !important;
  }
  figure {
    justify-content: center;
    padding-bottom: 30px;
  }
`;

const ReviewsStat = styled.div`
  color: ${(props) => props.theme.primaryColor};
`;

const TableHeading = styled.div`
  background-color: ${(props) => props.theme.fontDark};
  p {
    color: #ffffff;
    font-weight: 600;
  }
`;

const EmptyComments = styled.div`
  padding-top: 10rem;
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

const Reviews = ({ match }) => {
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

  const {
    starsColor,
    reviewAuthorColor,
    reviewBodyColor,
    reviewTitleColor,
    reviewBodySize,
    reviewAuthorSize,
  } = project;
  return (
    <Layout noContainer>
      <Seo title="Dashboard Admin" description="List of Projects Here" />
      <Header />
      <Container className="columns">
        <div className="column">
          <Sidebar />
        </div>
        <div className="column is-four-fifths">
          {reviewsData.length > 0 ? (
            <MainColumn>
              <ReviewsStat className="is-size-4 ">
                <span className="has-text-weight-bold">All Reviews:</span>{' '}
                <span className="has-text-weight-medium">
                  Total {reviewsData.length}, Average Score 4.9
                </span>
              </ReviewsStat>
              <CheckBox text="Turn on Auto Reviews" />
              <TableHeading className="columns is-flex">
                <div className="column is-1">
                  <p>Name</p>
                </div>
                <div className="column is-1">
                  <p>Location</p>
                </div>
                <div className="column is-2">
                  <p>Date</p>
                </div>
                <div className="column is-1">
                  <p>Rating</p>
                </div>
                <div className="column is-4" />
                <div className="column is-1">
                  <p>Status</p>
                </div>
                <div className="column is-1">
                  <p>Action</p>
                </div>
                {/* <div className="column is-1">
                  <p>Action</p>
                </div> */}
              </TableHeading>
              {/* Add map when data available */}
              {reviewsData &&
                reviewsData.map((review) => (
                  <ReviewItem
                    review={review}
                    key={review.id}
                    starsColor={starsColor}
                    reviewAuthorColor={reviewAuthorColor}
                    reviewBodyColor={reviewBodyColor}
                    reviewTitleColor={reviewTitleColor}
                    reviewBodySize={reviewBodySize}
                    reviewAuthorSize={reviewAuthorSize}
                  />
                ))}
            </MainColumn>
          ) : (
            <EmptyComments>
              <p className="is-size-3 has-text-centered">
                No review for your website is available yet.
              </p>
            </EmptyComments>
          )}
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default Reviews;
