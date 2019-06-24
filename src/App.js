import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { StoreProvider } from 'easy-peasy';
import { Provider as UrqlProvider } from 'urql';

import theme, { GlobalStyle } from './utils/theme';
import urqlGraphql from './utils/urqlGraphql';
import store from './store';

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

class App extends React.Component {
  state = { loaded: false };

  async componentDidMount() {
    this.setState({ loaded: true });
  }

  render() {
    const { loaded } = this.state;
    if (!loaded) {
      return <div>loading</div>;
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
                  <Route exact path="/super-admin/dashboard" component={DashboardSuperAdmin} />
                  <Route exact path="/super-admin/client/projects" component={ClientProjects} />
                  <Route exact path="/super-admin/project/info" component={ProjectInfo} />
                  <Route exact path="/super-admin/pricing" component={Pricing} />
                  <Route exact path="/super-admin/discounts" component={Discounts} />
                  <Route exact path="/admin/dashboard" component={DashboardAdmin} />
                  <Route exact path="/admin/projects" component={Projects} />
                  <Route exact path="/client/dashboard" component={DashboardClient} />
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
