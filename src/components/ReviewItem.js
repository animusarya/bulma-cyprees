/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import styled from 'styled-components';

import Rating from './Rating';

// const Container = styled.div`
//   :nth-child(even) {
//     background-color: #f2f2f2;
//   }
//   .columns {
//     margin-bottom: 0;
//   }
//   button {
//     background: transparent;
//     border: none;
//     :focus:not(:active) {
//       box-shadow: none;
//     }
//   }
// `;

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

const ReviewItem = () => (
  <Wrapper className="columns">
    <div className="column">
      <div className="columns">
        <div className="column is-1">Danny</div>
        <div className="column is-1">Sevenoaks</div>
        <div className="column is-2">12 Dec 2020</div>
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
          <p className="is-size-7">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged.
          </p>
        </div>
      </div>
    </div>
  </Wrapper>
);

export default ReviewItem;
