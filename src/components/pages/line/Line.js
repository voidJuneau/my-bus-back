import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Card, Container, Grid } from "@material-ui/core";

import LineHeaderCard from "./LineHeaderCard";
import StopMarker from "../../map/StopMarker";
import StopListCard from "../stops/StopListCard";

export default function Stop({ setCenter, setMarkers, setIsMap }) {
  const { aId, lId } = useParams();
  const [ line, setLine ] = useState({});
  const [ stops, setStops ] = useState([]);

  useEffect(() => {
    // Load line info
    fetch(`/api/lines/${aId}/route/${lId}`)
    .then(res => res.json())
    .then(data => setLine(data));
    
    // Load stops on that line
    fetch(`/api/stops/${aId}/route/${lId}`)
    .then(res => res.json())
    .then(data => setStops(data));
  }, [])

  return (
    <Container>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <LineHeaderCard line={line} setMarkers={setMarkers} setIsMap={setIsMap} />
        </Grid>
        {stops.map(s => (
          <Grid item key={s.stop_id} >
            <StopListCard stop={s} key={s.stop_id} setMarkers={setMarkers} setIsMap={setIsMap} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}