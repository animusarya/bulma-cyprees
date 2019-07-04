import React from 'react';
import styled from 'styled-components';

import { Title, Button } from './elements';

const Container = styled.div`
  .columns {
    display: flex;
  }
`;
const ProjectsProperty = () => (
  <Container>
    <div className="columns">
      <div className="column">
        <Title>Property</Title>
      </div>
      <div className="column is-one-fifth">
        <Button>Delete Tab</Button>
      </div>
    </div>
    <div>Drag and drop</div>
    <table className="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th className="has-text-centered">Sort</th>
          <th>Name</th>
          <th className="has-text-centered">File Type</th>
          <th className="has-text-centered">Section</th>
          <th className="has-text-centered">Uploaded</th>
          <th className="has-text-centered">Replace</th>
          <th className="has-text-centered">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="has-text-centered">
            <Button secondary paddingless>
              <i className="far fa-hand-pointer"></i>
            </Button>
          </td>
          <td>Sale details</td>
          <td className="has-text-centered is-uppercase">.pdf</td>
          <td className="has-text-centered">3 days ago</td>
          <td className="has-text-centered"> 5 June 2019 - 12:30pm</td>
          <td className="has-text-centered">
            <Button secondary paddingless>
              <i className="fas fa-sync-alt"></i>
            </Button>
          </td>
          <td className="has-text-centered">
            <Button secondary paddingless>
              <i className="far fa-trash-alt"></i>{' '}
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  </Container>
);

export default ProjectsProperty;
