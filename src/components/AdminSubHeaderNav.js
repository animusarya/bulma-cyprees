import React, { useState } from 'react';
import { startCase } from 'lodash';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavItem = styled(({ brandColor, ...props }) => <Link {...props} />)`
  background-color: ${props =>
    props.brandColor ? '#ffffff10' : props.brandColor};
  color: #fff;
  :hover {
    background: #ffffff10;
  }
`;

const AdminSubHeaderNav = ({ pages, project, brandColor, ...props }) => {
  const activeSlug = pages[0] ? pages[0].slug : '';

  const [active, setActive] = useState(activeSlug);

  return (
    <>
      {pages.map(page => (
        <NavItem
          {...props}
          key={page.id}
          brandColor={active == page.slug && brandColor}
          className={
            active == page.slug
              ? 'navbar-item  has-text-weight-bold'
              : 'navbar-item'
          }
          activelink={page.slug}
          to={`/admin/project/${project.id}/pages/${page.id}`}
          onClick={() => setActive(page.slug)}>
          {startCase(page.name)}
        </NavItem>
      ))}
    </>
  );
};

export default AdminSubHeaderNav;
