import React from 'react';
import styled from 'styled-components';
import { useQuery } from "urql";
import gql from 'graphql-tag';
import { Link } from "react-router-dom";

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import { Heading, Loading, Message } from '../../components/elements';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';

const getAdmins = gql`
  query GetAdmins {
    users {
      id
      email
      profile {
        fullName
        company
        telephone
      }
    }
  }
`;

const Container = styled.div`
  td {
    color:  ${props => props.theme.primaryColor};
  }
`;

const Dashboard = () => {
  const [res] = useQuery({
    query: getAdmins,
  });
  // console.log('res', res);

  return (
    <Layout>
      <Seo title="Dashboard Super Admin" description="Page description" />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <MainColumn>
            <Heading>Clients</Heading>
            {res.error && <Message type="error">{res.error.message}</Message>}
            {res.fetching && <Loading />}
            {res.data && (
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
                  {res.data.users.map(user => (
                    <tr key={user.id}>
                      <td><Link to={`/super-admin/client/projects/${user.id}`}>{user.email}</Link></td>
                      <td>{user.profile && user.profile.fullName}</td>
                      <td>{user.profile && user.profile.company}</td>
                      <td>{user.profile && user.profile.telephone}</td>
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
