import React from "react";
import { Card, createMuiTheme, Grid, makeStyles, ThemeProvider, Typography } from "@material-ui/core";
import RoomIcon from '@material-ui/icons/Room';
import CardMenu from "../../ui/CardMenu";
import Logo from "../../ui/Logo";

const theme = createMuiTheme({
  typography: {
    body1: {},
    caption: {
      fontStyle: "italic",
    }
  }
});

export default function StopHeaderCard({ stop, setMarkers, setIsMap }) {
  const classes = useStyles();
  
  return (
    <ThemeProvider theme={theme} >
      <Grid container component={Card} alignItems="center" wrap="nowrap" spacing={1} >
        <Grid item container direction="row" alignItems="center" wrap="nowrap" className={classes.headIamge} >
          <Logo agencyId={stop.agency_id} />
          <RoomIcon />
        </Grid>
        <Grid item container justify="center" direction="column" >
          <Grid item container direction="row" justify="center" >
            <Grid item style={{marginRight:"0.2rem"}}>
              <Typography align="center" variant="caption1" display="inline" >
                Stop code: 
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="center" variant="body2" display="inline" >
                {stop.stop_code}
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
          <CardMenu type="stopHeader" data={stop} setMarkers={setMarkers} setIsMap={setIsMap} />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

const useStyles = makeStyles(theme => ({
  headIamge: {
    width: "auto",
    marginLeft: "0.5rem"
  }
}));
