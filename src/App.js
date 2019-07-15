import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { StoreProvider, useStoreState } from 'easy-peasy';
import { Provider as UrqlProvider } from 'urql';
import { PersistGate } from 'redux-persist/integration/react';

import theme, { GlobalStyle } from './utils/theme';
import urqlGraphql from './utils/urqlGraphql';
import { store, persistor } from './store';
import { Loading } from './components/elements';

import Home from './pages/Home';
import Error404 from './pages/404';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import SetPassword from './pages/SetPassword';
import Test from './pages/Test';

import DashboardSuperAdmin from './pages/super-admin/Dashboard';
import Discounts from './pages/super-admin/Discounts';
import ClientProjects from './pages/super-admin/ClientProjects';
import ProjectInfo from './pages/super-admin/ProjectInfo';
import Pricing from './pages/super-admin/Pricing';

import DashboardAdmin from './pages/admin/Dashboard';
import CreateProject from './pages/admin/CreateProject';
import ManageEmail from './pages/admin/ManageEmail';
import ProjectDashboard from './pages/admin/ProjectDashboard';
import ProjectPages from './pages/admin/ProjectPages';
import ManageClients from './pages/admin/ManageClients';
import ManagePage from './pages/admin/ManagePage';
import Help from './pages/admin/Help';
import ProjectUpdate from './pages/admin/ProjectUpdate'; // TODO: WHY THIS PAGE IS HERE?
import ProjectSetting from './pages/admin/ProjectSetting';
import Settings from './pages/admin/Settings';

import DashboardClient from './pages/client/Dashboard';
import Page from './pages/client/Page';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useStoreState(state => state.isLoggedIn.value);

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  async componentDidMount() {
    this.setState({ loaded: true });
  }

  render() {
    const { loaded } = this.state;
    if (!loaded) {
      return <Loading />;
    }

    return (
      <UrqlProvider value={urqlGraphql}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <StoreProvider store={store}>
            <ThemeProvider theme={theme}>
              <React.Fragment>
                <BrowserRouter>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/set-password" component={SetPassword} />
                    <Route
                      exact
                      path="/forgot-password"
                      component={ForgotPassword}
                    />
                    <PrivateRoute
                      exact
                      path="/super-admin/dashboard"
                      component={DashboardSuperAdmin}
                    />
                    <PrivateRoute
                      exact
                      path="/super-admin/client/:clientId/projects"
                      component={ClientProjects}
                    />
                    <PrivateRoute
                      exact
                      path="/super-admin/client/:clientId/project/:projectId/info"
                      component={ProjectInfo}
                    />
                    <PrivateRoute
                      exact
                      path="/super-admin/pricing"
                      component={Pricing}
                    />
                    <PrivateRoute
                      exact
                      path="/super-admin/discounts"
                      component={Discounts}
                    />
                    <PrivateRoute
                      exact
                      path="/admin/dashboard"
                      component={DashboardAdmin}
                    />
                    {/* <PrivateRoute
                      exact
                      path="/admin/create/account"
                      component={AccountCreated}
                    /> */}
                    <PrivateRoute
                      exact
                      path="/admin/project/create"
                      component={CreateProject}
                    />
                    <PrivateRoute
                      exact
                      path="/admin/project/:id"
                      component={ProjectDashboard}
                    />
                    <PrivateRoute
                      exact
                      path="/admin/project/:id/pages"
                      component={ProjectPages}
                    />
                    <PrivateRoute
                      exact
                      path="/admin/project/:id/pages/:pageId"
                      component={ManagePage}
                    />
                    <PrivateRoute
                      exact
                      path="/admin/project/:id/emails"
                      component={ManageEmail}
                    />
                    <PrivateRoute
                      exact
                      path="/admin/project/:id/clients"
                      component={ManageClients}
                    />
                    <PrivateRoute
                      exact
                      path="/admin/project/:id/update"
                      component={ProjectUpdate}
                    />
                    {/* <Route
                      exact
                      path="/admin/project/{id}"
                      component={WelcomeScreen}
                    /> */}
                    <PrivateRoute exact path="/admin/help" component={Help} />
                    <PrivateRoute
                      exact
                      path="/admin/project/:id/settings"
                      component={ProjectSetting}
                    />
                    <Route exact path="/admin/settings" component={Settings} />
                    <Route
                      exact
                      path="/client/dashboard"
                      component={DashboardClient}
                    />
                    <PrivateRoute
                      exact
                      path="/client/page/:id"
                      component={Page}
                    />
                    <Route exact path="/test" component={Test} />
                    <Route component={Error404} />
                  </Switch>
                </BrowserRouter>
                <GlobalStyle />
              </React.Fragment>
            </ThemeProvider>
          </StoreProvider>
        </PersistGate>
      </UrqlProvider>
    );
  }
}

export default App;
