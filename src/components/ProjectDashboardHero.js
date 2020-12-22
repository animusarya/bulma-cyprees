import React from 'react';
import styled from 'styled-components';

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

const Button = styled.button`
  color: ${(props) => props.theme.primaryColor};
  border-color: ${(props) => props.theme.primaryColor};
  width: 12rem;
  height: 3.5rem;
  :hover,
  :focus,
  :active {
    color: ${(props) => props.theme.primaryColor};
    border-color: ${(props) => props.theme.primaryColor};
  }
  .is-focused:not(:active),
  :focus:not(:active) {
    -webkit-box-shadow: 0 0 0 0em rgba(50, 115, 220, 0.25);
    box-shadow: 0 0 0 0em rgba(50, 115, 220, 0.25);
  }
`;

const ProjectDashboardHero = () => (
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
      <p className="control">
        <Button className="button has-text-weight-bold" type="button">
          Upload Logo
        </Button>
      </p>
    </div>
  </div>
);

export default ProjectDashboardHero;
