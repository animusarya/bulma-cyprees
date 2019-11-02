import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';

import App from './App';
import config from './utils/config';
import * as serviceWorker from './utils/serviceWorker';

if (!config.debug) {
  Sentry.init({
    dsn: 'https://6ae8349f1e964ed2bd0928ad42dc4ee0@sentry.io/1805553',
  });
}

ReactDOM.render(<App />, document.getElementById('root'));

// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
// if (config.debug) {
//   serviceWorker.unregister();
// } else {
//   serviceWorker.register();
// }
