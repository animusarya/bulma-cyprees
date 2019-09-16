import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

import useProjectDetails from '../hooks/useProjectDetails';
import useProjectUpdate from '../hooks/useProjectUpdate';
import useProjectPages from '../hooks/useProjectPages';
import { Button, Message } from './elements';
import AddPageModal from './AddPageModal';
import UploadImageModal from './UploadImageModal';
import logoBg from '../assets/images/login-bg.jpg';

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
`;
const NavbarMenu = styled.nav`
  padding: 0px 16% !important;
  background-color: ${props => props.theme.primaryColor};
  .navbar-item {
    :hover {
      background-color: ${props => props.theme.primaryColor};
    }
  }
`;
const HeroImg = styled.img`
  height: 10rem;
  width: auto;
  object-fit: cover;
`;
const Hero = styled.section`
  .hero-body {
    position: absolute;
    align-self: center;
  }
  .title {
    color: ${props => props.theme.primaryColor};
  }
  .edit-banner {
    background: white;
    height: 4.5rem;
    width: 11rem;
    padding-top: 10%;
  }
`;

const AdminSubHeader = () => {
  const [addPageModal, setAddPageModal] = useState(false);
  const [uploadImageModal, setUploadImageModal] = useState(false);
  const projectId = useStoreState(state => state.active.project);
  const [project, resultProject] = useProjectDetails(projectId);
  const [executeUpdateProjectMutation, resUpdateProject] = useProjectUpdate();
  const [{ contentPages }, resultPages] = useProjectPages(projectId);

  const handleBannerUpload = useCallback(
    uploadResponse => {
      executeUpdateProjectMutation({
        variables: {
          id: projectId,
          input: { heroImage: uploadResponse.url },
        },
      }).then(() => {
        setUploadImageModal(false);
        resultProject.refetch();
      });
    },
    [projectId],
  );

  return (
    <Container>
      <NavbarMenu
        className="navbar"
        role="navigation"
        aria-label="main navigation">
        <div className="navbar-brand">
          <Link
            to="/"
            role="button"
            className="navbar-burger burger has-text-white"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </Link>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a
              className="navbar-item has-text-white"
              onClick={() => setAddPageModal(true)}>
              + Add Page
            </a>
            {contentPages &&
              contentPages.map(page => (
                <Link
                  key={page.id}
                  className="navbar-item has-text-white"
                  to={`/admin/project/${project.id}/pages/${page.id}`}>
                  {page.name}
                </Link>
              ))}
          </div>
        </div>
      </NavbarMenu>
      <Hero className="hero">
        <HeroImg src={project.heroImage || logoBg} alt="logo-bg" />
        <div className="hero-body has-text-centered">
          <Button
            paddingless
            secondary
            onClick={() => setUploadImageModal(true)}>
            <div className="edit-banner">
              <h6 className="title is-6 has-text-weight-semibold">
                Change banner
              </h6>
              <h6 className="subtitle is-size-7 is-italic">
                image size 1600 x 400px
              </h6>
            </div>
          </Button>
        </div>
      </Hero>
      <UploadImageModal
        heading="Upload Banner"
        isActive={uploadImageModal}
        onClose={() => setUploadImageModal(false)}
        onResponse={handleBannerUpload}
      />
      <AddPageModal
        isActive={addPageModal}
        project={project}
        handleChange={value => setAddPageModal(value)}
        refetch={resultPages.refetch}
      />
      {resUpdateProject.error && (
        <Message type="error">{resUpdateProject.error.message}</Message>
      )}
    </Container>
  );
};

export default AdminSubHeader;
