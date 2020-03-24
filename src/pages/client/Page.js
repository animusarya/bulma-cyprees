import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import useMeDetails from '../../hooks/useMeDetails';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import ClientHeader from '../../components/ClientHeader';
import { Message, Loading } from '../../components/elements';
import ClientFooter from '../../components/ClientFooter';
import PageRow from '../../components/PageRow';
import ImageGallery from '../../components/ImageGallery';

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
  min-height: 50vh;
  thead {
    background: transparent;
  }
  h2 {
    font-size: ${props => props.theme.fontSizeSuperLarge};
    color: ${props => props.theme.fontDark};
    margin-bottom: 2rem;
  }
`;

const Page = ({ match }) => {
  const pageId = match.params.id;
  const [me] = useMeDetails();
  const project = me.clientProject || {};

  // fetch requested page
  const resultPage = useQuery(pageQuery, {
    variables: { pageId },
    fetchPolicy: 'cache-and-network',
  });
  const page = resultPage.data ? resultPage.data.page : {};
  // console.log('page', page);

  return (
    <Layout noContainer>
      <Seo title="Client Page" description="Page description" />
      <ClientHeader me={me} project={project} />
      <Container className="section">
        <div className="container">
          {resultPage.error && (
            <Message type="error">{resultPage.error.message}</Message>
          )}
          {resultPage.loading && <Loading />}
          <h2 className="has-text-weight-semibold">{page.name}</h2>
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
