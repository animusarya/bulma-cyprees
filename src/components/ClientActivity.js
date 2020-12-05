import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { Heading } from './elements';

const Container = styled.div`
  .select {
    margin-bottom: 2rem;
  }
  select {
    border-color: ${props => props.theme.primaryColor};
    color: ${props => props.theme.primaryColor};
    :hover {
      border-color: ${props => props.theme.primaryColor};
    }
  }
  .select:not(.is-multiple)::after {
    border: 1px solid ${props => props.theme.primaryColor} !important;
    border-top: 0px !important;
    border-right: 0px !important;
  }
  h2 {
    margin-bottom: 1.5rem !important;
  }
`;
const ClientActivity = ({ clientActivityData, clientUsageLogsData }) => {
  return (
    <Container>
      <Heading>Client activity</Heading>
      <div className="select">
        <select>
          <option>All Client</option>
          {clientUsageLogsData &&
            clientUsageLogsData.map(client => (
              <option key={client._id}>{client.userName}</option>
            ))}
        </select>
      </div>
      <table className="table is-fullwidth is-hoverable">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>File</th>
            <th>Activity</th>
            <th>Client Time</th>
          </tr>
        </thead>

        <tbody>
          {clientActivityData &&
            clientActivityData.map(data => (
              <tr key={data._id}>
                <td>{data.clientId.profile.fullName}</td>
                <td>{data.fileId.name}</td>
                <td>
                  Downloaded{' '}
                  {moment(data.createdAt)
                    .local()
                    .fromNow()}
                </td>
                <td>
                  {moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Container>
  );
};

export default ClientActivity;
