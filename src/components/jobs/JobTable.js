import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  overflow: auto;
  margin-bottom: 1.5rem;

  table {
    width: 100%;
  }
  tr,
  th {
    color: ${(props) => props.theme.textColorWhite} !important;
    border-bottom: 2px solid ${(props) => props.theme.borderColor};
    border-top: 1px solid ${(props) => props.theme.borderColor};
    background-color: ${(props) => props.theme.backgroundColor};
  }
`;

const tableData = [
  {
    jobNumber: 10081,
    site: 'The Stables',
    dueDate: '29/09/20',
    assigned: 'Richard',
    status: true,
  },
  {
    jobNumber: 10082,
    site: 'The Stables',
    dueDate: '29/09/20',
    assigned: 'Richard',
    status: true,
  },
  {
    jobNumber: 10083,
    site: 'The Stables',
    dueDate: '29/09/20',
    assigned: 'Richard',
    status: true,
  },
  {
    jobNumber: 10084,
    site: 'The Stables',
    dueDate: '29/09/20',
    assigned: 'Richard',
    status: true,
  },
  {
    jobNumber: 10085,
    site: 'The Stables',
    dueDate: '29/09/20',
    assigned: 'Richard',
    status: true,
  },
];

const JobTable = () => (
  <Container className="table-container">
    <table className="table">
      <thead>
        <tr>
          <th>Job Number</th>
          <th>Customer - Site</th>
          <th>Due</th>
          <th>Assigned</th>
          <th>Status</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item) => (
          <tr key={item.jobNumber}>
            <td>{item.jobNumber}</td>
            <td>{item.site} </td>
            <td>{item.dueDate}</td>
            <td>{item.assigned}</td>
            <td>{item.status ? 'Open' : 'Closed'}</td>
            <td>
              <button type="button" className="button">
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Container>
);

export default JobTable;
