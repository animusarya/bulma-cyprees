import React from 'react';
import swal from 'sweetalert';
import styled from 'styled-components';

import useProjectDetails from '../../hooks/useProjectDetails';
import useProjectUpdate from '../../hooks/useProjectUpdate';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import { Heading, Title } from '../../components/elements';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import ClientWelcomeEmailForm from '../../components/ClientWelcomeEmailForm';
import AdminHeader from '../../components/AdminHeader';
import AdminSubHeader from '../../components/AdminSubHeader';

const Container = styled.div`
  small {
    padding-left: 10rem;
  }
`;

const ManageEmail = ({ match }) => {
  const projectId = match.params.id;
  const [project] = useProjectDetails(projectId);
  const [executeMutation] = useProjectUpdate();

  console.log(project, 'project');

  return (
    <Layout noContainer>
      <Seo title="Manage Emails" description="Manage Email Content" />
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <AdminHeader />
          <AdminSubHeader />
          <Container>
            <MainColumn>
              <Heading>Manage Emails</Heading>
              <Title>Client Welcome Email (For Unregistered Clients)</Title>
              <div>
                <ClientWelcomeEmailForm
                  enableReinitialize
                  initialValues={project}
                  project={project}
                  onSubmit={async data => {
                    await executeMutation({
                      variables: {
                        id: project.id,
                        input: {
                          welcomeEmailTemplate: data,
                        },
                      },
                    });
                    swal('Email data updated');
                  }}
                />
              </div>
            </MainColumn>
          </Container>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default ManageEmail;
