import React from 'react';
import { Link } from 'react-router-dom';

import * as dayjs from 'dayjs';

const JobTable = ({ tableData: data }) => (
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
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.code}</td>
            <td>{item.customer.name} </td>

            <td> {dayjs(item.dueDate).format('DD / MM / YYYY')}</td>
            <td>{item.assigned}</td>
            <td>{item.status}</td>
            <td>
              <Link to={`/job/edit/${item.id}`} className="button is-primary">
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default JobTable;
