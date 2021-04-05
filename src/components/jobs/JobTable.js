import React from 'react';

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
  {
    jobNumber: 10284,
    site: 'The Stables',
    dueDate: '29/09/20',
    assigned: 'Richard',
    status: true,
  },
  {
    jobNumber: 100824,
    site: 'The Stables',
    dueDate: '29/09/20',
    assigned: 'Richard',
    status: true,
  },
  {
    jobNumber: 102084,
    site: 'The Stables',
    dueDate: '29/09/20',
    assigned: 'Richard',
    status: true,
  },
  {
    jobNumber: 102084,
    site: 'The Stables',
    dueDate: '29/09/20',
    assigned: 'Richard',
    status: true,
  },
];

const JobTable = () => (
  <div className="table-container">
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
              <button type="button" className="button is-primary">
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default JobTable;
