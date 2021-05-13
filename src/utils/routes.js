import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GlobalStyle } from './theme';

import Home from '../pages/Home';
import Error404 from '../pages/404';
import CreateAccount from '../pages/CreateAccount';
import Contact from '../pages/Contact';

const Routes = () => (
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/create-account" component={CreateAccount} />
        <Route component={Error404} />
      </Switch>
    </BrowserRouter>
    <GlobalStyle />
  </>
);

export default Routes;
