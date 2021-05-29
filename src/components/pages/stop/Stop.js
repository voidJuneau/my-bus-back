import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Card, Container } from "@material-ui/core";

import StopHeaderCard from "./StopHeaderCard";

export default function Stop({ setCenter, setMarkers }) {
  const { sId } = useParams();
  const [ stop, setStop ] = useState({});

  useEffect(() => {
    fetch(`/api/stops/${sId}`)
    .then(res => res.json())
    .then(data => setStop(data));
  }, [])

  return (
    <Container>
      <StopHeaderCard stop={stop} />
    </Container>
  )
}