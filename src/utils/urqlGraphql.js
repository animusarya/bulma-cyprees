import { createClient } from 'urql';
import config from './config';

const client = createClient({
  url: config.debug ? config.graphQlUriDev : config.graphQlUri,
  fetchOptions: () => {
    const token = window.localStorage.getItem('token');
    if (token) {
      return {
        headers: {
          Authorization: `${token}`,
        },
      };
    }
    return {};
  },
});

export default client;
