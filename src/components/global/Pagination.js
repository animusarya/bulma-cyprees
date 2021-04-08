import React from 'react';

const paginationData = [
  { page: 1 },
  { page: 2, active: true },
  { page: 3 },
  { page: 4 },
  { page: 5 },
];

const Pagination = () => (
  <nav
    className="section pt-0 pagination is-small"
    role="navigation"
    aria-label="pagination">
    <a className="pagination-previous">Previous</a>
    <a className="pagination-next">Next page</a>
    <ul className="pagination-list">
      {paginationData.map((item) => (
        <li key={item.page}>
          <a className={`pagination-link  ${item.active ? 'is-current' : ''}`}>
            {item.page}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

export default Pagination;
