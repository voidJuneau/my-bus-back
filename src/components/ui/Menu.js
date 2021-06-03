import React from 'react';
import { AppBar, Grid, List, makeStyles, Toolbar } from '@material-ui/core';
import MenuOption from './MenuOption';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import RoomIcon from '@material-ui/icons/Room';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

export default function Menu({ setIsMap }) {
  const classes = useStyles();

  // Hide map
  const handleClick = () => {
    setIsMap(false);
  }

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Grid container className={classes.navbarDisplayFlex}>
          <List 
            component="nav" 
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex} >
            <Grid item xs onClick={handleClick} >
              <MenuOption label="Search" path="/search">
                <SearchOutlinedIcon fontSize="large" />
              </MenuOption>
            </Grid>
            <Grid item xs onClick={handleClick} >
              <MenuOption label="Favourate" path="/favourate">
                <StarOutlineOutlinedIcon fontSize="large" />
              </MenuOption>
            </Grid>
            <Grid item xs onClick={handleClick} >
              <MenuOption label="Lines" path="/lines">
                <DirectionsBusIcon fontSize="large" />
              </MenuOption>
            </Grid>
            <Grid item xs onClick={handleClick} >
              <MenuOption label="Stops" path="/stops">
                <RoomIcon fontSize="large" />
              </MenuOption>
            </Grid>
            <Grid item xs onClick={handleClick} >
              <MenuOption label="LogIn" path="/memeber">
                <LockOutlinedIcon fontSize="large" />
              </MenuOption>
            </Grid>
          </List>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles((theme) => ({
  navbarDisplayFlex: {
    display: "flex",
    justifyContent: "space-between"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: "center"
  },
  navDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  },
  linkText: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: "white"
  },
  linkA: {
    textDecoration: "none"
  }
}));