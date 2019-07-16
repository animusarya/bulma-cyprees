import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'urql';
import gql from 'graphql-tag';
import { useStoreActions } from 'easy-peasy';

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

const meQuery = gql`
  query me {
    me {
      id
      email
      profile {
        fullName
      }
      clientProject {
        id
        name
        slug
        logo
        heroImage
      }
    }
  }
`;

const pagesQuery = gql`
  query pages($projectId: ID!) {
    pages(id: $projectId) {
      id
      name
      slug
      content
      type
    }
  }
`;

const Container = styled.div`
  thead {
    background: transparent;
  }
`;

const Dashboard = () => {
  const [resultMe] = useQuery({
    query: meQuery,
  });
  const me = resultMe.data ? resultMe.data.me : {};
  const project = me.clientProject || {};

  // set active project
  const updateProject = useStoreActions(
    actions => actions.active.updateProject,
  );
  updateProject(project.id);

  // fetch page data
  const [resultPages] = useQuery({
    query: pagesQuery,
    variables: { projectId: project.id },
  });
  const pages = [];
  console.log('resultPages', resultPages);

  // fetch files for page

  console.log('result', me, project);

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
              {resultMe.error && (
                <Message type="error">{resultMe.error.message}</Message>
              )}
              {resultPages.error && (
                <Message type="error">{resultPages.error.message}</Message>
              )}
              {(resultMe.fetching || resultPages.fetching) && <Loading />}
              {pages && (
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
                    {pages.map(page => (
                      <tr>
                        <td>{page.document}</td>
                        <td>{page.section}</td>
                        <td>{page.uploaded}</td>
                        <td>
                          <Button
                            secondary
                            paddingless
                            onClick={() => {
                              alert('download!');
                            }}>
                            Download
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </Container>
      <ClientFooter />
    </Layout>
  );
};

export default Dashboard;
