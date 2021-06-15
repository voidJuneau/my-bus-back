import React, { useState, useEffect } from "react";
import { Card, createMuiTheme, Grid, makeStyles, ThemeProvider, Typography } from "@material-ui/core";
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';

import CardMenu from "../../ui/CardMenu";
import Logo from "../../ui/Logo";

const theme = createMuiTheme({
  typography: {
    h6: {
      fontSize: "1.1rem",
      lineHeight: "1.3",
    }
  }
});

export default function ArrivalCard({ line, stop }) {
  const [ arrivals, setArrivals ] = useState([]);
  const classes = useStyle();

  // /api/arrivals/hsr/stop/1499/route/4421
  useEffect(() => {
    fetch(`api/arrivals/${line.agency_id}/stop/${stop.stop_id}/route/${line.route_id}`)
    .then(res => res.json())
    .then(data => setArrivals(data));
  }, [])
  
  return (
    <ThemeProvider theme={theme} >
      <Grid container component={Card} alignItems="center" wrap="nowrap" className={classes.listBox} >
        <Grid item className={classes.listBoxItem}>
          {/* <Logo agencyId={line.agency_id} /> */}
          <AirportShuttleIcon />
        </Grid>
        <Grid item container direction="column" className={classes.listBoxItem} >
          <Grid item container spacing={1} >
            <Grid item>
              <Typography variant="h6" >
                {line.route_short_name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography >
                {line.route_long_name}
              </Typography>
            </Grid>
          </Grid>
          {arrivals.length>0 && ( // this fields displayed with the arrival data
            <React.Fragment>
              <Grid item>
                <Typography variant="body2" >
                  Direction: {arrivals[0].tripHeadsign}
                </Typography>
              </Grid>
              <Grid item container direction="row" wrap="nowrap" >
                <Typography variant="body2" >
                  Next bus: {getLeftMin(arrivals[0].arrival.time) === 0? "now" :
                    `in ${getLeftMin(arrivals[0].arrival.time)} min`}
                </Typography>
                <Typography>
                  {getDelayMessage(arrivals[0].arrival.delay)}
                </Typography>
              </Grid>
              <Grid item container direction="row" wrap="nowrap" >
                <Typography variant="body2" >
                  Also: in {`${getLeftMin(arrivals[1].arrival.time)}`} min  
                </Typography>
                <Typography>
                  {getDelayMessage(arrivals[1].arrival.delay)}
                </Typography>
              </Grid>
            </React.Fragment>)}
        </Grid>
        <CardMenu type="arrival" data={{line, stop}} />
      </Grid>
    </ThemeProvider>
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