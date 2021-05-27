import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom'
import { Container, createMuiTheme, Grid, MuiThemeProvider } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import amber from '@material-ui/core/colors/amber';

import './App.css';
import Side from './components/ui/Side';
import Map from './components/map/Map';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue["500"]
    },
    secondary: {
      main: amber["A200"]
    }
  }
});

const App = () => {
  const [ center, setCenter ] = useState({lat: 43.2551406, lng: -79.8732005});
  const [ markers, setMarkers ] = useState([]);

  useEffect(() => {
    console.log(markers);
  }, [markers])

  return (
    <HashRouter>
      <MuiThemeProvider theme={theme}>
        <Container disableGutters>
          <Grid container>
            <Grid item xs={12} sm={12} md={4}>
              <Side setCenter={setCenter} setMarkers={setMarkers} />
            </Grid>
            <Grid item md={8}>
              <Map zoom={10} center={center} markers={markers}/>
            </Grid>
          </Grid>
        </Container>
      </MuiThemeProvider>
    </HashRouter>
  )
}

export default App;
