import React from "react";
import { Switch, Route } from "react-router-dom";
import Teams from "./Teams";
import Team from "./Team";

// The Roster component matches one of two different routes
// depending on the full pathname
const TeamRoute = () => (
  <Switch>
    <Route exact path="/" component={Teams} />
    <Route path="/:id" component={Team} />
  </Switch>
);

export default TeamRoute;
