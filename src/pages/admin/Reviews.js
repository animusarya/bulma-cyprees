import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';
import MainColumn from '../../components/MainColumn';
import ReviewItem from '../../components/ReviewItem';

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
  h1 {
    color: ${(props) => props.theme.primaryColor};
  }
`;

const ReviewsStat = styled.div`
  padding: 1.5rem 0 1.5rem 0;
  p:last-child {
    margin-left: 18px;
  }
`;

const TableHeading = styled.div`
  background-color: ${(props) => props.theme.fontDark};
  p {
    color: #ffffff;
    font-weight: 600;
  }
`;

const reviews = [
  {
    id: 1,
    name: 'Danny',
    country: 'Sevenoaks',
    date: '12 Dec 2020',
    comment:
      ' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  },
  {
    id: 2,
    name: 'Jenny',
    country: 'Sevenoaks',
    date: '15 Nov 2020',
    comment:
      ' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  },
  {
    id: 3,
    name: 'Linda',
    country: 'Spain',
    date: '12 Oct 2020',
    comment:
      ' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  },
  {
    id: 4,
    name: 'Mac',
    country: 'Italy',
    date: '01 Oct 2020',
    comment:
      ' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
  },
];

const Reviews = () => (
  <Layout noContainer>
    <Seo title="Dashboard Admin" description="List of Projects Here" />
    <Header />
    <Container className="columns">
      <div className="column">
        <Sidebar />
      </div>
      <div className="column is-four-fifths">
        <MainColumn>
          <h1 className="is-size-4 has-text-weight-bold">All Reviews</h1>
          <ReviewsStat className="is-flex">
            <p>
              <strong>Reviews:</strong> 11
            </p>
            <p>
              <strong>Average Score:</strong> 4.9
            </p>
          </ReviewsStat>
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
              <p>Action</p>
            </div>
            <div className="column is-1">
              <p>Status</p>
            </div>
            <div className="column is-1">
              <p>Action</p>
            </div>
          </TableHeading>
          {/* Add map when data available */}
          {reviews &&
            reviews.map((review) => (
              <ReviewItem review={review} key={review.id} />
            ))}
        </MainColumn>
      </div>
    </Container>
    <CopyRight />
  </Layout>
);

export default Reviews;
