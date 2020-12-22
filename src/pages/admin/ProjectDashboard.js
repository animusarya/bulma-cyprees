import React from 'react';
import styled from 'styled-components';

import useProjectDetails from '../../hooks/useProjectDetails';
// import useProjectPages from '../../hooks/useProjectPages';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
// import AdminSubHeader from '../../components/AdminSubHeader';
import ProjectDashboardHero from '../../components/ProjectDashboardHero';

const Container = styled.div``;

const ProjectDashboard = ({ match }) => {
  const projectId = match.params.id;
  const [project] = useProjectDetails(projectId);
  // const [{ pages }, resultPages] = useProjectPages(projectId);

  return (
    <Layout noContainer>
      <Seo title="Project Dashboard" />
      <Header />
      <Container className="columns">
        <div className="column">
          <Sidebar />
        </div>
        <div className="column is-four-fifths">
          <MainColumn>
            <div className="content">
              <ProjectDashboardHero project={project} />
            </div>
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default ProjectDashboard;
