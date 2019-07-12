import React from 'react';
import { useQuery, useMutation } from 'urql';
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';
import MainColumn from '../../components/MainColumn';
import { Heading, Title } from '../../components/elements';
import AdminHeader from '../../components/AdminHeader';

const projectQuery = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      name
      slug
      welcomeEmailTemplate {
        subject
        body
      }
      clientEmailTemplate {
        subject
        body
      }
    }
  }
`;

const updateProjectMutation = gql`
  mutation updateProject($id: ID!, $input: ProjectUpdateInput!) {
    updateProject(id: $id, input: $input) {
      id
      name
    }
  }
`;

const ProjectSetting = ({ match }) => {
  const [resultProject] = useQuery({
    query: projectQuery,
    variables: { id: match.params.id },
  });
  const project =
    resultProject.data && resultProject.data.project
      ? resultProject.data.project
      : {};

  const [res, executeMutation] = useMutation(updateProjectMutation);

  return (
    <Layout>
      <Seo title="Dashboard Super Admin" description="Page description" />
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <AdminHeader project={project} />
          <MainColumn paddingtop="1rem">
            <Heading>Project Setting</Heading>
            <div>
              {/* <ClientWelcomeEmailForm
                enableReinitialize
                initialValues={project}
                onSubmit={async data => {
                  await executeMutation({
                    id: project.id,
                    input: {
                      welcomeEmailTemplate: data,
                    },
                  });
                }}
              /> */}
            </div>
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default ProjectSetting;
