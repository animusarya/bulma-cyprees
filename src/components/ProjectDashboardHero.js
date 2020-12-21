import React, { useState } from 'react';
import styled from 'styled-components';
import { useStoreState } from 'easy-peasy';
// import { Link } from 'react-router-dom';

import { Button } from './elements';
import useProjectDetails from '../hooks/useProjectDetails';
import useProjectUpdate from '../hooks/useProjectUpdate';
import uploadLogoImg from '../assets/images/upload-logo.svg';

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
  height: 80px;
  max-height: initial !important;
  padding-top: 1.5rem;
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
  console.log(handleLogoUpload, isActive, resUpdateProject);

  return (
    <div className="hero-body">
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
          <span>&lt;!-- ros-widget --&gt;</span>
          <br />
          <a>
            &lt;div class=&quot;ros-widget&quot; data-locale=&quot;en-GB&quot;
            data-template-id=&quot;5613c9cde69ddc09340c6beb&quot;
            data-businessunit-id=&quot;5aa00f348306060001af7ddf&quot;
            data-style-height=&quot;100%&quot; data-style-width=&quot;100%&quot;
            data-theme=&quot;light&quot; &gt; &lt;a
            href=&quot;https://reviewourservices.com/review/designcity&quot;
            target=&quot;_blank&quot;
            rel=&quot;noopener&quot;&gt;&lt;/a&gt;&lt;/div&gt;
          </a>
          <p>&lt;!-- End ros-widget --&gt;</p>
        </CodeSnippet>
        <Description className="is-flex">
          <strong>Step 2.</strong>
          <p>
            Add this code snippet to your website where you want your customer
            reviews to be displayed
          </p>
        </Description>
        <a className="is-size-4 has-text-weight-semibold">
          https://reviewourservices.com/designcity/
        </a>
        <Description className="is-flex">
          <strong>Step 3.</strong>
          <p>
            Add this code snippet to your website where you want your customer
            reviews to be displayed
          </p>
        </Description>
        <Button
          paddingless
          primary
          className="edit"
          onClick={() => setIsActive(true)}>
          {!project.logo ? (
            <img className="edit-logo" src={uploadLogoImg} alt="upload logo" />
          ) : (
            <Logo src={project.logo} alt="logo" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProjectDashboardHero;
