import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import { StoreProvider } from 'easy-peasy';

import theme, { GlobalStyle } from './utils/theme';
import apolloClient, { persistor } from './utils/apolloClient';
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
    await persistor.restore();
    this.client = apolloClient;
    this.setState({ loaded: true });
  }

  render() {
    const { loaded } = this.state;
    if (!loaded) {
      return <div>loading</div>;
    }

    return (
      <ApolloProvider client={this.client}>
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
      </ApolloProvider>
    );
  }
}

export default App;
