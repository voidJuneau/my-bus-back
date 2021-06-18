import React from "react";
import { Link, useHistory } from 'react-router-dom';
import cx from 'clsx';
import { Card, createMuiTheme, Grid, makeStyles, ThemeProvider, Typography } from "@material-ui/core";
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';
import RoomIcon from '@material-ui/icons/Room';

import CardMenu from "../../ui/CardMenu";
import Logo from "../../ui/Logo";

export default function StopListCard({ stop, setCenter, setZoom, setMarkers, setIsMap, onList }) {
  const classes = useStyle();
  const shadowStyles = useBouncyShadowStyles();
  
  const theme = createMuiTheme({
    typography: {
      body1: {},
      caption: {
        fontStyle: "italic",
      }
    }
  });

  // to prevent from being clicked on card menu click
  const history = useHistory();
  const handleClick = e => {
    const path = `/stop/${stop.agency_id}/${stop.stop_id}`;
    history.push(path);
  }

  return (
    <ThemeProvider theme={theme} >
      <Grid container component={Card} 
        alignItems="center"
        onClick={handleClick}
        className={cx(classes.lineBox, shadowStyles.root)} >
          <Grid item className={classes.listBoxItem}>
            {onList ? (<RoomIcon />)
            : (<Logo agencyId={stop.agency_id} />)}
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
          <CardMenu type="stop" data={stop} 
            setCenter={setCenter} setZoom={setZoom} 
            setMarkers={setMarkers} setIsMap={setIsMap} />
      </Grid>
    </ThemeProvider>
  );
}

const useStyle = makeStyles(theme => ({
  lineBox: {
    margin: "16px 0"
  },
  listBoxItem: {
    padding: "8px",
    width: "auto"
  },
  link: {
    textDecoration: "none",
    "&:focus, &:hover, &:visited, &:link, &:active": {
      textDecoration: "none",
    },
  }
}))