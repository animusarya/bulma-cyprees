import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import swal from 'sweetalert';

import PageForm from './PageForm';

const createPageMutation = gql`
  mutation createPage($input: PageInput!) {
    createPage(input: $input) {
      id
      name
      slug
    }
  }
`;

const AddPageModal = ({
  project,
  isActive,
  handleChange,
  refetch,
  history,
}) => {
  const [executeMutation] = useMutation(createPageMutation);

  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add Page</p>
          <button
            type="button"
            className="delete"
            aria-label="close"
            onClick={() => handleChange(false)}></button>
        </header>
        <section className="modal-card-body">
          <PageForm
            onSubmit={async data => {
              const pageData = await executeMutation({
                variables: { input: { project: project.id, ...data } },
              });
              // refresh data on dashboard
              refetch();
              // close the modal box
              handleChange(false);
              // redirect to new created page
              swal('Page added successfully').then(() => {
                history.push(
                  `/admin/project/${project.id}/pages/${pageData.data.createPage.id}`,
                );
              });
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default withRouter(AddPageModal);
