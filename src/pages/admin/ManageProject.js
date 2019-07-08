import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';
import MainColumn from '../../components/MainColumn';
import { Heading, Button } from '../../components/elements';

const Container = styled.div`
  .pound-icon {
    font-size: 0.85rem !important;
  }
`;

const ManageProject = () => (
  <Layout>
    <Seo title="Dashboard Admin" description="Page description" />
    <Header />
    <Container className="columns">
      <div className="column is-one-fifth">
        <Sidebar />
      </div>
      <div className="column">
        <MainColumn>
          <Heading>Manage Projects</Heading>
          <table className="table is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th>Projects</th>
                <th className="has-text-centered">Plan</th>
                <th className="has-text-centered">Duration</th>
                <th className="has-text-centered">Start</th>
                <th className="has-text-centered">Expires</th>
                <th>Manage</th>
                <th>Renew</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="has-text-weight-semibold">Project Arden</td>
                <td className="has-text-centered">
                  <i className="fas fa-pound-sign pound-icon"></i>
                  30
                </td>
                <td className="has-text-centered">Monthly</td>
                <td className="has-text-centered">3 May 18</td>
                <td className="has-text-centered">3 May 19</td>
                <td>
                  <Button secondary paddingless>
                    MANAGE
                  </Button>
                </td>
                <td>
                  <Button secondary paddingless>
                    RENEW
                  </Button>
                </td>
                <td>
                  <Button secondary paddingless>
                    DELETE
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

export default ManageProject;
