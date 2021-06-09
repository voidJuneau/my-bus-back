import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom'
import { createMuiTheme, Grid, makeStyles, MuiThemeProvider } from '@material-ui/core';
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
  const [ isMap, setIsMap ] = useState(false);

  const classes = useStyles();
  
  return (
    <HashRouter>
      <MuiThemeProvider theme={theme}>
        <Grid container>
          <Grid item xs={12} sm={12} md={4}
            className={isMap ? classes.hide : classes.show} >
            <Side setCenter={setCenter} setMarkers={setMarkers}
              isMap={isMap} setIsMap={setIsMap} />
          </Grid>
          <Grid item xs={12} sm={12} md={8}
            className={!isMap ? classes.hide : classes.show}>
            <Map zoom={10} center={center} markers={markers}
              isMap={isMap} setIsMap={setIsMap} />
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </HashRouter>
  )
}

const useStyles = makeStyles(theme => ({
  show: {
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  hide: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
}))

export default App;
