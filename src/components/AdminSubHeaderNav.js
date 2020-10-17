import React, { useState } from 'react';
import { startCase } from 'lodash';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavItem = styled(Link)`
  background-color: ${(props) =>
    props.brandColor ? '#fff' : props.brandColor};
  opacity: ${(props) => (props.brandColor ? 0.7 : 1)};
  color: #fff;
  :hover {
    background: #fff;
    opacity: 0.7;
    color: #000 !important;
  }
`;

const AdminSubHeaderNav = ({ pages, project, brandColor }) => {
  const activeSlug = pages[0] ? pages[0].slug : '';

  const [active, setActive] = useState(activeSlug);

  return (
    <>
      {pages.map((page) => (
        <NavItem
          key={page.id}
          brandColor={active == page.slug && brandColor}
          className={
            active == page.slug
              ? 'navbar-item has-text-black has-text-weight-bold'
              : 'navbar-item'
          }
          activeLink={page.slug}
          to={`/admin/project/${project.id}/pages/${page.id}`}
          onClick={() => setActive(page.slug)}
        >
          {startCase(page.name)}
        </NavItem>
      ))}
    </>
  );
};

export default AdminSubHeaderNav;
