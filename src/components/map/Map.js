import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Box, Button, Grid, makeStyles } from "@material-ui/core";

import Menu from "../ui/Menu";

const containerStyle = {
  width: "100%",
  height: "100vh"
};

export default function Map({ zoom, center, markers, isMap, setIsMap }) {
  const classes = useStyles();
  const handleHideMapClick = () => {console.log("click"); setIsMap(false)};

  return (
    <Grid container>
      <Grid item xs={12} sm={12} component={Box} display={{md: "none"}} style={{zIndex: 10}}>
        <Menu setIsMap={setIsMap} />
      </Grid>
      <Grid item xs={12} sm={12} className={classes.mapSmall}>
        <Box display={{md: "none"}} className={classes.mapButton} >
          <Button variant="contained" color="primary" onClick={handleHideMapClick}>Hide Map</Button>
        </Box>
        <div id="map-container" className="side-map d-none d-md-block">
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={zoom} >
              {markers}
            </GoogleMap>
          </LoadScript>
        </div>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  mapButton: {
    position: "absolute",
    top: 130,
    left: 30,
    zIndex: 10
  },
  mapSmall: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "-90px"
    }
  }
}));