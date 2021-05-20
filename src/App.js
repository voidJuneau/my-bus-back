import React from 'react';
import { Container, Grid } from '@material-ui/core';

import './App.css';
import Side from './components/ui/Side';
import Map from './components/Map';

const App = () => {
  return (
    <Container disableGutters>
      <Grid container>
        <Grid item xs={12} sm={12} md={4}>
          <Side />
        </Grid>
        <Grid item md={8}>
          <Map zoom={10} center={{lat:40, lng:-80}} markers={[]}/>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App;
