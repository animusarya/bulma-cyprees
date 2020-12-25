import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { ClientReviewForm } from '../components/forms';
import Layout from '../components/Layout';
import useProjectDetails from '../hooks/useProjectDetails';
import { Message } from '../components/elements';

const Logo = styled.img`
  width: 150px;
  height: auto;
`;

const Description = styled.p`
  padding: 1rem 3rem 1rem 0rem;
`;

const Bottom = styled.p`
  margin-top: 30px;
`;

const createReviewMutation = gql`
  mutation createReview(
    $personName: String!
    $location: String
    $reviewTitle: String!
    $comment: String!
    $rating: Int!
    $projectId: ID!
  ) {
    createReview(
      input: {
        personName: $personName
        location: $location
        reviewTitle: $reviewTitle
        comment: $comment
        rating: $rating
        projectId: $projectId
      }
    ) {
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

const ClientReview = ({ match }) => {
  // const handleSubmit = () => null;
  const [executeMutation, res] = useMutation(createReviewMutation);

  const projectId = match.params.id;
  const [project] = useProjectDetails(projectId);

  console.log(projectId, 'project');

  return (
    <Layout noContainer>
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half">
              <div>
                {project && project.logo ? (
                  <Logo src={project.logo} alt="dummy-logo" height="100px" />
                ) : (
                  <p className="is-size-3 has-text-weight-bold">
                    {project.name}
                  </p>
                )}
              </div>
              <Description>
                Hi, you have been invited to write a short review from
                DesignCity Ltd. Please be honest and accurate as possible about
                your experience. They will process your review which might be
                published on their website.{' '}
              </Description>
              <ClientReviewForm
                onSubmit={async (data) => {
                  await executeMutation({
                    variables: {
                      input: {
                        personName: data.personName,
                        location: data.location,
                        reviewTitle: data.reviewTitle,
                        comment: data.comment,
                        rating: data.rating,
                        projectId: projectId || undefined,
                      },
                    },
                  });
                }}
              />
              {res.error && <Message type="error">{res.error.message}</Message>}
              <Bottom>
                By submitting this review you are allowing this to be displayed
                on their company website.
              </Bottom>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ClientReview;
