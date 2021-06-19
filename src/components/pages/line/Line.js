import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Container, Grid, makeStyles } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';

import LineHeaderCard from "./LineHeaderCard";
import StopListCard from "../stops/StopListCard";
import { getStopCountOnLine, getStopsOnLine } from "../../../utils/api";
import StopMarker from "../../map/StopMarker";

export default function Line({ setCenter, setZoom, setMarkers, setIsMap }) {
  const classes = useStyles();
  const { aId, lId } = useParams();
  const [ page, setPage ] = useState(1);
  const [ line, setLine ] = useState({});
  const [ stops, setStops ] = useState([]);
  const [ stopsOnPage, setStopsOnPage ] = useState([]);
  const [ totalPages, setTotalPages ] = useState(0);
  const limit = 5;
  useEffect(() => {
    // Get line info
    fetch(`/api/lines/${aId}/route/${lId}`)
    .then(res => res.json())
    .then(data => setLine(data));
    // Get count of stops for that line
    getStopCountOnLine(aId, lId)
    .then(res => setTotalPages(Math.ceil(res / limit)));
    // all Stops the line visits
    getStopsOnLine(aId, lId)
    .then(stops => {
      setStops(stops);
      const markers = stops.map(s => <StopMarker key={s.stop_id} data={s} isList />);
      setMarkers(markers);
    });
  }, [aId, lId])

  useEffect(() => {
    // Get stops on that line
    getStopsOnLine(aId, lId, limit, page)
    .then(stops => setStopsOnPage(stops));
  }, [page, aId, lId])

  useEffect(() => {
    // if stops are get, set the centre
    if (stops.length > 0) {
      let minLat = stops[0].stop_lat;
      let maxLat = stops[0].stop_lat;
      let minLon = stops[0].stop_lon;
      let maxLon = stops[0].stop_lon;
      stops.forEach(s => {
        if (s.stop_lat < minLat) minLat = s.stop_lat;
        if (s.stop_lat > maxLat) maxLat = s.stop_lat;
        if (s.stop_lon < minLon) minLon = s.stop_lon;
        if (s.stop_lon > maxLon) maxLon = s.stop_lon;
      })
      setCenter({lat: (minLat+maxLat)/2, lng: (minLon+maxLon)/2});
      setZoom(11.75);
    }
  }, [stops])

  const handlePageChange = (event, value) => {
    setPage(value);
  }

  const handleStopMapMenuClick = stop => {
    console.log(stop)
    const markers = stops.map(s => (
      s.stop_id === stop.stop_id 
        ? <StopMarker key={s.stop_id + s.trip_id} data={s} />
        : <StopMarker key={s.stop_id + s.trip_id} data={s} isList />));
    setMarkers(markers);
  }

  return (
    <Container>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <LineHeaderCard line={line} setMarkers={setMarkers} setIsMap={setIsMap} />
        </Grid>
        {stopsOnPage.map(s => (
          <Grid item key={s.stop_id} >
            <StopListCard stop={s} key={s.stop_id} 
              setCenter={setCenter} setZoom={setZoom} 
              setMarkers={setMarkers} setIsMap={setIsMap}
              onList onStopMapMenuClick={handleStopMapMenuClick} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.root}>
        <Pagination count={totalPages} onChange={handlePageChange} />
      </div>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));