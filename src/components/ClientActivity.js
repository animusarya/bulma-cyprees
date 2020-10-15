import React from 'react';
import styled from 'styled-components';

import { Heading } from './elements';

const Container = styled.div`
.select {
  margin-bottom: 2rem;
}
  select {
    border-color: ${(props) => props.theme.primaryColor};
    color: ${(props) => props.theme.primaryColor};
    :hover {
      border-color: ${(props) => props.theme.primaryColor};
    }
  }
  .select:not(.is-multiple)::after {
    border: 1px solid ${(props) => props.theme.primaryColor} !important;
    border-top: 0px !important;
    border-right: 0px !important;
  }
  h2 {
    margin-bottom: 1.5rem !important;
  }
`;
const ClientActivity = () => {

  return (
    <Container >
      <Heading>Client activity</Heading>
      <div class="select">
        <select>
          <option>Select Client</option>
          <option>David Smith</option>
          <option>James Brown</option>
          <option>Helen Mirren</option>
          <option>Paddy Murphy</option>
          <option>Vicky Roberts</option>
        </select>
      </div>
      <table className="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th>Client Time</th>
            <th>File</th>
            <th>Activity</th>
            <th>Client Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>David Smith</td>
            <td>Terms and conditions.pdf</td>
            <td>Download 5 hours ago</td>
            <td>Tue 04 June 2020 - 22:10:23</td>
          </tr>
          <tr>
            <td>David Smith</td>
            <td>Brochure photos.pdf</td>
            <td>Download 5 hours ago</td>
            <td>Tue 04 June 2020 - 22:10:23</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

export default ClientActivity;
