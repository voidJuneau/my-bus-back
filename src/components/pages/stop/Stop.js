import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Card, Container } from "@material-ui/core";

export default function Stop({ setCenter, setMarkers }) {
  const { sId } = useParams();
  const [ stop, setStop ] = useState({stop_name: "none"});

  useEffect(() => {
    fetch(`/api/stops/${sId}`)
    .then(res => res.json())
    .then(data => setStop(data));
  }, [])

  return (
    <Container>
      <Card>
        {stop.stop_name}
      </Card>
    </Container>
  )
}