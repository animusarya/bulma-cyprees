import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { StoreProvider } from 'easy-peasy';
import { PersistGate } from 'redux-persist/integration/react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ApolloProvider } from '@apollo/client';

import theme from './utils/theme';
import apolloClient from './utils/apolloClient';
import { store, persistor } from './store';
import Routes from './utils/routes';
import { Loading } from './components/elements';

const App = () => {
  useEffect(() => {
    console.log('app ready');
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <StoreProvider store={store}>
          <ThemeProvider theme={theme}>
            <DndProvider backend={HTML5Backend}>
              <Routes />
            </DndProvider>
          </ThemeProvider>
        </StoreProvider>
      </PersistGate>
    </ApolloProvider>
  );
};

export default App;
