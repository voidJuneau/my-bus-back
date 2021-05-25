import React, { useState, useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";
import { Container, makeStyles } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';

import LineCard from "./LineCard";

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

const getLines = async (limit, page) => {
  const response = await fetch(`/api/lines?limit=${limit}&page=${page}`)
}

const Lines = () => {
  const classes = useStyles();
  const limit = 5;
  const [ page, setPage ] = useState(Math.floor(42/limit));
  const [ lines, setLines ] = useState()
  
  const handleChange = (event, value) => {
    setPage(value);
  }

  useEffect(() => {

  }, [page])
  
  return (
    <Container>
      {data.map(d => (<LineCard line={d} key={d.route_id}/>))}
      <div>page: {page}</div>
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

export default withRouter(Lines);