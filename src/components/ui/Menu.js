import React from 'react';
import { AppBar, Button, Container, IconButton, List, ListItem, ListItemText, makeStyles, 
  Toolbar, Typography } from '@material-ui/core';
import { Home, MenuIcon } from '@material-ui/icons'; 
import MenuOption from './MenuOption';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import StarOutlineOutlinedIcon from '@material-ui/icons/StarOutlineOutlined';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import RoomIcon from '@material-ui/icons/Room';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

export default function Menu() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Container className={classes.navbarDisplayFlex}>
            <List 
              component="nav" 
              aria-labelledby="main navigation"
              className={classes.navDisplayFlex} >
              <MenuOption label="Search" path="/search">
                <SearchOutlinedIcon fontSize="large" />
              </MenuOption>
              <MenuOption label="Favourate" path="/favourate">
                <StarOutlineOutlinedIcon fontSize="large" />
              </MenuOption>
              <MenuOption label="Lines" path="/lines">
                <DirectionsBusIcon fontSize="large" />
              </MenuOption>
              <MenuOption label="Stops" path="/stops">
                <RoomIcon fontSize="large" />
              </MenuOption>
              <MenuOption label="LogIn" path="/memeber">
                <LockOutlinedIcon fontSize="large" />
              </MenuOption>
            </List>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: "center"
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`
  },
  linkA: {
    textDecoration: "none"
  }
}));