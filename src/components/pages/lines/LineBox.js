import { Box, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import BoxMenu from "../../ui/BoxMenu";

const hsrLogo = require("../../../images/hsr.png");
const goLogo = require("../../../images/go.svg");
const burlLogo = require("../../../images/burl.png");

export default function LineBox({ line }) {
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

  return (
    <Grid container className={classes.lineBox} alignItems="center">
      <Grid item className={classes.listBoxItem}>
        <img src={logo.default} alt="Agency logo" width="32px" />
      </Grid>
      <Grid item className={classes.listBoxItem}>
        {line.route_short_name}
      </Grid>
      <Grid item className={classes.listBoxItem}>
        {line.route_long_name}
      </Grid>
      <BoxMenu />
    </Grid>
  );
}

const useStyle = makeStyles(theme => ({
  lineBox: {
    border: "1px solid black",
  },
  listBoxItem: {
    padding: "8px"
  }
}))