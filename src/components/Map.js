import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh"
};

export default function Map({ zoom, center, markers }) {
  return (
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
  );
}