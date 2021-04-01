/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { GlobalStyle } from './theme';

import Home from '../pages/Home';
import Error404 from '../pages/404';
import NotAllowed from '../pages/NotAllowed';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import SetPassword from '../pages/SetPassword';
// import ReviewsFrame from '../pages/ReviewsFrame';
import Test from '../pages/Test';
import Jobs from '../pages/admin/Jobs';

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
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/:projectId/:email" component={Register} />
        <Route exact path="/set-password/:token" component={SetPassword} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/not-allowed" component={NotAllowed} />

        <PrivateRoute
          exact
          path="/jobs/:status"
          component={Jobs}
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
