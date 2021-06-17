import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';
import KeyboardOutlinedIcon from '@material-ui/icons/KeyboardOutlined';
import RoomIcon from '@material-ui/icons/Room';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';

import StopMarker from "../map/StopMarker";

export default function CardMenu({ type, data, setCenter, setMarkers, setIsMap }) {
  const classes = useStyle();

  const handleClickMapIcon = (e) => {
    e.persist(); 
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation(); 
    setIsMap(true);
    if (type === "stop") {
      setMarkers([(<StopMarker data={data} />)]);
    }
  }
  let mapIconClass;
  if (type === "stop" || type === "line") mapIconClass = classes.hideOnMobile;
  else if (type === "lineHeader") mapIconClass = classes.hideOnDesktop;

  return (
    <Grid item className={classes.boxMenu}>
      <Grid container direction="column">
        {/* favourate for all */}
        <Grid item container justify="flex-end">
          <StarOutlineOutlinedIcon />
        </Grid>
        <Grid item container xs direction="row" wrap="nowrap" >
          {(type === "line" || type === "lineHeader") && (
            <React.Fragment>
            {/* discussion - for line */}
              <Grid item xs>
                <KeyboardOutlinedIcon />
              </Grid>
              {/* stops - for line */}
              {/* <Grid item>
                <RoomIcon />
              </Grid> */}
            </React.Fragment>)}
          {/* lines - for arrival */}
          {type === "arrival" && (
            <Grid item>
              <Link to={`/line/${data.line.agency_id}/${data.line.route_id}`}>
                <DirectionsBusIcon />
              </Link>
            </Grid>
            )}
          {/* on map - for line, stop (not on arrival) */}
          {(type === "line" || type === "stop" || type === "stopHeader" || type === "lineHeader") && (
          <Grid className={mapIconClass}>
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
    padding: "4px",
    zIndex: "10"
  },
  hideOnMobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  hideOnDesktop: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}))