import React from 'react';
import { useQuery, useMutation } from 'urql';
import gql from 'graphql-tag';

import PageForm from './PageForm';

const createPageMutation = gql`
  mutation createPage($input: PageInput!) {
    createPage(input: $input) {
      name
      slug
    }
  }
`;

const AddPageModal = ({ project, isActive, handleChange }) => {
  const [res, executeMutation] = useMutation(createPageMutation);

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
              await executeMutation({
                input: { project: project.id, ...data },
              });
              // close the modal box
              handleChange(false);
            }}
          />
        </section>
      </div>
    </div>
  );
};

export default AddPageModal;
