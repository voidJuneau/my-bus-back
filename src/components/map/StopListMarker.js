import React, { useState } from "react";
import { InfoWindow, Marker } from "@react-google-maps/api";
import icon from "../../images/map-marker-solid.svg";



export default function StopListMarker({ data }) {
  const [ shown, setShown ] = useState(false);
  const position={lat: parseFloat(data.stop_lat), lng: parseFloat(data.stop_lon)}
  
  const handleClick = () => setShown(!shown);
  return (
    <Marker position={position} key={data.stop_id + data.stop_name} onClick={handleClick}
      icon={icon} >
      {shown && (
        <InfoWindow position={position}>
          <div>
            <p className="mb-0 text-right">{data.stop_name}</p>
          </div>
        </InfoWindow>
      )}
    </Marker>
  )
}