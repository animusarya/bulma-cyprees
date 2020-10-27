import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  footer {
    padding: 1.5rem 1.5rem 1.5rem;
    background-color: #f8f8f9;
  }
  .disclaimer {
    background-color: ${props => props.theme.secondaryColor};
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
  font-size: ${props => props.theme.fontSizeMedium} !important;
  color: ${props => props.theme.fontDark} !important;
  @media only screen and (max-width: 768px) {
    font-size: 22px !important;
  }
`;

const ContactInfo = styled.p`
  padding: 20px 0;
  .contact {
    @media only screen and (max-width: 768px) {
      font-size: 18px;
    }
  }
  @media only screen and (max-width: 768px) {
    padding: 0;
  }
`;

const FooterLink = styled.a`
  color: ${props => props.brandColor}!important;
`;

const Disclaimer = styled.p`
  padding: 20px 0;
`;

const ClientFooter = ({ project }) => {
  const getYear = () => {
    return new Date().getFullYear();
  };

  const { brandColor } = project;
  return (
    <Container>
      <footer className="footer">
        <ContactInfo className="content has-text-centered">
          <FooterTitle className="has-text-weight-semibold">
            Contact Details
          </FooterTitle>
          <ContactInfo className=" is-size-6 is-hidden-mobile">
            {project.contactName} |{' '}
            <FooterLink
              href={`tel:${project.contactTelephone}`}
              brandColor={brandColor}>
              {project.contactTelephone}
            </FooterLink>{' '}
            |{' '}
            <FooterLink
              href={`mailto:${project.contactEmail}`}
              brandColor={brandColor}>
              {project.contactEmail}
            </FooterLink>
          </ContactInfo>
          <ContactInfo className="is-size-6 is-hidden-desktop">
            <div className="contact">{project.contactName}</div>
            <div>
              <FooterLink href={`tel:${project.contactTelephone}`}>
                {project.contactTelephone}
              </FooterLink>
            </div>
            <div>
              <FooterLink href={`mailto:${project.contactEmail}`}>
                {project.contactEmail}
              </FooterLink>
            </div>
          </ContactInfo>
        </ContactInfo>
      </footer>
      <div className="disclaimer has-text-weight-light is-size-6">
        <div className="container">
          <div className="columns">
            <div className="column has-text-white">
              {project.disclaimer && (
                <Disclaimer className="para">
                  Disclaimer: {project.disclaimer}
                </Disclaimer>
              )}
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
