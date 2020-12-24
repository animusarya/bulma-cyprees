import React from 'react';
import styled from 'styled-components';

import { ClientReviewForm } from '../components/forms';
import Layout from '../components/Layout';
import useProjectDetails from '../hooks/useProjectDetails';

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

const ClientReview = ({ match }) => {
  const handleSubmit = () => null;

  const projectId = match.params.id;
  const [project] = useProjectDetails(projectId);

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
              <ClientReviewForm onSubmit={handleSubmit} />
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
