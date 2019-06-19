import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';

import theme, { GlobalStyle } from './utils/theme';
import apolloClient, { persistor } from './utils/apolloClient';

import { Login, ClientList, Home, About, Contact, Error404 } from './pages';

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
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/contact" component={Contact} />
                <Route path="/login" component={Login} />
                <Route path="/client-list" component={ClientList} />
                {/* <Route path="/super-admin/dashboard" component={DashboardSuperAdmin} />
                <Route path="/super-admin/clients" component={ClientsSuperAdmin} />
                <Route path="/admin/dashboard" component={DashboardAdmin} />
                <Route path="/admin/projects" component={ProjectsAdmin} />
                <Route path="/cleints/files" component={FilesClients} /> */}
                <Route component={Error404} />
              </Switch>
            </BrowserRouter>
            <GlobalStyle />
          </React.Fragment>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
