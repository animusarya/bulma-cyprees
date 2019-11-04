/* eslint prefer-destructuring: 0 */

import React from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import useMeDetails from '../../hooks/useMeDetails';
import useProjectPages from '../../hooks/useProjectPages';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import ClientHeader from '../../components/ClientHeader';
import PageRow from '../../components/PageRow';
import { Message, Loading } from '../../components/elements';
import ClientFooter from '../../components/ClientFooter';

const Container = styled.div`
  thead {
    background: transparent;
  }
`;

const Dashboard = () => {
  const [me, resultMe] = useMeDetails();
  const project = me.clientProject || {};
  const [{ dataRoomPages }, resultPages] = useProjectPages(project.id);

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
      <ClientHeader me={me} project={project} />
      {(resultMe.loading || resultPages.loading) && !project && <Loading />}
      {resultMe.error && (
        <Message type="error">{resultMe.error.message}</Message>
      )}
      {resultPages.error && (
        <Message type="error">{resultPages.error.message}</Message>
      )}
      <Container className="section">
        <div className="container">
          {dataRoomPages.map(page => (
            <PageRow key={page.id} project={project} page={page} />
          ))}
        </div>
      </Container>
      <ClientFooter project={project} />
    </Layout>
  );
};

export default Dashboard;
