import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'urql';
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import ClientHeader from '../../components/ClientHeader';
import {
  Heading,
  Title,
  Button,
  Message,
  Loading,
} from '../../components/elements';
import ClientFooter from '../../components/ClientFooter';

const clientDashboardQuery = gql`
  query projects($clientId: ID!) {
    projects(clientId: $clientId) {
      id
      document
      section
      uploaded
    }
  }
`;

const Container = styled.div`
  thead {
    background: transparent;
  }
`;

const Page = ({ match }) => {
  const [result] = useQuery({
    query: clientDashboardQuery,
    variables: { clientId: match.params.clientId },
  });

  return (
    <Layout>
      <Seo title="Client Dashboard" description="Page description" />
      <ClientHeader />
      <Container className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-three-fifths is-offset-one-fifth">
              <Heading>Property</Heading>
              <Title marginbottom="0rem">Sub Section 1</Title>
              {result.error && (
                <Message type="error">{result.error.message}</Message>
              )}
              {result.fetching && <Loading />}
              {result.data && result.data.projects && (
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
                    {result.data.projects.map(project => (
                      <tr>
                        <td>{project.document}</td>
                        <td>{project.section}</td>
                        <td>{project.uploaded}</td>
                        <td>
                          <Button
                            secondary
                            paddingless
                            onClick={() => {
                              alert('download');
                            }}>
                            Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <Title marginbottom="0rem">Sub Section 2</Title>
              {result.error && (
                <Message type="error">{result.error.message}</Message>
              )}
              {result.fetching && <Loading />}
            </div>
          </div>
        </div>
      </Container>
      <ClientFooter />
    </Layout>
  );
};

export default Page;
