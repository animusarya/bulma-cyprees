import React, { useState } from 'react';
import styled from 'styled-components';
import { useStoreState } from 'easy-peasy';

import useProjectDetails from '../hooks/useProjectDetails';
import useProjectUpdate from '../hooks/useProjectUpdate';
import useProjectPages from '../hooks/useProjectPages';
import AdminSubHeaderNav from './AdminSubHeaderNav';
import { Button, Message } from './elements';
import AddPageModal from './AddPageModal';
import UploadImageModal from './UploadImageModal';
import theme from '../utils/theme';

import logoBg from '../assets/images/blank.png';
import uploadBannerImg from '../assets/images/upload-banner.png';

const Container = styled.div`
  margin-top: 1rem;
  padding: 0 2rem;
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
  background-color: ${(props) => props.brandColor};
  .navbar-item {
    :hover {
    background: #fff;
    opacity: 0.7;
    color: #000 !important;
  }
  }
  button {
    background: ${(props) => props.theme.menuBackgroundColor};

    :focus {
      outline: -webkit-focus-ring-color auto 0px;
    }
  }
  .navbar-menu {
    background: ${(props) => props.brandColor};
  }
`;
const HeroImg = styled.img`
  height: 10rem;
  width: auto;
  object-fit: cover;
  background-color: #eeeeee;
`;
const Hero = styled.section`
  .hero-body {
    position: absolute;
    align-self: center;
  }
  .title {
    color: ${(props) => props.brandColor};
  }
  .edit-banner {
    height: auto;
    width: 210px;
  }
  button {
    height: auto !important;
    border: none;
  }
`;

const AdminSubHeader = () => {
  const [active, setActive] = useState(false);
  const [addPageModal, setAddPageModal] = useState(false);
  const [uploadImageModal, setUploadImageModal] = useState(false);
  const projectId = useStoreState((state) => state.active.project);
  const [project, resultProject] = useProjectDetails(projectId);
  const [executeUpdateProjectMutation, resUpdateProject] = useProjectUpdate();
  const [{ pages }, resultPages] = useProjectPages(projectId);

  const handleBannerUpload = (uploadResponse) => {
    executeUpdateProjectMutation({
      variables: {
        id: projectId,
        input: { heroImage: uploadResponse.url },
      },
    }).then(() => {
      setUploadImageModal(false);
      resultProject.refetch();
    });
  };

  const brandColor = project.brandColor
    ? project.brandColor
    : theme.primaryColor;

  return (
    <Container>
      <NavbarMenu
        className="navbar"
        role="navigation"
        aria-label="main navigation"
        brandColor={brandColor}
      >
        <div className="navbar-brand">
          <button
            type="button"
            className={active ? 'is-active navbar-burger' : 'navbar-burger'}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={() => setActive(!active)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>{' '}
        <div
          id="navbarBasicExample"
          className={active ? 'navbar-menu is-active' : 'navbar-menu'}
        >
          <div className="navbar-start">
            {pages.length > 0 && (
              <AdminSubHeaderNav
                project={project}
                pages={pages}
                brandColor={brandColor}
              />
            )}
          </div>
          <div className="navbar-end">
            <a
              className="navbar-item has-text-white"
              onClick={() => setAddPageModal(true)}
            >
              + Add Page
            </a>
          </div>
        </div>
      </NavbarMenu>
      <Hero className="hero" brandColor={brandColor}>
        <HeroImg src={project.heroImage || logoBg} alt="logo-bg" />
        <div className="hero-body has-text-centered">
          <Button
            secondary
            onClick={() => setUploadImageModal(true)}
            paddingless
          >
            <img
              className="edit-banner"
              src={uploadBannerImg}
              alt="upload banner"
            />
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
        handleChange={(value) => setAddPageModal(value)}
        refetch={resultPages.refetch}
      />
      {resUpdateProject.error && (
        <Message type="error">{resUpdateProject.error.message}</Message>
      )}
    </Container>
  );
};

export default AdminSubHeader;
