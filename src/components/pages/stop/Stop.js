import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Container, Grid } from "@material-ui/core";

import StopHeaderCard from "./StopHeaderCard";
import ArrivalCard from "./ArrivalCard";
import StopMarker from "../../map/StopMarker";

export default function Stop({ setCenter, setMarkers, setIsMap }) {
  const { aId, sId } = useParams();
  const [ stop, setStop ] = useState({});
  const [ lines, setLines ] = useState([]);

  useEffect(() => {
    // Load stop info
    fetch(`/api/stops/${sId}`)
    .then(res => res.json())
    .then(data => {
      setStop(data)
      setMarkers([(<StopMarker data={data} />)])
    });
    
    // Load lines on that stop
    fetch(`/api/lines/${aId}/stop/${sId}`)
    .then(res => res.json())
    .then(data => setLines(data));
    
  })

  return (
    <Container>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <StopHeaderCard stop={stop} setMarkers={setMarkers} setIsMap={setIsMap} />
        </Grid>
        {lines.map(l => (
          <Grid item key={l.route_id}>
            <ArrivalCard line={l} stop={stop} key={l.route_id} />
          </Grid>
          ))}
      </Grid>
    </Container>
  )
}