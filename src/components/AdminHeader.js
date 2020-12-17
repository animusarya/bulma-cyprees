import React, { useState } from 'react';
import styled from 'styled-components';
import { useStoreState } from 'easy-peasy';
import { startCase } from 'lodash';

import useProjectDetails from '../hooks/useProjectDetails';
import useProjectUpdate from '../hooks/useProjectUpdate';
import { Title, Button, Message } from './elements';

import uploadLogoImg from '../assets/images/upload-logo.svg';

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
    @media only screen and (max-width: 768px) {
      display: grid;
    }
  }
  h2 {
    @media only screen and (max-width: 768px) {
      font-size: 2.5rem !important;
    }
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
  button {
    height: auto !important;
    border: none;
  }
`;
const Logo = styled.img`
  width: auto;
  height: 80px;
  max-height: initial !important;
  padding-top: 1.5rem;
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
            {/* {project.logo && (
              <Link to="/admin/dashboard" className="navbar-item">
                <Logo src={project.logo} alt="logo" />
              </Link>
            )} */}
            <Button
              paddingless
              primary
              className="edit"
              onClick={() => setIsActive(true)}>
              {!project.logo ? (
                <img
                  className="edit-logo"
                  src={uploadLogoImg}
                  alt="upload logo"
                />
              ) : (
                <Logo src={project.logo} alt="logo" />
              )}
            </Button>
          </div>
          <div>
            <div className="has-text-right-desktop is-size-1-mobile">
              <Title marginbottom="0px">{startCase(project.name)}</Title>
            </div>
          </div>
        </div>
      </div>
      {resUpdateProject.error && (
        <Message type="error">{resUpdateProject.error.message}</Message>
      )}
    </Container>
  );
};

export default AdminHeader;
