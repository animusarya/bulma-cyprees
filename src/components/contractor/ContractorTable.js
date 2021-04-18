import React from 'react';
import { Link } from 'react-router-dom';

function ContractorTable(props) {
  const { contractorData } = props;

  return (
    <div className="table-container">
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Contractor</th>
            <th>Accounts Name</th>
            <th>Address</th>
            <th>Telephone</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {contractorData.map((item) => (
            <tr key={item.telephone}>
              <td>{item.name}</td>
              <td>{item.accountName}</td>
              <td>{item.address} </td>
              <td>{item.telephone}</td>
              <td>
                <Link to="/contractor/edit:12345" className="button is-primary">
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
}

export default ContractorTable;
