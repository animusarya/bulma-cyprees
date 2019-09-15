import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.png';
import { Title, Button } from './elements';
import UploadImageModal from './UploadImageModal';

const Container = styled.div`
  margin-top: 1rem;
  .column {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .column .logo-edit {
    display: flex;
  }
  .column .edit {
    align-self: center;
    font-weight: 500;
  }
  .is-text {
    padding: 0px;
  }
  .icon {
    margin-left: 1rem !important;
    font-size: 8px !important;
  }
  .navbar-item {
    min-width: 100px;
  }
`;
const Logo = styled.img`
  width: auto;
  height: 100%;
  max-height: 2.5rem !important;
`;

const AdminHeader = ({ project, executeUpdateProjectMutation, refetch }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Container>
      <div className="columns">
        <div className="column is-8 is-offset-2">
          <div className="logo-edit">
            <Link to="/admin/dashboard" className="navbar-item">
              <Logo src={project.logo || logo} alt="logo" />
            </Link>
            <Button
              paddingless
              secondary
              className="edit"
              onClick={() => setIsActive(true)}>
              change logo
            </Button>
          </div>
          <div>
            <div className="has-text-right">
              <Title marginbottom="0px">{project.name}</Title>
            </div>
          </div>
        </div>
      </div>
      <UploadImageModal
        heading="Upload Logo"
        isActive={isActive}
        onClose={() => setIsActive(false)}
        onResponse={async ({ url }) => {
          await executeUpdateProjectMutation({
            variables: {
              id: project.id,
              input: { logo: url },
            },
          });
          setIsActive(false);
          refetch();
        }}
      />
    </Container>
  );
};

export default AdminHeader;
