import React from 'react';
import { Link } from 'react-router-dom';

const ContractorTable = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <div className="table-container">
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Contractor</th>
            <th>Address</th>
            <th>Telephone</th>
            <th>Type</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.email}</td>
              <td>{item && item.account ? item.account.accountAddress : ''}</td>
              <td>{item.telephone}</td>
              <td>{item.type}</td>
              <td>{item.status}</td>
              <td>
                <Link
                  to={`/contractor/edit:${item.id}`}
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
