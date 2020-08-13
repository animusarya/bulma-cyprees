import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { startCase } from 'lodash';

import useProjectDetails from '../hooks/useProjectDetails';
import useProjectUpdate from '../hooks/useProjectUpdate';
import { Title, Button, Message } from './elements';
import UploadImageModal from './UploadImageModal';

import uploadLogoImg from '../assets/images/upload-logo.png';

const Container = styled.div`
  margin-top: 1rem;
  padding: 0 2rem;
  @media only screen and (max-width: 768px) {
    margin-top: none;
  }
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

  .edit-logo {
    height: auto;
    width: 160px;
  }
`;
const Logo = styled.img`
  width: auto;
  height: 50px;
  max-height: initial !important;
`;

const AdminHeader = () => {
  const [isActive, setIsActive] = useState(false);
  const projectId = useStoreState((state) => state.active.project);
  const [project, resultProject] = useProjectDetails(projectId);
  const [executeUpdateProjectMutation, resUpdateProject] = useProjectUpdate();

  const handleLogoUpload = (uploadResponse) => {
    executeUpdateProjectMutation({
      variables: {
        id: projectId,
        input: { logo: uploadResponse.url },
      },
    }).then(() => {
      setIsActive(false);
      resultProject.refetch();
    });
  };

  return (
    <Container>
      <div className="columns">
        <div className="column">
          <div className="logo-edit">
            {project.logo && (
              <Link to="/admin/dashboard" className="navbar-item">
                <Logo src={project.logo} alt="logo" />
              </Link>
            )}
            <Button
              paddingless
              secondary
              className="edit"
              onClick={() => setIsActive(true)}
            >
              <img
                className="edit-logo"
                src={uploadLogoImg}
                alt="upload logo"
              />
            </Button>
          </div>
          <div>
            <div className="has-text-right is-size-1-mobile">
              <Title marginbottom="0px">{startCase(project.name)}</Title>
            </div>
          </div>
        </div>
      </div>
      <UploadImageModal
        heading="Upload Logo"
        isActive={isActive}
        onClose={() => setIsActive(false)}
        onResponse={handleLogoUpload}
      />
      {resUpdateProject.error && (
        <Message type="error">{resUpdateProject.error.message}</Message>
      )}
    </Container>
  );
};

export default AdminHeader;
