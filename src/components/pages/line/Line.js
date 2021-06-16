import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Container, Grid, makeStyles } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';

import LineHeaderCard from "./LineHeaderCard";
import StopListCard from "../stops/StopListCard";

const getCount = async (aId, lId) => {
  return await (await fetch(`/api/stops/${aId}/route/${lId}/count`)).json();
}
const getStops = async (aId, lId, limit, page) => {
  return await (await fetch(`/api/stops/${aId}/route/${lId}?limit=${limit}&page=${page}`)).json();
}

export default function Stop({ setCenter, setMarkers, setIsMap }) {
  const classes = useStyles();
  const { aId, lId } = useParams();
  const [ page, setPage ] = useState(1);
  const [ line, setLine ] = useState({});
  const [ stops, setStops ] = useState([]);
  const [ totalPages, setTotalPages ] = useState(0);
  const limit = 5;

  useEffect(() => {
    // Get stops on that line
    getStops(aId, lId, limit, page)
    .then(stops => setStops(stops));
  }, [page, aId, lId])

  useEffect(() => {
    // Get line info
    fetch(`/api/lines/${aId}/route/${lId}`)
    .then(res => res.json())
    .then(data => setLine(data));
    
    // Get count of stops for that line
    getCount(aId, lId)
    .then(res => setTotalPages(Math.ceil(res / limit)));
  }, [aId, lId])
  
  const handleChange = (event, value) => {
    setPage(value);
  }

  return (
    <Container>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <LineHeaderCard line={line} setMarkers={setMarkers} setIsMap={setIsMap} />
        </Grid>
        {stops.map(s => (
          <Grid item key={s.stop_id} >
            <StopListCard stop={s} key={s.stop_id} setMarkers={setMarkers} setIsMap={setIsMap} onList />
          </Grid>
        ))}
      </Grid>
      <div className={classes.root}>
        <Pagination count={totalPages} onChange={handleChange} />
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