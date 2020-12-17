import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

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
      createdAt
      profile {
        fullName
        companyName
        telephone
      }
    }
  }
`;

const Container = styled.div`
  .table {
    @media only screen and (max-width: 768px) {
      width: 100% !important;
      border-collapse: collapse !important;
      overflow: scroll !important;
    }
  }

  .column:last-child {
    overflow-x: auto;
  }

  td {
    color: ${(props) => props.theme.primaryColor};
  }
`;

const LinkWrapper = styled(Link)`
  color: ${(props) => props.theme.primaryColor};
  :hover {
    color: ${(props) => props.theme.primaryColor};
  }
`;

const Dashboard = () => {
  const res = useQuery(getAdmins, { fetchPolicy: 'cache-and-network' });
  // console.log('res', res);

  return (
    <Layout noContainer>
      <Seo title="Dashboard Super Admin" description="Clients Details Here" />
      <Header />
      <Container className="columns">
        <div className="column">
          <Sidebar />
        </div>
        <div className="column is-four-fifths">
          <MainColumn>
            <Heading>Clients</Heading>
            {res.error && <Message type="error">{res.error.message}</Message>}
            {res.loading && <Loading />}
            {res.data && (
              <table className="table is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Telephone</th>
                    <th>Created On</th>
                  </tr>
                </thead>
                <tbody>
                  {res.data.users &&
                    res.data.users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <LinkWrapper
                            to={`/super-admin/client/${user.id}/projects`}>
                            {user.email}
                          </LinkWrapper>
                        </td>
                        <td>{user.profile && user.profile.fullName}</td>
                        <td>{user.profile && user.profile.companyName}</td>
                        <td>{user.profile && user.profile.telephone}</td>
                        <td>{user.createdAt}</td>
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
