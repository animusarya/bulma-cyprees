import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import swal from 'sweetalert';

import Rating from './Rating';
import { CommentReplyForm } from './forms';
import { Message } from './elements';

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

const removeReviewMutation = gql`
  mutation removeReview($id: ID!) {
    removeReview(id: $id) {
      success
    }
  }
`;

const updateReviewMutation = gql`
  mutation updateReview($id: ID!, $input: ReviewUpdateInput!) {
    updateReview(id: $id, input: $input) {
      id
    }
  }
`;

const ReviewItem = ({
  review,
  starsColor,
  reviewAuthorColor,
  reviewBodyColor,
  reviewBodySize,
  reviewAuthorSize,
  executeQuery,
}) => {
  const [active, setActive] = useState(false);

  const [executeRemoveReview, resRemove] = useMutation(removeReviewMutation);
  const [executeUpdateReview, res] = useMutation(updateReviewMutation);

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
            <button
              className="button has-text-weight-bold"
              type="button"
              onClick={() => {
                swal('Are you sure you want to live this comment?', {
                  buttons: ['Cancel', 'Confirm'],
                }).then(async (value) => {
                  if (value) {
                    await executeUpdateReview({
                      variables: {
                        id: review.id,
                        input: {
                          status: 'active',
                        },
                      },
                    });
                    executeQuery();
                  }
                });
              }}>
              {review.status}
            </button>
          </div>

          {res.error ||
            (resRemove.error && (
              <Message type="error">{resRemove.error.message}</Message>
            ))}
          <div className="column is-1 has-text-centered">
            <button
              className="button has-text-danger has-text-weight-bold"
              type="button"
              onClick={() => {
                swal('Are you sure you want to delete this user?', {
                  buttons: ['Cancel', 'Confirm'],
                }).then(async (value) => {
                  if (value) {
                    // console.log('item', item);
                    await executeRemoveReview({
                      variables: {
                        id: review.id,
                      },
                    });
                    executeQuery();
                  }
                });
              }}>
              Delete
            </button>
          </div>
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
            <CommentReplyForm
              initialValues={review}
              onSubmit={(data) =>
                executeUpdateReview({
                  variables: {
                    id: review.id,
                    input: {
                      adminReply: data.adminReply,
                    },
                  },
                })
              }
            />
          </CommentReplyWrapper>
        ) : null}
      </div>
    </Wrapper>
  );
};

export default ReviewItem;
