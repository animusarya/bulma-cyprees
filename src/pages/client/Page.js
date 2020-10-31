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
    font-size: ${props => props.theme.fontSizeSuperLarge};
    color: ${props => props.theme.fontDark};
    margin-bottom: 2rem;
    @media only screen and (max-width: 768px) {
      font-size: ${props => props.theme.fontSizeExtraLarge};
      margin-top: -5rem;
      /* margin-bottom: 0rem; */
    }
  }
`;

const Content = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 15px !important;
  }
  h1 {
    font-size: 36px;
  }
  h2 {
    font-size: 30px;
  }
  h3 {
    font-size: 24px;
  }
  h4 {
    font-size: 20px;
  }
  h5 {
    font-size: 18px;
  }
  h6 {
    font-size: 16px;
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
          <h2 className="has-text-weight-semibold">{page.name}</h2>
          {resultPage.loading && <Loading />}
          {page.type === 'content' && (
            <Content>
              <ImageGallery page={page} />
              <section dangerouslySetInnerHTML={{ __html: page.content }} />
            </Content>
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
