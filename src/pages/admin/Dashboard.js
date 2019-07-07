import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from 'urql';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Heading, Title } from '../../components/elements';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import AdminHeader from '../../components/AdminHeader';

// TODO: Fix this when API data available

const dashboardQuery = gql`
  query projects($clientId: ID!) {
    projects(clientId: $clientId) {
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
  input {
    border-color: ${props => props.theme.primaryColor};
    border-radius: 0px;
    :hover {
      border-color: ${props => props.theme.primaryColor};
    }
  }
`;

const Dashboard = () => {
  const [result] = useQuery({
    query: dashboardQuery,
  });

  return (
    <Layout>
      <Seo title="Dashboard Admin" description="Page description" />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <AdminHeader />
          <MainColumn>
            <Heading>Dashboard</Heading>
            <div className="columns">
              <div className="column">
                <Title>Client activity</Title>
              </div>
              <div className="column is-one-fifth">
                <input
                  className="input"
                  type="text"
                  placeholder="Search by Client"
                />
              </div>
            </div>
            {result.data && result.data.projects && (
              <table className="table is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>File</th>
                    <th>Login amount</th>
                    <th>Downloaded</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {result.data.projects.map(project => (
                    <tr key={project.id}>
                      <td>Janathan jacob</td>
                      <td>Sale details</td>
                      <td>5 Times</td>
                      <td>3 days ago</td>
                      <td>Wed 5 June 2019</td>
                      <td>10:42:9</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default Dashboard;
