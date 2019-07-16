import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from 'urql';
import gql from 'graphql-tag';
import swal from 'sweetalert';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import AdminHeader from '../../components/AdminHeader';
import { Heading, Button, Message, Loading } from '../../components/elements';

const projectQuery = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      name
      slug
    }
  }
`;

const pagesQuery = gql`
  query pages($projectId: ID!) {
    pages(projectId: $projectId) {
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

const LinkWrapper = styled(Link)`
  color: ${props => props.theme.primaryColor};
  :hover {
    color: ${props => props.theme.primaryColor};
  }
`;

const ProjectPages = ({ match }) => {
  // fetch project data from api
  const [resultProject] = useQuery({
    query: projectQuery,
    variables: { id: match.params.id },
  });
  const [resultPages, executeQuery] = useQuery({
    query: pagesQuery,
    variables: { projectId: match.params.id },
  });
  const [resRemove, executeMutationRemove] = useMutation(removeMutation);

  const project =
    resultProject.data && resultProject.data.project
      ? resultProject.data.project
      : {};
  const pages =
    resultPages.data && resultPages.data.pages ? resultPages.data.pages : {};
  console.log('pages', pages);

  return (
    <Layout>
      <Seo title="Project Pages" description="" />
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
            {resultPages.error && (
              <Message type="error">{resultPages.error.message}</Message>
            )}
            {(resultPages.fetching || resultProject.fetching) && <Loading />}
            {pages.length > 0 && (
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
                  {pages.map(page => (
                    <tr key={page.id}>
                      <td className="has-text-weight-semibold">{page.name}</td>
                      <td className="has-text-centered">{page.type}</td>
                      <td className="has-text-centered">{page.status}</td>
                      <td className="has-text-centered">
                        {dayjs(page.createdAt).isValid()
                          ? dayjs(page.createdAt).format('DD-MM-YYYY')
                          : null}
                      </td>
                      <td>
                        <LinkWrapper
                          to={`/admin/project/${project.id}/pages/${page.id}`}>
                          EDIT
                        </LinkWrapper>
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
                                  id: page.id,
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
            {resRemove.fetching ? <Loading /> : null}
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default ProjectPages;
