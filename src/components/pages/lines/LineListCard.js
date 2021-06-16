import React from "react";
import { Link } from 'react-router-dom';
import cx from 'clsx';
import { Card, Grid, makeStyles } from "@material-ui/core";
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';

import CardMenu from "../../ui/CardMenu";
import Logo from "../../ui/Logo";

export default function LineListCard({ line, setCenter, setMarkers, isMap, setIsMap }) {
  const classes = useStyle();
  const shadowStyles = useBouncyShadowStyles();

  // TODO: click on card links to stops on that line
  // TODO: on map
  // TODO(secondary): discussion

  return (
    <Link to={`/line/${line.agency_id}/${line.route_id}`} className={classes.link} >
      <Grid container component={Card} 
        alignItems="center"
        className={cx(classes.lineBox, shadowStyles.root)} >
        <Grid item className={classes.listBoxItem}>
          <Logo agencyId={line.agency_id} />
        </Grid>
        <Grid item className={classes.listBoxItem}>
          {line.route_short_name}
        </Grid>
        <Grid item className={classes.listBoxItem}>
          {line.route_long_name}
        </Grid>
        <CardMenu type="line" data={line} setCenter={setCenter} setMarkers={setMarkers}
          sMap={isMap} setIsMap={setIsMap} />
      </Grid>
    </Link>
  );
}

const useStyle = makeStyles(theme => ({
  lineBox: {
    // border: "1px solid black",
    margin: "16px 0"
  },
  listBoxItem: {
    padding: "8px"
  },
  link: {
    textDecoration: "none",
    "&:focus, &:hover, &:visited, &:link, &:active": {
      textDecoration: "none",
    },
  }
}))