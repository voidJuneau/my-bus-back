import React, { useState, useEffect } from "react";
import { Card, createMuiTheme, Grid, makeStyles, Typography } from "@material-ui/core";

import CardMenu from "../../ui/CardMenu";

const hsrLogo = require("../../../images/hsr.png");
const goLogo = require("../../../images/go.svg");
const burlLogo = require("../../../images/burl.png");

export default function ArrivalCard({ line, stopId }) {
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
    fetch(`api/arrivals/${line.agency_id}/stop/${stopId}/route/${line.route_id}`)
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
        <Grid item>
          <Typography>
            Direction: #
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            Next bus: in # min
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            Also: in # min
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <CardMenu data={line} />
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
}))
