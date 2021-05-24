import React from "react";
import cx from 'clsx';
import { Card, Grid, makeStyles } from "@material-ui/core";
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';

import BoxMenu from "../../ui/BoxMenu";

const hsrLogo = require("../../../images/hsr.png");
const goLogo = require("../../../images/go.svg");
const burlLogo = require("../../../images/burl.png");

export default function LineCard({ line }) {
  const classes = useStyle();
  const shadowStyles = useBouncyShadowStyles();
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
    <Grid container component={Card} 
      alignItems="center"
      className={cx(classes.lineBox, shadowStyles.root)} >
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
    // border: "1px solid black",
    margin: "16px 0"
  },
  listBoxItem: {
    padding: "8px"
  }
}))