import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  footer {
    padding: 1.5rem 1.5rem 1.5rem;
    background-color: #F8F8F9;
  }
  .disclaimer {
    background-color: ${(props) => props.theme.secondaryColor};
    @media only screen and (max-width: 768px) {
    padding: 1.5rem;
  }
  }
  .container {
    max-width: 1100px;
  }
  .column {
    padding-top: 20px !important;
    padding-bottom: 20px !important;
  }
  .para {
    font-size: 12px;
  }
`;

const FooterTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizeMedium} !important;
  color: ${(props) => props.theme.fontDark} !important;
  font-size: ${(props) => props.theme.fontSizeLarge} !important;
`;

const ContactInfo = styled.p`
  padding: 20px 0;
  @media only screen and (max-width: 768px) {
    padding: 0;
  }
`;

const ClientFooter = ({ project }) => {
  const getYear = () => {
    return new Date().getFullYear();
  };
  return (
    <Container>
      <footer className="footer">
        <ContactInfo className="content has-text-centered">
          <FooterTitle className="has-text-weight-semibold">
            Contact Details
          </FooterTitle>
          <ContactInfo className=" is-size-6 is-hidden-mobile">
            {project.contactName} |{' '}
            <a href={`tel:${project.contactTelephone}`}>
              {project.contactTelephone}
            </a>{' '}
            |{' '}
            <a href={`mailto:${project.contactEmail}`}>
              {project.contactEmail}
            </a>
          </ContactInfo>
          <ContactInfo className="is-size-6 is-hidden-desktop">
            <div className="">{project.contactName}</div>
            <div>
              <a href={`tel:${project.contactTelephone}`}>
                {project.contactTelephone}
              </a>
            </div>
            <div>
              <a href={`mailto:${project.contactEmail}`}>
                {project.contactEmail}
              </a>
            </div>
          </ContactInfo>
        </ContactInfo>
      </footer>
      <div className="disclaimer has-text-weight-light is-size-6">
        <div className="container">
        <div className="columns">
          <div className="column has-text-white">
            {project.disclaimer && <p className="para">Disclaimer: {project.disclaimer}</p>}
            <p className="para">
              <i className="far fa-copyright"></i> {getYear()} {project.name}{' '}
              All Rights Reserved
            </p>
          </div>
        </div>
        </div>
      </div>
    </Container>
  );
};

export default ClientFooter;
