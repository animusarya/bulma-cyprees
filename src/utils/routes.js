/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import { GlobalStyle } from './theme';

import Home from '../pages/Home';
import Error404 from '../pages/404';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Test from '../pages/Test';
import Jobs from '../pages/admin/Jobs';
import RegisterJob from '../pages/admin/RegisterJob';
import EditJob from '../pages/admin/EditJob';
import Customer from '../pages/admin/Customer';
import AddNewCustomers from '../pages/admin/AddNewCustomers';
import AddNewSite from '../pages/admin/AddNewSite';

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
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <PrivateRoute
          exact
          path="/jobs/:status"
          component={Jobs}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/job/register"
          component={RegisterJob}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/edit:id"
          component={EditJob}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/customers"
          component={Customer}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/customer/add-customer"
          component={AddNewCustomers}
          access="admin"
        />
        <PrivateRoute
          exact
          path="/customer/add-site"
          component={AddNewSite}
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
