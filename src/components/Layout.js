import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { isEmpty } from 'lodash';
import styled from 'styled-components';

import config from '../utils/config';
import useProjectGuestDetails from '../hooks/useProjectGuestDetails';

const Container = styled.div`
  && {
    margin-left: 0;
    margin-right: 0;
  }
`;

const Layout = ({ children, noContainer }) => {
  const updateOrigin = useStoreActions(actions => actions.origin.update);
  const origin = useStoreState(state => state.origin.value);
  const [project] = useProjectGuestDetails({ domain: origin });
  const updateProject = useStoreActions(
    actions => actions.origin.updateProject,
  );

  useEffect(() => {
    updateOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    if (!isEmpty(project)) {
      updateProject(project);
    }
  }, [project]);

  return (
    <Container className={noContainer ? 'container is-fluid' : 'container'}>
      <Helmet title={config.siteName} />
      {children}
    </Container>
  );
};

export default Layout;
