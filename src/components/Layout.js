import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { isEmpty } from 'lodash';
import styled from 'styled-components';

import config from '../utils/config';
import useProjectGuestDetails from '../hooks/useProjectGuestDetails';
import AuthHeader from './AuthHeader';
import AuthFooter from './AuthFooter';

const Container = styled.div`
  && {
    margin-left: 0;
    margin-right: 0;
  }
`;

const Layout = ({ children, noContainer, hasAuthNav, activeProject }) => {
  const updateOrigin = useStoreActions(actions => actions.origin.update);
  const origin = useStoreState(state => state.origin.value);
  const [project] = useProjectGuestDetails({ domain: origin });
  const updateProject = useStoreActions(
    actions => actions.origin.updateProject,
  );

  useEffect(() => {
    updateOrigin(window.location.origin);
  }, [updateOrigin]);

  useEffect(() => {
    if (!isEmpty(project)) {
      updateProject(project);
    }
  }, [project, updateProject]);

  return (
    <Container className={noContainer ? 'container is-fluid' : 'container'}>
      <Helmet title={config.siteName} />
      {hasAuthNav && <AuthHeader activeProject={activeProject} />}
      {children}
      {hasAuthNav && <AuthFooter activeProject={activeProject} />}
    </Container>
  );
};

export default Layout;
