import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import swal from 'sweetalert';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { Heading, Button, Message, Loading } from './elements';

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

const ProjectPages = ({ pages, project, refetch }) => {
  const [executeMutationRemove, resRemove] = useMutation(removeMutation);

  return (
    <div className="column">
      <Heading>Manage Pages</Heading>
      <table className="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th>Name</th>
            <th className="has-text-centered">Type</th>
            <th className="has-text-centered">Status</th>
            <th className="has-text-centered">Created At</th>
            <th></th>
            <th></th>
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
                  Manage
                </LinkWrapper>
              </td>
              <td>
                <Button
                  secondary
                  paddingless
                  onClick={() => {
                    swal('Are you confirm to remove this page?', {
                      buttons: ['Cancel', 'Confirm'],
                    }).then(async value => {
                      if (value) {
                        await executeMutationRemove({
                          variables: { id: page.id },
                        });
                        refetch();
                      }
                    });
                  }}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {resRemove.error && (
        <Message type="error">{resRemove.error.message}</Message>
      )}
      {resRemove.loading ? <Loading /> : null}
    </div>
  );
};

export default ProjectPages;
