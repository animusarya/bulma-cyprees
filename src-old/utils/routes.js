import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { GlobalStyle } from './theme';

import Home from '../pages/Home';
import Error404 from '../pages/404';
import NotAllowed from '../pages/NotAllowed';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import SetPassword from '../pages/SetPassword';
import Test from '../pages/Test';
import ProjectQuickView from '../pages/ProjectQuickView';

import DashboardSuperAdmin from '../pages/super-admin/Dashboard';
import Discounts from '../pages/super-admin/Discounts';
import ClientProjects from '../pages/super-admin/ClientProjects';
import ProjectInfo from '../pages/super-admin/ProjectInfo';
import Pricing from '../pages/super-admin/Pricing';
import HelpSuperAdmin from '../pages/super-admin/Help';

import DashboardAdmin from '../pages/admin/Dashboard';
import CreateProject from '../pages/admin/CreateProject';
import ManageEmail from '../pages/admin/ManageEmail';
import ClientNotifications from '../pages/admin/ClientNotifications';
import Analytics from '../pages/admin/Analytics';
import ProjectDashboard from '../pages/admin/ProjectDashboard';
import ManageClients from '../pages/admin/ManageClients';
import ManagePage from '../pages/admin/ManagePage';
import Help from '../pages/admin/Help';
import ProjectSetting from '../pages/admin/ProjectSetting';
import ProjectSubscription from '../pages/admin/ProjectSubscription';
import Settings from '../pages/admin/Settings';

import DashboardClient from '../pages/client/Dashboard';
import Page from '../pages/client/Page';
import ClientSettings from '../pages/client/Settings';
import AcceptInvitation from '../pages/client/AcceptInvitation';

const PrivateRoute = ({ component: Component, access, ...rest }) => {
  const isLoggedIn = useStoreState((state) => state.isLoggedIn.value);
  const user = useStoreState((state) => state.user.data);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn) {
          return <Redirect to="/login" />;
        }
        if (access !== user.type) {
          return <Redirect to="/not-allowed" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

const Routes = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/:projectId/:email" component={Register} />
        <Route exact path="/set-password/:token" component={SetPassword} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/not-allowed" component={NotAllowed} />
        <PrivateRoute
          exact
          path="/super-admin/dashboard"
          component={DashboardSuperAdmin}
          access="superAdmin"
        />
        <PrivateRoute
          exact
          path="/super-admin/help"
          component={HelpSuperAdmin}
          access="superAdmin"
        />
        <PrivateRoute
          exact
          path="/super-admin/client/:clientId/projects"
          component={ClientProjects}
          access="superAdmin"
        />
        <PrivateRoute
          exact
          path="/super-admin/client/:clientId/project/:projectId/info"
          component={ProjectInfo}
          access="superAdmin"
        />
        <PrivateRoute
          exact
          path="/super-admin/pricing"
          component={Pricing}
          access="superAdmin"
        />
        <PrivateRoute
          exact
          path="/super-admin/discounts"
          component={Discounts}
          access="superAdmin"
        />
        <PrivateRoute
          exact
          path="/admin/dashboard"
          component={DashboardAdmin}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/admin/project/create"
          component={CreateProject}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/admin/project/:id/pages"
          component={ProjectDashboard}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/admin/project/:id/pages/:pageId"
          component={ManagePage}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/admin/project/:id/emails"
          component={ManageEmail}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/admin/project/:id/notifications"
          component={ClientNotifications}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/admin/project/:id/analytics"
          component={Analytics}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/admin/project/:id/clients"
          component={ManageClients}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/admin/help"
          component={Help}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/admin/project/:id/settings"
          component={ProjectSetting}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/admin/project/:id/subscription"
          component={ProjectSubscription}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/admin/settings"
          component={Settings}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/client/dashboard"
          component={DashboardClient}
          access="client"
        />
        <PrivateRoute
          exact
          path="/client/page/:id"
          component={Page}
          access="client"
        />
        <PrivateRoute
          exact
          path="/client/settings"
          component={ClientSettings}
          access="client"
        />
        <Route
          exact
          path="/client/invite/:projectId/:clientEmail"
          component={AcceptInvitation}
        />
        <Route exact path="/test" component={Test} />
        <Route exact path="/:slug" component={ProjectQuickView} />
        <Route component={Error404} />
      </Switch>
    </BrowserRouter>
    <GlobalStyle />
  </>
);

export default Routes;
