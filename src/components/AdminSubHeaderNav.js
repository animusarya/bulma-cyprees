import React from 'react';
import { startCase } from 'lodash';
import { Link } from 'react-router-dom';

const AdminSubHeaderNav = ({ pages, project }) => {
  return (
    <>
      {pages.map(page => (
        <Link
          key={page.id}
          className="navbar-item has-text-white"
          to={`/admin/project/${project.id}/pages/${page.id}`}
        >
          {startCase(page.name)}
        </Link>
      ))}
    </>
  );
};

export default AdminSubHeaderNav;
