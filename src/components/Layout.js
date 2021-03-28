import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useStoreActions } from 'easy-peasy';
// import { isEmpty } from 'lodash';

import config from '../utils/config';
// import useProjectGuestDetails from '../hooks/useProjectGuestDetails';
import AuthHeader from './AuthHeader';
import AuthFooter from './AuthFooter';

const Layout = ({ children, hasAuthNav, activeProject }) => {
  const updateOrigin = useStoreActions((actions) => actions.origin.update);
  // const origin = useStoreState((state) => state.origin.value);
  // const [project] = useProjectGuestDetails({ domain: origin });
  // const updateProject = useStoreActions(
  //   (actions) => actions.origin.updateProject,
  // );

  useEffect(() => {
    updateOrigin(window.location.origin);
  }, [updateOrigin]);

  // useEffect(() => {
  //   if (!isEmpty(project)) {
  //     updateProject(project);
  //   }
  // }, [project, updateProject]);

  return (
    <>
      <Helmet title={config.siteName} />
      {hasAuthNav && <AuthHeader activeProject={activeProject} />}
      {children}
      {hasAuthNav && <AuthFooter activeProject={activeProject} />}
    </>
  );
};

export default Layout;
