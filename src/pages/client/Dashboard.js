import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import ClientHeader from '../../components/ClientHeader';
import { Heading, Title, Button } from '../../components/elements';
import ClientFooter from '../../components/ClientFooter';

const Container = styled.div`
  thead {
    background: transparent;
  }
`;

const Dashboard = () => {
  return (
    <Layout>
      <Seo title="Client Dashboard" description="Page description" />
      <ClientHeader />
      <Container className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-three-fifths is-offset-one-fifth">
              <Heading>Overview</Heading>
              <Title marginbottom="0rem">Property</Title>
              <table className="table is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th>Document</th>
                    <th>Section</th>
                    <th>Uploaded</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Land Registry Certificate No.4 </td>
                    <td>Financial</td>
                    <td>40 mins ago</td>
                    <td>
                      <Button secondary paddingless>
                        Download
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>Land Registry Certificate No.4 </td>
                    <td>Financial</td>
                    <td>40 mins ago</td>
                    <td>
                      <Button secondary paddingless>
                        Download
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Title marginbottom="0rem">Legal</Title>
              <table className="table is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th>Document</th>
                    <th>Section</th>
                    <th>Uploaded</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Land Registry Certificate No.4 </td>
                    <td>Financial</td>
                    <td>40 mins ago</td>
                    <td>
                      <Button secondary paddingless>
                        Download
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>Land Registry Certificate No.4 </td>
                    <td>Financial</td>
                    <td>40 mins ago</td>
                    <td>
                      <Button secondary paddingless>
                        Download
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Title marginbottom="0rem">Operational</Title>
              <table className="table is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th>Document</th>
                    <th>Section</th>
                    <th>Uploaded</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Land Registry Certificate No.4 </td>
                    <td>Financial</td>
                    <td>40 mins ago</td>
                    <td>
                      <Button secondary paddingless>
                        Download
                      </Button>
                    </td>{' '}
                  </tr>
                  <tr>
                    <td>Land Registry Certificate No.4 </td>
                    <td>Financial</td>
                    <td>40 mins ago</td>
                    <td>
                      <Button secondary paddingless>
                        Download
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Container>
      <ClientFooter />
    </Layout>
  );
};

export default Dashboard;
