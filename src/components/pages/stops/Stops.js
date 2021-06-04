import React, { useState, useEffect } from "react";
import { Container, makeStyles } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';

import StopListCard from "./StopListCard";

const getCount = async () => {
  return await (await fetch("/api/stops/count")).json();
}

const getStops = async (limit, page) => {
  return await (await fetch(`/api/stops?limit=${limit}&page=${page}`)).json();
}

export default function Stops({ setCenter, setMarkers, setIsMap }) {
  const classes = useStyles();
  const [ page, setPage ] = useState(1);
  const [ stops, setStops ] = useState([]);
  const [ count, setCount ] = useState(0);
  const [ totalPages, setTotalPages ] = useState(0);
  const limit = 5;
  
  const handleChange = (event, value) => {
    setPage(value);
  }

  useEffect(() => {
    getCount()
    .then(res => setTotalPages(Math.ceil(res / limit)));
  }, [])

  useEffect(() => {
    getStops(limit, page)
    .then(stops => {setStops(stops); console.log(stops)});
  }, [page]);
  
  return (
    <Container>
      {stops.map(s => (<StopListCard stop={s} key={s.stop_id + s.stop_name} 
                          setCenter={setCenter} setMarkers={setMarkers}
                          setIsMap={setIsMap} />))}
      <div className={classes.root}>
        <Pagination count={totalPages} siblingCount={1} page={page}
          showFirstButton showLastButton
          onChange={handleChange} />
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
