import React from 'react';

const TableHead = ({ tableHeadData }) => (
  <thead>
    <tr>
      {tableHeadData.map((item) => (
        <th key={item.name}>{item.name}</th>
      ))}
    </tr>
  </thead>
);

export default TableHead;
