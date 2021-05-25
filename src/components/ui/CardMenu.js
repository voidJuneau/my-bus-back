import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';
import KeyboardOutlinedIcon from '@material-ui/icons/KeyboardOutlined';
import RoomIcon from '@material-ui/icons/Room';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';

export default function CardMenu({ data }) {
  const classes = useStyle();

  return (
    <Grid item className={classes.boxMenu}>
      <Grid container direction="column">
        {/* favourate for all */}
        <Grid item container justify="flex-end">
          <StarOutlineOutlinedIcon />
        </Grid>
        <Grid item container xs direction="row">
          {data.route_short_name && (
            <React.Fragment>
            {/* discussion - for line */}
              <Grid item xs>
                <KeyboardOutlinedIcon />
              </Grid>
              {/* stops - for line */}
              <Grid item>
                <RoomIcon />
              </Grid>
            </React.Fragment>)}
          {/* lines - for stop */}
          {data.stop_name && (
            <Grid item>
              <DirectionsBusIcon />
            </Grid>
            )}
          {/* on map - for line, stop */}
          <Grid>
            <MapOutlinedIcon />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyle = makeStyles(theme => ({
  boxMenu: {
    marginLeft: "auto",
    padding: "4px"
  }
}))