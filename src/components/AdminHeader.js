import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

import useProjectDetails from '../hooks/useProjectDetails';
import useProjectUpdate from '../hooks/useProjectUpdate';
import { Title, Button, Message } from './elements';
import UploadImageModal from './UploadImageModal';
import logo from '../assets/images/logo.png';

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
  height: 2.5rem;
`;

const AdminHeader = () => {
  const [isActive, setIsActive] = useState(false);
  const projectId = useStoreState(state => state.active.project);
  const [project, resultProject] = useProjectDetails(projectId);
  const [executeUpdateProjectMutation, resUpdateProject] = useProjectUpdate();

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
          resultProject.refetch();
        }}
      />
      {resUpdateProject.error && (
        <Message type="error">{resUpdateProject.error.message}</Message>
      )}
    </Container>
  );
};

export default AdminHeader;
