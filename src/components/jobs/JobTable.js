import React from 'react';
import { Link } from 'react-router-dom';
import * as dayjs from 'dayjs';

import { RiDeleteBin5Line } from 'react-icons/ri';
import { TableHead } from '../elements';

const tableHeadData = [
  { name: 'Job Number' },
  { name: 'Customer - Site' },
  { name: 'Due Date' },
  { name: 'Assigned' },
  { name: 'Status' },
  { name: 'View' },
  { name: '' },
];

const JobTable = ({ tableData: data }) => (
  <div className="table-container">
    <table className="table is-fullwidth">
      <TableHead tableHeadData={tableHeadData} />
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.code}</td>
            <td>{item.customer.name} </td>
            {item.startDate < item.dueDate ? (
              <td>{dayjs(item.startDate).format('DD / MM / YYYY')}</td>
            ) : (
              <td className="has-text-danger">
                <span className="icon-text">
                  <span className="icon">
                    <i className="fas fa-flag-checkered" />
                  </span>
                  {dayjs(item.dueDate).format('DD / MM / YYYY')}
                </span>
              </td>
            )}
            <td>{item.assigned}</td>
            <td>{item.status}</td>
            <td>
              <Link to={`/job/edit/${item.id}`} className="button is-primary">
                View
              </Link>
            </td>
            <td className="is-size-4">
              <RiDeleteBin5Line />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default JobTable;
