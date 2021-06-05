import React, { useState, useEffect } from "react";
import { Card, createMuiTheme, Grid, makeStyles, Typography } from "@material-ui/core";

import CardMenu from "../../ui/CardMenu";

const hsrLogo = require("../../../images/hsr.png");
const goLogo = require("../../../images/go.svg");
const burlLogo = require("../../../images/burl.png");

export default function ArrivalCard({ line, stop }) {
  const [ arrivals, setArrivals ] = useState([]);
  const classes = useStyle();
  let logo;
  switch (line.agency_id.toLowerCase()) {
    case "hsr":
      logo = hsrLogo;
      break;
    case "go":
      logo = goLogo;
      break;
    case "burlington":
      logo = burlLogo;
      break;
    default:
      break;
  }
  const theme = createMuiTheme({
    Typography: {
      body1: {},
      caption: {
        fontStyle: "italic",
        textAlign: "center"
      }
    }
  });
  // /api/arrivals/hsr/stop/1499/route/4421
  useEffect(() => {
    fetch(`api/arrivals/${line.agency_id}/stop/${stop.stop_id}/route/${line.route_id}`)
    .then(res => res.json())
    .then(data => setArrivals(data));
  }, [])
  
  return (
    <Grid container component={Card} alignItems="center" wrap="nowrap" >
      <Grid item className={classes.listBoxItem}>
        <img src={logo.default} alt="Agency logo" width="32px" />
      </Grid>
      <Grid item container direction="column">
        <Grid item container spacing={1} >
          <Grid item>
            <Typography>
              {line.route_short_name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              {line.route_long_name}
            </Typography>
          </Grid>
        </Grid>
        {arrivals.length>0 && ( // this fields displayed with the arrival data
          <React.Fragment>
            <Grid item>
              <Typography>
                Direction: {arrivals[0].tripHeadsign}
              </Typography>
            </Grid>
            <Grid item container direction="row" wrap="nowrap" >
              <Typography style={{marginRight:"0.2rem"}}>
                Next bus: {getLeftMin(arrivals[0].arrival.time) === 0? "now" :
                  `in ${getLeftMin(arrivals[0].arrival.time)} min`}
              </Typography>
              <Typography>
                {getDelayMessage(arrivals[0].arrival.delay)}
              </Typography>
            </Grid>
            <Grid item container direction="row" wrap="nowrap" >
              <Typography style={{marginRight:"0.2rem"}}>
                Also: in {`${getLeftMin(arrivals[1].arrival.time)}`} min  
              </Typography>
              <Typography>
                {getDelayMessage(arrivals[1].arrival.delay)}
              </Typography>
            </Grid>
          </React.Fragment>)}
      </Grid>
      <Grid item>
        <CardMenu type="arrival" data={{line, stop, arrivals}} />
      </Grid>
    </Grid>
  )
}

const useStyle = makeStyles(theme => ({
  lineBox: {
    margin: "16px 0"
  },
  listBoxItem: {
    padding: "8px",
    width: "auto"
  }
}));

const getDelayMessage = delay => {
  // if (!delay) return "(on time)";
  if (!delay) return "";
  delay = Math.ceil(delay / 60);
  if (delay === 0) return `(On time)`
  if (delay > 0) return `(${delay} minutes delayed)`
  return `(${-delay} minutes early)`
}

const getLeftMin = timestamp => {
  const now = new Date()
  const nowTimestamp = Math.round((now.getTime()) / 1000);
  timestamp = parseInt(timestamp)
  let diff = timestamp - nowTimestamp;
  return Math.round(diff /= 60)
}