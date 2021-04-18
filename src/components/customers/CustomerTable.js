import React from 'react';
import { Link } from 'react-router-dom';

function CustomerTable(props) {
  const { customerData } = props;

  return (
    <div className="table-container">
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Site</th>
            <th>Address</th>
            <th>Store No.</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {customerData.map((item) => (
            <tr key={item.storeNumber}>
              <td>{item.customer}</td>
              <td>{item.site}</td>
              <td>{item.address} </td>
              <td>{item.storeNumber}</td>
              <td>
                <Link to="/customer/edit:12345" className="button is-primary">
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

export default CustomerTable;
