import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import swal from 'sweetalert';

import Rating from './Rating';
import { CommentReplyForm, CommentDeleteForm } from './forms';
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

const CommentWrapper = styled.div`
  margin: 1rem 0;
`;

// const PendingText = styled.p`
//   color: ${(props) => props.theme.primaryColor};
// `;

// const removeReviewMutation = gql`
//   mutation removeReview($id: ID!) {
//     removeReview(id: $id) {
//       success
//     }
//   }
// `;

const updateReviewMutation = gql`
  mutation updateReview($id: ID!, $input: ReviewUpdateInput!) {
    updateReview(id: $id, input: $input) {
      id
      comment
    }
  }
`;

const ReviewItem = ({
  review,
  starsColor,
  executeQuery,
  // projectStatsRefetch,
}) => {
  const [active, setActive] = useState(false);

  // const [executeRemoveReview, resRemove] = useMutation(removeReviewMutation);
  const [executeUpdateReview, res] = useMutation(updateReviewMutation);

  const toggle = () => {
    setActive(!active);
  };

  return (
    <Wrapper className="columns">
      <div className="column">
        <div className="columns is-flex-mobile">
          <UserReview className="column is-2">{review.personName}</UserReview>
          <UserReview className="column is-2">{review.location}</UserReview>
          <div className="column is-2">
            {' '}
            {moment(review.createdAt).format('Do MMM YYYY')}
          </div>
          <div className="column is-2">
            {starsColor && (
              <Rating
                disabled
                edit={false}
                count={5}
                value={review.rating}
                activeColor={starsColor}
              />
            )}
          </div>
          <div className="column is-2" />
          {/* <div className="column is-2 has-text-centered">
            <button
              className="button has-text-weight-bold"
              type="button"
              onClick={() => {
                swal('Are you sure?', {
                  buttons: ['Cancel', 'Confirm'],
                }).then(async (value) => {
                  if (value) {
                    await executeUpdateReview({
                      variables: {
                        id: review.id,
                        input: {
                          status:
                            review.status === 'active' ? 'pending' : 'active',
                        },
                      },
                    });
                    executeQuery();
                    projectStatsRefetch();
                  }
                });
              }}>
              {review.status === 'active' ? (
                <p className="has-text-success">Request Removal</p>
              ) : (
                <PendingText>Removal Pending</PendingText>
              )}
            </button>
          </div> */}

          {/* {resRemove.error && (
            <Message type="error">{resRemove.error.message}</Message>
          )} */}
          {res.error && <Message type="error">{res.error.message}</Message>}
          {/* <div className="column is-1 has-text-centered">
            <button
              className="button has-text-danger has-text-weight-bold"
              type="button"
              onClick={() => {
                swal('Are you sure you want to delete this review?', {
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
                    projectStatsRefetch();
                  }
                });
              }}>
              Delete
            </button>
          </div> */}
        </div>

        <div className="columns">
          <CommentWrapper className="column">
            <UserReview className="has-text-weight-bold">
              {review.reviewTitle}
            </UserReview>
            <UserReview className="is-size-6">{review.comment}</UserReview>
          </CommentWrapper>
        </div>
        <a onClick={toggle} className="has-text-weight-bold">
          {active ? '- Reply' : '+ Reply'}
        </a>
        {active ? (
          <CommentReplyWrapper>
            {review.adminReply ? (
              <CommentDeleteForm
                initialValues={review}
                onSubmit={() => {
                  swal(
                    `Are you sure you want to delete reply to this comment?`,
                    {
                      buttons: ['Cancel', 'Confirm'],
                    },
                  ).then(async () => {
                    await executeUpdateReview({
                      variables: {
                        id: review.id,
                        input: {
                          adminReply: '',
                        },
                      },
                    });
                    executeQuery();
                  });
                }}
              />
            ) : (
              <CommentReplyForm
                onSubmit={(formData) => {
                  swal(`Are you sure you want to post reply to this comment?`, {
                    buttons: ['Cancel', 'Confirm'],
                  }).then(async (value) => {
                    if (value) {
                      await executeUpdateReview({
                        variables: {
                          id: review.id,
                          input: {
                            adminReply: formData.adminReply,
                          },
                        },
                      });
                      executeQuery();
                    }
                  });
                }}
              />
            )}
          </CommentReplyWrapper>
        ) : null}
      </div>
    </Wrapper>
  );
};

export default ReviewItem;
