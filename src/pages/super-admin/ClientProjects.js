import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import { Heading, Button, } from '../../components/elements';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';

const Container = styled.div`
  .pound-icon {
    font-size: 0.85rem!important;
  }
`;

const ProjectsClient = () => {
  return (
    <Layout>
      <Seo title="Projects Clients " description="Page description" />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar/>
        </div>
        <div className="column">
          <MainColumn>
            <Heading>Clients > rob@colliers.com</Heading>
            <table className="table is-fullwidth is-hoverable">
              <thead>
                <tr>
                  <th>Projects</th>
                  <th>Plan</th>
                  <th>Duration</th>
                  <th>Start</th>
                  <th>Expires</th>
                  <th>Manage</th>
                  <th>Renew</th>
                  <th>Delete</th>
                  <th>Export</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Project Arden</strong></td>
                  <td><i className="fas fa-pound-sign pound-icon"></i>30</td>
                  <td>Bi-Annually</td>
                  <td>10 Jun 19</td>
                  <td>10 Oct 19</td>
                  <td ><Button secondary paddingless>MANAGE</Button></td>
                  <td ><Button secondary paddingless>RENEW</Button></td>
                  <td ><Button secondary paddingless>DELETE</Button></td>
                  <td ><Button secondary paddingless >EXPORT</Button></td>
                </tr>
                <tr>
                  <td><strong>Hotel California</strong></td>
                  <td><i className="fas fa-pound-sign pound-icon"></i>30</td>
                  <td>Monthly</td>
                  <td>3 May 18</td>
                  <td>3 May 19</td>
                  <td ><Button secondary paddingless>MANAGE</Button></td>
                  <td ><Button secondary paddingless>RENEW</Button></td>
                  <td ><Button secondary paddingless>DELETE</Button></td>
                  <td ><Button secondary paddingless >EXPORT</Button></td>
                </tr>
                <tr>
                  <td><strong>Project lion</strong></td>
                  <td><i className="fas fa-pound-sign pound-icon"></i>60</td>
                  <td>Annually</td>
                  <td>22 Oct 17</td>
                  <td>22 Oct 18</td>
                  <td ><Button secondary paddingless>MANAGE</Button></td>
                  <td ><Button secondary paddingless>RENEW</Button></td>
                  <td ><Button secondary paddingless>DELETE</Button></td>
                  <td ><Button secondary paddingless >EXPORT</Button></td>
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

export default ProjectsClient;
