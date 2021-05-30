import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Card, Container, Grid } from "@material-ui/core";

import StopHeaderCard from "./StopHeaderCard";
import ArrivalCard from "./ArrivalCard";

export default function Stop({ setCenter, setMarkers }) {
  const { aId, sId } = useParams();
  const [ stop, setStop ] = useState({});
  const [ lines, setLines ] = useState([]);

  useEffect(() => {
    // Load stop info
    fetch(`/api/stops/${sId}`)
    .then(res => res.json())
    .then(data => setStop(data));
    
    // Load lines on that stop
    fetch(`/api/lines/${aId}/stop/${sId}`)
    .then(res => res.json())
    .then(data => setLines(data));
    
  }, [])

  return (
    <Container>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <StopHeaderCard stop={stop} />
        </Grid>
        {lines.map(l => (
          <Grid item>
            <ArrivalCard line={l} stopId={sId} key={l.route_id} />
          </Grid>
          ))}
      </Grid>
    </Container>
  )
}