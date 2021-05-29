import React from "react";
import { Switch, Route } from 'react-router-dom'

import Menu from "./Menu";
import Favourate from "../pages/Favourate";
import Lines from "../pages/lines/Lines";
import Stops from "../pages/stops/Stops";
import Stop from "../pages/stop/Stop";
import Member from "../pages/Member";

export default function Side({ setCenter, setMarkers }) {
  return (
    <div> 
      <Menu />
      <Switch>
        <Route path="/favourate" >
          <Favourate />
        </Route>
      </Switch>
      <Switch>
        <Route path="/lines" >
          <Lines setCenter={setCenter} setMarkers={setMarkers} />
        </Route>
      </Switch>
      <Switch>
        <Route path="/stops" >
          <Stops setCenter={setCenter} setMarkers={setMarkers} />
        </Route>
      </Switch>
      <Switch>
        <Route path="/stop/:aId/:sId" >
          <Stop setCenter={setCenter} setMarkers={setMarkers} />
        </Route>
      </Switch>
      <Switch>
        <Route path="/member" >
          <Member />
        </Route>
      </Switch>
      <Switch>
        <Route path="/" >
          {/* <Lines /> */}
        </Route>
      </Switch>
    </div>
  )
}