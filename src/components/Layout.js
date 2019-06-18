import React from 'react';
import Helmet from 'react-helmet';

import config from '../utils/config';
import './layout.css';

export default ({ children }) => (
  <div className="container">
    <Helmet title={config.siteName} />
    {children}
  </div>
);
