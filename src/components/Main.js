import React, { Component } from "react";
import TeamRoute from "./TeamRoute";

import { BrowserRouter, Switch, Route } from "react-router-dom";

class Main extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={TeamRoute} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Main;
