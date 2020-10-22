import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
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
  padding: 3rem 0rem;
  @media only screen and (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
  .container {
    max-width: 1100px;
  }
  min-height: 50vh;
  thead {
    background: transparent;
  }
  h2 {
    font-size: ${(props) => props.theme.fontSizeSuperLarge};
    color: ${(props) => props.theme.fontDark};
    margin-bottom: 2rem;
    @media only screen and (max-width: 768px) {
      font-size: ${(props) => props.theme.fontSizeExtraLarge};
    }
  }
`;

const Table = styled.div`
  @media only screen and (max-width: 768px) {
    overflow: scroll;
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

  return (
    <Layout noContainer>
      <Seo title="Client Page" description="Page description" />
      <ClientHeader me={me} project={project} />
      <Container className="">
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
            <Table>
              <PageRow page={page} project={project} />
            </Table>
          )}
        </div>
      </Container>
      <ClientFooter project={project} />
    </Layout>
  );
};

export default Page;
