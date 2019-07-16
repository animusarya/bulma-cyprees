import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from 'urql';
import gql from 'graphql-tag';
import { useStoreActions } from 'easy-peasy';
import dayjs from 'dayjs';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';
import Button from '../../components/elements/Button';
import MainColumn from '../../components/MainColumn';
import { Heading, Title } from '../../components/elements';

const projectsQuery = gql`
  query projectsQuery {
    projects {
      id
      name
      subscriptionAmount
      subscriptionDurationInMonths
      subscriptionStartsAt
      subscriptionEndsAt
    }
  }
`;

const Container = styled.div`
  .subtitle {
    margin-bottom: 2rem !important;
  }
`;

const LinkWrapper = styled(Link)`
  color: ${props => props.theme.primaryColor};
  :hover {
    color: ${props => props.theme.primaryColor};
  }
`;

const Dashboard = () => {
  const [resultProjects] = useQuery({
    query: projectsQuery,
  });
  const projects = (resultProjects.data && resultProjects.data.projects) || [];
  const updateProject = useStoreActions(
    actions => actions.active.updateProject,
  );
  updateProject(null);
  // console.log('resultProjects', projects);

  return (
    <Layout>
      <Seo title="Dashboard Admin" description="Page description" />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column content">
          <MainColumn>
            {projects.length === 0 ? (
              <div className="hero-body">
                <div className="has-text-centered">
                  <p className="title is-size-2">Account Created</p>
                  <p className="subtitle is-size-6 has-text-weight-semibold">
                    Thank you for registering, you are now signed in.
                  </p>
                  <Button>
                    <LinkWrapper to="/admin/project/create">
                      Create a new project
                    </LinkWrapper>
                  </Button>
                </div>
              </div>
            ) : (
              <React.Fragment>
                <Heading>Dashboard</Heading>
                <div className="columns">
                  <div className="column">
                    <Title>Projects</Title>
                  </div>
                  <div className="column is-one-fifth">
                    <input
                      className="input"
                      type="text"
                      placeholder="Search Project"
                    />
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
                    {projects.map(project => (
                      <tr key={project.id}>
                        <td>
                          <Link to={`/admin/project/${project.id}`}>
                            {project.name}
                          </Link>
                        </td>
                        <td>£{project.subscriptionAmount}</td>
                        <td>{project.subscriptionDurationInMonths} months</td>
                        <td>
                          {dayjs(project.subscriptionStartsAt).isValid()
                            ? dayjs(project.subscriptionStartsAt).format(
                                'DD-MM-YYYY',
                              )
                            : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </React.Fragment>
            )}
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default Dashboard;
