import React from 'react';
import styled from 'styled-components';

import Rating from './Rating';

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

const Comment = styled.div`
  color: ${(props) => (props.color ? props.color : '#000000')};
`;

const ReviewItem = ({
  review,
  starsColor,
  reviewAuthorColor,
  reviewBodyColor,
}) => (
  <Wrapper className="columns">
    <div className="column">
      <div className="columns">
        <Comment className="column is-1" color={reviewAuthorColor}>
          {review.personName}
        </Comment>
        <Comment className="column is-1">{review.location}</Comment>
        <div className="column is-2">{review.createdAt}</div>
        <div className="column is-1">
          <Rating
            disabled
            count={5}
            value={review.rating}
            activeColor={starsColor}
          />
        </div>
        <div className="column is-4" />
        <div className="column is-1">
          <button
            className="button has-text-danger has-text-weight-bold"
            type="button">
            Delete
          </button>
        </div>
        <div className="column is-1">
          <button className="button has-text-weight-bold" type="button">
            Live
          </button>
        </div>
        <div className="column is-1">
          <button
            className="button has-text-success has-text-weight-bold"
            type="button">
            Submit
          </button>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Comment className="is-size-7" color={reviewBodyColor}>
            {review.comment}
          </Comment>
        </div>
      </div>
    </div>
  </Wrapper>
);

export default ReviewItem;
