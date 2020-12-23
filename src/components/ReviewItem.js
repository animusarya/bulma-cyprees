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

const ReviewItem = ({ review }) => (
  <Wrapper className="columns">
    <div className="column">
      <div className="columns">
        <div className="column is-1">{review.name}</div>
        <div className="column is-1">{review.country}</div>
        <div className="column is-2">{review.date}</div>
        <div className="column is-1">
          <Rating />
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
          <p className="is-size-7">{review.comment}</p>
        </div>
      </div>
    </div>
  </Wrapper>
);

export default ReviewItem;
