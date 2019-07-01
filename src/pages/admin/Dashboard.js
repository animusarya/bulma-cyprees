import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Heading, Title } from '../../components/elements';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import AdminHeader from '../../components/AdminHeader';

const Container = styled.div``;

const Dashboard = () => (
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
          <Title>Client activity</Title>
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
              <tr>
                <td>Janathan jacob</td>
                <td>Sale details</td>
                <td>5 Times</td>
                <td>3 days ago</td>
                <td>Wed 5 June 2019</td>
                <td>10:42:9</td>
              </tr>
            </tbody>
          </table>
        </MainColumn>
      </div>
    </Container>
    <CopyRight />
  </Layout>
);

export default Dashboard;
