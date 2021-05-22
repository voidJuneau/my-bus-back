import React from "react";
import { Container } from "@material-ui/core";
import LineBox from "./LineBox";

const data = [{
  "route_id": "4349",
  "agency_id": "HSR",
  "route_short_name": "01",
  "route_long_name": "KING",
  "route_desc": null,
  "route_type": 3,
  "route_url": null,
  "route_color": "0093DD",
  "route_text_color": "000000"
  },
  {
  "route_id": "05210621-16",
  "agency_id": "GO",
  "route_short_name": "16",
  "route_long_name": "Hamilton / Toronto Express",
  "route_desc": null,
  "route_type": 3,
  "route_url": null,
  "route_color": "98002e",
  "route_text_color": "FFFFFF"
  },]

export default function Lines() {
  return (
    <Container>
      {data.map(d => (<LineBox line={d} />))}
    </Container>
  )
}