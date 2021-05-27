import React, { useState, useEffect } from "react";
import { Container, makeStyles } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';

import StopListCard from "./StopListCard";

const getStops = async (limit, page) => {
  return await (await fetch(`/api/stops?limit=${limit}&page=${page}`)).json();
}

export default function Stops({ setCenter, setMarkers }) {
  const classes = useStyles();
  const [ page, setPage ] = useState(1);
  const [ stops, setStops ] = useState([]);
  const limit = 5;
  const totalPages = Math.ceil(4249/limit);
  
  const handleChange = (event, value) => {
    setPage(value);
  }

  useEffect(() => {
    getStops(limit, page)
    .then(stops => setStops(stops));
  }, [page])
  
  return (
    <Container>
      {stops.map(s => (<StopListCard stop={s} key={s.stop_id + s.stop_code} 
                          setCenter={setCenter} setMarkers={setMarkers} />))}
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
