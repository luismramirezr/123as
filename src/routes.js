import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from '~/pages/Main';
import PullRequests from '~/pages/PullRequests';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route
          path="/pullrequests/:owner/:repository"
          component={PullRequests}
        />
      </Switch>
    </BrowserRouter>
  );
}
