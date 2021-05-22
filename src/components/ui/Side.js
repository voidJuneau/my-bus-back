import React from "react";
import { Switch, Route } from 'react-router-dom'

import Menu from "./Menu";
import Favourate from "../pages/Favourate";
import Lines from "../pages/lines/Lines";
import Stops from "../pages/Stops";
import Member from "../pages/Member";

export default function Side() {
  return (
    <div> 
      <Menu />
      <Switch>
        <Route path="/favourate">
          <Favourate />
        </Route>
      </Switch>
      <Switch>
        <Route path="/lines">
          <Lines />
        </Route>
      </Switch>
      <Switch>
        <Route path="/stops">
          <Stops />
        </Route>
      </Switch>
      <Switch>
        <Route path="/member">
          <Member />
        </Route>
      </Switch>
      <Switch>
        <Route path="/search" exact>
          <Lines />
        </Route>
      </Switch>
    </div>
  )
}