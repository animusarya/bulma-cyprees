import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useStoreActions } from 'easy-peasy';
import moment from 'moment';

import { formatCurrency } from '../../utils/helpers';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
// import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';
import Button from '../../components/elements/Button';
import MainColumn from '../../components/MainColumn';
import { Heading, Title } from '../../components/elements';

import paymentImg from '../../assets/images/success.png';

const projectsQuery = gql`
  query projectsQuery {
    projects {
      id
      name
      subscriptionAmount
      subscriptionDurationInMonths
      subscriptionStartsAt
      subscriptionEndsAt
      subscriptionName
    }
  }
`;

const Section = styled.section`
  padding: 0rem 1.5rem;
`;

const Container = styled.div`
  height: 100vh;
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
`;

const LinkWrapper = styled(Link)`
  color: #fff;
  :hover {
    color: #fff;
  }
`;

const Dashboard = () => {
  const history = useHistory();
  const resultProjects = useQuery(projectsQuery, {
    fetchPolicy: 'network-only',
  });
  const updateProject = useStoreActions(
    (actions) => actions.active.updateProject,
  );

  useEffect(() => {
    updateProject(null);
  }, [updateProject]);

  const projects = (resultProjects.data && resultProjects.data.projects) || [];
  // console.log(projects, 'projects');

  useEffect(() => {
    if (projects.length > 0) {
      const project = projects[0];
      // redirect to project page
      history.push(`/admin/project/${project.id}/pages`);
    }
  }, [projects]);

  return (
    <Layout noContainer>
      <Seo title="Dashboard Admin" description="List of Projects Here" />
      <Header />
      <Section className="section">
        <div className="container">
          <Container className="columns">
            <div className="column">
              <MainColumn>
                {projects.length === 0 ? (
                  <div className="hero-body">
                    <div className="has-text-centered">
                      <figure className="image is-flex">
                        <img src={paymentImg} alt="Payment Successful" />
                      </figure>
                      <p className="title is-size-2">Account Created</p>
                      <p className="subtitle is-size-6 has-text-weight-semibold">
                        Thank you for registering, you are now signed in.
                      </p>
                      <Button>
                        <LinkWrapper to="/user/create/website">
                          Add a new website for Reviews
                        </LinkWrapper>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Heading>Dashboard</Heading>
                    <div className="columns">
                      <div className="column">
                        <Title>Your Websites</Title>
                      </div>
                    </div>
                    <table className="table is-fullwidth is-hoverable">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Plan</th>
                          <th>Duration</th>
                          <th>Started on</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((project) => (
                          <tr key={project.id}>
                            <td>
                              <Link to={`/admin/project/${project.id}/pages`}>
                                {project.name}
                              </Link>
                            </td>
                            <td>
                              {formatCurrency(project.subscriptionAmount)}
                            </td>
                            <td>{project.subscriptionName}</td>
                            <td>
                              {moment(project.subscriptionStartsAt).format(
                                'Do MMMM YYYY',
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </MainColumn>
            </div>
          </Container>
        </div>
      </Section>
      <CopyRight />
    </Layout>
  );
};

export default Dashboard;
