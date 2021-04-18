import React from 'react';

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
                <button type="button" className="button is-primary">
                  <span className="icon is-small">
                    <i className="fas fa-eye" />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContractorTable;
