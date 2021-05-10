import React from 'react';
import { Link } from 'react-router-dom';

import { TableHead } from '../elements';

const tableHeadData = [
  { name: 'Customer' },
  { name: 'Address' },
  { name: 'Email Address' },
  { name: 'Store No.' },
  { name: 'Edit' },
];

const CustomerTable = ({ data }) => (
  <div className="table-container">
    <table className="table is-fullwidth">
      <TableHead tableHeadData={tableHeadData} />
      <tbody>
        {data &&
          data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                {item.locations.map(({ address }) => (
                  <p>
                    {address && address.addressLine1
                      ? address.addressLine1
                      : ''}
                  </p>
                ))}
              </td>
              <td>{item.accountsEmail}</td>
              <td>
                {item.locations.map((item1) => (
                  <p>{item1 && item1.number ? item1.number : ''}</p>
                ))}
              </td>

              <td>
                <Link
                  to={`/customer/edit/${item.id}`}
                  className="button is-primary">
                  <span className="icon is-small">
                    <i className="fas fa-eye" />
                  </span>
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);
export default CustomerTable;
