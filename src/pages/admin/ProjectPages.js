import React, { useState } from 'react';
import { useQuery, useMutation } from 'urql';
import gql from 'graphql-tag';
import swal from 'sweetalert';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import AdminHeader from '../../components/AdminHeader';
import { Heading, Button, Message, Loading } from '../../components/elements';
import ProjectForm from '../../components/ProjectForm';
// import ProjectsProperty from '../../components/ProjectsProperty';

const projectPageQuery = gql`
  query page($id: ID!) {
    page(id: $id) {
      id
      name
      slug
      type
      status
      createdAt
    }
  }
`;

const removeMutation = gql`
  mutation removePage($id: ID!) {
    removePage(id: $id) {
      success
    }
  }
`;

const updatePageMutation = gql`
  mutation updatePage($id: ID!, $input: PageInput!) {
    updatePage(id: $id, input: $input) {
      id
      name
      slug
      type
      status
      createdAt
    }
  }
`;

const ProjectPages = ({ match }) => {
  const [resultProject, executeQuery] = useQuery({
    query: projectPageQuery,
    variables: { id: match.params.id },
  });
  const project =
    resultProject.data && resultProject.data.project
      ? resultProject.data.project
      : {};
  const [resRemove, executeMutationRemove] = useMutation(removeMutation);
  const [resUpdate, executeMutationUpdate] = useMutation(updatePageMutation);
  const [editPage, setPageData] = useState({});

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
            <ProjectForm
              enableReinitialize
              initialValues={editPage}
              onSubmit={data => {
                if (isEmpty(editPage)) {
                  // add item
                  return executeMutationUpdate(data);
                }
                // edit item
                const editData = editPage;
                setTimeout(() => {
                  swal('Item updated successfully!');
                  executeQuery({
                    requestPolicy: 'network-only',
                  });
                  setPageData({});
                }, 3000);
                return executeMutationUpdate({ id: editData.id, input: data });
              }}
            />
            {resultProject.error && (
              <Message type="error">{resultProject.error.message}</Message>
            )}
            {resultProject.fetching && <Loading />}
            {resultProject.data && resultProject.data.page && (
              <table className="table is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className="has-text-centered">Type</th>
                    <th className="has-text-centered">Status</th>
                    <th className="has-text-centered">Created At</th>
                    <th>edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {resultProject.data.page.map(pageData => (
                    <tr key={pageData.id}>
                      <td className="has-text-weight-semibold">
                        {pageData.name}
                      </td>
                      <td className="has-text-centered">
                        <i className="fas fa-pound-sign pound-icon"></i>
                        {pageData.type}
                      </td>
                      <td className="has-text-centered">{pageData.status}</td>
                      <td className="has-text-centered">
                        {dayjs(pageData.createdAt).isValid()
                          ? dayjs(pageData.createdAt).format('DD-MM-YYYY')
                          : null}
                      </td>
                      <td>
                        <Button
                          secondary
                          paddingless
                          onClick={() => {
                            setPageData(pageData);
                          }}>
                          EDIT
                        </Button>
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
                                  id: pageData.id,
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
            {resUpdate.error && (
              <Message type="error">{resUpdate.error.message}</Message>
            )}
            {resRemove.fetching || resUpdate.fetching ? <Loading /> : null}
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default ProjectPages;
