import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useStoreActions } from 'easy-peasy';
import { filter } from 'lodash';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import ClientHeader from '../../components/ClientHeader';
import { Message, Loading } from '../../components/elements';
import ClientFooter from '../../components/ClientFooter';
import PageRow from '../../components/PageRow';
import ImageGallery from '../../components/ImageGallery';

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

const pageQuery = gql`
  query page($pageId: ID!) {
    page(id: $pageId) {
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

const Page = ({ match }) => {
  const resultMe = useQuery(meQuery, { fetchPolicy: 'cache-and-network' });

  const pageId = match.params.id;
  const me = resultMe.data ? resultMe.data.me : {};
  const project = me.clientProject || {};

  // set active project
  const updateProject = useStoreActions(
    actions => actions.active.updateProject,
  );
  updateProject(project.id);

  // fetch pages for project
  const resultPages = useQuery(pagesQuery, {
    variables: { projectId: project.id || 0 },
    fetchPolicy: 'cache-and-network',
  });
  const pages = resultPages.data ? resultPages.data.pages : [];
  const contentPages = filter(pages, { type: 'content' });

  // fetch requested page
  const resultPage = useQuery(pageQuery, {
    variables: { pageId },
    fetchPolicy: 'cache-and-network',
  });
  const page = resultPage.data ? resultPage.data.page : {};
  // console.log('page', page);

  return (
    <Layout>
      <Seo title="Client Page" description="Page description" />
      <ClientHeader me={me} pages={contentPages} project={project} />
      <Container className="section">
        <div className="container">
          {resultPage.error && (
            <Message type="error">{resultPage.error.message}</Message>
          )}
          {resultPage.loading && <Loading />}
          {page.type === 'content' && (
            <div>
              <ImageGallery page={page} />
              <section dangerouslySetInnerHTML={{ __html: page.content }} />
            </div>
          )}
          {page.type === 'dataroom' && (
            <div>
              <PageRow page={page} />
            </div>
          )}
        </div>
      </Container>
      <ClientFooter project={project} />
    </Layout>
  );
};

export default Page;
