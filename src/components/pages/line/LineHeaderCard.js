import React from "react";
import { Card, createMuiTheme, Grid, Typography } from "@material-ui/core";
import RoomIcon from '@material-ui/icons/Room';
import CardMenu from "../../ui/CardMenu";

export default function StopHeaderCard({ line, setMarkers, setIsMap }) {
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
    <Grid container component={Card} alignItems="center" wrap="nowrap" spacing={1} >
      <Grid item >
        <RoomIcon />
      </Grid>
      <Grid item container direction="column" >
        <Grid item container direction="row" spacing={1}>
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
      </Grid>
      <Grid item >
        <CardMenu type="stopHeader" data={line} setMarkers={setMarkers} setIsMap={setIsMap} />
      </Grid>
    </Grid>
  )
}

