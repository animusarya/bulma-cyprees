import * as Sentry from '@sentry/browser';
import { BrowserClient } from '@sentry/browser';

import config from './config';

const dsn = 'https://6ae8349f1e964ed2bd0928ad42dc4ee0@sentry.io/1805553';

if (!config.debug) {
  Sentry.init({
    dsn,
  });
}

export default Sentry;
