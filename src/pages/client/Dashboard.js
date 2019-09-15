/* eslint prefer-destructuring: 0 */

import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useStoreActions } from 'easy-peasy';
import { filter, isEmpty } from 'lodash';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import ClientHeader from '../../components/ClientHeader';
import PageRow from '../../components/PageRow';
import { Message, Loading } from '../../components/elements';
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
    pages(projectId: $projectId) {
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
  const resultMe = useQuery(meQuery, {
    fetchPolicy: 'cache-and-network',
  });

  const me = resultMe.data ? resultMe.data.me : {};
  const project = me.clientProject || {};
  // console.log('project', project);

  // set active project
  const updateProject = useStoreActions(
    actions => actions.active.updateProject,
  );
  updateProject(project.id);

  // fetch pages for project
  const [resultPages] = useQuery(pagesQuery, {
    variables: { projectId: project.id || 0 },
    fetchPolicy: 'cache-and-network',
  });

  const pages = resultPages.data ? resultPages.data.pages : [];
  const contentPages = filter(pages, { type: 'content' });
  const dataRoomPages = filter(pages, { type: 'dataroom' });
  // console.log('pages', dataRoomPages);

  if (isEmpty(project)) {
    return (
      <Layout>
        <Seo title="Client Dashboard" description="Page description" />
        <Message type="error">
          You are not assigned to any project, please contact admin.
        </Message>
      </Layout>
    );
  }

  return (
    <Layout>
      <Seo title="Client Dashboard" description="Page description" />
      <ClientHeader pages={contentPages} project={project} />
      {(resultMe.loading || resultPages.loading) && <Loading />}
      {resultMe.error && (
        <Message type="error">{resultMe.error.message}</Message>
      )}
      {resultPages.error && (
        <Message type="error">{resultPages.error.message}</Message>
      )}
      <Container className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-three-fifths is-offset-one-fifth">
              {/* <Heading>Overview</Heading> */}
              {dataRoomPages.map(page => (
                <PageRow key={page.id} project={project} page={page} />
              ))}
            </div>
          </div>
        </div>
      </Container>
      <ClientFooter />
    </Layout>
  );
};

export default Dashboard;
