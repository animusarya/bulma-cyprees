import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import { Heading } from '../../components/elements';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';

const Container = styled.div`
  td {
    color:  ${props => props.theme.primaryColor};
  }
`;

const Dashboard = () => {
  return (
    <Layout>
      <Seo title="Dashboard Super Admin" description="Page description" />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar/>
        </div>
        <div className="column">
          <MainColumn>
            <Heading>Clients</Heading>
            <table className="table is-fullwidth is-hoverable">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Telephone</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>john@doe.com</td>
                  <td>John Doe</td>
                  <td>My John Limited</td>
                  <td>011-232102</td>
                </tr>
                <tr>
                  <td>john@doe.com</td>
                  <td>John Doe</td>
                  <td>My John Limited</td>
                  <td>011-232102</td>
                </tr>
              </tbody>
            </table>
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default Dashboard;
