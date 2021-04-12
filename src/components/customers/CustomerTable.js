import React from 'react';

function CustomerTable(props) {
  const { customerData } = props;

  return (
    <div className="table-container">
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Name</th>
            <th>Address</th>
            <th>Store No.</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {customerData.map((item) => (
            <tr key={item.storeNumber}>
              <td>{item.customer}</td>
              <td>{item.name}</td>
              <td>{item.address} </td>
              <td>{item.storeNumber}</td>
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

export default CustomerTable;
