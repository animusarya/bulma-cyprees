/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { GlobalStyle } from './theme';

import Home from '../pages/Home';
import Error404 from '../pages/404';
import NotAllowed from '../pages/NotAllowed';
import ClientReview from '../pages/ClientReview';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import SetPassword from '../pages/SetPassword';
// import ReviewsFrame from '../pages/ReviewsFrame';
import Test from '../pages/Test';

import DashboardSuperAdmin from '../pages/super-admin/Dashboard';
import Discounts from '../pages/super-admin/Discounts';
import ClientProjects from '../pages/super-admin/ClientProjects';
import ProjectInfo from '../pages/super-admin/ProjectInfo';
import Pricing from '../pages/super-admin/Pricing';
import HelpSuperAdmin from '../pages/super-admin/Help';

import DashboardAdmin from '../pages/admin/Dashboard';
import CreateProject from '../pages/admin/CreateProject';
import Reviews from '../pages/admin/Reviews';
import ReviewStyles from '../pages/admin/ReviewStyles';
import ProjectDashboard from '../pages/admin/ProjectDashboard';
import ProjectSubscription from '../pages/admin/ProjectSubscription';
import Settings from '../pages/admin/Settings';
import ProjectSettings from '../pages/admin/ProjectSettings';
import Help from '../pages/admin/Help';

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
        <Route exact path="/submit-review/:id" component={ClientReview} />
        {/* <Route exact path="/website-reviews/:id" component={ReviewsFrame} /> */}
        <PrivateRoute
          exact
          path="/super-admin/dashboard"
          component={DashboardSuperAdmin}
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
          path="/super-admin/help"
          component={HelpSuperAdmin}
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
          path="/user/dashboard"
          component={DashboardAdmin}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/user/create/website"
          component={CreateProject}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/admin/project/:id/reviews"
          component={Reviews}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/admin/project/:id/styles"
          component={ReviewStyles}
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
          path="/admin/project/:id/subscription"
          component={ProjectSubscription}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/admin/project-settings/:id"
          component={ProjectSettings}
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
          path="/admin/help"
          component={Help}
          access="admin"
        />
        <Route exact path="/test" component={Test} />
        <Route component={Error404} />
      </Switch>
    </BrowserRouter>
    <GlobalStyle />
  </>
);

export default Routes;
