import React from 'react';
import { Link } from 'react-router-dom';

const ProjectDashboardHero = ({ project }) => (
  <div className="hero-body">
    <div className="has-text-centered has-text-weight-medium">
      <p className="title is-size-3 has-text-weight-normal">
        Welcome to <strong className="has-text-weight-bold">Intelli</strong>
        <span>Share</span>
      </p>
      <div className="steps-title">
        <strong className="subtitle has-text-weight-bold is-size-4">
          Getting Started
        </strong>
      </div>
      <div className="subtitle is-6">
        <p>
          1. Insert your <span className="has-text-weight-bold">logo</span>
        </p>
        <p>
          2. Insert your branding colour under{' '}
          <Link to={`/admin/project/${project.id}/settings`}>
            <strong className="has-text-weight-bold">Project Settings</strong>
          </Link>
        </p>
        <p>
          3. Click <strong className="has-text-weight-bold">+Add Page</strong>
        </p>
        <p>
          4. Create email message for your users under{' '}
          <Link to={`/admin/project/${project.id}/clients`}>
            <strong className="has-text-weight-bold">Manage Clients</strong>
          </Link>
        </p>
        <p>
          5. Invite your Clients under{' '}
          <Link to={`/admin/project/${project.id}/clients`}>
            <strong className="has-text-weight-bold">Manage Clients</strong>
          </Link>
        </p>
      </div>
    </div>
  </div>
);

export default ProjectDashboardHero;
