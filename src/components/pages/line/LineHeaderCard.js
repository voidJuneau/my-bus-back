import React from "react";
import { Card, createMuiTheme, Grid, makeStyles, ThemeProvider, Typography } from "@material-ui/core";
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';

import CardMenu from "../../ui/CardMenu";
import Logo from "../../ui/Logo";

const theme = createMuiTheme({
  typography: {
    h6: {
      fontSize: "1.1rem",
      lineHeight: "1.3",
    }
  }
});

export default function StopHeaderCard({ line, setMarkers, setIsMap }) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme} >
      <Grid container component={Card} alignItems="center" wrap="nowrap" spacing={1} >
        <Grid item container direction="row" alignItems="center" wrap="nowrap" className={classes.headIamge} >
          <Logo agencyId={line.agency_id} />
          <DirectionsBusIcon />
        </Grid>
        <Grid item container direction="column" >
          <Grid item container direction="row" spacing={1}>
            <Grid item>
              <Typography variant="h6" >
                {line.route_short_name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>
                {line.route_long_name}
              </Typography>
            </Grid>
          </Grid> {/* end of row */}
          <Grid item container direction="row" >
            <Typography variant="body2" >
              {`Opration Time`}
            </Typography>
            <Typography variant="body2" >
              {`: ${line.first} ~ ${line.last}`}
            </Typography>
          </Grid>
          <Grid item container direction="row" >
            <Typography variant="body2" >
              {`Frequency`}
            </Typography>
            <Typography variant="body2" >
              {`: ${line.min_gap} ~ ${line.max_gap}min`}
            </Typography>
          </Grid>
        </Grid>
        <Grid item >
          <CardMenu type="lineHeader" data={line} setMarkers={setMarkers} setIsMap={setIsMap} />
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

