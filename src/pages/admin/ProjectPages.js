import React from 'react';
import { useQuery, useMutation } from 'urql';
import gql from 'graphql-tag';
import swal from 'sweetalert';
import dayjs from 'dayjs';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import AdminHeader from '../../components/AdminHeader';
import { Heading, Button, Message, Loading } from '../../components/elements';
// import ProjectsProperty from '../../components/ProjectsProperty';

const pageQuery = gql`
  query page($id: ID!) {
    page(id: $id) {
      id
      name
      slug
      status
    }
  }
`;

const removeMutation = gql`
  mutation removeProject($id: ID!, $clientId: ID!) {
    removeProject(id: $id, clientId: $clientId) {
      success
    }
  }
`;

const ProjectPages = ({ match }) => {
  // fetch project data from api
  const [resultProject] = useQuery({
    query: pageQuery,
    variables: { id: match.params.id },
  });
  const project =
    resultProject.data && resultProject.data.project
      ? resultProject.data.project
      : {};
  // console.log('resultProject', project);

  const [resRemove, executeMutationRemove] = useMutation(removeMutation);

  return (
    <Layout>
      <Seo title="Dashboard Admin" description="Page description" />
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <AdminHeader project={project} />
          <MainColumn>
            <Heading>Manage Pages</Heading>
            {resultProject.error && (
              <Message type="error">{resultProject.error.message}</Message>
            )}
            {resultProject.fetching && <Loading />}
            {resultProject.data && resultProject.data.projects && (
              <table className="table is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th>Projects</th>
                    <th className="has-text-centered">Plan</th>
                    <th className="has-text-centered">Duration</th>
                    <th>Manage</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {resultProject.data.projects.map(projectData => (
                    <tr key={projectData.id}>
                      <td className="has-text-weight-semibold">
                        {projectData.name}
                      </td>
                      <td className="has-text-centered">
                        <i className="fas fa-pound-sign pound-icon"></i>
                        {projectData.subscriptionAmount}
                      </td>
                      <td className="has-text-centered">
                        {projectData.subscriptionDurationInMonths}
                      </td>
                      <td className="has-text-centered">
                        {dayjs(projectData.subscriptionStartsAt).isValid()
                          ? dayjs(projectData.subscriptionStartsAt).format(
                            'DD-MM-YYYY',
                          )
                          : null}
                      </td>
                      <td className="has-text-centered">
                        {dayjs(projectData.subscriptionEndsAt).isValid()
                          ? dayjs(projectData.subscriptionEndsAt).format(
                            'DD-MM-YYYY',
                          )
                          : '-'}
                      </td>
                      <td>
                        <Button
                          secondary
                          paddingless
                          onClick={() => {
                            swal('Are you confirm to delete this item?', {
                              buttons: ['Cancel', 'Confirm'],
                            }).then(async value => {
                              if (value) {
                                await executeMutationRemove({
                                  id: project.id,
                                  clientId: project.clientId,
                                });
                              }
                            });
                          }}>
                          DELETE
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {resRemove.error && (
              <Message type="error">{resRemove.error.message}</Message>
            )}
            {resultProject.error && (
              <Message type="error">{resultProject.error.message}</Message>
            )}
            {resRemove.fetching || resultProject.fetching ? <Loading /> : null}
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default ProjectPages;
