import React from "react";
import cx from 'clsx';
import { Card, createMuiTheme, Grid, makeStyles, ThemeProvider, Typography } from "@material-ui/core";
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';

import CardMenu from "../../ui/CardMenu";

const hsrLogo = require("../../../images/hsr.png");
const goLogo = require("../../../images/go.svg");
const burlLogo = require("../../../images/burl.png");

export default function StopListCard({ stop }) {
  const classes = useStyle();
  const shadowStyles = useBouncyShadowStyles();
  let logo;
  switch (stop.agency_id.toLowerCase()) {
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
    typography: {
      body1: {},
      caption: {
        fontStyle: "italic",
        // fontSize: "0.7rem"
      }
    }
  });

  return (
    <ThemeProvider theme={theme} >
      <Grid container component={Card} 
        alignItems="center"
        className={cx(classes.lineBox, shadowStyles.root)} >
        <Grid item className={classes.listBoxItem}>
          <img src={logo.default} alt="Agency logo" width="32px" />
        </Grid>
        <Grid item className={classes.listBoxItem}>
          {stop.stop_code}
        </Grid>
        <Grid item container direction="column" className={classes.listBoxItem} >
          <Grid item >
            <Typography variant="body1">
              {stop.stop_name}
            </Typography>
          </Grid>
          <Grid item >
            <Typography variant="caption">
              {stop.stop_desc}
            </Typography>
          </Grid>
        </Grid>
        <CardMenu data={stop} />
      </Grid>
    </ThemeProvider>
  );
}

const useStyle = makeStyles(theme => ({
  lineBox: {
    // border: "1px solid black",
    margin: "16px 0"
  },
  listBoxItem: {
    padding: "8px",
    width: "auto"
  }
}))