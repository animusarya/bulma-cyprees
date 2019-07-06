import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import AdminHeader from '../../components/AdminHeader';
import { InputGroup, Title, Subtitle, Button } from '../../components/elements';

const Container = styled.div`
  .add-client {
    display: flex;
  }
  .label {
    font-size: 12px;
  }
  .control {
    align-self: flex-end;
  }
  button {
    color: ${props => props.theme.primaryColor};
    border-color: ${props => props.theme.primaryColor};
    :hover {
      color: ${props => props.theme.primaryColor};
      border-color: ${props => props.theme.primaryColor};
    }
  }
  input {
    border-color: ${props => props.theme.primaryColor};
    border-radius: 0px;
    :hover {
      border-color: ${props => props.theme.primaryColor};
    }
  }
  .kzCdMG {
    margin-bottom: 3%;
  }
  .notify-title {
    margin-top: 5%;
  }
`;

const ManageClients = () => (
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
          <Title>Clients</Title>
          <Subtitle className="subtitle">Add Client</Subtitle>
          <div className="field is-grouped">
            <p className="control">
              <InputGroup border label="Client Email" name="name" type="text" />
            </p>
            <p className="control">
              <button className="button">
                <i className="fas fa-plus"></i>
              </button>
            </p>
            <p className="control">
              <Button paddingless secondary>
                Import CSV
              </Button>
            </p>
          </div>
          <div className="notify-title">
            <Subtitle>Clients Tools</Subtitle>
            <Button>Notify All Clients</Button>
          </div>
          <Subtitle>
            Manage Clients{' '}
            <span className="has-text-weight-normal">
              (Last update 12 Feb 2019)
            </span>
          </Subtitle>
          <table className="table is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th className="has-text-centered">Resend</th>
                <th className="has-text-centered">Access</th>
                <th className="has-text-centered">Notify Status </th>
                <th className="has-text-centered">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Janathan</td>
                <td>j@designcity.co.uk</td>
                <td>Pending</td>
                <td className="has-text-centered">
                  <Button paddingless secondary>
                    Resend Register Email
                  </Button>
                </td>
                <td className="has-text-centered">
                  <Button paddingless secondary>
                    <i className="far fa-check-square"></i>
                  </Button>
                </td>
                <td className="has-text-centered">Opted Out</td>
                <td className="has-text-centered">
                  <Button paddingless secondary>
                    <i className="far fa-trash-alt"></i>
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </MainColumn>
      </div>
    </Container>
    <CopyRight />
  </Layout>
);

export default ManageClients;
