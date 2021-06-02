import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Box, Button, Grid } from "@material-ui/core";

import Menu from "../ui/Menu";

const containerStyle = {
  width: "100%",
  height: "100vh"
};

export default function Map({ zoom, center, markers, isMap, setIsMap }) {
  const handleHideMapClick = () => {console.log("click"); setIsMap(false)};

  return (
    <Grid container>
      <Grid item xs={12} sm={12} component={Box} display={{md: "none"}}>
        <Menu />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Box display={{md: "none"}}>
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