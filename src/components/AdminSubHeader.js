import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logoBg from '../assets/images/login-bg.jpg';
import { Button } from './elements';
import AddPageModal from './AddPageModal';
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
  width: inherit;
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

const AdminSubHeader = ({ project, executeUpdateProjectMutation, refetch }) => {
  const [addPageModal, setAddPageModal] = useState(false);
  const [uploadImageModal, setUploadImageModal] = useState(false);

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
        onResponse={async ({ url }) => {
          await executeUpdateProjectMutation({
            id: '5d72202b87053f1a941c5e72',
            input: { heroImage: url },
          });
          setUploadImageModal(false);
        }}
      />
      <AddPageModal
        isActive={addPageModal}
        project={project}
        handleChange={value => setAddPageModal(value)}
        refetch={refetch}
      />
    </Container>
  );
};

AdminSubHeader.defaultProps = {
  refetch: () => {},
};

AdminSubHeader.propTypes = {
  refetch: PropTypes.func,
};

export default AdminSubHeader;
