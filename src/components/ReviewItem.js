import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Rating from './Rating';
import { CommentReplyForm } from './forms';

const Wrapper = styled.div`
  :nth-child(even) {
    background-color: #f2f2f2;
  }
  .columns {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border: none;
    :focus:not(:active) {
      box-shadow: none;
    }
  }
`;

const CommentReplyWrapper = styled.div`
  margin-top: 15px;
`;

const UserReview = styled.div`
  color: ${(props) => (props.color ? props.color : '#000000')};
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : '16px')};
`;

const ReviewItem = ({
  review,
  starsColor,
  reviewAuthorColor,
  reviewBodyColor,
  reviewBodySize,
  reviewAuthorSize,
}) => {
  const [active, setActive] = useState(false);
  const toggle = () => {
    setActive(!active);
  };

  return (
    <Wrapper className="columns">
      <div className="column">
        <div className="columns">
          <UserReview
            className="column is-2"
            color={reviewAuthorColor}
            fontSize={reviewAuthorSize}>
            {review.personName}
          </UserReview>
          <UserReview className="column is-2">{review.location}</UserReview>
          <div className="column is-2">
            {' '}
            {moment(review.createdAt).format('Do MMM YYYY')}
          </div>
          <div className="column is-2">
            <Rating
              disabled
              count={5}
              value={review.rating}
              activeColor={starsColor}
            />
          </div>
          <div className="column is-2" />
          <div className="column is-1 has-text-centered">
            <button className="button has-text-weight-bold" type="button">
              Live
            </button>
          </div>
          <div className="column is-1 has-text-centered">
            <button
              className="button has-text-danger has-text-weight-bold"
              type="button">
              Delete
            </button>
          </div>
          {/* <div className="column is-1">
            <button
              className="button has-text-success has-text-weight-bold"
              type="button">
              Submit
            </button>
          </div> */}
        </div>
        <div className="columns">
          <div className="column">
            <UserReview
              className="is-size-7"
              color={reviewBodyColor}
              fontSize={reviewBodySize}>
              {review.comment}
            </UserReview>
          </div>
        </div>
        <a onClick={toggle} className="has-text-weight-bold">
          {active ? '- Reply' : '+ Reply'}
        </a>
        {active ? (
          <CommentReplyWrapper>
            <CommentReplyForm />
          </CommentReplyWrapper>
        ) : null}
      </div>
    </Wrapper>
  );
};

export default ReviewItem;
