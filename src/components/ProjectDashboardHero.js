import React, { useState } from 'react';
import styled from 'styled-components';
import { useStoreState } from 'easy-peasy';
// import { Link } from 'react-router-dom';

import useProjectDetails from '../hooks/useProjectDetails';
import useProjectUpdate from '../hooks/useProjectUpdate';
import UploadImageModal from './UploadImageModal';
import { Message } from './elements';
import config from '../utils/config';
import ClipboardItem from './ClipboardItem';

// import uploadLogoImg from '../assets/images/upload-logo.svg';

const WelcomeText = styled.p`
  color: ${(props) => props.theme.primaryColor};
  span {
    color: ${(props) => props.theme.secondaryColor};
  }
`;
const Description = styled.div`
  padding-bottom: 15px;
  padding-top: 30px;
  p {
    align-self: center;
    margin-left: 4px;
  }
`;

const CodeSnippet = styled.div`
  color: ${(props) => props.theme.primaryColor};
  a {
    :hover {
      color: ${(props) => props.theme.primaryColor};
    }
  }
`;

const Logo = styled.img`
  width: auto;
  height: 180px;
  max-height: initial !important;
  padding-top: 1.5rem;
`;

const Button = styled.button`
  color: ${(props) => props.theme.primaryColor};
  background-color: ${(props) => props.theme.secondaryColor};
  border-color: ${(props) => props.theme.secondaryColor};
  border-radius: 6px;
  width: 12rem;
  height: 3.5rem;
  :hover,
  :focus,
  :active {
    color: ${(props) => props.theme.primaryColor};
    border-color: ${(props) => props.theme.secondaryColor};
  }
  .is-focused:not(:active),
  :focus:not(:active) {
    -webkit-box-shadow: 0 0 0 0em rgba(50, 115, 220, 0.25);
    box-shadow: 0 0 0 0em rgba(50, 115, 220, 0.25);
  }
`;

const ProjectDashboardHero = () => {
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

  // console.log(project, 'project');
  return (
    <div className="">
      <div className="has-text-weight-medium">
        <WelcomeText className="is-size-4 has-text-weight-semibold">
          Welcome to Review Our Services<span>.com</span>
        </WelcomeText>
        <Description className="is-flex">
          <strong>Step 1.</strong>
          <p>
            Add this code snippet to your website where you want your customer
            reviews to be displayed
          </p>
        </Description>
        <CodeSnippet className="has-text-weight-semibold">
          <span className="is-size-6">
            &lt;!-- reviews-services-widget --&gt;
          </span>
          <br />
          <a>
            <ClipboardItem
              size="6"
              title={`<div id="reviews-system-widget" data-project-id="${projectId}" data-style-height="100%" data-style-width="100%"> <script type="text/javascript" src="https://website-reviews-widget.netlify.app/website-reviews-widget.js"></script> </div>
           `}
            />
          </a>
          <p className="is-size-6">
            &lt;!-- End reviews-services-widget --&gt;
          </p>
        </CodeSnippet>
        <Description className="is-flex">
          <strong>Step 2.</strong>
          <p>
            Upload your logo here to appear on your{' '}
            <strong>review request form.</strong>
          </p>
        </Description>
        <a onClick={() => setIsActive(true)}>
          {!project.logo ? (
            <Button className="button has-text-weight-bold" type="button">
              Upload Logo
            </Button>
          ) : (
            <Logo src={project.logo} alt="logo" />
          )}
        </a>
        <Description className="is-flex">
          <strong>Step 3.</strong>
          <p>
            Simply email this link to your <strong>review form</strong> for your
            customer to complete.
          </p>
        </Description>
        <div
          // to={`/submit-review/${projectId}`}
          className="is-size-4 has-text-weight-semibold">
          <ClipboardItem
            size="4"
            title={`${config.websiteUrl}/submit-review/${projectId}
           `}
          />
        </div>
        <Description className="is-flex">
          <strong>Step 4.</strong>
          <p>
            Style your reviews under <strong>Style Reviews</strong> in the left
            menu to be in line with your websites brand.
          </p>
        </Description>
        <UploadImageModal
          heading="Upload Logo"
          isActive={isActive}
          onClose={() => setIsActive(false)}
          onResponse={handleLogoUpload}
        />
        {resUpdateProject.error && (
          <Message type="error">{resUpdateProject.error.message}</Message>
        )}
      </div>
    </div>
  );
};

export default ProjectDashboardHero;
