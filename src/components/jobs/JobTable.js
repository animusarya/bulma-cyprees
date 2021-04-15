import React from 'react';
import { Link } from 'react-router-dom';

function JobTable(props) {
  const { status, tableData } = props;

  return (
    <div className="table-container">
      <table className="table is-fullwidth">
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
              <td>{status}</td>
              <td>
                <Link to="/edit:12345" className="button is-primary">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobTable;
