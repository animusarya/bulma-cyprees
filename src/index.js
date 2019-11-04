import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './utils/serviceWorker';
import './utils/sentry';

ReactDOM.render(<App />, document.getElementById('root'));

// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
// if (config.debug) {
//   serviceWorker.unregister();
// } else {
//   serviceWorker.register();
// }
