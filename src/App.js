import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { StoreProvider, useStoreState } from 'easy-peasy';
import { Provider as UrqlProvider } from 'urql';
import { PersistGate } from "redux-persist/integration/react";

import theme, { GlobalStyle } from './utils/theme';
import urqlGraphql from './utils/urqlGraphql';
import { store, persistor } from './store';
import { Loading } from './components/elements';

import Home from './pages/Home';
import Error404 from './pages/404';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Test from './pages/Test';

import DashboardSuperAdmin from './pages/super-admin/Dashboard';
import Discounts from './pages/super-admin/Discounts';
import ClientProjects from './pages/super-admin/ClientProjects';
import ProjectInfo from './pages/super-admin/ProjectInfo';
import Pricing from './pages/super-admin/Pricing';

import DashboardAdmin from './pages/admin/Dashboard';
import Projects from './pages/admin/Projects';

import DashboardClient from './pages/client/Dashboard';

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
                    <PrivateRoute exact path="/super-admin/dashboard" component={DashboardSuperAdmin} />
                    <PrivateRoute exact path="/super-admin/client/projects/:clientId" component={ClientProjects} />
                    <PrivateRoute exact path="/super-admin/project/info" component={ProjectInfo} />
                    <PrivateRoute exact path="/super-admin/pricing" component={Pricing} />
                    <PrivateRoute exact path="/super-admin/discounts" component={Discounts} />
                    <PrivateRoute exact path="/admin/dashboard" component={DashboardAdmin} />
                    <PrivateRoute exact path="/admin/projects" component={Projects} />
                    <PrivateRoute exact path="/client/dashboard" component={DashboardClient} />
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
