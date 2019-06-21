import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { StoreProvider } from 'easy-peasy';
import { Provider as UrqlProvider } from 'urql';

import theme, { GlobalStyle } from './utils/theme';
import urqlGraphql from './utils/urqlGraphql';
import ProjectsClient from './pages/ProjectsClient';
import InfoProjectsClient from './pages/InfoProjectsClient';
import store from './store';

import {
	Home,
	Login,
	About,
	Contact,
  Error404,
  Test,

  DashboardSuperAdmin,

	DashboardAdmin,
  ProjectsAdmin,

  DashboardClient,
} from './pages';

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
                  <Route exact path="/super-admin/dashboard/clients-projects" component={ProjectsClient} />
                  <Route exact path="/super-admin/dashboard/clients-projects/info-clients-projects" component={InfoProjectsClient} />
                  <Route exact path="/admin/dashboard" component={DashboardAdmin} />
                  <Route exact path="/admin/projects" component={ProjectsAdmin} />
                  <Route exact path="/cleint/dashboard" component={DashboardClient} />
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
