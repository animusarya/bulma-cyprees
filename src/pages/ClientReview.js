import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import swal from 'sweetalert';

import { ClientReviewForm } from '../components/forms';
import Layout from '../components/Layout';
import useProjectDetails from '../hooks/useProjectDetails';
import { Message } from '../components/elements';

const Logo = styled.img`
  width: auto;
  height: 100px;
`;

const Description = styled.p`
  padding: 1rem 3rem 1rem 0rem;
`;

const Bottom = styled.p`
  margin-top: 30px;
`;

const createReviewMutation = gql`
  mutation createReview($input: ReviewInput!) {
    createReview(input: $input) {
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

  return (
    <Layout noContainer hasAuthNav>
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
                Hi, you have been invited to write a short review from{' '}
                <strong>{project.name}</strong>.<br /> Please be honest and
                accurate as possible about your experience. They will process
                your review which might be published on their website.{' '}
              </Description>
              <ClientReviewForm
                project={project}
                onSubmit={async (data) => {
                  await executeMutation({
                    variables: {
                      input: {
                        personName: data.personName,
                        location: data.location,
                        reviewTitle: data.reviewTitle,
                        comment: data.comment,
                        rating: data.rating,
                        project: projectId,
                      },
                    },
                  });
                  swal('Your Review is successfully submitted');
                  window.reload();
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
