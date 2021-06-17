import React from "react";
import { Switch, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core';

import Menu from "./Menu";
import Favourate from "../pages/Favourate";
import Lines from "../pages/lines/Lines";
import Line from "../pages/line/Line";
import Stops from "../pages/stops/Stops";
import Stop from "../pages/stop/Stop";
import Member from "../pages/Member";

export default function Side({ setCenter, setZoom, setMarkers, isMap, setIsMap }) {
  const classes = useStyles();
  return (
    <div> 
      <div className={classes.sideMenu}>
        <Menu setIsMap={setIsMap} />
      </div>
      <Switch>
        <Route path="/favourate" >
          <Favourate />
        </Route>
        <Route path="/lines" >
          <Lines setCenter={setCenter} setZoom={setZoom} setMarkers={setMarkers} setIsMap={setIsMap} />
        </Route>
        <Route path="/line/:aId/:lId" >
          <Line setCenter={setCenter} setZoom={setZoom} setMarkers={setMarkers} setIsMap={setIsMap} />
        </Route>
        <Route path="/stops" >
          <Stops setCenter={setCenter} setZoom={setZoom} setMarkers={setMarkers} setIsMap={setIsMap} />
        </Route>
        <Route path="/stop/:aId/:sId" >
          <Stop setCenter={setCenter} setZoom={setZoom} setMarkers={setMarkers} setIsMap={setIsMap} />
        </Route>
        <Route path="/member" >
          <Member />
        </Route>
        <Route path="/" >
          {/* <Lines /> */}
        </Route>
      </Switch>
    </div>
  )
}


const useStyles = makeStyles((theme) => ({
  sideMenu: {
    marginBottom: "1rem"
  },
}));