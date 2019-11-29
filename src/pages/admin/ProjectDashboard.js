import React from 'react';
import styled from 'styled-components';

import useProjectDetails from '../../hooks/useProjectDetails';
import useProjectPages from '../../hooks/useProjectPages';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import AdminHeader from '../../components/AdminHeader';
import AdminSubHeader from '../../components/AdminSubHeader';
import ProjectDashboardHero from '../../components/ProjectDashboardHero';
import ProjectPages from '../../components/ProjectPages';
import { Message, Loading } from '../../components/elements';

const Container = styled.div`
  .content {
    align-self: center;
  }
  span {
    color: ${props => props.theme.primaryColor};
  }
  p {
    line-height: 1;
  }
  .steps-title {
    margin-bottom: 2%;
  }
`;

const ProjectDashboard = ({ match }) => {
  const projectId = match.params.id;
  const [project] = useProjectDetails(projectId);
  const [{ dataRoomPages }, resultPages] = useProjectPages(projectId);

  return (
    <Layout noContainer>
      <Seo title="Project Dashboard" />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <AdminHeader />
          <AdminSubHeader />
          <MainColumn>
            {resultPages.error && (
              <Message type="error">{resultPages.error.message}</Message>
            )}
            {resultPages.loading && <Loading />}
            <div className="content">
              {dataRoomPages.length === 0 ? (
                <ProjectDashboardHero project={project} />
              ) : (
                <ProjectPages
                  project={project}
                  pages={dataRoomPages}
                  refetch={resultPages.refetch}
                />
              )}
            </div>
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default ProjectDashboard;
