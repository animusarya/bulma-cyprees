import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { StoreProvider } from 'easy-peasy';
import { Provider as UrqlProvider } from 'urql';

import theme, { GlobalStyle } from './utils/theme';
import urqlGraphql from './utils/urqlGraphql';
import store from './store';
import { Loading } from './components/elements';

import Home from './pages/Home';
import Error404 from './pages/404';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Test from './pages/Test';

import DashboardSuperAdmin from './pages/super-admin/Dashboard';
import Discounts from './pages/super-admin/Discounts';
import ClientProjects from  './pages/super-admin/ClientProjects';
import ProjectInfo from  './pages/super-admin/ProjectInfo';
import Pricing from  './pages/super-admin/Pricing';

import DashboardAdmin from './pages/admin/Dashboard';
import Projects from './pages/admin/Projects';

import DashboardClient from './pages/client/Dashboard';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
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

    const token = window.localStorage.getItem('token');
    this.state = {
      loaded: false,
      isLoggedIn: !!token
    };
  }

  async componentDidMount() {
    this.setState({ loaded: true });
  }

  render() {
    const { loaded, isLoggedIn } = this.state;
    if (!loaded) {
      return <Loading />;
    }

    return (
      <UrqlProvider value={urqlGraphql}>
        <StoreProvider store={store}>
          <ThemeProvider theme={theme}>
            <React.Fragment>
              <BrowserRouter>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/contact" component={Contact} />
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute exact path="/super-admin/dashboard" component={DashboardSuperAdmin} isLoggedIn={isLoggedIn} />
                  <PrivateRoute exact path="/super-admin/client/projects" component={ClientProjects} isLoggedIn={isLoggedIn} />
                  <PrivateRoute exact path="/super-admin/project/info" component={ProjectInfo} isLoggedIn={isLoggedIn} />
                  <PrivateRoute exact path="/super-admin/pricing" component={Pricing} isLoggedIn={isLoggedIn} />
                  <PrivateRoute exact path="/super-admin/discounts" component={Discounts} isLoggedIn={isLoggedIn} />
                  <PrivateRoute exact path="/admin/dashboard" component={DashboardAdmin} isLoggedIn={isLoggedIn} />
                  <PrivateRoute exact path="/admin/projects" component={Projects} isLoggedIn={isLoggedIn} />
                  <PrivateRoute exact path="/client/dashboard" component={DashboardClient} isLoggedIn={isLoggedIn} />
                  <Route exact path="/test" component={Test} />
                  <Route component={Error404} />
                </Switch>
              </BrowserRouter>
              <GlobalStyle />
            </React.Fragment>
          </ThemeProvider>
        </StoreProvider>
      </UrqlProvider>
    );
  }
}

export default App;
