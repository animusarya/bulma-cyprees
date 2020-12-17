import { ApolloClient, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { createHttpLink } from '@apollo/client/link/http';
import fetch from 'isomorphic-fetch';

import config from './config';
import sentry from './sentry';

const httpLink = createHttpLink({
  uri: config.debug ? config.graphQlUriDev : config.graphQlUri,
  fetch,
});

const authLink = setContext(async (_, { headers }) => {
  const token = process.browser
    ? window.localStorage.getItem('token')
    : undefined;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  // console.log('onError', graphQLErrors, networkError);
  if (config.debug) {
    console.log('onError', graphQLErrors, networkError);
    return;
  }

  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      sentry.captureException(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) sentry.captureException(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

export default client;
