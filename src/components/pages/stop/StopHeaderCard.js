import React from "react";
import { Card, createMuiTheme, Grid, Typography } from "@material-ui/core";
import RoomIcon from '@material-ui/icons/Room';
import CardMenu from "../../ui/CardMenu";

export default function StopHeaderCard({ stop }) {
  const theme = createMuiTheme({
    typography: {
      body1: {},
      caption: {
        fontStyle: "italic",
        textAlign: "center"
        // fontSize: "0.7rem"
      }
    }
  });

  return (
    <Grid container component={Card} alignItems="center" wrap="nowrap" >
      <Grid item >
        <RoomIcon />
      </Grid>
      <Grid item container justify="center" direction="column" >
        <Grid item container direction="row" justify="center" >
          <Grid item style={{marginRight:"0.2rem"}}>
            <Typography align="center" variant="caption" display="inline" >
              Stop code: 
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="center" variant="body2" display="inline" >
              {stop.stop_id}
            </Typography>
          </Grid>
        </Grid>
        <Typography align="center" >
          {stop.stop_name}
        </Typography>
        <Typography align="center" variant="caption" >
          {stop.stop_desc}
        </Typography>
      </Grid>
      <Grid item >
        <CardMenu data={stop} />
      </Grid>
    </Grid>
  )
}

