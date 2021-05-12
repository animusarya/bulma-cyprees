import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { StoreProvider } from 'easy-peasy';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from '@apollo/client';

import theme from './utils/theme';
import apolloClient from './utils/apolloClient';
import { store, persistor } from './store';
import Routes from './utils/routes';

const App = () => {
  useEffect(() => {
    console.log('app ready');
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <PersistGate persistor={persistor}>
        <StoreProvider store={store}>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </StoreProvider>
      </PersistGate>
    </ApolloProvider>
  );
};

export default App;
