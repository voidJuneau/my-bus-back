import { Box, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import BoxMenu from "../../ui/BoxMenu";

const a = {
  "route_id": "4349",
  "agency_id": "HSR",
  "route_short_name": "01",
  "route_long_name": "KING",
  "route_desc": null,
  "route_type": 3,
  "route_url": null,
  "route_color": "0093DD",
  "route_text_color": "000000"
}

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
    <Grid container className={classes.lineBox}>
      <Grid item>
        <img src={logo.default} alt="Agency logo" width="32px" />
      </Grid>
      <Grid item>
        {line.route_short_name}
      </Grid>
      <Grid item>
        {line.route_long_name}
      </Grid>
      <BoxMenu />
    </Grid>
  );
}

const useStyle = makeStyles(theme => ({
  lineBox: {
    border: "1px solid black"
  }
}))