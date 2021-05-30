import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';
import KeyboardOutlinedIcon from '@material-ui/icons/KeyboardOutlined';
import RoomIcon from '@material-ui/icons/Room';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';

import StopMarker from "../map/StopMarker";

export default function CardMenu({ data, setCenter, setMarkers }) {
  const classes = useStyle();

  let dataType;
  if (data.route_short_name)
    dataType = "line"
    else if (data.stop_name)
    dataType = "stop"

  const handleClickMapIcon = () => {
    if (dataType === "stop") {
      setMarkers([(<StopMarker data={data} />)]);
    }
  }

  return (
    <Grid item className={classes.boxMenu}>
      <Grid container direction="column">
        {/* favourate for all */}
        <Grid item container justify="flex-end">
          <StarOutlineOutlinedIcon />
        </Grid>
        <Grid item container xs direction="row" wrap="nowrap" >
          {dataType === "line" && (
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
          {dataType === "stop" && (
            <Grid item>
              <DirectionsBusIcon />
            </Grid>
            )}
          {/* on map - for line, stop (not on arrival) */}
          {(dataType === "line" || dataType === "stop") && (
          <Grid>
            <MapOutlinedIcon onClick={handleClickMapIcon} />
          </Grid>
          )}
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