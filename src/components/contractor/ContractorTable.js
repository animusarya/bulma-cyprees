import React from 'react';
import { Link } from 'react-router-dom';

import { TableHead } from '../elements';

const tableHeadData = [
  { name: 'Contractor' },
  { name: 'Profile Name' },
  { name: 'Address' },
  { name: 'Telephone' },
  { name: 'Type' },
  { name: 'Status' },
  { name: 'Edit' },
];

const ContractorTable = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <div className="table-container">
      <table className="table is-fullwidth">
        <TableHead tableHeadData={tableHeadData} />
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.email}</td>
              <td>{item && item.profile ? item.profile.fullName : ''}</td>
              <td>{item && item.account ? item.account.accountAddress : ''}</td>
              <td>{item.telephone}</td>
              <td>{item.type}</td>
              <td>{item.status}</td>
              <td>
                <Link
                  to={`/contractor/edit/${item.id}`}
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
};

export default ContractorTable;
