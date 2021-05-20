import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Container, createMuiTheme, Grid, MuiThemeProvider } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import amber from '@material-ui/core/colors/amber';

import './App.css';
import Side from './components/ui/Side';
import Map from './components/Map';

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
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
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
      </MuiThemeProvider>
    </BrowserRouter>
  )
}

export default App;
