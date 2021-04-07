import React from 'react';
import { Redirect } from 'react-router-dom';

import Seo from '../components/Seo';

const Home = () => (
  <>
    <Seo title="Home" description="Some description here." />
    <Redirect
      to={{
        pathname: '/login',
        // state: { from: location },
      }}
    />
  </>
);

export default Home;
